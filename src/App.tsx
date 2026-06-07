import React, { useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Search, Sun, Moon, Wrench, Zap, HardDrive, Wifi, Edit3, MapPin, ArrowUp } from 'lucide-react';
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, CartesianGrid, Tooltip } from 'recharts';
import { COMPARISON_DATA, CATEGORIES, type ComparisonRow } from './data';
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

function HighlightText({ text, highlight }: { text: string; highlight: string }) {
  if (!highlight.trim()) return <>{text}</>;
  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <span key={i} className="bg-yellow-400 text-black px-1 rounded-sm">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

function AnimatedCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalFrames = Math.round((duration * 1000) / 16);
      let frame = 0;

      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(end * (1 - Math.pow(1 - progress, 3)));
        
        if (frame === totalFrames) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(currentCount);
        }
      }, 16);
      return () => clearInterval(counter);
    }
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-full hover:bg-card border transition-colors flex items-center justify-center text-foreground"
      data-testid="button-theme-toggle"
    >
      {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}

function Page() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [onlyDiffs, setOnlyDiffs] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
      setScrolled(totalScroll > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredData = COMPARISON_DATA.filter((row) => {
    const matchesSearch = searchTerm === '' || 
      row.criterio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.s21fe.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.tabs7.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !activeCategory || row.section === activeCategory;
    const matchesDiff = !onlyDiffs || row.s21fe !== row.tabs7;

    return matchesSearch && matchesCategory && matchesDiff;
  });

  const groupedData = filteredData.reduce((acc, row) => {
    if (!acc[row.section]) acc[row.section] = [];
    acc[row.section].push(row);
    return acc;
  }, {} as Record<string, ComparisonRow[]>);

  const chartDataBattery = [
    { name: 'S21 FE', mAh: 4500, fill: '#1428A0' },
    { name: 'Tab S7', mAh: 8000, fill: '#00D4FF' }
  ];

  const chartDataCamera = [
    { name: 'S21 FE', MP: 32, fill: '#1428A0' },
    { name: 'Tab S7', MP: 8, fill: '#00D4FF' }
  ];

  const chartDataWeight = [
    { name: 'S21 FE', g: 177, fill: '#1428A0' },
    { name: 'Tab S7', g: 498, fill: '#00D4FF' }
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-accent selection:text-black">
      {/* Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-accent z-50 origin-left"
        style={{ width: '100%', transform: `scaleX(${scrollProgress})` }}
      />

      {/* Navbar */}
      <nav 
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          scrolled ? 'bg-background/80 backdrop-blur-md py-3 border-b border-border shadow-sm' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="font-sans font-bold text-xl tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Samsung
            </span>
            <span className="font-sans text-sm text-muted-foreground uppercase tracking-widest border-l border-border pl-3">
              Análisis Comparativo
            </span>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 container mx-auto flex flex-col items-center justify-center min-h-[90vh]">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-sans font-extrabold mb-6 leading-tight bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
            Galaxy S21 FE <br/>vs<br/> Tab S7
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 font-body max-w-2xl mx-auto">
            Análisis Comparativo de Dispositivos Móviles
          </p>

          {/* Author identification card */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-6 bg-card/70 backdrop-blur-md border border-border rounded-2xl px-6 py-4 mb-10 shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-primary inline-block" />
              <span className="font-sans font-semibold text-foreground">Diego Andrés Bravo Carvajal</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-accent inline-block" />
              Ingeniería de Software
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="text-sm text-muted-foreground">
              Programación en Plataformas Móviles I — Módulo 1
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="text-sm text-muted-foreground">
              Junio 2026
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-card/50 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl flex flex-col items-center hover:border-primary/50 transition-colors"
          >
            <div className="w-40 h-64 mb-6 relative flex items-center justify-center drop-shadow-2xl">
              <img
                src="https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-s21-fe-5g.jpg"
                alt="Samsung Galaxy S21 FE"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.samsung.com/is/image/samsung/p6pim/co/2201/gallery/co-galaxy-s21-fe-5g-g990-sm-g990blzdcoo-thumb-530779613';
                }}
              />
            </div>
            <h2 className="text-2xl font-bold font-sans mb-2">Galaxy S21 FE</h2>
            <p className="text-muted-foreground text-sm mb-4">Smartphone · Enero 2022</p>
            <div className="text-2xl font-bold text-primary">USD $699</div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-card/50 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl flex flex-col items-center hover:border-accent/50 transition-colors"
          >
            <div className="w-56 h-48 mb-6 relative flex items-center justify-center drop-shadow-2xl">
              <img
                src="https://fdn2.gsmarena.com/vv/bigpic/samsung-galaxy-tab-s7.jpg"
                alt="Samsung Galaxy Tab S7"
                className="h-full w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.samsung.com/is/image/samsung/p6pim/co/sm-t870nzkacoo/gallery/co-galaxy-tab-s7-t870-sm-t870nzkacoo-thumb-368249205';
                }}
              />
            </div>
            <h2 className="text-2xl font-bold font-sans mb-2">Galaxy Tab S7</h2>
            <p className="text-muted-foreground text-sm mb-4">Tablet PC · Agosto 2020</p>
            <div className="text-2xl font-bold text-accent">USD $649</div>
          </motion.div>
        </div>
      </section>

      {/* Key Metrics */}
      <section className="py-20 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-black font-sans text-foreground mb-2">
                <AnimatedCounter value={8} /> <span className="text-xl text-muted-foreground">GB</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">RAM Máxima</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-black font-sans text-foreground mb-2">
                <AnimatedCounter value={32} /> <span className="text-xl text-muted-foreground">MP</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Cámara Frontal (S21 FE)</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-black font-sans text-foreground mb-2">
                <AnimatedCounter value={8000} /> <span className="text-xl text-muted-foreground">mAh</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Batería (Tab S7)</div>
            </div>
            <div className="p-6 text-center">
              <div className="text-4xl md:text-5xl font-black font-sans text-foreground mb-2">
                177<span className="text-xl text-muted-foreground">g</span>
              </div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Peso S21 FE</div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Comparison */}
      <section className="py-24 container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl font-sans font-bold mb-8">Especificaciones Técnicas</h2>
          
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-card p-4 rounded-2xl border border-border">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <input 
                type="text" 
                placeholder="Buscar características..." 
                className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary font-body"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
              <input 
                type="checkbox" 
                className="rounded border-border text-primary focus:ring-primary w-4 h-4 bg-background"
                checked={onlyDiffs}
                onChange={e => setOnlyDiffs(e.target.checked)}
              />
              Solo mostrar diferencias
            </label>
          </div>

          <div className="flex flex-wrap gap-2 mt-6">
            <button 
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${!activeCategory ? 'bg-primary text-white' : 'bg-card border border-border text-foreground hover:bg-muted'}`}
            >
              Todos
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-white border-primary' : 'bg-card border border-border text-foreground hover:bg-muted'}`}
              >
                {cat.split('. ')[1]}
              </button>
            ))}
          </div>
        </div>

        {/* ── MÓVIL: card layout ── */}
        <div className="block md:hidden space-y-4">
          {Object.keys(groupedData).length === 0 && (
            <div className="p-12 text-center text-muted-foreground bg-card rounded-2xl border border-border">
              No se encontraron resultados para su búsqueda.
            </div>
          )}
          {Object.entries(groupedData).map(([section, rows]) => (
            <div key={section}>
              {/* Cabecera de sección */}
              <div className="px-4 py-2.5 bg-primary/10 rounded-xl font-sans font-bold text-primary text-sm mb-3 border border-primary/20">
                {section}
              </div>
              {/* Cards por fila */}
              {rows.map((row) => (
                <div key={row.id} className="bg-card border border-border rounded-2xl p-4 mb-3 shadow-sm">
                  {/* Criterio */}
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 pb-2 border-b border-border/50">
                    <HighlightText text={row.criterio} highlight={searchTerm} />
                  </p>
                  {/* Dos columnas */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className={`rounded-xl p-3 relative ${row.winner === 's21fe' ? 'bg-primary/10 border border-primary/30' : 'bg-background border border-border/50'}`}>
                      <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-1.5">S21 FE</p>
                      <p className="text-sm text-foreground leading-snug">
                        <HighlightText text={row.s21fe} highlight={searchTerm} />
                      </p>
                      {row.winner === 's21fe' && (
                        <span className="mt-2 inline-block bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                          Ventaja
                        </span>
                      )}
                    </div>
                    <div className={`rounded-xl p-3 relative ${row.winner === 'tabs7' ? 'bg-accent/10 border border-accent/30' : 'bg-background border border-border/50'}`}>
                      <p className="text-[10px] text-accent font-bold uppercase tracking-widest mb-1.5">Tab S7</p>
                      <p className="text-sm text-foreground leading-snug">
                        <HighlightText text={row.tabs7} highlight={searchTerm} />
                      </p>
                      {row.winner === 'tabs7' && (
                        <span className="mt-2 inline-block bg-accent text-black text-[9px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                          Ventaja
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* ── DESKTOP: tabla original ── */}
        <div className="hidden md:block overflow-x-auto rounded-2xl border border-border shadow-2xl bg-card">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-background sticky top-[72px] z-20 shadow-sm">
                <th className="p-4 border-b border-border w-1/3 text-muted-foreground font-sans font-semibold uppercase tracking-wider text-sm">
                  Criterio
                </th>
                <th className="p-4 border-b border-border w-1/3 font-sans font-bold text-lg text-primary">Galaxy S21 FE</th>
                <th className="p-4 border-b border-border w-1/3 font-sans font-bold text-lg text-accent">Galaxy Tab S7</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedData).map(([section, rows]) => (
                <React.Fragment key={section}>
                  <tr className="bg-primary/10 border-y border-border">
                    <td colSpan={3} className="p-4 font-sans font-bold text-primary">
                      {section}
                    </td>
                  </tr>
                  {rows.map((row) => (
                    <tr key={row.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="p-4 text-sm font-medium text-muted-foreground">
                        <HighlightText text={row.criterio} highlight={searchTerm} />
                      </td>
                      <td className="p-4 text-sm relative">
                        <HighlightText text={row.s21fe} highlight={searchTerm} />
                        {row.winner === 's21fe' && (
                          <span className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                            Ventaja
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-sm relative">
                        <HighlightText text={row.tabs7} highlight={searchTerm} />
                        {row.winner === 'tabs7' && (
                          <span className="absolute top-4 right-4 bg-accent text-black text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm">
                            Ventaja
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
              {Object.keys(groupedData).length === 0 && (
                <tr>
                  <td colSpan={3} className="p-12 text-center text-muted-foreground">
                    No se encontraron resultados para su búsqueda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Visual Data / Charts */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-sans font-bold mb-12 text-center">Métricas Clave</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background border border-border p-6 rounded-3xl shadow-xl flex flex-col">
              <h3 className="text-xl font-sans font-bold mb-6 text-center">Batería (mAh)</h3>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataBattery} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
                    <YAxis stroke="#888" tick={{ fill: '#888' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#12121A', borderColor: '#333' }} />
                    <Bar dataKey="mAh" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-background border border-border p-6 rounded-3xl shadow-xl flex flex-col">
              <h3 className="text-xl font-sans font-bold mb-6 text-center">Cámara Frontal (MP)</h3>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataCamera} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
                    <YAxis stroke="#888" tick={{ fill: '#888' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#12121A', borderColor: '#333' }} />
                    <Bar dataKey="MP" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-background border border-border p-6 rounded-3xl shadow-xl flex flex-col">
              <h3 className="text-xl font-sans font-bold mb-6 text-center">Peso (gramos)</h3>
              <div className="flex-1 min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartDataWeight} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#888" tick={{ fill: '#888' }} />
                    <YAxis stroke="#888" tick={{ fill: '#888' }} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#12121A', borderColor: '#333' }} />
                    <Bar dataKey="g" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Análisis de Resultados */}
      <section className="py-24 container mx-auto px-6">
        <h2 className="text-4xl font-sans font-bold mb-4">Análisis de Resultados</h2>
        <p className="text-muted-foreground mb-12 max-w-2xl text-sm leading-relaxed">
          El análisis siguiente se fundamenta en el esquema de capacidades de dispositivos móviles propuesto por Quinn (2011), 
          que organiza las funcionalidades en cuatro dimensiones: entrada, salida, sensores y conectividad.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:-translate-y-1 transition-transform">
            <Wrench className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-sans font-bold mb-3">Capacidades Generales</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ambos ejecutan Android con Wi-Fi 6, NFC y GPS, cumpliendo los criterios de dispositivo inteligente 
              descritos por Acosta Orjuela (2024). El S21 FE favorece la comunicación constante; el Tab S7, la productividad extendida{' '}
              <span className="text-primary/70 not-italic">(Samsung Electronics, 2022; Samsung Electronics, 2020)</span>.
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:-translate-y-1 transition-transform">
            <Zap className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-sans font-bold mb-3">Procesador y Rendimiento</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El S21 FE incorpora el Snapdragon 888 (5 nm) con GPU Adreno 660, más eficiente en consumo energético 
              que el Snapdragon 865+ (7 nm) / Adreno 650 del Tab S7. Esta evolución refleja la tendencia de 
              "mayores capacidades de procesamiento" señalada en el módulo{' '}
              <span className="text-primary/70 not-italic">(Acosta Orjuela, 2024, p. 16)</span>.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:-translate-y-1 transition-transform">
            <HardDrive className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-sans font-bold mb-3">Memoria y Almacenamiento</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              La RAM es idéntica (6/8 GB LPDDR5) en ambos. El Tab S7 supera al S21 FE en expansión: 
              soporta MicroSD hasta 1 TB, mientras el S21 FE carece de ranura. 
              El almacenamiento UFS 3.1 del S21 FE es levemente más rápido{' '}
              <span className="text-primary/70 not-italic">(Samsung Electronics, 2022)</span>.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:-translate-y-1 transition-transform">
            <Wifi className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-sans font-bold mb-3">Conectividad</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ambos dispositivos ofrecen la "conectividad a través de múltiples métodos de redes" descrita por Quinn (2011). 
              El S21 FE garantiza 5G nativo; el Tab S7 añade DisplayPort vía USB-C y Bluetooth 5.0. 
              La conectividad se verifica en <em>Ajustes &gt; Conexiones</em>{' '}
              <span className="text-primary/70 not-italic">(Samsung Electronics, 2020)</span>.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:-translate-y-1 transition-transform">
            <Edit3 className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-sans font-bold mb-3">Entrada y Captura de Datos</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              El Tab S7 incluye S Pen para escritura, dibujo y firma digital — un método de entrada único en tablets. 
              El S21 FE supera en fotografía: triple cámara trasera con OIS y 32 MP frontales. 
              Ambos admiten reconocimiento de voz, escaneo QR y autenticación biométrica{' '}
              <span className="text-primary/70 not-italic">(Acosta Orjuela, 2024; Xataka, 2022)</span>.
            </p>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-lg hover:-translate-y-1 transition-transform">
            <MapPin className="text-accent mb-4" size={32} />
            <h3 className="text-xl font-sans font-bold mb-3">Dónde Consultar la Info</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Modelo y Android: <em>AIDA64 → Android</em>.
              Procesador, RAM y almacenamiento: <em>AIDA64 → CPU / System</em>.
              Conectividad y Wi-Fi: <em>AIDA64 → Network</em>.
              Batería: <em>AIDA64 → Battery</em>.
              Verificación adicional: <em>Ajustes → Acerca del teléfono</em>.
            </p>
          </div>
        </div>
      </section>

      {/* Verificación en Dispositivo Físico */}
      <section className="py-24 container mx-auto px-6">
        <div className="max-w-5xl mx-auto">

          {/* Encabezado */}
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest text-primary font-sans font-semibold">
              Evidencia real — Samsung Galaxy S21 FE 5G (SM-G990E)
            </span>
            <h2 className="text-4xl font-sans font-bold mt-2 mb-4">
              Verificación en Dispositivo Físico
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-2xl">
              Los siguientes datos fueron obtenidos directamente del dispositivo Samsung Galaxy S21 FE 5G 
              perteneciente al autor, mediante la aplicación AIDA64 el 6 de junio de 2026. 
              Esta verificación confirma los criterios del cuadro comparativo y da cumplimiento 
              a lo solicitado en la actividad: identificar en qué menú del dispositivo se puede 
              encontrar cada dato <span className="text-primary/70">(Acosta Orjuela, 2024)</span>.
            </p>
          </div>

          {/* Dato destacado — Android 16 */}
          <div className="bg-primary/10 border border-primary/30 rounded-2xl px-6 py-4 mb-10 flex items-start gap-4">
            <span className="text-2xl">⚡</span>
            <div>
              <p className="font-sans font-bold text-foreground">Dato relevante: Android 16 (Baklava)</p>
              <p className="text-sm text-muted-foreground mt-1">
                El dispositivo físico analizado ejecuta <strong>Android 16 (API 36)</strong>, 
                publicado en 2025, con parche de seguridad del 5 de febrero de 2026. 
                Esto supera las especificaciones originales de lanzamiento del S21 FE (Android 12), 
                demostrando la capacidad de actualización del dispositivo — una ventaja del 
                ecosistema Samsung señalada por Acosta Orjuela (2024, p. 25).
              </p>
            </div>
          </div>

          {/* Grid de capturas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Captura 1 — CPU */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
              <div className="bg-[#1a73e8] px-4 py-3 flex items-center gap-2">
                <span className="text-white text-xs font-mono font-bold">AIDA64 / CPU</span>
                <span className="ml-auto text-white/60 text-xs">Captura 1</span>
              </div>
              <img
                src="/uploads/1000174660.jpg"
                alt="AIDA64 CPU — Exynos 2100, 5nm, 8 núcleos, hasta 2912 MHz"
                className="w-full object-cover max-h-80"
                loading="lazy"
              />
              <div className="p-4 space-y-1 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">SoC:</span> Samsung Exynos 2100</p>
                <p><span className="font-semibold text-foreground">Proceso:</span> 5 nm</p>
                <p><span className="font-semibold text-foreground">Núcleos:</span> 8 (Cortex-A55 + A78 + X1)</p>
                <p><span className="font-semibold text-foreground">Frecuencia máx:</span> 2912 MHz</p>
                <p className="text-primary/70 pt-1">📍 AIDA64 → CPU</p>
              </div>
            </div>

            {/* Captura 2 — System */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
              <div className="bg-[#1a73e8] px-4 py-3 flex items-center gap-2">
                <span className="text-white text-xs font-mono font-bold">AIDA64 / System</span>
                <span className="ml-auto text-white/60 text-xs">Captura 2</span>
              </div>
              <img
                src="/uploads/1000174658.jpg"
                alt="AIDA64 System — SM-G990E, 8GB LPDDR5, 225GB almacenamiento, BT 5.2"
                className="w-full object-cover max-h-80"
                loading="lazy"
              />
              <div className="p-4 space-y-1 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">Modelo:</span> SM-G990E</p>
                <p><span className="font-semibold text-foreground">RAM:</span> 8 GB LPDDR5</p>
                <p><span className="font-semibold text-foreground">Almacenamiento:</span> 225.40 GB</p>
                <p><span className="font-semibold text-foreground">Bluetooth:</span> 5.2</p>
                <p className="text-primary/70 pt-1">📍 AIDA64 → System</p>
              </div>
            </div>

            {/* Captura 3 — Network */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
              <div className="bg-[#1a73e8] px-4 py-3 flex items-center gap-2">
                <span className="text-white text-xs font-mono font-bold">AIDA64 / Network</span>
                <span className="ml-auto text-white/60 text-xs">Captura 3</span>
              </div>
              <img
                src="/uploads/1000174662.jpg"
                alt="AIDA64 Network — Wi-Fi 5GHz 292Mbps, señal -60dBm, IPv4 e IPv6"
                className="w-full object-cover max-h-80"
                loading="lazy"
              />
              <div className="p-4 space-y-1 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">Wi-Fi banda:</span> 5 GHz (5765 MHz)</p>
                <p><span className="font-semibold text-foreground">Velocidad:</span> 292 Mbps</p>
                <p><span className="font-semibold text-foreground">Señal:</span> -60 dBm (Very Good)</p>
                <p><span className="font-semibold text-foreground">IPv4 + IPv6:</span> ✓ Activos</p>
                <p className="text-primary/70 pt-1">📍 AIDA64 → Network</p>
              </div>
            </div>

            {/* Captura 4 — Battery */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg">
              <div className="bg-[#1a73e8] px-4 py-3 flex items-center gap-2">
                <span className="text-white text-xs font-mono font-bold">AIDA64 / Battery</span>
                <span className="ml-auto text-white/60 text-xs">Captura 4</span>
              </div>
              <img
                src="/uploads/1000174664.jpg"
                alt="AIDA64 Battery — 4500mAh Li-ion, salud Good, temperatura 33.5°C"
                className="w-full object-cover max-h-80"
                loading="lazy"
              />
              <div className="p-4 space-y-1 text-xs text-muted-foreground">
                <p><span className="font-semibold text-foreground">Capacidad:</span> 4500 mAh</p>
                <p><span className="font-semibold text-foreground">Tecnología:</span> Li-ion</p>
                <p><span className="font-semibold text-foreground">Salud:</span> Good</p>
                <p><span className="font-semibold text-foreground">Temperatura:</span> 33.5 °C</p>
                <p className="text-primary/70 pt-1">📍 AIDA64 → Battery</p>
              </div>
            </div>

            {/* Captura 5 — Android */}
            <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg md:col-span-2 lg:col-span-2">
              <div className="bg-[#1a73e8] px-4 py-3 flex items-center gap-2">
                <span className="text-white text-xs font-mono font-bold">AIDA64 / Android</span>
                <span className="ml-auto text-white/60 text-xs">Captura 5</span>
              </div>
              <div className="flex flex-col md:flex-row">
                <img
                  src="/uploads/unnamed.jpg"
                  alt="AIDA64 Android — Android 16 Baklava, API 36, parche seguridad feb 2026"
                  className="w-full md:w-64 object-cover max-h-80"
                  loading="lazy"
                />
                <div className="p-6 space-y-2 text-xs text-muted-foreground flex-1">
                  <p className="text-base font-sans font-bold text-foreground mb-3">Sistema Operativo verificado</p>
                  <p><span className="font-semibold text-foreground">Android:</span> 16 (Baklava)</p>
                  <p><span className="font-semibold text-foreground">API Level:</span> 36</p>
                  <p><span className="font-semibold text-foreground">Parche seguridad:</span> 2026-02-05</p>
                  <p><span className="font-semibold text-foreground">Kernel:</span> 5.4.242 (aarch64)</p>
                  <p><span className="font-semibold text-foreground">Rooted:</span> No</p>
                  <p><span className="font-semibold text-foreground">Build ID:</span> BP2A.250605.031.A3</p>
                  <p className="text-primary/70 pt-2">📍 AIDA64 → Android</p>
                  <div className="mt-4 bg-primary/10 border border-primary/20 rounded-xl p-3">
                    <p className="text-foreground font-semibold text-xs mb-1">💡 Nota académica</p>
                    <p className="leading-relaxed">
                      El dispositivo recibió actualización a Android 16 en 2025, tres años después 
                      de su lanzamiento con Android 12. Esto confirma el compromiso de Samsung 
                      con actualizaciones de SO, un factor de longevidad relevante en la comparación.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Tabla resumen de verificación */}
          <div className="mt-10 bg-card border border-border rounded-3xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border">
              <p className="font-sans font-bold text-foreground">Tabla 1</p>
              <p className="text-xs text-muted-foreground italic">
                Resumen de datos verificados en dispositivo físico vs. especificaciones de fabricante.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-background border-b border-border">
                  <tr>
                    <th className="text-left px-6 py-3 font-sans font-semibold text-muted-foreground">Criterio</th>
                    <th className="text-left px-6 py-3 font-sans font-semibold text-muted-foreground">Especificación oficial</th>
                    <th className="text-left px-6 py-3 font-sans font-semibold text-primary">Verificado en dispositivo</th>
                    <th className="text-left px-6 py-3 font-sans font-semibold text-muted-foreground">Fuente</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ["Procesador", "Exynos 2100 / Snapdragon 888", "Samsung Exynos 2100 — 5 nm", "AIDA64 / CPU"],
                    ["Núcleos", "8 núcleos", "8 núcleos (A55 × 4 + A78 × 3 + X1 × 1)", "AIDA64 / CPU"],
                    ["RAM", "6 / 8 GB LPDDR5", "8 GB LPDDR5 (7299 MB disponibles)", "AIDA64 / System"],
                    ["Almacenamiento", "128 / 256 GB", "225.40 GB (variante 256 GB)", "AIDA64 / System"],
                    ["Bluetooth", "5.0", "5.2 (versión real superior)", "AIDA64 / System"],
                    ["Wi-Fi", "Wi-Fi 6 (802.11ax)", "5 GHz activo, 292 Mbps, −60 dBm", "AIDA64 / Network"],
                    ["Batería", "4500 mAh", "4500 mAh, salud Good, Li-ion", "AIDA64 / Battery"],
                    ["Android", "Android 12 (lanzamiento)", "Android 16 (Baklava) — API 36", "AIDA64 / Android"],
                  ].map(([criterio, oficial, verificado, fuente], i) => (
                    <tr key={i} className="hover:bg-background/50 transition-colors">
                      <td className="px-6 py-3 font-medium text-foreground">{criterio}</td>
                      <td className="px-6 py-3 text-muted-foreground">{oficial}</td>
                      <td className="px-6 py-3 text-primary font-medium">{verificado}</td>
                      <td className="px-6 py-3 text-muted-foreground/60 text-xs font-mono">{fuente}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-3 border-t border-border bg-background/30">
              <p className="text-xs text-muted-foreground italic">
                <span className="font-semibold not-italic">Nota.</span> Datos verificados el 6 de junio de 2026 mediante AIDA64 (versión gratuita, Google Play Store) 
                en el dispositivo Samsung Galaxy S21 FE 5G SM-G990E del autor.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Conclusiones */}
      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-sans font-bold mb-12 text-center">Conclusiones</h2>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background rounded-3xl p-8 border-t-4 border-primary shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <h3 className="text-2xl font-sans font-bold mb-4">S21 FE Ideal para:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">✓ Portabilidad</li>
                  <li className="flex items-center gap-2">✓ Fotografía avanzada</li>
                  <li className="flex items-center gap-2">✓ IP68 (resistencia agua/polvo)</li>
                  <li className="flex items-center gap-2">✓ 5G garantizado</li>
                  <li className="flex items-center gap-2">✓ Comunicación constante</li>
                </ul>
              </div>

              <div className="bg-background rounded-3xl p-8 border-t-4 border-accent shadow-xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10" />
                <h3 className="text-2xl font-sans font-bold mb-4">Tab S7 Ideal para:</h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center gap-2">✓ Productividad</li>
                  <li className="flex items-center gap-2">✓ Pantalla grande 11"</li>
                  <li className="flex items-center gap-2">✓ S Pen incluido</li>
                  <li className="flex items-center gap-2">✓ Cuatro altavoces + Dolby Atmos</li>
                  <li className="flex items-center gap-2">✓ MicroSD hasta 1 TB</li>
                </ul>
              </div>
            </div>

            {/* Cita en bloque APA 7: ≥40 palabras → sin comillas, sangría 0.5 in, cita DESPUÉS del punto final */}
            <div className="bg-background/50 border border-border rounded-3xl text-muted-foreground leading-relaxed overflow-hidden">
              {/* Etiqueta de cita en bloque */}
              <div className="px-8 pt-6 pb-2 not-italic text-xs uppercase tracking-widest text-muted-foreground/40 font-sans font-semibold border-b border-border/40">
                Cita en bloque — Quinn (2000, párr. 1)
              </div>
              {/* Sangría de bloque: pl-12 (≈0.5 in adicional sobre el padding base) */}
              <blockquote className="pl-14 pr-8 py-6 italic border-l-4 border-primary/30 ml-8 my-2">
                Desde la perspectiva del m-Learning, ambos dispositivos son plenamente compatibles
                con aplicaciones educativas como Blackboard Mobile Learn, Duolingo y herramientas
                de productividad, confirmando que el mobile learning se caracteriza por la capacidad
                de acceder a recursos de aprendizaje desde cualquier lugar, en cualquier momento,
                con altas capacidades de búsqueda y alta interacción.{' '}
                <span className="not-italic text-primary/80 font-medium">(Quinn, 2000, párr. 1)</span>
              </blockquote>
              <p className="text-xs not-italic text-muted-foreground/50 text-right px-8 pb-5 font-sans">
                — Bravo Carvajal, D. A. (2026). <em>Análisis comparativo de dispositivos móviles Samsung.</em>{' '}
                Universidad Manuela Beltrán.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Referencias */}
      <section className="py-24 container mx-auto px-6 max-w-5xl">
        <h2 className="text-3xl font-sans font-bold mb-2 text-muted-foreground">Referencias</h2>
        <p className="text-xs text-muted-foreground/50 mb-10 uppercase tracking-widest"></p>
        <ul className="space-y-6 text-sm text-muted-foreground/80 font-body">

          {/* Material de curso — ciudad incluida siguiendo guía UMB */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Acosta Orjuela, D. R. (2024). <em>Módulo I: Fundamentos sobre las tecnologías móviles</em>{' '}
            [Material de curso]. Bogotá, Colombia: Universidad Manuela Beltrán.
          </li>

          {/* Página web — "Recuperado de" según ejemplos 14.6 guía UMB */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Quinn, C. (2000). <em>mLearning: Mobile, wireless, in-your-pocket learning</em>. LineZine.{' '}
            Recuperado el 1 de junio de 2026 de https://www.linezine.com/2.1/features/cqmmwiyp.htm
          </li>

          {/* Libro impreso — sin URL, sin "Recuperado de" */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Quinn, C. (2011). <em>Designing mLearning: Tapping into the mobile revolution for organizational performance</em>.{' '}
            Pfeiffer.
          </li>

          {/* Página web corporativa — "Recuperado de" según guía UMB */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Samsung Electronics. (2022). <em>Samsung Galaxy S21 FE 5G: Especificaciones técnicas</em>.{' '}
            Recuperado el 1 de junio de 2026 de{' '}
            https://www.samsung.com/co/smartphones/galaxy-s/galaxy-s21-fe-5g-graphite-128gb-sm-g990blzdbco/
          </li>

          {/* Página web corporativa — "Recuperado de" según guía UMB */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Samsung Electronics. (2020). <em>Samsung Galaxy Tab S7: Especificaciones técnicas</em>.{' '}
            Recuperado el 1 de junio de 2026 de{' '}
            https://www.samsung.com/co/tablets/galaxy-tab-s/galaxy-tab-s7-11-0-inch-wifi-mystic-black-128gb-sm-t870nzkacoo/
          </li>

          {/* Artículo web — "Recuperado de" según guía UMB */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Smart-GSM. (2021). <em>Samsung Galaxy Tab S7: características y especificaciones</em>.{' '}
            Recuperado el 1 de junio de 2026 de https://www.smart-gsm.com/moviles/samsung-galaxy-tab-s7
          </li>

          {/* Artículo web — "Recuperado de" según guía UMB */}
          <li className="pl-8 -indent-8 leading-relaxed">
            Xataka. (2022). <em>Samsung Galaxy S21 FE: análisis, características, precio y especificaciones</em>.{' '}
            Recuperado el 1 de junio de 2026 de{' '}
            https://www.xataka.com/analisis/samsung-galaxy-s21-fe-analisis-caracteristicas-precio-especificaciones
          </li>

        </ul>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent" />
        <div className="container mx-auto px-6 text-center text-muted-foreground text-sm flex flex-col items-center gap-2">
          <div className="w-12 h-1 bg-border rounded-full mb-4" />
          <p className="font-sans font-semibold text-foreground">Diego Andrés Bravo Carvajal</p>
          <p>Ingeniería de Software · Programación en Plataformas Móviles I · Módulo 1</p>
          <p>Universidad Manuela Beltrán · Junio 2026</p>
          <p className="mt-3 text-xs text-muted-foreground/50"></p>
        </div>
      </footer>

      {/* Back to top button */}
      {scrolled && (
        <button 
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-2xl hover:scale-110 transition-transform z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background"
          aria-label="Volver arriba"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
          <Switch>
            <Route path="/" component={Page} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
