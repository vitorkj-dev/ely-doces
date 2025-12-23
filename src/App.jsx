import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Play, ArrowRight, Instagram, Phone, Menu, X, Quote, ChevronLeft, ChevronRight, Award, Leaf, Clock, Mail, Facebook, Linkedin } from 'lucide-react';

// --- DADOS EM REAIS (BRASIL) ---
const menuCategories = [
  { id: 'all', label: 'Todos' },
  { id: 'cakes', label: 'Bolos Assinatura' },
  { id: 'sweets', label: 'Doces Finos' },
  { id: 'gifts', label: 'Presentes' }
];

const allProducts = [
  { id: 1, name: "Red Velvet Royal", price: "R$ 129,90", category: "cakes", img: "https://images.unsplash.com/photo-1616031037011-087000171abe?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Trufa Dark 70%", price: "R$ 8,50", category: "sweets", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Torre de Macarons", price: "R$ 145,00", category: "gifts", img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Torta de Limão Gold", price: "R$ 15,00", category: "sweets", img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Cheesecake Frutos", price: "R$ 22,00", category: "cakes", img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Caixa Degustação", price: "R$ 65,00", category: "gifts", img: "https://images.unsplash.com/photo-1548842790-a35949d26829?q=80&w=600&auto=format&fit=crop" },
];

const testimonials = [
  { id: 1, text: "O melhor bolo que já comi em Belém do Pará. O Red Velvet é simplesmente divino e a apresentação impecável.", author: "Ana Silva", role: "Crítica Gastronômica" },
  { id: 2, text: "Elegância pura. Encomendei para um evento corporativo e impressionou todos os diretores.", author: "Ricardo Mendes", role: "CEO Tech" },
  { id: 3, text: "O cuidado com os detalhes é visível. Desde a embalagem até o sabor equilibrado do chocolate belga.", author: "Sofia Paiva", role: "Influenciadora" },
];

// --- COMPONENTES VISUAIS ---
const FadeInUp = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const GoldSeparator = () => <div className="h-[2px] w-12 bg-[#D4AF37] mb-6"></div>;

// --- SEÇÕES ---

const MenuModal = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const filteredProducts = activeCategory === 'all' ? allProducts : allProducts.filter(p => p.category === activeCategory);

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[#F9F5F0]/95 backdrop-blur-xl overflow-hidden flex flex-col"
        >
          <div className="flex justify-between items-center p-6 md:p-8 border-b border-stone-200">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-[#1A1A1A]">Cardápio</h2>
              <p className="text-[#D4AF37] text-xs font-bold tracking-wider mt-1 uppercase">Seleção Artesanal</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-stone-200 rounded-full transition-colors"><X size={28} /></button>
          </div>
          
          <div className="flex justify-center py-6 bg-white shadow-sm">
            <div className="flex gap-2 overflow-x-auto px-6 no-scrollbar">
              {menuCategories.map(cat => (
                <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
                  className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest transition-all whitespace-nowrap uppercase border ${activeCategory === cat.id ? 'bg-[#1A1A1A] text-[#D4AF37] border-[#1A1A1A]' : 'bg-transparent text-gray-500 border-gray-200 hover:border-[#1A1A1A]'}`}>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-8 no-scrollbar bg-[#F9F5F0]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div layout key={product.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                    className="flex gap-4 items-center p-4 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-stone-100"
                  >
                    <div className="overflow-hidden rounded-xl w-24 h-24">
                      <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg text-[#1A1A1A] leading-tight group-hover:text-[#D4AF37] transition-colors">{product.name}</h3>
                      <p className="text-[#D4AF37] font-bold mt-1 text-md">{product.price}</p>
                      <button className="text-[10px] font-black uppercase tracking-widest mt-2 border-b border-gray-300 pb-0.5 group-hover:border-[#1A1A1A] transition-all">Adicionar</button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const IngredientsSection = () => {
  const items = [
    { icon: Award, title: "Origem Controlada", desc: "Chocolate belga 70% e baunilha de Madagascar." },
    { icon: Clock, title: "Frescor Diário", desc: "Produção limitada e feita no dia da entrega." },
    { icon: Leaf, title: "100% Natural", desc: "Zero conservantes, essências artificiais ou corantes." },
  ];

  return (
    <section className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <FadeInUp>
          <div className="text-center mb-16">
            <span className="text-[#D4AF37] font-bold tracking-[0.2em] text-xs uppercase mb-2 block">Nossa Essência</span>
            <h2 className="font-display text-4xl md:text-5xl text-[#1A1A1A]">Padrão Ely<span className="text-[#D4AF37]">.</span></h2>
          </div>
        </FadeInUp>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-100 pt-12">
          {items.map((item, index) => (
            <FadeInUp key={index} delay={index * 0.2}>
              <div className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 mb-6 rounded-full bg-[#F9F5F0] flex items-center justify-center group-hover:bg-[#1A1A1A] transition-colors duration-500">
                  <item.icon className="w-6 h-6 text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-500" />
                </div>
                <h3 className="font-display text-xl mb-3 text-[#1A1A1A]">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`}}></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <FadeInUp>
          <Quote className="w-16 h-16 text-[#D4AF37] mx-auto mb-10 opacity-40" />
        </FadeInUp>
        <AnimatePresence mode='wait'>
          <motion.div
            key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }}
            className="min-h-[180px]"
          >
            <p className="font-display text-2xl md:text-4xl leading-relaxed mb-8 text-[#F9F5F0] italic">"{testimonials[index].text}"</p>
            <div>
              <p className="text-[#D4AF37] font-bold tracking-widest text-xs uppercase mb-1">{testimonials[index].author}</p>
              <p className="text-gray-500 text-[10px] font-bold tracking-widest uppercase">{testimonials[index].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-4 mt-12">
          <button onClick={prev} className="p-3 rounded-full border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-all"><ChevronLeft size={20} /></button>
          <button onClick={next} className="p-3 rounded-full border border-white/10 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-all"><ChevronRight size={20} /></button>
        </div>
      </div>
    </section>
  );
};

