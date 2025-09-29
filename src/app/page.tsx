"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star, Users, Clock, BookOpen, Trophy, ArrowRight, Play, Lock } from 'lucide-react'
import Link from 'next/link'

export default function SalesPage() {
  const [showVideo, setShowVideo] = useState(false)

  const benefits = [
    "Técnicas comprovadas de memorização",
    "Método de leitura dinâmica",
    "Organização de estudos eficiente",
    "Controle de ansiedade nas provas",
    "Planejamento de cronograma de estudos",
    "Técnicas de concentração avançadas"
  ]

  const testimonials = [
    {
      name: "Maria Silva",
      role: "Aprovada em Concurso Público",
      content: "Consegui passar no concurso dos meus sonhos usando essas técnicas. Minha produtividade nos estudos aumentou 300%!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Estudante de Medicina",
      content: "Revolucionou minha forma de estudar. Agora consigo absorver muito mais conteúdo em menos tempo.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Concurseira",
      content: "O método de memorização é incrível! Nunca mais esqueci o que estudei.",
      rating: 5
    }
  ]

  const modules = [
    {
      title: "Módulo 1: Fundamentos do Estudo Eficiente",
      duration: "2h 30min",
      lessons: 8,
      description: "Aprenda os pilares fundamentais para um estudo realmente eficaz"
    },
    {
      title: "Módulo 2: Técnicas de Memorização",
      duration: "3h 15min", 
      lessons: 12,
      description: "Domine as técnicas mais poderosas para nunca mais esquecer o que estudou"
    },
    {
      title: "Módulo 3: Leitura Dinâmica e Compreensão",
      duration: "2h 45min",
      lessons: 10,
      description: "Leia 3x mais rápido mantendo 100% da compreensão"
    },
    {
      title: "Módulo 4: Organização e Planejamento",
      duration: "2h 00min",
      lessons: 7,
      description: "Crie cronogramas eficientes e organize seus estudos como um profissional"
    },
    {
      title: "Módulo 5: Controle Emocional e Foco",
      duration: "1h 45min",
      lessons: 6,
      description: "Elimine a ansiedade e mantenha o foco total durante os estudos"
    }
  ]

  const scrollToCheckout = () => {
    document.getElementById('checkout')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">TécnicasEstudo</span>
            </div>
            <Badge variant="destructive" className="animate-pulse">
              Oferta Limitada
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200">
            ✨ Método Comprovado por +10.000 Alunos
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Domine as <span className="text-blue-600">Técnicas Secretas</span><br />
            dos Estudantes de <span className="text-green-600">Elite</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
            Aprenda o método revolucionário que está transformando a vida de milhares de estudantes. 
            <strong> Estude 50% menos e aprenda 300% mais!</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex items-center gap-2 text-gray-700">
              <Users className="w-5 h-5 text-blue-600" />
              <span>+10.000 alunos aprovados</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>4.9/5 estrelas (2.847 avaliações)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Trophy className="w-5 h-5 text-green-600" />
              <span>Garantia de 30 dias</span>
            </div>
          </div>

          {/* Video Preview */}
          <div className="max-w-4xl mx-auto mb-12">
            <Card className="overflow-hidden shadow-2xl">
              <CardContent className="p-0">
                {!showVideo ? (
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 aspect-video flex items-center justify-center cursor-pointer"
                       onClick={() => setShowVideo(true)}>
                    <div className="text-center text-white">
                      <Play className="w-20 h-20 mx-auto mb-4 opacity-90 hover:opacity-100 transition-opacity" />
                      <h3 className="text-2xl font-bold mb-2">Assista ao Vídeo de Apresentação</h3>
                      <p className="text-lg opacity-90">Descubra como transformar seus estudos em apenas 15 minutos</p>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-video bg-gray-900 flex items-center justify-center">
                    <p className="text-white text-lg">Vídeo de apresentação seria carregado aqui</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/checkout">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                QUERO TRANSFORMAR MEUS ESTUDOS AGORA
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Veja o que nossos alunos estão dizendo
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            O que você vai aprender
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Um método completo e testado que vai revolucionar sua forma de estudar
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <span className="text-lg text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Conteúdo do Curso
          </h2>
          <p className="text-xl text-gray-600 text-center mb-12">
            5 módulos completos com mais de 12 horas de conteúdo prático
          </p>
          
          <div className="space-y-4">
            {modules.map((module, index) => (
              <Card key={index} className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{module.title}</h3>
                      <p className="text-gray-600 mb-4">{module.description}</p>
                      <div className="flex items-center gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          <span>{module.lessons} aulas</span>
                        </div>
                      </div>
                    </div>
                    <Lock className="w-6 h-6 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="checkout" className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oferta Especial por Tempo Limitado
            </h2>
            <p className="text-xl text-gray-600">
              Invista no seu futuro hoje mesmo
            </p>
          </div>

          <Card className="shadow-2xl border-2 border-green-200">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Badge className="mb-4 bg-red-100 text-red-800 border-red-200 text-lg px-4 py-2">
                  🔥 DESCONTO DE 70% - APENAS HOJE!
                </Badge>
                
                <div className="mb-6">
                  <span className="text-2xl text-gray-500 line-through">De R$ 497,00</span>
                  <div className="text-5xl md:text-6xl font-bold text-green-600 mb-2">
                    R$ 147<span className="text-2xl">,00</span>
                  </div>
                  <p className="text-gray-600">ou 12x de R$ 14,70 sem juros</p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
                  <h3 className="font-bold text-green-800 mb-2">🎁 BÔNUS EXCLUSIVOS (Valor: R$ 297)</h3>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>✅ E-book: "50 Dicas de Ouro para Concursos"</li>
                    <li>✅ Planilha de Cronograma de Estudos</li>
                    <li>✅ Acesso ao Grupo VIP no Telegram</li>
                    <li>✅ 3 Aulas Bônus sobre Redação</li>
                  </ul>
                </div>

                <Link href="/checkout">
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-xl font-bold shadow-lg hover:shadow-xl transition-all mb-4"
                  >
                    GARANTIR MINHA VAGA AGORA
                    <ArrowRight className="w-6 h-6 ml-2" />
                  </Button>
                </Link>

                <div className="flex items-center justify-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Acesso imediato</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Garantia de 30 dias</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Suporte incluso</span>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ ATENÇÃO:</strong> Esta oferta especial expira em <strong>24 horas</strong>. 
                    Após esse período, o curso voltará ao preço normal de R$ 497,00.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Garantia Incondicional de 30 Dias
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Se você não ficar 100% satisfeito com o curso, devolvemos todo o seu dinheiro. 
              Sem perguntas, sem complicações.
            </p>
            <p className="text-sm text-gray-500">
              Você tem 30 dias completos para testar todas as técnicas. Se não ver resultados, 
              basta enviar um email e devolvemos 100% do valor investido.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <span className="text-2xl font-bold">TécnicasEstudo</span>
            </div>
            <p className="text-gray-400 mb-6">
              Transformando a vida de estudantes desde 2020
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-gray-400">
              <span>© 2024 TécnicasEstudo. Todos os direitos reservados.</span>
              <span>•</span>
              <span>Política de Privacidade</span>
              <span>•</span>
              <span>Termos de Uso</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}