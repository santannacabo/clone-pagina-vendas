"use client"

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  CheckCircle, 
  Download, 
  Mail, 
  MessageCircle, 
  BookOpen,
  Gift,
  Clock,
  User,
  CreditCard,
  Loader2
} from 'lucide-react'
import Link from 'next/link'

interface SessionData {
  id: string
  paymentStatus: string
  customerEmail: string
  amountTotal: number
  currency: string
  paymentMethod: string
  installments: string
}

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [sessionData, setSessionData] = useState<SessionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (sessionId) {
      fetchSessionData(sessionId)
    } else {
      setLoading(false)
    }
  }, [sessionId])

  const fetchSessionData = async (sessionId: string) => {
    try {
      const response = await fetch(`/api/checkout-session?session_id=${sessionId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao recuperar dados da sessão')
      }

      setSessionData(data.session)
    } catch (error: any) {
      console.error('Erro ao buscar dados da sessão:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount / 100)
  }

  const getPaymentMethodLabel = (method: string) => {
    switch (method) {
      case 'pix':
        return 'PIX'
      case 'card':
        return 'Cartão de Crédito'
      default:
        return method
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-gray-600">Carregando informações da compra...</p>
        </div>
      </div>
    )
  }

  if (error || !sessionData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Erro ao carregar compra
            </h2>
            <p className="text-gray-600 mb-4">
              {error || 'Não foi possível encontrar os dados da sua compra.'}
            </p>
            <Link href="/">
              <Button>Voltar ao início</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TécnicasEstudo</span>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Confirmação Principal */}
        <Card className="shadow-lg mb-8">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🎉 Parabéns! Compra realizada com sucesso!
            </h1>
            
            <p className="text-lg text-gray-600 mb-6">
              Seu pagamento foi processado e você já tem acesso completo ao curso
            </p>

            {sessionData.paymentStatus === 'paid' ? (
              <Badge className="bg-green-100 text-green-800 text-base px-4 py-2">
                ✅ Pagamento Confirmado
              </Badge>
            ) : (
              <Badge className="bg-yellow-100 text-yellow-800 text-base px-4 py-2">
                ⏳ Processando Pagamento
              </Badge>
            )}
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Detalhes da Compra */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Detalhes da Compra
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Produto:</span>
                <span className="font-medium">Técnicas de Estudo Avançadas</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Valor pago:</span>
                <span className="font-bold text-green-600">
                  {formatCurrency(sessionData.amountTotal, sessionData.currency)}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Forma de pagamento:</span>
                <span className="font-medium">
                  {getPaymentMethodLabel(sessionData.paymentMethod)}
                  {sessionData.paymentMethod === 'card' && sessionData.installments !== '1' && (
                    <span className="text-sm text-gray-500 ml-1">
                      ({sessionData.installments}x)
                    </span>
                  )}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{sessionData.customerEmail}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">ID da transação:</span>
                <span className="font-mono text-sm">{sessionData.id}</span>
              </div>

              <Separator />
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">Email de confirmação enviado!</p>
                    <p className="text-sm text-blue-700">
                      Verifique sua caixa de entrada e spam. O email contém seus dados de acesso.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Próximos Passos */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Próximos Passos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-green-900">Acesse sua área do aluno</p>
                    <p className="text-sm text-green-700">
                      Use o email e senha enviados para fazer login
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-blue-900">Baixe os materiais bônus</p>
                    <p className="text-sm text-blue-700">
                      E-books, planilhas e conteúdos extras disponíveis
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-purple-900">Entre no grupo VIP</p>
                    <p className="text-sm text-purple-700">
                      Link do Telegram enviado por email
                    </p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700" size="lg">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Acessar Área do Aluno
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <Download className="w-5 h-5 mr-2" />
                  Baixar Materiais Bônus
                </Button>
                
                <Button variant="outline" className="w-full" size="lg">
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Entrar no Grupo VIP
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bônus Inclusos */}
        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-green-600" />
              Seus Bônus Exclusivos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">E-book "50 Dicas de Ouro"</p>
                    <p className="text-sm text-gray-600">Técnicas comprovadas de memorização</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Planilha de Cronograma</p>
                    <p className="text-sm text-gray-600">Organize seus estudos eficientemente</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">Grupo VIP Telegram</p>
                    <p className="text-sm text-gray-600">Suporte direto e networking</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">3 Aulas Bônus Redação</p>
                    <p className="text-sm text-gray-600">Técnicas avançadas de escrita</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suporte */}
        <Card className="shadow-lg mt-8">
          <CardContent className="p-6 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Precisa de ajuda?
            </h3>
            <p className="text-gray-600 mb-4">
              Nossa equipe está pronta para te ajudar com qualquer dúvida
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline">
                <Mail className="w-4 h-4 mr-2" />
                suporte@tecnicasestudo.com
              </Button>
              <Button variant="outline">
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp: (11) 99999-9999
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Garantia */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full">
            <Clock className="w-5 h-5 text-blue-600" />
            <span className="text-blue-800 font-medium">
              Garantia de 30 dias - 100% do seu dinheiro de volta se não ficar satisfeito
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}