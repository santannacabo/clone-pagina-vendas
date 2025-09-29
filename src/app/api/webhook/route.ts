import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = headers().get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Assinatura ausente' }, { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err: any) {
    console.error('Erro na verificação do webhook:', err.message)
    return NextResponse.json({ error: 'Webhook inválido' }, { status: 400 })
  }

  // Processar eventos do Stripe
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      console.log('Pagamento concluído:', session.id)
      
      // Aqui você pode:
      // 1. Salvar a compra no banco de dados
      // 2. Enviar email de confirmação
      // 3. Liberar acesso ao curso
      // 4. Adicionar cliente ao grupo VIP
      
      await handleSuccessfulPayment(session)
      break

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object
      console.log('Pagamento processado:', paymentIntent.id)
      break

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object
      console.log('Pagamento falhou:', failedPayment.id)
      
      // Aqui você pode enviar email de falha ou tentar novamente
      await handleFailedPayment(failedPayment)
      break

    default:
      console.log(`Evento não tratado: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

async function handleSuccessfulPayment(session: any) {
  try {
    // Recuperar detalhes do cliente
    const customer = await stripe.customers.retrieve(session.customer)
    
    // Aqui você implementaria:
    // 1. Salvar no banco de dados
    // 2. Enviar email de boas-vindas
    // 3. Criar acesso ao curso
    // 4. Adicionar ao grupo VIP
    
    console.log('Processando pagamento bem-sucedido para:', customer)
    
    // Exemplo de estrutura de dados para salvar:
    const purchaseData = {
      sessionId: session.id,
      customerId: session.customer,
      customerEmail: (customer as any).email,
      amount: session.amount_total,
      currency: session.currency,
      paymentStatus: session.payment_status,
      paymentMethod: session.metadata?.paymentMethod,
      installments: session.metadata?.installments,
      createdAt: new Date(),
    }
    
    // TODO: Implementar salvamento no banco de dados
    // await saveToDatabase(purchaseData)
    
    // TODO: Implementar envio de email
    // await sendWelcomeEmail(customer.email)
    
  } catch (error) {
    console.error('Erro ao processar pagamento bem-sucedido:', error)
  }
}

async function handleFailedPayment(paymentIntent: any) {
  try {
    console.log('Processando pagamento falhou para:', paymentIntent.customer)
    
    // TODO: Implementar notificação de falha
    // await sendPaymentFailedEmail(paymentIntent.customer)
    
  } catch (error) {
    console.error('Erro ao processar pagamento falhou:', error)
  }
}