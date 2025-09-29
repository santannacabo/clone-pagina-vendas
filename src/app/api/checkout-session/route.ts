import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID é obrigatório' }, { status: 400 })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['customer', 'payment_intent'],
    })

    return NextResponse.json({
      session: {
        id: session.id,
        paymentStatus: session.payment_status,
        customerEmail: (session.customer as any)?.email,
        amountTotal: session.amount_total,
        currency: session.currency,
        paymentMethod: session.metadata?.paymentMethod,
        installments: session.metadata?.installments,
      },
    })
  } catch (error: any) {
    console.error('Erro ao recuperar sessão:', error)
    return NextResponse.json(
      { error: 'Erro ao recuperar sessão', details: error.message },
      { status: 500 }
    )
  }
}