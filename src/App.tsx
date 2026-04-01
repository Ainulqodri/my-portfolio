import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ImageProfil from './images/profil.jpg';
import ImageInventori from './images/sistem_inventori.PNG';
import ImageAbout from './images/about.jpg';
import { 
  Github, 
  Linkedin, 
  Instagram, 
  Mail, 
  MessageSquare, 
  ExternalLink, 
  Code2, 
  Database, 
  Layout, 
  Cpu,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Phone
} from 'lucide-react';

// --- Constants & Data ---

const TECH_STACK = [
  { name: 'PHP', icon: <Code2 className="w-6 h-6" />, category: 'Backend' },
  { name: 'Laravel', icon: <Cpu className="w-6 h-6" />, category: 'Framework' },
  { name: 'Tailwind CSS', icon: <Layout className="w-6 h-6" />, category: 'Frontend' },
  { name: 'Alpine.js', icon: <Layout className="w-6 h-6" />, category: 'Frontend' },
  { name: 'Livewire', icon: <Layout className="w-6 h-6" />, category: 'Frontend' },
  { name: 'MySQL', icon: <Database className="w-6 h-6" />, category: 'Database' },
  { name: 'Python', icon: <Code2 className="w-6 h-6" />, category: 'Data Science' },
  { name: 'Streamlit', icon: <Layout className="w-6 h-6" />, category: 'Data Science' },
  { name: 'Machine Learning', icon: <Cpu className="w-6 h-6" />, category: 'AI' },
];

const PROJECTS = [
  {
    title: "Sistem Reservasi Futsal Otomatis",
    description: "Aplikasi full-stack yang dirancang untuk mengotomatisasi manajemen penyewaan lapangan futsal. Klien tidak perlu lagi mencatat manual.",
    features: "Integrasi payment gateway Midtrans dan notifikasi otomatis via WhatsApp API.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    link: "https://github.com/Ainulqodri/sistem-reservasi-futsal.git",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sistem Inventaris B2B",
    description: "Aplikasi full-stack yang dirancang untuk mengotomatisasi manajemen inventaris produk B2B.",
    features: "Integrasi dengan sistem ERP untuk sinkronisasi data real-time.",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "Alpine.js"],
    link: "https://github.com/Ainulqodri/sistem-inventaris-barang.git",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Aplikasi Prediksi Analisis Sentimen",
    description: "Platform analisis data interaktif untuk mengklasifikasikan sentimen publik menggunakan LSTM.",
    features: "Antarmuka visualisasi data menggunakan Streamlit, pemrosesan bahasa alami (NLP).",
    tech: ["Python", "Streamlit", "LSTM"],
    link: "https://github.com/Ainulqodri/Analisis-sentimen-naturalisasi-streamlit.git",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Sport Apparel Catalog",
    description: "Sistem katalog web untuk menampilkan dan mengelola produk apparel olahraga.",
    features: "Headless CMS integration for dynamic content management.",
    tech: ["Contentful", "Tencent EdgeOne"],
    link: "https://github.com/Ainulqodri/jerseywebsite.git",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800"
  }
];

// --- Components ---