// --- RODAPÉ REDESENHADO (CONTRASTE TOTAL) ---
const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white pt-24 pb-12 relative overflow-hidden">
       {/* Background Glow */}
       <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-white/10">
          
          {/* Coluna 1: Marca e Newsletter */}
          <div className="lg:col-span-5">
            <h2 className="font-display text-5xl text-white mb-6">Ely<span className="text-[#D4AF37]">.</span></h2>
            <p className="text-gray-400 max-w-sm mb-8 font-light leading-relaxed">
              Transformando ingredientes nobres em momentos inesquecíveis. A doçura da vida, elevada ao nível da arte.
            </p>
            
            <div className="max-w-sm">
              <label className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-2 block">Newsletter</label>
              <div className="flex border-b border-white/20 focus-within:border-[#D4AF37] transition-colors pb-2">
                <input type="email" placeholder="Seu melhor e-mail" className="bg-transparent w-full outline-none text-white placeholder-gray-600 text-sm" />
                <button className="text-white hover:text-[#D4AF37] uppercase text-xs font-bold transition-colors">Assinar</button>
              </div>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div className="lg:col-span-3 lg:pl-10">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm text-gray-400 font-medium">
              {['Home', 'Nossa História', 'Cardápio Completo', 'Eventos', 'Contato'].map(item => (
                <li key={item}><a href="#" className="hover:text-white transition-colors flex items-center gap-2 group">
                  <span className="w-0 group-hover:w-2 h-[1px] bg-[#D4AF37] transition-all"></span>{item}
                </a></li>
              ))}
            </ul>
          </div>

          {/* Coluna 3: Contato */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-6">Fale Conosco</h4>
            <p className="text-2xl font-display text-white mb-1 hover:text-[#D4AF37] transition-colors cursor-pointer">contato@elydoce.com.br</p>
            <p className="text-lg text-gray-400 mb-6">+55 11 9199150-7786 </p>
            
            <div className="flex gap-4">
              {[Instagram, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-black transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-xs mt-8">Avenida Bernardo Sayão, 123 - Belém, Pará - PA</p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs font-bold tracking-widest uppercase">
            &copy; 2025 Ely Doces. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs font-bold tracking-widest uppercase flex items-center gap-1">
            Design by <span className="text-[#D4AF37]">Vitor Hugo</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

// --- ESTRUTURA GLOBAL ---
const Navbar = ({ toggleMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <h1 className="font-display text-3xl font-bold tracking-tighter text-[#1A1A1A]">Ely<span className="text-[#D4AF37]">.</span></h1>
        <nav className="hidden md:flex gap-8 text-xs font-bold tracking-[0.15em] text-[#1A1A1A] uppercase">
          <button onClick={toggleMenu} className="hover:text-[#D4AF37] transition-colors relative group">Menu</button>
          <a href="#story" className="hover:text-[#D4AF37] transition-colors relative group">Sobre</a>
          <a href="#testimonials" className="hover:text-[#D4AF37] transition-colors relative group">Clientes</a>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={toggleMenu} className="hidden md:flex items-center gap-2 bg-[#1A1A1A] text-[#D4AF37] px-6 py-3 rounded-full text-[10px] font-bold tracking-[0.2em] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-colors shadow-lg">
            CARDÁPIO
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-[#1A1A1A]">{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-[#F9F5F0] z-40 flex flex-col items-center justify-center gap-8 md:hidden">
             <button onClick={() => { setMenuOpen(false); toggleMenu(); }} className="text-4xl font-display text-[#1A1A1A]">MENU</button>
             <a href="#story" onClick={() => setMenuOpen(false)} className="text-4xl font-display text-[#1A1A1A]">SOBRE</a>
             <a href="#testimonials" onClick={() => setMenuOpen(false)} className="text-4xl font-display text-[#1A1A1A]">CLIENTES</a>
             <button onClick={() => setMenuOpen(false)} className="mt-8 text-sm font-bold tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A]">FECHAR</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = ({ onOpenMenu }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#Fdfdfd]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full z-10">
        <motion.div initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
          <GoldSeparator />
          <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-4 block">Alta Confeitaria</span>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#1A1A1A] leading-[0.95] mb-8">
            Sabor de<br/><span className="italic text-[#D4AF37]">Luxo.</span>
          </h1>
          <p className="text-gray-500 max-w-md mb-12 leading-relaxed font-medium text-lg">
            Bolos artísticos e doces finos para quem exige excelência. Faça do seu momento uma obra de arte.
          </p>
          <div className="flex items-center gap-6 cursor-pointer group" onClick={onOpenMenu}>
            <div className="bg-[#1A1A1A] text-[#D4AF37] w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-[#1A1A1A] transition-all duration-500 shadow-xl">
              <ArrowRight size={24} />
            </div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors">Ver Cardápio</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} className="relative hidden lg:block">
          <div className="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-[120px] transform translate-y-20 scale-90" />
          <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1000&auto=format&fit=crop" alt="Bolo Luxuoso" className="relative w-full h-[650px] object-cover rounded-[100px_0px_100px_0px] shadow-2xl z-10" />
        </motion.div>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="bg-[#1A1A1A] py-8 overflow-hidden whitespace-nowrap relative z-20 border-t border-b border-[#D4AF37]/20">
      <div className="inline-block animate-marquee">
        {[1,2,3,4,5].map((i) => (
          <span key={i} className="text-[#F9F5F0] font-display text-4xl md:text-6xl mx-8 tracking-wider italic opacity-90">
            FEITO À MÃO • CHOCOLATE BELGA • INGREDIENTES NATURAIS • <span className="text-[#D4AF37]">ELY DOCES</span> • 
          </span>
        ))}
      </div>
    </div>
  );
};

const VisualSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section id="story" ref={ref} className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=2000&auto=format&fit=crop")', y }}
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center text-white px-6">
        <FadeInUp>
          <div className="w-20 h-20 mx-auto mb-8 border border-white/30 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-500 cursor-pointer">
             <Play className="w-8 h-8 ml-1" fill="currentColor" />
          </div>
          <h2 className="font-display text-5xl md:text-7xl mb-6">Nossa Arte</h2>
          <p className="max-w-xl mx-auto text-lg font-light tracking-wide text-gray-200">
            Conheça o nosso atelier onde transformamos açúcar em sonhos.
          </p>
        </FadeInUp>
      </div>
    </section>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a href="https://wa.me/" target="_blank" className="fixed bottom-6 right-6 z-50 group" whileHover={{ scale: 1.1 }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }}>
      <span className="absolute inset-0 rounded-full bg-green-500 opacity-40 animate-ping-slow"></span>
      <div className="relative bg-[#25D366] w-14 h-14 rounded-full flex items-center justify-center shadow-xl hover:bg-[#20bd5a] transition-colors">
        <Phone className="text-white w-7 h-7 fill-current" />
      </div>
    </motion.a>
  );
};

// --- APP PRINCIPAL ---
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div className="antialiased bg-white overflow-x-hidden font-sans selection:bg-[#D4AF37] selection:text-black">
      <Navbar toggleMenu={() => setIsMenuOpen(true)} />
      <Hero onOpenMenu={() => setIsMenuOpen(true)} />
      <Marquee />
      <IngredientsSection />
      <VisualSection />
      <Testimonials />
      <Footer />
      <WhatsAppButton />
      <MenuModal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </div>
  );
}

export default App;