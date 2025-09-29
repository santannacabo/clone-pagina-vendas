"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { CountdownTimer } from '@/components/ui/countdown-timer'
import { useToast } from '@/hooks/use-toast'
import { 
  CreditCard, 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  Gift,
  Clock,
  Shield,
  BookOpen,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [installments, setInstallments] = useState('1')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    cpf: '',
    phone: '',
    acceptTerms: false,
    acceptMarketing: false
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const { email, fullName, cpf, phone, acceptTerms } = formData
    
    if (!email || !fullName || !cpf || !phone) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      })
      return false
    }

    if (!acceptTerms) {
      toast({
        title: "Termos de uso",
        description: "Você deve aceitar os termos de uso para continuar.",
        variant: "destructive",
      })
      return false
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      })
      return false
    }

    // Validação básica de CPF (apenas formato)
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
    if (!cpfRegex.test(cpf)) {
      toast({
        title: "CPF inválido",
        description: "Por favor, insira um CPF no formato 000.000.000-00.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsProcessing(true)

    try {
      // Criar sessão de checkout no Stripe
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethod,
          installments: parseInt(installments),
          customerData: formData,
          successUrl: `${window.location.origin}/success`,
          cancelUrl: `${window.location.origin}/checkout`,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao processar pagamento')
      }

      // Redirecionar para o Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('URL de checkout não recebida')
      }

    } catch (error: any) {
      console.error('Erro no checkout:', error)
      toast({
        title: "Erro no pagamento",
        description: error.message || "Ocorreu um erro ao processar seu pagamento. Tente novamente.",
        variant: "destructive",
      })
      setIsProcessing(false)
    }
  }

  const installmentOptions = [
    { value: '1', label: '1x de R$ 147,00 à vista', discount: true },
    { value: '2', label: '2x de R$ 73,50 sem juros' },
    { value: '3', label: '3x de R$ 49,00 sem juros' },
    { value: '6', label: '6x de R$ 24,50 sem juros' },
    { value: '12', label: '12x de R$ 14,70 sem juros' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="w-5 h-5" />
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TécnicasEstudo</span>
            </Link>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">Checkout Seguro SSL</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário de Checkout */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900">Finalizar Compra</CardTitle>
                <p className="text-gray-600">Preencha seus dados para acessar o curso</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Dados Pessoais */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Dados Pessoais</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="seu@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="fullName">Nome Completo *</Label>
                        <Input
                          id="fullName"
                          placeholder="Seu nome completo"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF *</Label>
                        <Input
                          id="cpf"
                          placeholder="000.000.000-00"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone *</Label>
                        <Input
                          id="phone"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Forma de Pagamento */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Forma de Pagamento</h3>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
                          <CreditCard className="w-5 h-5" />
                          <div>
                            <div>Cartão de Crédito</div>
                            <div className="text-sm text-gray-500">Parcelamento sem juros disponível</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                        <RadioGroupItem value="pix" id="pix" />
                        <Label htmlFor="pix" className="flex items-center gap-2 cursor-pointer flex-1">
                          <div className="w-5 h-5 bg-green-600 rounded flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              PIX 
                              <Badge className="bg-green-100 text-green-800 text-xs">5% OFF</Badge>
                            </div>
                            <div className="text-sm text-gray-500">Aprovação instantânea</div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {paymentMethod === 'card' && (
                    <div>
                      <Label className="text-base font-medium">Parcelamento</Label>
                      <RadioGroup value={installments} onValueChange={setInstallments} className="mt-2">
                        {installmentOptions.map((option) => (
                          <div key={option.value} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                            <RadioGroupItem value={option.value} id={`installment-${option.value}`} />
                            <Label htmlFor={`installment-${option.value}`} className="cursor-pointer flex-1">
                              {option.label}
                              {option.discount && (
                                <Badge className="ml-2 bg-green-100 text-green-800">Melhor opção</Badge>
                              )}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>
                  )}

                  {paymentMethod === 'pix' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-800 mb-2 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Pagamento via PIX
                      </h3>
                      <p className="text-green-700 mb-4">
                        Após confirmar a compra, você será redirecionado para uma página segura onde poderá 
                        escanear o QR Code ou copiar o código PIX para pagamento.
                      </p>
                      <div className="bg-white p-4 rounded border">
                        <p className="text-sm text-gray-600 mb-2">Valor com desconto PIX:</p>
                        <p className="text-2xl font-bold text-green-600">R$ 139,65</p>
                        <p className="text-sm text-gray-500">Economia de R$ 7,35 (5% OFF)</p>
                      </div>
                      <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                          <div className="text-sm text-blue-800">
                            <strong>Acesso imediato:</strong> Assim que o pagamento for confirmado, 
                            você receberá o acesso ao curso por email automaticamente.
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <Separator />

                  {/* Termos */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => handleInputChange('acceptTerms', checked as boolean)}
                      />
                      <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
                        Eu aceito os <a href="#" className="text-blue-600 hover:underline">termos de uso</a> e 
                        a <a href="#" className="text-blue-600 hover:underline">política de privacidade</a> *
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.acceptMarketing}
                        onCheckedChange={(checked) => handleInputChange('acceptMarketing', checked as boolean)}
                      />
                      <Label htmlFor="marketing" className="text-sm text-gray-600 cursor-pointer">
                        Aceito receber emails com dicas de estudo e ofertas especiais
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg font-semibold disabled:opacity-50"
                    disabled={!formData.acceptTerms || isProcessing}
                  >
                    <Lock className="w-5 h-5 mr-2" />
                    {isProcessing ? 'PROCESSANDO...' : 'FINALIZAR COMPRA SEGURA'}
                  </Button>

                  <div className="text-center text-sm text-gray-500">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Shield className="w-4 h-4" />
                      <span>Pagamento processado com segurança pelo Stripe</span>
                    </div>
                    <p>Seus dados estão protegidos com criptografia SSL de 256 bits</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Resumo do Pedido */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Produto */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">Técnicas de Estudo Avançadas</h3>
                      <p className="text-sm text-gray-600">Curso completo + bônus exclusivos</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Curso</span>
                      <span className="line-through text-gray-400">R$ 497,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Desconto (70%)</span>
                      <span className="text-green-600">-R$ 350,00</span>
                    </div>
                    {paymentMethod === 'pix' && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Desconto PIX (5%)</span>
                        <span className="text-green-600">-R$ 7,35</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600">
                        {paymentMethod === 'pix' ? 'R$ 139,65' : 'R$ 147,00'}
                      </span>
                    </div>
                    {paymentMethod === 'card' && installments !== '1' && (
                      <p className="text-sm text-gray-600 text-center">
                        ou {installmentOptions.find(opt => opt.value === installments)?.label}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Bônus */}
              <Card className="shadow-lg border-green-200">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Gift className="w-5 h-5 text-green-600" />
                    Bônus Inclusos
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>E-book "50 Dicas de Ouro"</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Planilha de Cronograma</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Grupo VIP Telegram</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>3 Aulas Bônus Redação</span>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg mt-4">
                    <p className="text-sm text-green-800 font-medium">
                      Valor total dos bônus: R$ 297,00
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Garantias */}
              <Card className="shadow-lg">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Garantia de 30 dias</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    <span>Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Lock className="w-4 h-4 text-blue-600" />
                    <span>Pagamento 100% seguro</span>
                  </div>
                </CardContent>
              </Card>

              {/* Urgência */}
              <Card className="shadow-lg border-red-200 bg-red-50">
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-red-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-red-800 mb-1">
                    Oferta expira em:
                  </p>
                  <CountdownTimer />
                  <p className="text-xs text-red-700 mt-1">
                    Após esse período, volta para R$ 497,00
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}