import { useEffect, useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight, Instagram, MapPin, Phone, ChefHat, Coffee, Heart, Cake, Mail, Facebook, Menu as MenuIcon, X, MessageCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Lenis from 'lenis';
import { CONTACT_INFO, MESSAGES, FORMSPREE_URL } from './config';

// --- LOADING SCREEN ---
const LoadingScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-pink"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center flex flex-col items-center px-4"
      >
        <Cake className="h-20 w-20 md:h-24 md:w-24 text-brand-gold animate-bounce" />
        <div className="mt-8 h-1 w-32 overflow-hidden rounded-full bg-white/30 mx-auto">
          <motion.div
            className="h-full bg-brand-gold"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const PRODUCTS = [
  { id: 1, name: "Red Velvet Premium", category: "Bolos", price: "R$ 120", img: "https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?q=80&w=800&auto=format&fit=crop" },
  { id: 2, name: "Macarons Franceses", category: "Doces", price: "R$ 65", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=800&auto=format&fit=crop" },
  { id: 3, name: "Cheesecake de Frutas", category: "Tortas", price: "R$ 95", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800&auto=format&fit=crop" },
  { id: 4, name: "Cupcake de Chocolate", category: "Doces", price: "R$ 15", img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?q=80&w=800&auto=format&fit=crop" },
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [email, setEmail] = useState('');

  const lenisRef = useRef(null);

  // --- RESET DE SCROLL E RESOLUÇÃO ---
  useLayoutEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  // --- CONFIGURAÇÃO DO LENIS ---
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;
    lenis.scrollTo(0, { immediate: true });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  // --- FUNÇÃO DE SCROLL BLINDADA (CORRIGIDA PARA INÍCIO) ---
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();

    // 1. Correção Específica para o Início
    if (sectionId === '#inicio') {
      if (lenisRef.current) {
        // Rola para o pixel 0 (Topo Absoluto)
        lenisRef.current.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
      return; // Encerra aqui para não buscar ID
    }

    // 2. Lógica normal para as outras seções
    const element = document.querySelector(sectionId);
    if (!element) return;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(element, {
        offset: 0,
        duration: 1.5,
      });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }

    setIsMobileMenuOpen(false);
  };

  const { scrollY } = useScroll();
  const yHero = useTransform(scrollY, [0, 500], [0, 150]);
  const rotateHero = useTransform(scrollY, [0, 500], [0, 10]);
  const yAbout = useTransform(scrollY, [0, 800], [0, -50]);

  const handleWhatsApp = () => {
    const url = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(MESSAGES.order)}`;
    window.open(url, '_blank');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (FORMSPREE_URL.includes("SEU_CODIGO_AQUI")) {
      alert(`Simulação: O e-mail ${email} foi cadastrado!`);
      setEmail('');
    } else {
      e.target.submit();
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = activeCategory === 'Todos' ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Ely Doces | Confeitaria Artesanal </title>
        <meta name="description" content="Bolos artísticos e doces finos em São Paulo." />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#FDFBF7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </Helmet>

      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen />}
      </AnimatePresence>

      <div className="font-sans text-brand-black selection:bg-brand-gold selection:text-white bg-brand-cream">

        {/* BOTÃO ZAP */}
        <motion.div
          className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2 }}
        >
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3, duration: 0.5 }} className="bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 mb-1 relative hidden md:block">
            <p className="text-sm font-bold text-gray-700 font-sans">Faça seu pedido online! 🍰</p>
            <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white transform rotate-45 border-b border-r border-gray-100"></div>
          </motion.div>
          <button onClick={handleWhatsApp} className="group relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-all duration-300 hover:scale-110 hover:shadow-[0_15px_40px_rgb(37,211,102,0.6)] cursor-pointer">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-30 duration-1000"></span>
            <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm border-2 border-white z-10 animate-bounce">1</span>
            <MessageCircle className="h-8 w-8 fill-current relative z-10" />
          </button>
        </motion.div>

        {/* NAVBAR */}
        <nav className="fixed left-0 top-0 z-[60] w-full px-4 py-4 md:py-6 transition-all duration-300 pointer-events-none">
          <div className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-white/20 bg-white/80 px-6 py-3 backdrop-blur-md shadow-sm pointer-events-auto">

            <a href="#inicio" onClick={(e) => scrollToSection(e, '#inicio')} className="cursor-pointer">
              <h1 className="font-display text-xl md:text-2xl font-bold tracking-tight text-brand-black">
                ely<span className="text-brand-gold">.</span>doces
              </h1>
            </a>

            <div className="hidden gap-8 font-medium text-sm md:flex font-sans">
              {['Início', 'Menu', 'Sobre', 'Contato'].map((item) => {
                const id = `#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`;
                return (
                  <a key={item} href={id} onClick={(e) => scrollToSection(e, id)} className="hover:text-brand-gold transition-colors cursor-pointer">{item}</a>
                )
              })}
            </div>

            <div className="hidden md:block">
              <button onClick={handleWhatsApp} className="rounded-full bg-brand-black px-5 py-2 text-xs font-bold text-white transition-transform hover:scale-105 hover:bg-brand-gold hover:text-brand-black uppercase tracking-wide font-display">Fazer Pedido</button>
            </div>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden text-brand-black p-1">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div initial={{ opacity: 0, y: -20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} className="absolute top-20 left-4 right-4 rounded-3xl bg-white p-6 shadow-2xl md:hidden border border-gray-100 pointer-events-auto z-[70]">
                <div className="flex flex-col gap-4 text-center font-display text-xl">
                  {['Início', 'Menu', 'Sobre', 'Contato'].map((item) => {
                    const id = `#${item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")}`;
                    return (
                      <a key={item} href={id} onClick={(e) => scrollToSection(e, id)} className="py-2 hover:text-brand-gold transition-colors cursor-pointer">{item}</a>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* 1. HERO - ID="inicio" */}
        <section id="inicio" className="sticky top-0 z-10 flex h-[100vh] items-center justify-center overflow-hidden bg-brand-cream px-4 shadow-xl border-b border-black/5">
          <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 md:gap-16 lg:grid-cols-2 pt-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6 text-center lg:text-left z-10 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-brand-black/5 bg-white px-3 py-1 md:px-4 md:py-1.5 shadow-sm">
                <Star className="h-3 w-3 fill-brand-gold text-brand-gold" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-black/60 font-sans">Alta Confeitaria</span>
              </div>
              <h2 className="font-display text-4xl leading-[1.1] md:text-6xl lg:text-7xl xl:text-8xl tracking-tight text-brand-black efeito-texto">
                Doçura em <br /><span className="text-brand-gold">Cada Detalhe.</span>
              </h2>
              <p className="mx-auto max-w-md text-base md:text-lg leading-relaxed text-gray-600 lg:mx-0 px-2 md:px-0 font-sans efeito-texto">
                Transformamos ingredientes nobres em memórias inesquecíveis. Bolos artísticos e doces finos.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row lg:justify-start pb-4 md:pb-0">
                <button onClick={(e) => scrollToSection(e, '#menu')} className="w-full sm:w-auto group flex items-center justify-center gap-2 rounded-full bg-brand-gold px-8 py-4 text-brand-black shadow-lg shadow-brand-gold/30 transition-all active:scale-95 hover:bg-brand-black hover:text-white font-display text-sm cursor-pointer">
                  <span>Ver Cardápio</span>
                  <ShoppingBag className="h-4 w-4 transition-transform group-hover:-translate-y-1 group-hover:rotate-12" />
                </button>
              </div>
            </motion.div>

            <motion.div
              style={{ y: yHero, rotate: rotateHero }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: isLoading ? 0 : 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative flex justify-center z-0 order-1 lg:order-2"
            >
              <div className="absolute top-1/2 left-1/2 -z-10 h-[280px] w-[280px] md:h-[500px] md:w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-gold/10 blur-[60px] md:blur-[100px]" />
              <div className="animate-float relative aspect-[4/5] w-64 md:w-full max-w-md overflow-hidden rounded-[2rem] shadow-2xl mx-auto border-4 border-white/50">
                <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=987&auto=format&fit=crop" alt="Bolo Artesanal" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* 2. SOBRE */}
        <section id="sobre" className="sticky top-0 z-20 flex h-[100vh] items-center bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[3rem] px-4 pt-20 border-t border-gray-100 efeito-lateral">
          <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-12 items-center w-full">
            <div className="relative order-2 lg:order-1 hidden md:block">
              <motion.div style={{ y: yAbout }} className="grid grid-cols-2 gap-4">
                <img src="https://images.unsplash.com/photo-1516919549054-e08258825f80?q=80&w=800&auto=format&fit=crop" className="rounded-3xl object-cover h-64 w-full translate-y-8 shadow-lg efeito-imagem" />
                <img src="https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop" className="rounded-3xl object-cover h-64 w-full shadow-lg efeito-imagem" />
              </motion.div>
            </div>

            <div className="order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-2 text-brand-gold">
                <ChefHat className="h-6 w-6" />
                <span className="font-display font-bold text-sm uppercase tracking-widest">Nossa História</span>
              </div>
              <h3 className="font-display text-3xl md:text-5xl text-brand-black leading-tight efeito-texto">A arte de confeitar com amor.</h3>
              <p className="text-gray-600 leading-relaxed text-sm md:text-base font-sans efeito-texto">Na Ely Doces, acreditamos que cada doce conta uma história. Começamos na pequena cozinha de casa e hoje levamos sabor e sofisticação.</p>
              <ul className="space-y-4 pt-4 font-sans">
                {['Ingredientes 100% Naturais', 'Chocolates Importados', 'Receitas Exclusivas'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 efeito-texto">
                    <div className="h-2 w-2 rounded-full bg-brand-gold shrink-0" />
                    <span className="font-medium text-brand-black text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* 3. MENU */}
        <section id="menu" className="sticky top-0 z-30 flex h-[100vh] items-center bg-brand-cream shadow-[0_-20px_50px_rgba(0,0,0,0.15)] rounded-t-[3rem] px-4 pt-20 border-t border-brand-black/5">
          <div className="mx-auto max-w-7xl w-full h-full flex flex-col">
            <div className="text-center mb-8 pt-4">
              <h3 className="font-display text-3xl md:text-5xl mb-4 efeito-texto">Nossas Criações</h3>
              <p className="text-gray-600 text-sm md:text-base font-sans efeito-texto">Explore nossa seleção de sabores</p>
              <div className="mt-6 flex gap-3 overflow-x-auto pb-4 md:justify-center md:pb-0 scrollbar-hide">
                {['Todos', 'Bolos', 'Doces', 'Tortas'].map((cat) => (
                  <button key={cat} onClick={() => setActiveCategory(cat)} className={`whitespace-nowrap px-6 py-2 rounded-full text-xs md:text-sm font-bold font-display transition-all ${activeCategory === cat ? 'bg-brand-black text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-gray-100'}`}>{cat}</button>
                ))}
              </div>
            </div>

            <div className="flex-grow overflow-y-auto pb-24 px-2">
              <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pb-10">
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div onClick={handleWhatsApp} layout initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} key={product.id} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer active:scale-95 border border-gray-50">
                      <div className="h-48 md:h-56 overflow-hidden">
                        <img src={product.img} alt={product.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      </div>
                      <div className="p-5">
                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-wider mb-2 font-display">{product.category}</p>
                        <h4 className="font-display text-lg mb-2 leading-tight">{product.name}</h4>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-bold text-base md:text-lg font-sans text-brand-black">{product.price}</span>
                          <button className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-brand-black transition-colors group-hover:bg-brand-gold group-hover:text-white"><ArrowRight className="h-4 w-4" /></button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 4. FOOTER */}
        <section id="contato" className="sticky top-0 z-40 flex h-[100vh] flex-col justify-center bg-brand-black text-brand-cream shadow-[0_-20px_50px_rgba(0,0,0,0.2)] rounded-t-[3rem] px-4 pt-20 border-t border-white/10">
          <div className="pt-8 pb-8 px-6 border-b border-white/10 shrink-0">
            <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
              <div className="flex flex-col items-center gap-3 group hover:scale-105 transition-transform"><div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold"><Coffee className="h-6 w-6" /></div><h4 className="font-display text-xl text-white">Feito no Dia</h4></div>
              <div className="flex flex-col items-center gap-3 group hover:scale-105 transition-transform"><div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold"><Heart className="h-6 w-6" /></div><h4 className="font-display text-xl text-white">Artesanal</h4></div>
              <div className="flex flex-col items-center gap-3 group hover:scale-105 transition-transform"><div className="p-3 rounded-full bg-brand-gold/10 text-brand-gold"><Star className="h-6 w-6" /></div><h4 className="font-display text-xl text-white">Premium</h4></div>
            </div>
          </div>

          <footer className="flex-grow flex flex-col justify-center px-6 py-8">
            <div className="mx-auto max-w-7xl w-full">
              <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-end mb-12">
                <div><h2 className="font-display text-4xl md:text-6xl text-white leading-tight mb-4 efeito-texto">Vamos tornar seu dia mais <span className="text-brand-gold italic font-serif">doce</span>?</h2></div>
                <div className="w-full">
                  <label className="text-xs uppercase tracking-widest text-brand-gold mb-4 block font-display">Newsletter</label>
                  <form action={FORMSPREE_URL} method="POST" onSubmit={handleNewsletterSubmit} className="flex border-b border-white/20 pb-2"><input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Seu e-mail" className="bg-transparent w-full text-white placeholder-gray-600 focus:outline-none font-display text-lg md:text-xl" required /><button type="submit" className="text-white hover:text-brand-gold transform hover:translate-x-1 transition-transform"><ArrowRight /></button></form>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-10 border-t border-white/10 pt-8">
                <div className="col-span-1 md:col-span-1"><span className="text-2xl font-display font-bold text-white tracking-tight">ely<span className="text-brand-gold">.</span>doces</span></div>
                <div className="space-y-4"><h4 className="text-brand-gold font-display font-bold text-sm uppercase tracking-wider">Contato</h4><ul className="space-y-2 text-gray-400 text-sm font-sans"><li onClick={handleWhatsApp} className="flex items-center gap-2 cursor-pointer hover:text-white"><Phone className="h-3 w-3" /> (11) 9199150-7786</li><li className="flex items-center gap-2"><MapPin className="h-3 w-3" /> Belém, PA</li><li className="flex items-center gap-2 break-all"><Mail className="h-3 w-3 shrink-0" /> {CONTACT_INFO.email}</li></ul></div>
                <div className="space-y-4"><h4 className="text-brand-gold font-display font-bold text-sm uppercase tracking-wider">Social</h4><div className="flex gap-4"><a href={CONTACT_INFO.instagram} target="_blank" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-black transition-colors"><Instagram className="h-5 w-5" /></a><a href="#" className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-black transition-colors"><Facebook className="h-5 w-5" /></a></div></div>
              </div>
              <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 text-center md:text-left font-sans"><p>&copy; 2026 Ely Doces. Todos os direitos reservados.</p></div>
            </div>
          </footer>
        </section>
      </div>
    </>
  );
}

export default App;