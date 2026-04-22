"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { useRef } from 'react';
import TopAppBar from '../components/TopAppBar';

/* ============================================================
   Telegram-style spring physics
   ============================================================ */
const telegramSpring = { type: "spring" as const, stiffness: 600, damping: 30, mass: 0.5 };
const smoothSpring = { type: "spring" as const, stiffness: 300, damping: 28, mass: 0.8 };

/* ============================================================
   Animation Variants
   ============================================================ */
const heroStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: telegramSpring },
};
const cardStagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const cardPop = {
  hidden: { opacity: 0, y: 80, scale: 0.88, rotateX: 8 },
  show: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: smoothSpring },
};
const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: telegramSpring },
};
const slideInRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: telegramSpring },
};
const scaleReveal = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: smoothSpring },
};

/* ============================================================
   ScrollReveal — Telegram-style snap-in on scroll
   ============================================================ */
function ScrollReveal({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ ...telegramSpring, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ============================================================
   ParallaxImage
   ============================================================ */
function ParallaxImage({ src, alt }: { src: string; alt: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 30, mass: 0.5 });
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.div style={{ y: smoothY }} className="absolute inset-[-20%]">
        <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" style={{ opacity: 0.85 }} priority />
      </motion.div>
    </div>
  );
}

/* ============================================================
   Data
   ============================================================ */
const philosophyCards = [
  { icon: "eco", title: "Sustainable Sourcing", body: "We partner with fair-trade farms across three continents, ensuring ethical practices and environmental stewardship from seed to cup.", action: "Read the report" },
  { icon: "local_fire_department", title: "Precision Roasting", body: "Our master roasters use state-of-the-art profiling technology alongside generations of artisan intuition to unlock peak flavor.", action: "See the process" },
  { icon: "workspace_premium", title: "Award-Winning Quality", body: "Recognized three consecutive years as the region's finest artisan roastery — crafting experiences for boutique cafes and fine dining.", action: "Discover blends" },
];

const stats = [
  { value: "12+", label: "Origins" },
  { value: "3×", label: "Award Winner" },
  { value: "100%", label: "Fair Trade" },
  { value: "50k+", label: "Cups Daily" },
];

const processSteps = [
  { icon: "agriculture", title: "Sourcing", desc: "Hand-selected from high-altitude farms in Ethiopia, Colombia, and Guatemala." },
  { icon: "local_shipping", title: "Import", desc: "Green beans shipped in climate-controlled containers to preserve freshness." },
  { icon: "local_fire_department", title: "Roasting", desc: "Small-batch roasted to precise temperature profiles for each origin." },
  { icon: "science", title: "Quality Lab", desc: "Every batch is cupped and graded by our Q-certified tasters." },
  { icon: "local_cafe", title: "Your Cup", desc: "Delivered within 72 hours of roasting for peak flavor and aroma." },
];

const blends = [
  { name: "Mountain Sunrise", origin: "Ethiopia Yirgacheffe", notes: "Floral · Citrus · Honey", roast: "Light", icon: "wb_sunny" },
  { name: "Velvet Eclipse", origin: "Colombia Huila", notes: "Chocolate · Caramel · Walnut", roast: "Medium", icon: "dark_mode" },
  { name: "Ember Reserve", origin: "Guatemala Antigua", notes: "Smoky · Dark Cherry · Spice", roast: "Dark", icon: "whatshot" },
  { name: "Golden Hour", origin: "Brazil Cerrado", notes: "Nutty · Toffee · Smooth", roast: "Medium-Light", icon: "light_mode" },
];

const testimonials = [
  { quote: "M3 Roasters fundamentally changed how we think about sourcing. Their commitment to quality is unmatched.", author: "Elena Vasquez", role: "Head Barista, Café Lumière" },
  { quote: "The Mountain Sunrise blend is the best Ethiopian coffee I've tasted in 20 years. Every cup is a revelation.", author: "James Thornton", role: "Coffee Critic, Bean Journal" },
  { quote: "Our partnership with M3 Roasters has elevated our entire menu. Guests consistently ask about the coffee.", author: "Priya Mehta", role: "Executive Chef, Saffron Table" },
];

