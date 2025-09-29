import Stripe from 'stripe'
import { loadStripe } from '@stripe/stripe-js'

// Stripe server-side
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
})

// Stripe client-side
export const getStripe = () => {
  return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
}

// Configurações do produto
export const PRODUCT_CONFIG = {
  name: 'Técnicas de Estudo Avançadas',
  description: 'Curso completo + bônus exclusivos',
  price: 14700, // R$ 147,00 em centavos
  pixPrice: 13965, // R$ 139,65 em centavos (5% desconto)
  currency: 'brl',
  images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'],
}

// Configurações de parcelamento
export const INSTALLMENT_OPTIONS = [
  { installments: 1, amount: 14700, label: '1x de R$ 147,00 à vista' },
  { installments: 2, amount: 7350, label: '2x de R$ 73,50 sem juros' },
  { installments: 3, amount: 4900, label: '3x de R$ 49,00 sem juros' },
  { installments: 6, amount: 2450, label: '6x de R$ 24,50 sem juros' },
  { installments: 12, amount: 1470, label: '12x de R$ 14,70 sem juros' },
]