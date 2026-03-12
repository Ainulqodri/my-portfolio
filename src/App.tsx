/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
// import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import profile from "./images/profil.jpg";
import about from "./images/about.jpg";
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
    description: "Aplikasi full-stack yang dirancang untuk mengotomatisasi manajemen penyewaan lapangan futsal. Klien tidak perlu lagi mencatat manual; seluruh proses dari pemilihan jadwal hingga pembayaran ditangani oleh sistem.",
    features: "Integrasi payment gateway Midtrans untuk pembayaran instan dan notifikasi otomatis via WhatsApp API.",
    tech: ["Laravel", "Tailwind CSS", "MySQL"],
    link: "https://github.com/Ainulqodri/sistem-reservasi-futsal.git",
    image: "https://picsum.photos/seed/futsal/800/600"
  },
  {
    title: "Aplikasi Prediksi Analisis Sentimen",
    description: "Platform analisis data interaktif untuk mengklasifikasikan sentimen publik (berbasis data Twitter) menggunakan model Deep Learning Long Short-Term Memory (LSTM).",
    features: "Antarmuka visualisasi data yang ramah pengguna menggunakan Streamlit, pemrosesan bahasa alami (NLP).",
    tech: ["Python", "Streamlit", "LSTM"],
    link: "https://github.com/Ainulqodri/Analisis-sentimen-naturalisasi-streamlit.git",
    image: "https://picsum.photos/seed/sentiment/800/600"
  },
  {
    title: "Sport Apparel Catalog",
    description: "Sistem katalog web untuk menampilkan dan mengelola produk apparel olahraga. Dirancang dengan antarmuka yang modern untuk meningkatkan pengalaman berbelanja pengguna.",
    features: "Headless CMS integration for dynamic content management.",
    tech: ["Contentful", "Tencent EdgeOne"],
    link: "https://github.com/Ainulqodri/jerseywebsite.git",
    image: "https://picsum.photos/seed/jersey/800/600"
  }
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

        {/* Desktop Nav */}
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

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
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
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-slate-300 hover:text-emerald-400"
                >
                  {link.name}
                </a>
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
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-zinc-900 px-6"
    >
      <div className="text-center flex flex-col items-center max-w-xl">

        {/* FOTO PROFIL */}
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative mb-6 group"
        >
          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

          <img
            src={profile}
            alt="Ainul Qodri"
            className="relative w-40 h-40 rounded-full border-2 border-zinc-700 grayscale group-hover:grayscale-0 transition duration-500"
          />
        </motion.div>

        {/* TYPING ANIMATION */}
        <h1 className="text-2xl md:text-3xl font-semibold text-white mb-3">
          <TypeAnimation
            sequence={[
              "Halo, Saya Ainul Qodri 👋",
              2000,
              "",
              500,
            ]}
            speed={50}
            repeat={Infinity}
          />
        </h1>

        {/* ROLE */}
        <h2 className="text-lg md:text-xl font-medium text-emerald-400 mb-2">
          Fullstack Web Developer
        </h2>

        {/* DESKRIPSI */}
        <p className="text-gray-400 mb-8">
          Membangun aplikasi web modern, cepat, dan terukur.
        </p>

        {/* CTA BUTTON */}
        <motion.a
          href="#portfolio"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative px-7 py-3 font-semibold rounded-lg 
          border border-emerald-400 overflow-hidden group mb-6 text-emerald-500 transition-colors hover:text-zinc-900"
        >
          <span className="relative z-10">Lihat Portfolio</span>

          {/* Hover gradient animation */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition duration-500"></div>
        </motion.a>

        {/* SOCIAL ICON */}
        <div className="flex gap-6">
          <motion.a
            href="https://github.com/"
            target="_blank"
            whileHover={{ y: -4, scale: 1.1 }}
            className="text-gray-400 hover:text-white transition"
          >
            <Github size={24} />
          </motion.a>

          <motion.a
            href="https://linkedin.com/"
            target="_blank"
            whileHover={{ y: -4, scale: 1.1 }}
            className="text-gray-400 hover:text-blue-400 transition"
          >
            <Linkedin size={24} />
          </motion.a>
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -30 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 border-2 border-slate-800">
              <img 
                src={about} 
                alt="Ainul Qodri" 
                className="w-fit h-fit object-cover"
                referrerPolicy="no-referrer"
              />
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
              <p>
                Seorang Web Developer dengan gelar Sarjana Informatika yang berfokus pada ekosistem pengembangan modern. Saya memiliki spesialisasi dalam membangun aplikasi full-stack yang tidak hanya fungsional secara logika, tetapi juga memiliki antarmuka yang responsif dan elegan.
              </p>
              <p>
                Sebagai seorang freelancer, pendekatan saya sederhana: memahami alur bisnis klien, merancang arsitektur database yang efisien, dan menulis kode yang bersih serta mudah dipelihara.
              </p>
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
    <section id="skills" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Tech Stack & Keahlian</h2>
          <h3 className="text-4xl font-bold text-white">Keahlian Utama yang Saya Tawarkan</h3>
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
              <div className="text-slate-400 group-hover:text-emerald-400 transition-colors mb-4">
                {tech.icon}
              </div>
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
  return (
    <section id="portfolio" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <motion.div
            whileInView={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold text-emerald-500 uppercase tracking-widest mb-4">Portofolio</h2>
            <h3 className="text-4xl font-bold text-white">Proyek Pilihan Terbaru</h3>
          </motion.div>
          <a href="https://github.com/Ainulqodri" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-2 font-medium">
            Lihat Semua di GitHub <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="px-2 py-1 rounded-md bg-slate-800 text-slate-400 text-[10px] font-bold uppercase tracking-wider border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
                
                <h4 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h4>
                
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="mt-auto pt-6 border-t border-slate-800">
                  <div className="text-xs text-slate-500 mb-4 italic">
                    <span className="text-emerald-500 font-bold not-italic">Fitur Kunci:</span> {project.features}
                  </div>
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-bold text-white hover:text-emerald-400 transition-colors"
                  >
                    Lihat Repository <Github className="ml-2 w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Punya Ide Proyek atau Butuh Solusi Teknis?
          </h2>
          <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
            Baik itu membangun sistem informasi perusahaan, mengintegrasikan API pembayaran, atau memperbaiki performa website Anda, saya siap membantu merealisasikannya.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <a href="https://www.linkedin.com/in/ainul-qodri" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Linkedin className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">LinkedIn</div>
            </a>
            <a href="mailto:ainulqodricr7@gmail.com" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Mail className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">Email</div>
            </a>
            <a href="https://www.instagram.com/ainul_qodri27" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Instagram className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">Instagram</div>
            </a>
            <a href="https://wa.me/6285659747970" target="_blank" rel="noopener noreferrer" className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 transition-all group">
              <Phone className="w-6 h-6 text-slate-500 group-hover:text-emerald-400 mx-auto mb-2" />
              <div className="text-xs font-bold text-white uppercase tracking-widest">WhatsApp</div>
            </a>
          </div>

          <a 
            href="https://wa.me/6285659747970" 
            className="inline-flex items-center px-10 py-5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-full transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/20"
          >
            Kirim Pesan Sekarang
            <MessageSquare className="ml-3 w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-12 bg-slate-950 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-bold text-white">
          AQ<span className="text-emerald-500">.</span>
        </div>
        <div className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Ainul Qodri. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="https://github.com/Ainulqodri" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          <a href="https://www.linkedin.com/in/ainul-qodri" className="text-slate-500 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          <a href="mailto:ainulqodricr7@gmail.com" className="text-slate-500 hover:text-white transition-colors"><Mail className="w-5 h-5" /></a>
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
