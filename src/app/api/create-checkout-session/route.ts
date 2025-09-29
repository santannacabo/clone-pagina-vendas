import { NextRequest, NextResponse } from 'next/server'
import { stripe, PRODUCT_CONFIG } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      paymentMethod, 
      installments, 
      customerData,
      successUrl,
      cancelUrl 
    } = body

    // Validar dados obrigatórios
    if (!customerData?.email || !customerData?.fullName) {
      return NextResponse.json(
        { error: 'Dados do cliente são obrigatórios' },
        { status: 400 }
      )
    }

    // Criar ou recuperar cliente no Stripe
    let customer
    const existingCustomers = await stripe.customers.list({
      email: customerData.email,
      limit: 1,
    })

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0]
    } else {
      customer = await stripe.customers.create({
        email: customerData.email,
        name: customerData.fullName,
        phone: customerData.phone,
        metadata: {
          cpf: customerData.cpf,
        },
      })
    }

    // Configurar preço baseado no método de pagamento
    const price = paymentMethod === 'pix' ? PRODUCT_CONFIG.pixPrice : PRODUCT_CONFIG.price
    const unitAmount = installments > 1 ? Math.round(price / installments) : price

    // Criar sessão de checkout
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: paymentMethod === 'pix' ? ['pix'] : ['card'],
      line_items: [
        {
          price_data: {
            currency: PRODUCT_CONFIG.currency,
            product_data: {
              name: PRODUCT_CONFIG.name,
              description: PRODUCT_CONFIG.description,
              images: PRODUCT_CONFIG.images,
            },
            unit_amount: unitAmount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl || `${request.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${request.nextUrl.origin}/checkout`,
      metadata: {
        paymentMethod,
        installments: installments.toString(),
        customerCpf: customerData.cpf,
      },
      // Configurações específicas para cartão
      ...(paymentMethod === 'card' && installments > 1 && {
        payment_intent_data: {
          metadata: {
            installments: installments.toString(),
          },
        },
      }),
      // Configurações específicas para PIX
      ...(paymentMethod === 'pix' && {
        payment_method_options: {
          pix: {
            expires_after_seconds: 86400, // 24 horas
          },
        },
      }),
      // Configurações de expiração
      expires_at: Math.floor(Date.now() / 1000) + (30 * 60), // 30 minutos
      // Configurações de localização
      locale: 'pt-BR',
      // Configurações de cobrança
      billing_address_collection: 'required',
      // Configurações de envio (não aplicável para produto digital)
      shipping_address_collection: {
        allowed_countries: ['BR'],
      },
    })

    return NextResponse.json({ 
      sessionId: session.id,
      url: session.url,
      paymentMethod,
      amount: unitAmount,
      installments,
    })

  } catch (error: any) {
    console.error('Erro ao criar sessão de checkout:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor', details: error.message },
      { status: 500 }
    )
  }
}