/* ============================================================
   Main Page
   ============================================================ */
export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(heroScroll, [0, 0.5], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 0.5], [1, 0.92]);
  const smoothHeroOpacity = useSpring(heroOpacity, { stiffness: 100, damping: 30 });
  const smoothHeroScale = useSpring(heroScale, { stiffness: 100, damping: 30 });

  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)' }}>
      <TopAppBar />

      <main className="flex-1 flex flex-col">

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative w-full min-h-[92vh] flex items-end md:items-center overflow-hidden" style={{ background: 'var(--md-sys-color-surface-container)' }}>
          <ParallaxImage src="/hero.png" alt="Artisan latte art" />
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(to right, var(--md-sys-color-surface) 35%, transparent 70%)' }} />
          <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to top, var(--md-sys-color-surface) 30%, transparent 65%)' }} />

          <motion.div className="relative z-10 w-full px-4 md:px-12 pb-12 md:pb-0" style={{ opacity: smoothHeroOpacity, scale: smoothHeroScale }}>
            <div className="max-w-[1040px] mx-auto">
              <motion.div className="flex flex-col gap-5 max-w-2xl" variants={heroStagger} initial="hidden" animate="show">
                <motion.p variants={heroItem} className="md3-label-large m-0" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  Est. 2019 · Single-Origin Specialty
                </motion.p>
                <motion.h2 variants={heroItem} className="md3-display-large m-0">The Art of Roasting, Redefined.</motion.h2>
                <motion.p variants={heroItem} className="md3-body-large m-0 max-w-lg" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                  We obsess over the perfect bean so you can obsess over the perfect cup. A journey from sustainable farms directly to your senses.
                </motion.p>
                <motion.div variants={heroItem} className="flex flex-wrap gap-4 mt-3">
                  <md-filled-button><md-icon slot="icon">auto_awesome</md-icon>Discover Our Story</md-filled-button>
                  <md-outlined-button>Visit the Roastery</md-outlined-button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* ===== STATS STRIP ===== */}
        <section className="w-full" style={{ background: 'var(--md-sys-color-primary-container)' }}>
          <div className="max-w-[1040px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-10 px-6 md:px-12 text-center">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.06}>
                <div className="md3-display-small m-0 font-semibold" style={{ color: 'var(--md-sys-color-on-primary-container)' }}>{s.value}</div>
                <div className="md3-label-large mt-2" style={{ color: 'var(--md-sys-color-on-primary-container)', opacity: 0.8 }}>{s.label}</div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* ===== PHILOSOPHY ===== */}
        <section id="story" className="w-full px-4 md:px-12 mt-16 md:mt-28">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="mb-14 max-w-xl" variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Our Philosophy</p>
              <h3 className="md3-headline-large m-0 mb-4">From Seed to Cup</h3>
              <p className="md3-body-large m-0" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                Every step of our process is guided by uncompromising standards and deep respect for the craft.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={cardStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} style={{ perspective: '1200px' }}>
              {philosophyCards.map((card) => (
                <motion.div key={card.title} variants={cardPop}
                  whileHover={{ y: -8, scale: 1.02, transition: { ...telegramSpring, stiffness: 800 } }}
                  whileTap={{ scale: 0.98, transition: { duration: 0.1 } }}
                  className="md3-card--elevated flex flex-col cursor-pointer"
                >
                  <div className="h-52 flex items-center justify-center" style={{ background: 'var(--md-sys-color-surface-container-highest)' }}>
                    <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={telegramSpring}>
                      <md-icon style={{ '--md-icon-size': '56px', color: 'var(--md-sys-color-primary)' } as any}>{card.icon}</md-icon>
                    </motion.div>
                  </div>
                  <div className="md3-card__content flex flex-col flex-1 gap-3">
                    <h4 className="md3-title-large m-0">{card.title}</h4>
                    <p className="md3-body-medium m-0 flex-1" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{card.body}</p>
                  </div>
                  <div className="md3-card__actions"><md-filled-tonal-button>{card.action}</md-filled-tonal-button></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== PROCESS TIMELINE ===== */}
        <section id="roastery" className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="mb-14 text-center" variants={scaleReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Our Process</p>
              <h3 className="md3-headline-large m-0 mb-4">Bean to Brew in 5 Steps</h3>
              <p className="md3-body-large m-0 mx-auto max-w-xl" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                Every M3 Roasters bean follows a meticulous journey designed to preserve and amplify its unique character.
              </p>
            </motion.div>

            {/* Timeline — Uses 50% absolute positioning for flawless centering */}
            <div className="relative flex flex-col pt-4 pb-4">
              {/* Desktop vertical line (centered exactly at 50%) */}
              <div
                className="hidden md:block absolute top-0 bottom-0 w-[2px] left-1/2 -translate-x-1/2"
                style={{ background: 'var(--md-sys-color-outline-variant)', zIndex: 0 }}
              />

              {processSteps.map((step, i) => {
                const isLeft = i % 2 === 0;
                const isLast = i === processSteps.length - 1;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ ...telegramSpring, delay: i * 0.08 }}
                    className="relative flex items-start w-full mb-12 md:mb-16 z-10"
                  >
                    {/* Mobile: Circle + Vertical Line (Left aligned) */}
                    <div className="md:hidden flex flex-col items-center mr-4 relative">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center relative z-10"
                        style={{ background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)' }}
                        whileHover={{ scale: 1.15 }}
                        transition={telegramSpring}
                      >
                        <md-icon style={{ color: 'var(--md-sys-color-on-primary)', '--md-icon-size': '22px' } as any}>{step.icon}</md-icon>
                      </motion.div>
                      {!isLast && (
                        <div className="w-[2px] absolute top-12 bottom-[-48px]" style={{ background: 'var(--md-sys-color-outline-variant)' }} />
                      )}
                    </div>

                    {/* Desktop Left Half: w-1/2 */}
                    <div className="hidden md:flex w-1/2 justify-end pr-10">
                      {isLeft && (
                        <motion.div
                          className="md3-card--outlined p-5 w-full"
                          style={{ maxWidth: '380px', textAlign: 'right' }}
                          whileHover={{ scale: 1.02, transition: telegramSpring }}
                        >
                          <h4 className="md3-title-medium m-0 mb-1">{step.title}</h4>
                          <p className="md3-body-medium m-0" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{step.desc}</p>
                        </motion.div>
                      )}
                    </div>

                    {/* Desktop Center Circle (Absolutely pinned exactly to 50%) */}
                    <div className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 z-10">
                      <motion.div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background: 'var(--md-sys-color-primary)', color: 'var(--md-sys-color-on-primary)' }}
                        whileHover={{ scale: 1.15 }}
                        transition={telegramSpring}
                      >
                        <md-icon style={{ color: 'var(--md-sys-color-on-primary)', '--md-icon-size': '22px' } as any}>{step.icon}</md-icon>
                      </motion.div>
                    </div>

                    {/* Desktop Right Half / Mobile Content */}
                    <div className="flex-1 md:w-1/2 md:flex-none md:pl-10">
                      {/* Desktop Card */}
                      {!isLeft && (
                        <motion.div
                          className="md3-card--outlined p-5 w-full hidden md:block"
                          style={{ maxWidth: '380px' }}
                          whileHover={{ scale: 1.02, transition: telegramSpring }}
                        >
                          <h4 className="md3-title-medium m-0 mb-1">{step.title}</h4>
                          <p className="md3-body-medium m-0" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{step.desc}</p>
                        </motion.div>
                      )}
                      
                      {/* Mobile Card */}
                      <div className="md:hidden pt-1">
                        <h4 className="md3-title-medium m-0 mb-2">{step.title}</h4>
                        <p className="md3-body-medium m-0" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{step.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== FEATURED BLENDS ===== */}
        <section className="w-full px-4 md:px-12 mt-16 md:mt-24">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="flex items-end justify-between mb-10" variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <div>
                <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Featured Blends</p>
                <h3 className="md3-headline-large m-0">Signature Collection</h3>
              </div>
              <md-text-button>View all blends</md-text-button>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={cardStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
            >
              {blends.map((blend) => (
                <motion.div
                  key={blend.name}
                  variants={cardPop}
                  whileHover={{ y: -10, transition: { ...telegramSpring, stiffness: 800 } }}
                  whileTap={{ scale: 0.97 }}
                  className="md3-card--filled flex flex-col cursor-pointer overflow-hidden"
                  style={{ borderRadius: 'var(--md-sys-shape-corner-large)' }}
                >
                  {/* Icon area */}
                  <div className="h-40 flex items-center justify-center relative" style={{ background: 'var(--md-sys-color-secondary-container)' }}>
                    <motion.div whileHover={{ scale: 1.2, rotate: -8 }} transition={telegramSpring}>
                      <md-icon style={{ '--md-icon-size': '48px', color: 'var(--md-sys-color-on-secondary-container)' } as any}>{blend.icon}</md-icon>
                    </motion.div>
                    {/* Roast badge */}
                    <span
                      className="absolute top-3 right-3 px-3 py-1 md3-label-medium"
                      style={{
                        background: 'var(--md-sys-color-tertiary)',
                        color: 'var(--md-sys-color-on-tertiary)',
                        borderRadius: 'var(--md-sys-shape-corner-full)',
                      }}
                    >
                      {blend.roast}
                    </span>
                  </div>

                  <div className="p-4 flex flex-col gap-2 flex-1">
                    <h4 className="md3-title-medium m-0">{blend.name}</h4>
                    <p className="md3-body-medium m-0" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{blend.origin}</p>
                    <p className="md3-label-medium m-0 mt-auto pt-3" style={{ color: 'var(--md-sys-color-primary)' }}>{blend.notes}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== TESTIMONIALS ===== */}
        <section className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="text-center mb-14" variants={scaleReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Testimonials</p>
              <h3 className="md3-headline-large m-0">What People Are Saying</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, i) => (
                <ScrollReveal key={t.author} delay={i * 0.08}>
                  <motion.div
                    className="md3-card--outlined flex flex-col p-6 h-full"
                    style={{ borderRadius: 'var(--md-sys-shape-corner-large)' }}
                    whileHover={{ y: -6, scale: 1.02, transition: telegramSpring }}
                  >
                    {/* Quote icon */}
                    <md-icon style={{ '--md-icon-size': '36px', color: 'var(--md-sys-color-primary)', opacity: 0.6, marginBottom: '12px' } as any}>format_quote</md-icon>

                    <p className="md3-body-large m-0 flex-1" style={{ color: 'var(--md-sys-color-on-surface)', fontStyle: 'italic' }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>

                    {/* Divider */}
                    <div className="w-12 h-[2px] my-4" style={{ background: 'var(--md-sys-color-outline-variant)' }} />

                    <div>
                      <p className="md3-title-medium m-0">{t.author}</p>
                      <p className="md3-body-medium m-0 mt-1" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{t.role}</p>
                    </div>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA / VISIT SECTION ===== */}
        <section className="w-full px-4 md:px-12 mt-20 md:mt-32 mb-16">
          <motion.div
            className="max-w-[1040px] mx-auto overflow-hidden flex flex-col md:flex-row"
            style={{ background: 'var(--md-sys-color-tertiary-container)', borderRadius: 'var(--md-sys-shape-corner-extra-large)' }}
            variants={scaleReveal} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="flex-1 p-8 md:p-16 flex flex-col justify-center gap-5" variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <h3 className="md3-headline-large m-0" style={{ color: 'var(--md-sys-color-on-tertiary-container)' }}>Visit Our Roastery</h3>
              <p className="md3-body-large m-0" style={{ color: 'var(--md-sys-color-on-tertiary-container)', opacity: 0.85 }}>
                Walk through our roasting floor, taste fresh samples, and learn the craft from our resident roast masters. Open daily 8 AM — 6 PM.
              </p>
              <div className="flex flex-wrap gap-3 mt-2">
                <md-filled-button><md-icon slot="icon">place</md-icon>Get Directions</md-filled-button>
                <md-outlined-button><md-icon slot="icon">calendar_today</md-icon>Book a Tour</md-outlined-button>
              </div>
            </motion.div>
            <motion.div className="flex-1 min-h-[260px] md:min-h-0 relative" variants={slideInRight} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <Image src="/hero.png" alt="Inside the roastery" fill className="object-cover" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===== OUR TEAM ===== */}
        <section className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="text-center mb-14" variants={scaleReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>The People</p>
              <h3 className="md3-headline-large m-0 mb-4">Meet Our Team</h3>
              <p className="md3-body-large m-0 mx-auto max-w-xl" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                Passionate artisans who bring decades of combined experience to every roast.
              </p>
            </motion.div>

            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-6" variants={cardStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }}>
              {[
                { name: "Marco Reyes", role: "Founder & Head Roaster", icon: "person" },
                { name: "Aisha Patel", role: "Q Grader & Quality Lead", icon: "science" },
                { name: "Lars Eriksson", role: "Green Buyer & Sourcing", icon: "flight" },
                { name: "Yuki Tanaka", role: "Head Barista Trainer", icon: "school" },
              ].map((member) => (
                <motion.div
                  key={member.name}
                  variants={cardPop}
                  whileHover={{ y: -6, transition: telegramSpring }}
                  className="flex flex-col items-center text-center cursor-pointer"
                >
                  <motion.div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-4"
                    style={{ background: 'var(--md-sys-color-secondary-container)' }}
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={telegramSpring}
                  >
                    <md-icon style={{ '--md-icon-size': '40px', color: 'var(--md-sys-color-on-secondary-container)' } as any}>{member.icon}</md-icon>
                  </motion.div>
                  <h4 className="md3-title-medium m-0">{member.name}</h4>
                  <p className="md3-body-medium m-0 mt-1" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== MENU HIGHLIGHTS ===== */}
        <section className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="mb-14" variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Cafe Menu</p>
              <h3 className="md3-headline-large m-0">Popular Picks</h3>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Single-Origin Pour Over", price: "₹280", desc: "Hand-brewed from our rotating seasonal origin", icon: "coffee" },
                { name: "Signature Cortado", price: "₹220", desc: "Double ristretto with silky steamed milk", icon: "local_cafe" },
                { name: "Cold Brew Flight", price: "₹350", desc: "Three origins served side-by-side for comparison", icon: "water_drop" },
                { name: "Affogato al Caffè", price: "₹260", desc: "Vanilla bean gelato drowned in fresh espresso", icon: "icecream" },
                { name: "Matcha × Espresso", price: "₹300", desc: "Ceremonial matcha layered with our house blend", icon: "emoji_food_beverage" },
                { name: "Roaster's Reserve Bag", price: "₹650", desc: "250g of our current flagship roast, whole bean", icon: "inventory_2" },
              ].map((item, i) => (
                <ScrollReveal key={item.name} delay={i * 0.04}>
                  <motion.div
                    className="flex items-center gap-4 p-4"
                    style={{
                      background: 'var(--md-sys-color-surface-container-low)',
                      borderRadius: 'var(--md-sys-shape-corner-medium)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                    }}
                    whileHover={{ x: 6, background: 'var(--md-sys-color-surface-container)', transition: { duration: 0.15 } }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: 'var(--md-sys-color-primary-container)' }}
                    >
                      <md-icon style={{ '--md-icon-size': '22px', color: 'var(--md-sys-color-on-primary-container)' } as any}>{item.icon}</md-icon>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="md3-title-medium m-0">{item.name}</h4>
                      <p className="md3-body-medium m-0 mt-0.5" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{item.desc}</p>
                    </div>
                    <span className="md3-title-medium flex-shrink-0" style={{ color: 'var(--md-sys-color-primary)' }}>{item.price}</span>
                  </motion.div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== SUBSCRIPTION BUILDER (Interactive MD3 Showcase) ===== */}
        <section id="subscribe" className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="mb-10 text-center" variants={scaleReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Subscribe & Save</p>
              <h3 className="md3-headline-large m-0">Customize Your Ritual</h3>
            </motion.div>

            <motion.div
              className="md3-card--outlined flex flex-col md:flex-row overflow-hidden max-w-4xl mx-auto"
              variants={slideInLeft} initial="hidden" whileInView="show" viewport={{ once: true }}
              style={{ background: 'var(--md-sys-color-surface)' }}
            >
              {/* Left Configurator */}
              <div className="flex-1 p-6 md:p-10 border-b md:border-b-0 md:border-r border-solid border-transparent" style={{ borderColor: 'var(--md-sys-color-outline-variant)' }}>
                
                {/* Tabs */}
                <h4 className="md3-title-medium m-0 mb-3" style={{ color: 'var(--md-sys-color-on-surface)' }}>Delivery Frequency</h4>
                <div style={{ borderBottom: '1px solid var(--md-sys-color-outline-variant)' }}>
                  <md-tabs aria-label="Subscription frequency">
                    <md-primary-tab active>Weekly</md-primary-tab>
                    <md-primary-tab>Bi-Weekly</md-primary-tab>
                    <md-primary-tab>Monthly</md-primary-tab>
                  </md-tabs>
                </div>

                {/* Chips */}
                <h4 className="md3-title-medium m-0 mt-8 mb-3" style={{ color: 'var(--md-sys-color-on-surface)' }}>Roast Preference</h4>
                <md-chip-set>
                  <md-filter-chip label="Light Roast" selected></md-filter-chip>
                  <md-filter-chip label="Medium Roast" selected></md-filter-chip>
                  <md-filter-chip label="Dark Roast"></md-filter-chip>
                  <md-filter-chip label="Espresso"></md-filter-chip>
                </md-chip-set>

                {/* Slider */}
                <h4 className="md3-title-medium m-0 mt-8 mb-3" style={{ color: 'var(--md-sys-color-on-surface)' }}>Bags per delivery (250g)</h4>
                <div className="px-2">
                  <md-slider value="2" min="1" max="5" step="1" labeled ticks className="w-full"></md-slider>
                </div>

                {/* Switches/Checkboxes inside a List */}
                <h4 className="md3-title-medium m-0 mt-8 mb-3" style={{ color: 'var(--md-sys-color-on-surface)' }}>Add-on Options</h4>
                <div style={{ borderRadius: 'var(--md-sys-shape-corner-medium)', overflow: 'hidden', border: '1px solid var(--md-sys-color-outline-variant)' }}>
                  <md-list className="m-0 p-0">
                    <md-list-item type="button">
                      <div slot="headline">Include Limited Reserves</div>
                      <div slot="supporting-text">Swap one bag for a rare lot occasionally</div>
                      <md-switch slot="end" selected></md-switch>
                    </md-list-item>
                    <md-divider></md-divider>
                    <md-list-item type="button">
                      <md-checkbox slot="start" checked></md-checkbox>
                      <div slot="headline">Eco-friendly Packaging</div>
                      <div slot="supporting-text">Compostable bags without plastic valves</div>
                    </md-list-item>
                  </md-list>
                </div>
              </div>

              {/* Right Summary Panel */}
              <div className="w-full md:w-[320px] p-6 md:p-10 flex flex-col justify-between" style={{ background: 'var(--md-sys-color-surface-container-low)' }}>
                <div>
                  <h4 className="md3-headline-small m-0 mb-6">Summary</h4>
                  <div className="flex justify-between items-center mb-4">
                    <span className="md3-body-large" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Frequency</span>
                    <span className="md3-title-medium">Weekly</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="md3-body-large" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Quantity</span>
                    <span className="md3-title-medium">2 bags</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="md3-body-large" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Reserve Tier</span>
                    <span className="md3-title-medium">Included</span>
                  </div>
                  <md-divider className="my-6"></md-divider>
                  <div className="flex justify-between items-end mb-8">
                    <span className="md3-title-large">Total</span>
                    <span className="md3-headline-large" style={{ color: 'var(--md-sys-color-primary)' }}>₹1,200</span>
                  </div>
                </div>
                <md-filled-button style={{ width: '100%', '--md-filled-button-container-height': '48px' } as any}>Begin Subscription</md-filled-button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ===== LOCATION & HOURS ===== */}
        <section id="contact" className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <motion.div
            className="max-w-[1040px] mx-auto flex flex-col md:flex-row gap-8"
            variants={cardStagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }}
          >
            {/* Map-like card */}
            <motion.div
              variants={slideInLeft}
              className="flex-1 flex flex-col items-center justify-center p-12"
              style={{
                background: 'var(--md-sys-color-surface-container-highest)',
                borderRadius: 'var(--md-sys-shape-corner-extra-large)',
                minHeight: '320px',
              }}
            >
              <motion.div whileHover={{ scale: 1.15 }} transition={telegramSpring}>
                <md-icon style={{ '--md-icon-size': '80px', color: 'var(--md-sys-color-primary)', opacity: 0.7 } as any}>map</md-icon>
              </motion.div>
              <p className="md3-title-medium mt-6 text-center" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                Interactive map coming soon
              </p>
              <md-filled-tonal-button style={{ marginTop: '16px' }}>
                <md-icon slot="icon">open_in_new</md-icon>
                Open in Google Maps
              </md-filled-tonal-button>
            </motion.div>

            {/* Details */}
            <motion.div variants={slideInRight} className="flex-1 flex flex-col gap-6">
              <div>
                <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>Find Us</p>
                <h3 className="md3-headline-large m-0">Location & Hours</h3>
              </div>

              {[
                { icon: "place", title: "Address", value: "42 Artisan Lane, Roaster's Quarter\nBangalore, KA 560001" },
                { icon: "schedule", title: "Hours", value: "Mon–Fri: 7 AM – 8 PM\nSat–Sun: 8 AM – 9 PM" },
                { icon: "phone", title: "Phone", value: "+91 80 2345 6789" },
                { icon: "mail", title: "Email", value: "hello@m3roasters.com" },
              ].map((info, i) => (
                <ScrollReveal key={info.title} delay={i * 0.06}>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ background: 'var(--md-sys-color-tertiary-container)' }}
                    >
                      <md-icon style={{ '--md-icon-size': '20px', color: 'var(--md-sys-color-on-tertiary-container)' } as any}>{info.icon}</md-icon>
                    </div>
                    <div>
                      <p className="md3-label-large m-0" style={{ color: 'var(--md-sys-color-on-surface)' }}>{info.title}</p>
                      <p className="md3-body-medium m-0 mt-1 whitespace-pre-line" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{info.value}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="w-full px-4 md:px-12 mt-20 md:mt-32">
          <div className="max-w-[1040px] mx-auto">
            <motion.div className="text-center mb-14" variants={scaleReveal} initial="hidden" whileInView="show" viewport={{ once: true }}>
              <p className="md3-label-large m-0 mb-3" style={{ color: 'var(--md-sys-color-primary)', letterSpacing: '2px', textTransform: 'uppercase' }}>FAQ</p>
              <h3 className="md3-headline-large m-0">Common Questions</h3>
            </motion.div>

            <div className="flex flex-col gap-3 max-w-2xl mx-auto">
              {[
                { q: "Do you offer wholesale for cafes?", a: "Yes! We partner with over 60 cafes and restaurants. Our wholesale program includes custom blends, training, and equipment support. Contact us for pricing." },
                { q: "How fresh is your coffee when delivered?", a: "All orders are roasted within 24 hours of shipping. Domestic orders arrive within 2–3 days, meaning your beans are always less than 5 days from the roaster." },
                { q: "Can I visit the roastery without a booking?", a: "Walk-ins are welcome during cafe hours! However, guided roastery tours should be booked in advance as spots are limited to small groups." },
                { q: "Do you ship internationally?", a: "Currently we ship to 12 countries. International orders are vacuum-sealed and shipped via express courier to ensure freshness. See our shipping page for details." },
                { q: "What brewing method do you recommend?", a: "Each blend has an ideal brew method printed on the bag. Generally, our light roasts shine with pour-over, mediums are versatile, and darks excel in espresso." },
              ].map((faq, i) => (
                <ScrollReveal key={faq.q} delay={i * 0.05}>
                  <motion.details
                    className="group"
                    style={{
                      background: 'var(--md-sys-color-surface-container-low)',
                      borderRadius: 'var(--md-sys-shape-corner-medium)',
                      border: '1px solid var(--md-sys-color-outline-variant)',
                      overflow: 'hidden',
                    }}
                  >
                    <summary
                      className="flex items-center gap-3 p-4 cursor-pointer list-none md3-title-medium"
                      style={{ color: 'var(--md-sys-color-on-surface)' }}
                    >
                      <md-icon style={{ '--md-icon-size': '20px', color: 'var(--md-sys-color-primary)', flexShrink: 0 } as any}>help</md-icon>
                      <span className="flex-1">{faq.q}</span>
                      <md-icon style={{ '--md-icon-size': '20px', color: 'var(--md-sys-color-on-surface-variant)', transition: 'transform 0.2s ease', flexShrink: 0 } as any} className="group-open:rotate-180">expand_more</md-icon>
                    </summary>
                    <div className="px-4 pb-4 pt-0 ml-8">
                      <p className="md3-body-medium m-0" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>{faq.a}</p>
                    </div>
                  </motion.details>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===== NEWSLETTER ===== */}
        <section className="w-full px-4 md:px-12 mt-20 md:mt-32 mb-20">
          <ScrollReveal>
            <div
              className="max-w-[1040px] mx-auto text-center py-16 px-6"
              style={{ background: 'var(--md-sys-color-surface-container)', borderRadius: 'var(--md-sys-shape-corner-extra-large)' }}
            >
              <md-icon style={{ '--md-icon-size': '48px', color: 'var(--md-sys-color-primary)', marginBottom: '16px' } as any}>mail</md-icon>
              <h3 className="md3-headline-medium m-0 mb-3">Stay in the Loop</h3>
              <p className="md3-body-large m-0 mb-8 mx-auto max-w-md" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                Get updates on new blends, roasting events, and the latest from the M3 Roasters community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center max-w-md mx-auto">
                <md-filled-button>
                  <md-icon slot="icon">notifications_active</md-icon>
                  Subscribe to Newsletter
                </md-filled-button>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>

      {/* ===== FOOTER ===== */}
      <ScrollReveal>
        <footer className="w-full py-12 px-6" style={{ background: 'var(--md-sys-color-surface-container-highest)' }}>
          <div className="max-w-[1040px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <div className="md3-title-medium" style={{ color: 'var(--md-sys-color-on-surface)' }}>M3 Roasters</div>
              <div className="md3-body-medium mt-1" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>&copy; 2026 M3 Roasters. Crafted with Material Design 3.</div>
            </div>
            <div className="flex gap-2">
              <md-icon-button aria-label="Instagram"><md-icon>photo_camera</md-icon></md-icon-button>
              <md-icon-button aria-label="Email"><md-icon>mail</md-icon></md-icon-button>
              <md-icon-button aria-label="Website"><md-icon>public</md-icon></md-icon-button>
            </div>
          </div>
        </footer>
      </ScrollReveal>

      {/* ===== FLOATING ACTION BUTTON ===== */}
      <div className="fixed bottom-6 right-6 z-50">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, ...telegramSpring }}>
          <md-fab label="Book Tour" aria-label="Book Roastery Tour" size="large">
            <md-icon slot="icon">calendar_month</md-icon>
          </md-fab>
        </motion.div>
      </div>

    </div>
  );
}
