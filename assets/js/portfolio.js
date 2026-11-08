/**
 * SAHIR VEERANCHERI PORTFOLIO
 * Modern Vanilla JavaScript — Noir & Crimson Ambient Canvas, Interactive SAAI Explorer, Bento Filter & Clipboard
 */

(function () {
  'use strict';

  // ==========================================================================
  // SOORAJ M S 7-LAYER ENGINEERING STACK DATA
  // ==========================================================================
  const LAYER_DATA = {
    1: {
      badge: 'LAYER 01 // ENTERPRISE DATA ARCHITECTURE',
      title: 'Relational Database & Schema Engineering',
      desc: 'High-throughput database architecture using Microsoft SQL Server and PostgreSQL. Designed normalized schemas, stored procedures, ACID transaction integrity, and index optimization for enterprise ERP workflows.',
      tags: ['MSSQL', 'PostgreSQL', 'ACID Transactions']
    },
    2: {
      badge: 'LAYER 02 // BACKEND REST ENGINE',
      title: 'Scalable RESTful API & Server Services',
      desc: 'Modular Node.js and Express backend infrastructure implementing repository patterns, role-based access control (RBAC), and secure REST endpoints connecting enterprise clients to mission-critical business data.',
      tags: ['Node.js', 'Express.js', 'RESTful APIs']
    },
    3: {
      badge: 'LAYER 03 // REACT & TYPESCRIPT UI',
      title: 'Responsive Frontend Architecture',
      desc: 'Component-driven user interfaces built with React, TypeScript, and modern CSS/Tailwind. Engineered dynamic inventory grids, interactive transaction forms, and real-time state updates.',
      tags: ['React', 'TypeScript', 'Tailwind CSS']
    },
    4: {
      badge: 'LAYER 04 // GEOSPATIAL INTELLIGENCE',
      title: 'WebGIS & Spatial Buffer Processing',
      desc: 'Real-time geospatial application layer leveraging ArcGIS, QGIS, and web mapping APIs. Computes 100-meter buffered safety zones, real-time GPS tracking, and spatial geofence audio-visual alerts.',
      tags: ['ArcGIS', 'QGIS', 'WebGIS Spatial']
    },
    5: {
      badge: 'LAYER 05 // DEEP LEARNING & VISION',
      title: 'Computer Vision & Applied AI Models',
      desc: 'Applied machine learning pipelines utilizing PyTorch, YOLO for real-time video vehicle detection/tracking, and SRNet deep neural architectures for steganalysis detection in digital messaging streams.',
      tags: ['PyTorch', 'YOLO Object Detection', 'Steganalysis SRNet']
    },
    6: {
      badge: 'LAYER 06 // SYSTEM RELIABILITY & SUPPORT',
      title: 'Software Testing & Client Engineering',
      desc: 'Rigorous manual and functional software testing, hardware/printer driver integration (ESC/POS thermal printing), and direct client support diagnosing complex database, installation, and runtime issues at DukeSoft.',
      tags: ['Software Testing', 'Technical Support', 'Hardware Integration']
    },
    7: {
      badge: 'LAYER 07 // DEVOPS & CONTINUOUS DELIVERY',
      title: 'Build Systems, Git & Cloud Deployment',
      desc: 'Modern development workflows using Git, GitHub version control, Vite build optimization, and Netlify/Cloud continuous integration and deployment pipelines.',
      tags: ['Git & GitHub', 'Vite', 'CI/CD Deployment']
    }
  };

  // ==========================================================================
  // AMBIENT NOIR & CRIMSON OP-ART CANVAS (High-DPI & Viewport Optimized)
  // ==========================================================================
  function initAuroraCanvas() {
    const canvas = document.getElementById('aurora-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId = null;
    let isRunning = false;
    let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
    let frame = 0;

    // Atmospheric Crimson Orbs (Red & Noir focus)
    const orbs = [
      { x: 0.35, y: 0.40, radius: 0.50, vx: 0.0003, vy: 0.0002, color: 'rgba(239, 68, 68, 0.14)' },
      { x: 0.70, y: 0.45, radius: 0.42, vx: -0.0002, vy: 0.0003, color: 'rgba(185, 28, 28, 0.10)' },
      { x: 0.50, y: 0.80, radius: 0.48, vx: 0.0002, vy: -0.0002, color: 'rgba(255, 255, 255, 0.03)' }
    ];

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.targetX = e.clientX / width;
      mouse.targetY = e.clientY / height;
    }, { passive: true });

    function render() {
      if (!isRunning) return;
      frame++;

      mouse.x += (mouse.targetX - mouse.x) * 0.04;
      mouse.y += (mouse.targetY - mouse.y) * 0.04;

      ctx.clearRect(0, 0, width, height);

      // Render crimson orbs
      orbs.forEach((orb) => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;

        const px = (orb.x + (mouse.x - 0.5) * 0.06) * width;
        const py = (orb.y + (mouse.y - 0.5) * 0.06) * height;
        const r = orb.radius * Math.min(width, height);

        const gradient = ctx.createRadialGradient(px, py, 0, px, py, r);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Subtle Op-Art Concentric Ambient Rings
      const centerX = width * 0.5 + (mouse.x - 0.5) * 20;
      const centerY = height * 0.45 + (mouse.y - 0.5) * 20;
      const baseR = (frame * 0.4) % 120;

      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const ringRadius = baseR + i * 140;
        const alpha = Math.max(0, 0.04 - (ringRadius / (Math.max(width, height) * 0.7)) * 0.04);
        if (alpha > 0.005) {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    function startLoop() {
      if (!isRunning) {
        isRunning = true;
        render();
      }
    }

    function stopLoop() {
      isRunning = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    }

    startLoop();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    });

    const heroSection = document.getElementById('hero');
    if (heroSection && 'IntersectionObserver' in window) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        });
      }, { threshold: 0.02 });
      heroObserver.observe(heroSection);
    }
  }

  // ==========================================================================
  // SAAI 7-LAYER INTERACTIVE TAB SWITCHER
  // ==========================================================================
  function initLayerTabs() {
    const tabs = document.querySelectorAll('.layer-tab');
    const badgeEl = document.getElementById('layer-inspect-id');
    const titleEl = document.getElementById('layer-inspect-title');
    const descEl = document.getElementById('layer-inspect-desc');
    const tagsEl = document.getElementById('layer-inspect-tags');
    const contentPane = document.getElementById('layer-content');

    if (!tabs.length || !titleEl) return;

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const layerNum = tab.getAttribute('data-layer');
        const data = LAYER_DATA[layerNum];
        if (!data) return;

        tabs.forEach((t) => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');

        if (contentPane) {
          contentPane.style.opacity = '0';
          contentPane.style.transform = 'translateY(6px)';
          contentPane.style.transition = 'opacity 0.18s ease, transform 0.18s ease';

          setTimeout(() => {
            if (badgeEl) badgeEl.textContent = data.badge;
            if (titleEl) titleEl.textContent = data.title;
            if (descEl) descEl.textContent = data.desc;

            if (tagsEl) {
              tagsEl.innerHTML = '';
              data.tags.forEach((tagText) => {
                const span = document.createElement('span');
                span.className = 'tech-tag';
                span.textContent = tagText;
                tagsEl.appendChild(span);
              });
            }

            contentPane.style.opacity = '1';
            contentPane.style.transform = 'translateY(0)';
          }, 180);
        }
      });
    });
  }

  // ==========================================================================
  // BENTO GRID CATEGORY FILTERING (With Smooth Card Transitions)
  // ==========================================================================
  function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    if (!filterButtons.length || !bentoCards.length) return;

    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterButtons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');

        bentoCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const shouldShow = filter === 'all' || category === filter;

          if (shouldShow) {
            card.classList.remove('hidden');
          } else {
            card.classList.add('hidden');
          }
        });
      });
    });
  }

  // ==========================================================================
  // 1-CLICK EMAIL COPY TO CLIPBOARD WITH FLOATING TOAST
  // ==========================================================================
  function initCopyEmail() {
    const copyButtons = document.querySelectorAll('.copy-btn');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    let toastTimeout = null;

    function showToast(message) {
      if (!toast) return;
      if (toastMsg) toastMsg.textContent = message;
      toast.classList.add('show');

      if (toastTimeout) clearTimeout(toastTimeout);
      toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
      }, 3200);
    }

    copyButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const textToCopy = btn.getAttribute('data-copy') || 'soorajmsstudio333@gmail.com';

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy)
            .then(() => {
              showToast(`Copied to clipboard: ${textToCopy}`);
            })
            .catch(() => {
              fallbackCopy(textToCopy);
            });
        } else {
          fallbackCopy(textToCopy);
        }
      });
    });

    function fallbackCopy(text) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand('copy');
        showToast(`Copied to clipboard: ${text}`);
      } catch (err) {
        showToast(`Direct email: ${text}`);
      }
      document.body.removeChild(textarea);
    }
  }

  // ==========================================================================
  // ACTIVE NAVIGATION DOCK SECTION OBSERVER
  // ==========================================================================
  function initScrollObserver() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('section[id]');

    if (!navItems.length || !sections.length || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            if (id === 'hero') {
              navItems.forEach((item) => item.classList.remove('active'));
            } else {
              navItems.forEach((item) => {
                if (item.getAttribute('href') === `#${id}`) {
                  item.classList.add('active');
                } else {
                  item.classList.remove('active');
                }
              });
            }
          }
        });
      },
      { threshold: 0.25, rootMargin: '-20px 0px -40% 0px' }
    );

    sections.forEach((sec) => observer.observe(sec));

    // Smooth scroll for all navigation links and dock CTA
    document.querySelectorAll('.nav-item, .dock-cta, .nav-brand').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            history.pushState(null, '', href);
          }
        }
      });
    });
  }

  // ==========================================================================
  // LIGHTWEIGHT HERO BUILD + SCROLL REVEALS
  // ==========================================================================
  function initMotionReveals() {
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.hero-flank, .hero-center-col').forEach(el => el.classList.add('is-built'));
      document.querySelectorAll('.section-header, .flagship-card, .subgrid-card, .bento-card, .stack-grid > .glass-card, .about-grid, .contact-card').forEach(el => el.classList.add('is-visible'));
      return;
    }

    const heroParts = document.querySelectorAll('.hero-flank, .hero-center-col');
    heroParts.forEach((part) => part.classList.add('hero-build'));
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        heroParts.forEach((part) => part.classList.add('is-built'));
      });
    });

    const revealItems = document.querySelectorAll(
      '.section-header, .flagship-card, .subgrid-card, .bento-card, .stack-grid > .glass-card, .about-grid, .contact-card'
    );

    const observer = new IntersectionObserver((entries, revealObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    revealItems.forEach((item) => {
      item.classList.add('reveal-item');
      observer.observe(item);
    });
  }

  // ==========================================================================
  // BOOTSTRAP ALL MODULES ON DOM READY
  // ==========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initMotionReveals();
    initAuroraCanvas();
    initLayerTabs();
    initProjectFilters();
    initCopyEmail();
    initScrollObserver();
  });

})();
