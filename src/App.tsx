import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  Dna, 
  Cpu, 
  Settings, 
  Calendar, 
  Star, 
  MapPin, 
  Phone, 
  Mail, 
  Linkedin, 
  Instagram,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Activity,
  Target,
  Zap,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from './contexts/ThemeContext';
import FormInput from './components/FormInput';
import Notification from './components/Notification';
import LoadingSpinner from './components/LoadingSpinner';
import { testimonials } from './data/testimonials';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
    isVisible: boolean;
  }>({
    type: 'success',
    message: '',
    isVisible: false
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message,
      isVisible: true
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      showNotification('error', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showNotification('error', 'Por favor, insira um e-mail válido.');
      return;
    }

    // Validação de telefone
    const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!phoneRegex.test(formData.phone)) {
      showNotification('error', 'Por favor, insira um número de WhatsApp válido.');
      return;
    }

    try {
      setIsLoading(true);
      
      // Simulando uma chamada de API com 7 segundos de delay
      await new Promise(resolve => setTimeout(resolve, 7000));
      
      setIsLoading(false);
      showNotification('success', 'Mensagem enviada com sucesso! Em breve entraremos em contato.');
      
      // Limpar o formulário
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      setIsLoading(false);
      showNotification('error', 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-slate-800 dark:bg-dark-bg dark:text-dark-text transition-colors duration-200">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-semibold text-slate-800 dark:text-dark-text tracking-tight">Dr. Claudio Fher</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#sobre" className="text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Sobre</a>
                <a href="#servicos" className="text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Serviços</a>
                <a href="#abordagem" className="text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Abordagem</a>
                <a href="#depoimentos" className="text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Depoimentos</a>
                <a href="#contato" className="bg-primary text-slate-800 dark:text-dark-surface px-6 py-2 rounded-lg font-medium hover:bg-primary-dark transform hover:scale-105 transition-all duration-200">Contato</a>
                <button
                  onClick={toggleTheme}
                  className="p-2 text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200 ml-2"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#sobre" className="block px-3 py-2 text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Sobre</a>
              <a href="#servicos" className="block px-3 py-2 text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Serviços</a>
              <a href="#abordagem" className="block px-3 py-2 text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Abordagem</a>
              <a href="#depoimentos" className="block px-3 py-2 text-slate-600 dark:text-dark-text-secondary hover:text-primary dark:hover:text-primary transition-colors duration-200">Depoimentos</a>
              <a href="#contato" className="block px-3 py-2 bg-primary text-slate-800 dark:text-dark-surface rounded-lg font-medium mt-2">Contato</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className={`lg:col-span-6 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1a1d24] dark:text-dark-text mb-6 leading-tight tracking-tight" style={{letterSpacing: '-0.02em'}}>
                Engenharia a Serviço da Vida.{' '}
                <span className="text-primary">Medicina para o seu Futuro.</span>
              </h1>
              <p className="text-xl text-slate-600 dark:text-dark-text-secondary mb-8 leading-relaxed">
                Soluções médicas de vanguarda, projetadas com a precisão da bioengenharia para restaurar sua máxima performance e bem-estar.
              </p>
              <button className="bg-primary text-[#1a1d24] dark:text-dark-surface px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-dark transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
                <Calendar className="inline-block mr-2" size={20} />
                Agende uma Avaliação Inovadora
              </button>
            </div>
            <div className={`lg:col-span-6 mt-10 lg:mt-0 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-[#3a7bd5] rounded-2xl transform rotate-6 opacity-20"></div>
                <img 
                  src="https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=600&h=800"
                  alt="Dr. Claudio Fher"
                  className="relative rounded-2xl shadow-2xl w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="py-20 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1d24] dark:text-dark-text mb-6 tracking-tight" style={{letterSpacing: '-0.02em'}}>
              Dr. Claudio Fher: <span className="text-primary">Médico por vocação, Bioengenheiro por paixão.</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Uma jornada única que conecta a empatia da medicina com a precisão da engenharia, 
              criando soluções inovadoras para resolver os problemas mais complexos de saúde e bem-estar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-surface shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Dna className="text-[#1a1d24] dark:text-dark-surface" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-4">Medicina Regenerativa</h3>
              <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                Terapias celulares avançadas para regeneração tecidual e restauração funcional completa.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-surface shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-[#3a7bd5] rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Cpu className="text-white dark:text-dark-text" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-4">Diagnóstico de Precisão</h3>
              <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                Análises computacionais avançadas para diagnósticos mais precisos e tratamentos direcionados.
              </p>
            </div>

            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-dark-bg dark:to-dark-surface shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Settings className="text-[#1a1d24] dark:text-dark-surface" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-4">Soluções Personalizadas</h3>
              <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                Dispositivos e protocolos únicos, desenvolvidos especificamente para cada paciente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicos" className="py-20 bg-[#1a1d24] dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white dark:text-dark-text mb-6 tracking-tight" style={{letterSpacing: '-0.02em'}}>
              Tratamentos <span className="text-[#00f0c4]">Projetados para Você</span>
            </h2>
            <p className="text-lg text-gray-300 dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Cada solução é meticulosamente desenvolvida combinando conhecimento médico avançado 
              com tecnologia de bioengenharia de última geração.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group relative p-6 rounded-2xl bg-white/5 dark:bg-dark-surface/5 backdrop-blur-sm border border-white/10 dark:border-dark-border hover:bg-white/10 dark:hover:bg-dark-surface/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#00f0c4] rounded-xl flex items-center justify-center mb-4">
                <Dna className="text-[#1a1d24] dark:text-dark-surface" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white dark:text-dark-text mb-3">Terapia Regenerativa Celular</h3>
              <p className="text-gray-300 dark:text-dark-text-secondary text-sm leading-relaxed mb-4">
                Regeneração tecidual avançada usando células-tronco e fatores de crescimento bioengenheirados.
              </p>
              <button className="text-[#00f0c4] text-sm font-medium hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100">
                Saiba mais <ArrowRight className="inline-block ml-1" size={14} />
              </button>
            </div>

            <div className="group relative p-6 rounded-2xl bg-white/5 dark:bg-dark-surface/5 backdrop-blur-sm border border-white/10 dark:border-dark-border hover:bg-white/10 dark:hover:bg-dark-surface/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#3a7bd5] rounded-xl flex items-center justify-center mb-4">
                <Activity className="text-white dark:text-dark-text" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white dark:text-dark-text mb-3">Análise Biomecânica Computadorizada</h3>
              <p className="text-gray-300 dark:text-dark-text-secondary text-sm leading-relaxed mb-4">
                Avaliação 3D completa do movimento e função corporal com tecnologia de captura avançada.
              </p>
              <button className="text-[#00f0c4] text-sm font-medium hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100">
                Saiba mais <ArrowRight className="inline-block ml-1" size={14} />
              </button>
            </div>

            <div className="group relative p-6 rounded-2xl bg-white/5 dark:bg-dark-surface/5 backdrop-blur-sm border border-white/10 dark:border-dark-border hover:bg-white/10 dark:hover:bg-dark-surface/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#00f0c4] rounded-xl flex items-center justify-center mb-4">
                <Target className="text-[#1a1d24] dark:text-dark-surface" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white dark:text-dark-text mb-3">Dispositivos Médicos Sob Medida</h3>
              <p className="text-gray-300 dark:text-dark-text-secondary text-sm leading-relaxed mb-4">
                Próteses e dispositivos personalizados desenvolvidos com modelagem 3D e materiais biocompatíveis.
              </p>
              <button className="text-[#00f0c4] text-sm font-medium hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100">
                Saiba mais <ArrowRight className="inline-block ml-1" size={14} />
              </button>
            </div>

            <div className="group relative p-6 rounded-2xl bg-white/5 dark:bg-dark-surface/5 backdrop-blur-sm border border-white/10 dark:border-dark-border hover:bg-white/10 dark:hover:bg-dark-surface/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-[#3a7bd5] rounded-xl flex items-center justify-center mb-4">
                <Zap className="text-white dark:text-dark-text" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-white dark:text-dark-text mb-3">Otimização Metabólica com Bio-sensores</h3>
              <p className="text-gray-300 dark:text-dark-text-secondary text-sm leading-relaxed mb-4">
                Monitoramento contínuo e otimização metabólica através de sensores inteligentes e IA.
              </p>
              <button className="text-[#00f0c4] text-sm font-medium hover:text-white transition-colors duration-200 opacity-0 group-hover:opacity-100">
                Saiba mais <ArrowRight className="inline-block ml-1" size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section id="abordagem" className="py-20 bg-white dark:bg-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1d24] dark:text-dark-text mb-6 tracking-tight" style={{letterSpacing: '-0.02em'}}>
              Nossa Abordagem: <span className="text-[#00f0c4]">Precisa, Preditiva, Personalizada</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Um processo metodológico que combina análise científica rigorosa com cuidado humano individualizado.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-[#00f0c4] to-[#3a7bd5] dark:from-primary dark:to-primary"></div>

              {/* Timeline items */}
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#00f0c4] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-[#1a1d24] dark:text-dark-surface font-bold text-sm">1</span>
                  </div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-8">
                    <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-3">Análise 360°</h3>
                    <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                      Diagnóstico profundo utilizando exames avançados, análise biomecânica e avaliação genética personalizada.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#3a7bd5] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white dark:text-dark-surface font-bold text-sm">2</span>
                  </div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-8 md:ml-auto">
                    <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-3">Design da Solução</h3>
                    <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                      Desenvolvimento de um plano de tratamento único, combinando terapias convencionais e inovações biotecnológicas.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#00f0c4] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-[#1a1d24] dark:text-dark-surface font-bold text-sm">3</span>
                  </div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pr-8">
                    <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-3">Implementação e Acompanhamento</h3>
                    <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                      Execução precisa do protocolo com monitoramento contínuo através de dispositivos inteligentes.
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="relative flex items-center">
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-[#3a7bd5] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-white dark:text-dark-surface font-bold text-sm">4</span>
                  </div>
                  <div className="ml-16 md:ml-0 md:w-1/2 md:pl-8 md:ml-auto">
                    <h3 className="text-xl font-semibold text-[#1a1d24] dark:text-dark-text mb-3">Otimização Contínua</h3>
                    <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed">
                      Ajustes precisos baseados em dados reais, garantindo evolução constante e resultados superiores.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-dark-bg dark:to-dark-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-[#1a1d24] dark:text-dark-text mb-6 tracking-tight" style={{letterSpacing: '-0.02em'}}>
              A Engenharia que <span className="text-[#00f0c4]">Transforma Vidas</span>
            </h2>
            <p className="text-lg text-slate-600 dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Histórias reais de transformação através da medicina de precisão e bioengenharia avançada.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 px-4">
                    <div className="bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50 dark:border-dark-border">
                      <div className="flex items-center mb-6">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                        <div>
                          <h4 className="font-semibold text-[#1a1d24] dark:text-dark-text">{testimonial.name}</h4>
                          <div className="flex">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-[#00f0c4] fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-slate-600 dark:text-dark-text-secondary leading-relaxed text-lg italic">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm hover:bg-white dark:hover:bg-dark-surface/90 transition-all duration-200 rounded-full p-3 shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 text-[#1a1d24] dark:text-dark-text" />
            </button>
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white/80 dark:bg-dark-surface/80 backdrop-blur-sm hover:bg-white dark:hover:bg-dark-surface/90 transition-all duration-200 rounded-full p-3 shadow-lg"
            >
              <ChevronRight className="w-6 h-6 text-[#1a1d24] dark:text-dark-text" />
            </button>

            {/* Dots indicator */}
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentTestimonial ? 'bg-[#00f0c4]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="py-20 bg-[#1a1d24] dark:bg-dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-semibold text-white dark:text-dark-text mb-6 tracking-tight" style={{letterSpacing: '-0.02em'}}>
              Dê o primeiro passo. <span className="text-primary">Projete sua nova versão.</span>
            </h2>
            <p className="text-lg text-gray-300 dark:text-dark-text-secondary max-w-3xl mx-auto leading-relaxed">
              Inicie sua jornada para uma vida com mais saúde, performance e bem-estar através da medicina de precisão.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white/5 dark:bg-dark-surface/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 dark:border-dark-border">
              <h3 className="text-xl font-semibold text-white dark:text-dark-text mb-6">Agende sua Consulta Inicial</h3>
              <form className="space-y-6" onSubmit={handleFormSubmit}>
                <FormInput
                  type="text"
                  label="Nome Completo"
                  value={formData.name}
                  onChange={(value) => setFormData(prev => ({ ...prev, name: value }))}
                  placeholder="Seu nome completo"
                  required
                  errorMessage="Por favor, insira seu nome completo"
                />
                
                <FormInput
                  type="tel"
                  label="WhatsApp"
                  value={formData.phone}
                  onChange={(value) => setFormData(prev => ({ ...prev, phone: value }))}
                  placeholder="(11) 99999-9999"
                  required
                  errorMessage="Por favor, insira um número de WhatsApp válido"
                />

                <FormInput
                  type="email"
                  label="E-mail"
                  value={formData.email}
                  onChange={(value) => setFormData(prev => ({ ...prev, email: value }))}
                  placeholder="seu@email.com"
                  required
                  errorMessage="Por favor, insira um e-mail válido"
                />

                <div>
                  <label className="block text-sm font-medium text-gray-300 dark:text-dark-text-secondary mb-2">
                    Mensagem
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-dark-surface/10 border border-white/20 dark:border-dark-border rounded-lg text-white dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
                    placeholder="Conte-nos sobre seu caso e objetivos..."
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-primary text-slate-800 dark:text-dark-surface px-6 py-4 rounded-lg font-semibold hover:bg-primary-dark transform hover:scale-105 transition-all duration-200 shadow-lg flex items-center justify-center"
                >
                  <span>Enviar e Iniciar minha Jornada</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white dark:text-dark-text mb-6">Informações de Contato</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <MapPin className="w-6 h-6 text-[#00f0c4] dark:text-dark-surface mr-4" />
                    <div>
                      <p className="text-white dark:text-dark-text font-medium">Clínica de Bioengenharia Médica</p>
                      <p className="text-gray-300 dark:text-dark-text-secondary">Rua da Inovação, 1000 - Vila Madalena</p>
                      <p className="text-gray-300 dark:text-dark-text-secondary">São Paulo, SP - 05449-000</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-[#00f0c4] dark:text-dark-surface mr-4" />
                    <div>
                      <p className="text-white dark:text-dark-text font-medium">(11) 3333-4444</p>
                      <p className="text-gray-300 dark:text-dark-text-secondary">WhatsApp: (11) 99999-8888</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-[#00f0c4] dark:text-dark-surface mr-4" />
                    <div>
                      <p className="text-white dark:text-dark-text font-medium">contato@drfher.com.br</p>
                      <p className="text-gray-300 dark:text-dark-text-secondary">Respondemos em até 24h</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 dark:bg-dark-surface/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 dark:border-dark-border">
                <h4 className="text-lg font-semibold text-white dark:text-dark-text mb-4">Horários de Atendimento</h4>
                <div className="space-y-2 text-gray-300 dark:text-dark-text-secondary">
                  <p>Segunda a Sexta: 8h às 18h</p>
                  <p>Sábado: 8h às 12h</p>
                  <p>Domingo: Emergências</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#00f0c4] to-[#3a7bd5] rounded-2xl p-6 dark:from-primary dark:to-primary">
                <h4 className="text-lg font-semibold text-[#1a1d24] dark:text-dark-surface mb-3">Primeira Consulta</h4>
                <p className="text-[#1a1d24] dark:text-dark-surface mb-4">
                  Avaliação completa de 90 minutos incluindo análise biomecânica computadorizada.
                </p>
               
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f1115] dark:bg-dark-bg py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-semibold text-white dark:text-dark-text mb-2">Dr. Claudio Fher</h3>
              <p className="text-gray-400 dark:text-dark-text-secondary">Medicina de Precisão & Bioengenharia</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 dark:text-dark-text-secondary hover:text-[#00f0c4] transition-colors duration-200">
                <Linkedin size={24} />
              </a>
              <a href="#" className="text-gray-400 dark:text-dark-text-secondary hover:text-[#00f0c4] transition-colors duration-200">
                <Instagram size={24} />
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 dark:border-dark-border mt-8 pt-8 text-center">
            <p className="text-gray-400 dark:text-dark-text-secondary">© 2025 Dr. Claudio Fher. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
      
      <LoadingSpinner isVisible={isLoading} />
      
      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={() => setNotification(prev => ({ ...prev, isVisible: false }))}
      />
    </div>
  );
}

export default App;