// Komponen Alternatif untuk Typing Animation karena library eksternal bermasalah
const TypingEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const resetTimeout = setTimeout(() => {
        setDisplayText('');
        setIndex(0);
      }, 3000);
      return () => clearTimeout(resetTimeout);
    }
  }, [index, text]);

  return <span>{displayText}<span className="animate-pulse">|</span></span>;
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleNavClick = (href) => {
    setIsOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-900/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-white tracking-tighter">
          AQ<span className="text-emerald-500">.</span>
        </a>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-800 border-b border-slate-700 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-lg font-medium text-slate-300 hover:text-emerald-400 text-left"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-zinc-900 px-6 scroll-mt-24">
      <div className="text-center flex flex-col items-center max-w-xl">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative mb-6 group"
        >
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>
          <div className="relative w-40 h-40 rounded-full border-2 border-zinc-700 grayscale group-hover:grayscale-0 transition duration-500 overflow-hidden bg-slate-800 flex items-center justify-center">
             <span className="text-slate-500 text-xs text-center px-4 italic"><img src={ImageProfil} className="w-full h-full object-cover" alt="Profile" /></span>
          </div>
        </motion.div>

        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3 h-10">
          <TypingEffect text="Halo, Saya Ainul Qodri 👋" />
        </h1>

        <h2 className="text-lg md:text-xl font-medium text-emerald-400 mb-2">
          Fullstack Web Developer
        </h2>

        <p className="text-gray-400 mb-8">
          Membangun aplikasi web modern, cepat, dan terukur.
        </p>

        <motion.a
          href="#portfolio"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-7 py-3 font-semibold rounded-lg border border-emerald-400 overflow-hidden group mb-6 text-emerald-500 transition-colors hover:text-zinc-900"
        >
          <span className="relative z-10">Lihat Portfolio</span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </motion.a>

        <div className="flex gap-6">
          <motion.a href="#" whileHover={{ y: -4, scale: 1.1 }} className="text-gray-400 hover:text-white transition"><Github size={24} /></motion.a>
          <motion.a href="#" whileHover={{ y: -4, scale: 1.1 }} className="text-gray-400 hover:text-blue-400 transition"><Linkedin size={24} /></motion.a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-950 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border-2 border-slate-800 bg-slate-900 flex items-center justify-center">
               <span className="text-slate-700 italic"><img src={ImageAbout} className="w-full h-full object-cover" alt="About" /></span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-500/10 -z-10 rounded-full blur-2xl"></div>
          </motion.div>

          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 30 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Siapa Saya?</h2>
            <h3 className="text-4xl font-bold text-white mb-6">Halo, saya Ainul Qodri.</h3>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>Seorang Web Developer dengan gelar Sarjana Informatika yang berfokus pada ekosistem pengembangan modern.</p>
              <p>Sebagai seorang freelancer, pendekatan saya sederhana: memahami alur bisnis klien, merancang arsitektur yang efisien, dan menulis kode yang bersih.</p>
            </div>
            
            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-1">3+</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Tahun Pengalaman</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-3xl font-bold text-white mb-1">5+</div>
                <div className="text-sm text-slate-500 uppercase tracking-wider">Proyek Selesai</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-slate-900 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Tech Stack</h2>
          <h3 className="text-4xl font-bold text-white">Keahlian Utama</h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={tech.name}
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, backgroundColor: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}
              className="p-6 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center transition-all group"
            >
              <div className="text-slate-400 group-hover:text-emerald-400 transition-colors mb-4">{tech.icon}</div>
              <div className="text-white font-semibold mb-1">{tech.name}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{tech.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Fungsi untuk mengecek posisi scroll dengan logika yang lebih ketat
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      
      // Menggunakan Math.floor untuk menghindari isu sub-pixel
      // Tombol kiri HANYA tampil jika scrollLeft benar-benar lebih dari 10px
      const leftVisible = Math.floor(scrollLeft) > 10;
      setCanScrollLeft(leftVisible); 
      
      // Tombol kanan hilang jika sudah sampai ujung
      const isAtEnd = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10;
      setCanScrollRight(!isAtEnd);
    }
  };

  useEffect(() => {
    // Jalankan pengecekan setelah mount dan pastikan canScrollLeft false di awal
    setCanScrollLeft(false);
    const timeout = setTimeout(checkScrollPosition, 100);
    
    window.addEventListener('resize', checkScrollPosition);
    return () => {
      window.removeEventListener('resize', checkScrollPosition);
      clearTimeout(timeout);
    };
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth > 768 ? clientWidth / 3 : clientWidth / 1.2;
      const scrollTo = direction === 'left' 
        ? scrollRef.current.scrollLeft - scrollAmount 
        : scrollRef.current.scrollLeft + scrollAmount;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
      
      // Cek posisi lagi setelah animasi scroll kemungkinan selesai
      setTimeout(checkScrollPosition, 500);
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-slate-950 scroll-mt-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4 text-center md:text-left">Karya Saya</h2>
          <h3 className="text-4xl font-bold text-white text-center md:text-left">Portofolio Proyek</h3>
        </div>

        <div className="relative group">
          {/* TOMBOL PREV - Menggunakan AnimatePresence untuk kontrol keberadaan elemen */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.div 
                key="prev-btn-unique"
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: -10 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 hidden md:block"
              >
                <button 
                  onClick={() => scroll('left')} 
                  className="p-4 rounded-full bg-slate-900/95 backdrop-blur-md text-emerald-500 border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-2xl hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* TOMBOL NEXT */}
          <AnimatePresence>
            {canScrollRight && (
              <motion.div 
                key="next-btn-unique"
                initial={{ opacity: 0, scale: 0.8, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, x: 10 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 hidden md:block"
              >
                <button 
                  onClick={() => scroll('right')} 
                  className="p-4 rounded-full bg-slate-900/95 backdrop-blur-md text-emerald-500 border border-slate-700 hover:bg-emerald-500 hover:text-slate-950 transition-all shadow-2xl hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* CONTAINER PROYEK */}
          <div 
            ref={scrollRef} 
            onScroll={checkScrollPosition}
            className="flex gap-6 md:gap-8 overflow-x-auto pb-10 no-scrollbar snap-x snap-mandatory scroll-smooth px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="snap-start shrink-0 w-[85%] md:w-[45%] lg:w-[31%] bg-slate-900 rounded-3xl border border-slate-800 overflow-hidden flex flex-col group/card hover:border-emerald-500/50 transition-all duration-500 shadow-xl"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                    {project.tech[0]}
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-white mb-3 group-hover/card:text-emerald-400 transition-colors">{project.title}</h4>
                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">{project.description}</p>
                  <div className="mt-auto pt-6 border-t border-slate-800/50">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between text-sm font-bold text-white group-hover/card:text-emerald-400 transition-all">
                      Lihat Detail <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* NAVIGASI MOBILE */}
          <div className="flex md:hidden justify-center gap-4 mt-4">
            <button 
              onClick={() => scroll('left')} 
              disabled={!canScrollLeft}
              className={`p-3 rounded-full bg-slate-900 border border-slate-800 transition-all ${canScrollLeft ? 'text-emerald-500 opacity-100' : 'text-slate-700 opacity-20 scale-90'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={() => scroll('right')} 
              disabled={!canScrollRight}
              className={`p-3 rounded-full bg-slate-900 border border-slate-800 transition-all ${canScrollRight ? 'text-emerald-500 opacity-100' : 'text-slate-700 opacity-20 scale-90'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 relative scroll-mt-24 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div whileInView={{ opacity: 1, scale: 1 }} initial={{ opacity: 0, scale: 0.95 }} viewport={{ once: true }}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ayo Berdiskusi</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <a href="#" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Linkedin className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">LinkedIn</div>
            </a>
            <a href="mailto:ainulqodricr7@gmail.com" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Mail className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">Email</div>
            </a>
            <a href="#" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Instagram className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">Instagram</div>
            </a>
            <a href="https://wa.me/6285659747970" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Phone className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">WhatsApp</div>
            </a>
          </div>
          <a href="https://wa.me/6285659747970" className="inline-flex items-center px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-full transition-all transform hover:scale-105">
            Kirim Pesan Sekarang <MessageSquare className="ml-3 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
        <div className="text-xl font-bold text-white">AQ<span className="text-emerald-500">.</span></div>
        <div>© {new Date().getFullYear()} Ainul Qodri.</div>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white"><Github className="w-5 h-5" /></a>
          <a href="#" className="hover:text-white"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-emerald-500/30 selection:text-emerald-400">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}