"use client";

import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

/**
 * MD3 Top App Bar (Small variant, 64dp)
 * 
 * Navigation pattern per spec:
 * - Compact (<600dp): Hamburger icon → opens modal drawer
 * - Expanded (840dp+): Inline nav links, no hamburger
 * 
 * Scroll behavior: elevates to surface-container on scroll (level 2)
 */
export default function TopAppBar() {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const { scrollY } = useScroll();

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark') || 
                   (!document.documentElement.classList.contains('light') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDark ? 'dark' : 'light');
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 0);
  });

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <>
      <header className={`md3-top-app-bar ${scrolled ? 'md3-top-app-bar--scrolled' : ''}`}>
        {/* Hamburger: visible only on compact/medium screens */}
        <div className="block md:hidden" onClick={() => setDrawerOpen(true)}>
          <md-icon-button aria-label="Open menu">
            <md-icon>menu</md-icon>
          </md-icon-button>
        </div>

        <h1 className="md3-top-app-bar__title md3-title-large">
          M3 Roasters
        </h1>

        {/* Desktop inline navigation — visible on expanded+ (840dp) */}
        <nav className="hidden md:flex items-center gap-1 mr-2">
          <md-text-button href="#story">Our Story</md-text-button>
          <md-text-button href="#roastery">The Roastery</md-text-button>
          <md-text-button href="#subscribe">Subscribe</md-text-button>
          <md-text-button href="#contact">Contact</md-text-button>
        </nav>

        {/* Theme Toggle — visible constantly */}
        <div onClick={toggleTheme}>
          <md-icon-button aria-label="Toggle theme">
            <md-icon>{theme === 'dark' ? 'light_mode' : 'dark_mode'}</md-icon>
          </md-icon-button>
        </div>
      </header>

      {/* Mobile Modal Drawer (scrim + side panel) */}
      {drawerOpen && (
        <motion.div
          className="fixed inset-0 z-[100] flex"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Scrim */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
          />

          {/* Drawer panel */}
          <motion.aside
            className="relative z-10 w-[320px] max-w-[85vw] h-full flex flex-col"
            style={{
              background: 'var(--md-sys-color-surface-container)',
              borderTopRightRadius: 'var(--md-sys-shape-corner-large)',
              borderBottomRightRadius: 'var(--md-sys-shape-corner-large)',
            }}
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
          >
            {/* Drawer headline */}
            <div className="p-6 pb-2">
              <span className="md3-title-medium" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
                M3 Roasters
              </span>
            </div>

            {/* Drawer items */}
            <nav className="flex flex-col py-2">
              {[
                { icon: 'auto_stories', label: 'Our Story', id: 'story' },
                { icon: 'factory', label: 'The Roastery', id: 'roastery' },
                { icon: 'shopping_bag', label: 'Subscribe', id: 'subscribe' },
                { icon: 'mail', label: 'Contact', id: 'contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={`#${item.id}`}
                  className="flex items-center gap-3 px-6 py-3 text-left hover:bg-[color-mix(in_srgb,var(--md-sys-color-on-surface)_8%,transparent)] transition-colors no-underline block"
                  style={{
                    color: 'var(--md-sys-color-on-surface-variant)',
                    background: 'transparent',
                    textDecoration: 'none',
                  }}
                  onClick={() => setDrawerOpen(false)}
                >
                  <md-icon>{item.icon}</md-icon>
                  <span className="md3-label-large">{item.label}</span>
                </a>
              ))}
            </nav>
          </motion.aside>
        </motion.div>
      )}
    </>
  );
}
