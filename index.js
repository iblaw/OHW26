document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     0. BANISH BROWSER FILE:// CROSS-FRAME ORIGIN SECURITY ERROR & ADD SMOOTH SCROLL
     ========================================================================== */
  const mainNavbar = document.getElementById('main-navbar');
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const href = this.getAttribute('href');
      
      if (href === '#') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        const navbarHeight = mainNavbar ? mainNavbar.offsetHeight : 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  /* ==========================================================================
     0.1. INTERACTIVE MOUSE BACKGROUND GLOW SPOTLIGHT
     ========================================================================== */
  const mouseGlow = document.getElementById('mouse-glow');
  if (mouseGlow) {
    window.addEventListener('mousemove', (e) => {
      // Offset by half of width/height (175px) to center spotlight on cursor
      mouseGlow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    });
  }

  /* ==========================================================================
     0.5. FADED MULTICOLOR PROCEDURAL FRACTAL & SACRED ORBITS CANVAS
     ========================================================================== */
  const fractalCanvas = document.getElementById('bg-fractal-canvas');
  if (fractalCanvas) {
    const ctx = fractalCanvas.getContext('2d');
    let width = 0;
    let height = 0;
    let dpr = window.devicePixelRatio || 1;
    
    // Smooth incremental accumulators to guarantee continuous movement without jumps
    let animTime = 0;
    let dnaRotation = 0; 
    let ecgTime = 0;     

    // Coordinate points for mouse proximity detection
    let mouseX = -1000;
    let mouseY = -1000;

    function resizeCanvas() {
      dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Scale canvas buffer for high-DPI screens (crisp mathematical lines)
      fractalCanvas.width = width * dpr;
      fractalCanvas.height = height * dpr;
      
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse movement event tracking inside background canvas
    window.addEventListener('mousemove', (e) => {
      const rect = fractalCanvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Define several clinical cardiac rhythms to cycle through in background
    const cardiacRhythms = [
      {
        id: 'sinus',
        name: 'normal sinus rhythm',
        bpm: 72,
        speed: 72 / 3600, // Clinically accurate 72 BPM sweep speed at 60fps
        scale: 1.0,
        desc: '72 bpm — normal cardiac conduction'
      },
      {
        id: 'tachycardia',
        name: 'sinus tachycardia',
        bpm: 115,
        speed: 115 / 3600, // Clinically accurate 115 BPM
        scale: 0.9,
        desc: '115 bpm — rapid physiological response'
      },
      {
        id: 'bradycardia',
        name: 'sinus bradycardia',
        bpm: 48,
        speed: 48 / 3600, // Clinically accurate 48 BPM
        scale: 1.15,
        desc: '48 bpm — deep restorative resting state'
      },
      {
        id: 'afib',
        name: 'atrial fibrillation',
        bpm: 125,
        speed: 125 / 3600, // Clinically accurate 125 BPM (Irregular)
        scale: 0.85,
        desc: 'irregularly irregular conduction with quivering baseline'
      },
      {
        id: 'vtach',
        name: 'ventricular tachycardia',
        bpm: 155,
        speed: 155 / 3600, // Clinically accurate 155 BPM
        scale: 1.25,
        desc: '155 bpm — emergency wide-complex ventricular focus!'
      }
    ];

    let prevRhythmIndex = 0;
    let currentRhythmIndex = 0;
    let transitionProgress = 1.0; // Starts fully morphed (1.0)
    
    // Auto-cycle through the clinical heart rhythms every 8.5 seconds
    setInterval(() => {
      prevRhythmIndex = currentRhythmIndex;
      currentRhythmIndex = (currentRhythmIndex + 1) % cardiacRhythms.length;
      transitionProgress = 0.0; // Reset progress to start a smooth morph transition!
    }, 8500);

    function getECGValue(phase, rhythmId) {
      // Bulletproof fractional modulo that handles negative phases and float rounding flawlessly
      const p = phase - Math.floor(phase);
      
      if (rhythmId === 'vtach') {
        // Ventricular Tachycardia (continuous wide-complex sawtooth wave, no flat baseline)
        return Math.sin(p * Math.PI * 2) * 0.75 + Math.sin(p * Math.PI * 4) * 0.25;
      }
      
      let quiver = 0;
      if (rhythmId === 'afib') {
        // Atrial Fibrillation baseline has quivering fibrillatory waves (noise)
        quiver = Math.sin(phase * 40) * 0.05 + Math.cos(phase * 22) * 0.02;
      }
      
      // Standard wave progression (P, Q, R, S, T)
      if (p > 0.1 && p < 0.2) {
        // P-wave (Atrial depolarization) - missing/quivering in AFib
        if (rhythmId === 'afib') return quiver;
        return 0.12 * Math.sin((p - 0.1) / 0.1 * Math.PI) + quiver;
      }
      if (p > 0.26 && p < 0.28) {
        // Q-wave (brief dip)
        return -0.15 * Math.sin((p - 0.26) / 0.02 * Math.PI) + quiver;
      }
      if (p > 0.28 && p < 0.32) {
        // R-spike (Ventricular depolarization contraction!)
        return 1.35 * Math.sin((p - 0.28) / 0.04 * Math.PI) + quiver;
      }
      if (p > 0.32 && p < 0.35) {
        // S-wave (deep dip)
        return -0.35 * Math.sin((p - 0.32) / 0.03 * Math.PI) + quiver;
      }
      if (p > 0.42 && p < 0.55) {
        // T-wave (Ventricular repolarization)
        return 0.22 * Math.sin((p - 0.42) / 0.13 * Math.PI) + quiver;
      }
      return quiver;
    }

    function drawProceduralMath() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // Increment transition progress
      if (transitionProgress < 1.0) {
        transitionProgress += 0.012; // Complete transition over ~80 frames (~1.3 seconds)
        if (transitionProgress > 1.0) transitionProgress = 1.0;
      }

      // Smooth cosine easing curve for morphing
      const t = (1 - Math.cos(transitionProgress * Math.PI)) / 2;

      const prevRhythm = cardiacRhythms[prevRhythmIndex];
      const targetRhythm = cardiacRhythms[currentRhythmIndex];

      // Interpolate speed and scale variables for organic transitions
      const currentSpeed = prevRhythm.speed + (targetRhythm.speed - prevRhythm.speed) * t;
      const currentScale = prevRhythm.scale + (targetRhythm.scale - prevRhythm.scale) * t;

      // --- 1. PROCEDURAL 3D TWISTING DNA DOUBLE HELIX ---
      // Floats diagonally from upper-left to lower-right to create cellular depth
      const numNodes = Math.min(Math.floor(width / 35), 45); 
      const startX = width * 0.08;
      const endX = width * 0.92;
      const startY = height * 0.12;
      const endY = height * 0.88;
      
      const dx = endX - startX;
      const dy = endY - startY;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      const px = -(dy / length);
      const py = dx / length;

      for (let i = 0; i < numNodes; i++) {
        const tRatio = i / (numNodes - 1);
        const x = startX + dx * tRatio;
        const y = startY + dy * tRatio;
        
        // Helix twist rate (using separate continuous dnaRotation accumulator to prevent spins)
        const twistAngle = tRatio * Math.PI * 6.5 + dnaRotation;
        const offsetDist = Math.sin(twistAngle) * 65; 
        const depth = Math.cos(twistAngle); 
        
        // Base coordinates for backbone node A & B
        let xa = x + px * offsetDist;
        let ya = y + py * offsetDist;
        let xb = x - px * offsetDist;
        let yb = y - py * offsetDist;

        // Interactive mouse repelling deflection for DNA strands
        let forceGlowA = 0;
        let forceGlowB = 0;
        
        if (mouseX > -500 && mouseY > -500) {
          const distA = Math.hypot(xa - mouseX, ya - mouseY);
          const distB = Math.hypot(xb - mouseX, yb - mouseY);
          
          // Repel Strand A
          if (distA < 140) {
            const force = (140 - distA) / 140; // 0 to 1
            const angle = Math.atan2(ya - mouseY, xa - mouseX);
            xa += Math.cos(angle) * force * 26; // Push node away
            ya += Math.sin(angle) * force * 26;
            forceGlowA = force * 15; // Extra interactive glow
          }
          
          // Repel Strand B
          if (distB < 140) {
            const force = (140 - distB) / 140;
            const angle = Math.atan2(yb - mouseY, xb - mouseX);
            xb += Math.cos(angle) * force * 26;
            yb += Math.sin(angle) * force * 26;
            forceGlowB = force * 15;
          }
        }
        
        const sizeA = (depth + 1) * 3 + 2.5; 
        const sizeB = (-depth + 1) * 3 + 2.5;
        
        const alphaA = (depth + 1) * 0.38 + 0.15; 
        const alphaB = (-depth + 1) * 0.38 + 0.15;

        // Draw nucleotide rung connection (hydrogen bonds)
        if (i % 2 === 0) {
          ctx.beginPath();
          ctx.moveTo(xa, ya);
          ctx.lineTo(xb, yb);
          
          const rungGrad = ctx.createLinearGradient(xa, ya, xb, yb);
          rungGrad.addColorStop(0, `rgba(103, 184, 132, ${alphaA * 0.3})`); 
          rungGrad.addColorStop(0.5, `rgba(255, 194, 71, ${Math.min(alphaA, alphaB) * 0.4})`); 
          rungGrad.addColorStop(1, `rgba(243, 127, 27, ${alphaB * 0.3})`); 
          
          ctx.strokeStyle = rungGrad;
          ctx.lineWidth = 1.3;
          ctx.stroke();
        }

        // Draw backbone node A (Teal)
        ctx.beginPath();
        ctx.arc(xa, ya, sizeA, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(103, 184, 132, ${alphaA * 0.8})`;
        ctx.shadowBlur = sizeA * 0.8 + forceGlowA;
        ctx.shadowColor = 'rgba(103, 184, 132, 0.45)';
        ctx.fill();
        
        // Draw backbone node B (Orange)
        ctx.beginPath();
        ctx.arc(xb, yb, sizeB, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(243, 127, 27, ${alphaB * 0.8})`;
        ctx.shadowBlur = sizeB * 0.8 + forceGlowB;
        ctx.shadowColor = 'rgba(243, 127, 27, 0.45)';
        ctx.fill();
        
        ctx.shadowBlur = 0;
      }

      // --- 2. GLOWING ECG HEARTBEAT VITAL SIGN TRACE ---
      // Sits gracefully in the lower third of the viewport
      const ecgY = height * 0.76;
      const ecgAmplitude = Math.min(width * 0.08, 75); 
      
      ctx.beginPath();
      ctx.lineWidth = 1.8;
      
      const ecgGrad = ctx.createLinearGradient(0, 0, width, 0);
      ecgGrad.addColorStop(0, 'rgba(103, 184, 132, 0.08)');
      ecgGrad.addColorStop(0.4, 'rgba(103, 184, 132, 0.75)'); 
      ecgGrad.addColorStop(0.5, 'rgba(255, 194, 71, 0.80)'); // Pulsing gold spike
      ecgGrad.addColorStop(0.6, 'rgba(103, 184, 132, 0.75)');
      ecgGrad.addColorStop(1, 'rgba(103, 184, 132, 0.08)');
      
      ctx.strokeStyle = ecgGrad;
      ctx.shadowBlur = 10;
      ctx.shadowColor = 'rgba(103, 184, 132, 0.35)';

      for (let x = 0; x < width; x += 3.5) {
        const xRatio = x / width;
        
        // Phase values utilizing continuous, smooth ecgTime accumulator (zero slides/jerks)
        let phasePrev = xRatio * 2.8 - ecgTime;
        let phaseTarget = xRatio * 2.8 - ecgTime;
        
        if (prevRhythm.id === 'afib') {
          phasePrev += Math.sin(xRatio * 8 + ecgTime * 0.5) * 0.14 + Math.cos(xRatio * 3.5 - ecgTime * 0.3) * 0.08;
        }
        if (targetRhythm.id === 'afib') {
          phaseTarget += Math.sin(xRatio * 8 + ecgTime * 0.5) * 0.14 + Math.cos(xRatio * 3.5 - ecgTime * 0.3) * 0.08;
        }
        
        // Compute EKG value at both points, then LERP between them based on active transition factor t
        const valPrev = getECGValue(phasePrev, prevRhythm.id);
        const valTarget = getECGValue(phaseTarget, targetRhythm.id);
        const val = valPrev + (valTarget - valPrev) * t;
        
        // Local interactive vital spike boost + action potential sparks near cursor
        let ampFactor = 1.0;
        let actionPotentialSparks = 0;
        
        if (mouseX > -500 && mouseY > -500) {
          const xDist = Math.abs(x - mouseX);
          const yDist = Math.abs(ecgY - mouseY);
          
          if (xDist < 150 && yDist < 150) {
            const proximity = ((150 - xDist) / 150) * ((150 - yDist) / 150);
            ampFactor = 1.0 + proximity * 0.65; // Boost vital waves height up to 65% when hovered!
            
            // Dynamic neurological impulse sparks
            actionPotentialSparks = Math.sin(x * 0.55 + animTime * 15) * 8 * proximity;
          }
        }
        
        const y = ecgY - val * ecgAmplitude * currentScale * ampFactor + actionPotentialSparks;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // --- 3. AMBIENT CLINICAL HUD READOUT (FADING TRANSITIONS) ---
      // Description text fades out, switches, and fades in at midpoint of the wave morph
      let textAlpha = 0.45;
      let displayRhythm = targetRhythm;
      
      if (t < 0.5) {
        // Fade out previous label
        textAlpha = 0.45 * (1 - t * 2);
        displayRhythm = prevRhythm;
      } else {
        // Fade in target label
        textAlpha = 0.45 * ((t - 0.5) * 2);
        displayRhythm = targetRhythm;
      }

      ctx.fillStyle = `rgba(103, 184, 132, ${textAlpha})`;
      ctx.font = "500 11px 'Manrope', sans-serif";
      ctx.letterSpacing = '0.15em';
      ctx.textAlign = 'left';
      
      const hudText = `vitals: ${displayRhythm.name} (${displayRhythm.bpm} bpm) — ${displayRhythm.desc}`;
      const textX = width > 768 ? 40 : 20;
      ctx.fillText(hudText.toLowerCase(), textX, height - 35);

      // Increment accumulators organically on a frames delta basis rather than multiplying totals by speed
      dnaRotation += 0.004 + currentSpeed * 0.08; // Keep DNA rotation slow, smooth, and elegant
      ecgTime += currentSpeed;                    // Sweep EKG line at its actual, clinically accurate heart rate
      animTime += 0.003; 
      requestAnimationFrame(drawProceduralMath);
    }

    // Begin mathematical render loop
    requestAnimationFrame(drawProceduralMath);
  }

  /* ==========================================================================
     1. COMPACT SCROLLING NAVBAR EFFECT
     ========================================================================== */
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. HIGH-PERFORMANCE 60FPS SCROLL REVEALS
     ========================================================================== */
  const revealElements = document.querySelectorAll('.scroll-reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, we don't need to observe it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters view fully
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================================================
     3. INTERACTIVE HOUSE SELECTOR (THURSDAY SPORTS & COOKING)
     ========================================================================== */
  const houseButtons = document.querySelectorAll('.house-btn');
  const previewBox = document.getElementById('house-preview-box');
  const cardThursday = document.getElementById('card-thursday');
  const thursdayImg = document.getElementById('thursday-visual-img');
  const emblemBadge = document.getElementById('thursday-emblem-badge');
  const particleEmitter = document.getElementById('thursday-particle-emitter');

  const houseData = {
    phoenix: {
      color: '#ef4444',
      filter: 'sepia(0.2) saturate(1.8) hue-rotate(335deg) brightness(0.65)',
      emblem: `<svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="emblem-svg"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
      text: '<strong style="color: #f87171;">Phoenix 🔥:</strong> Armed in burning red. Unstoppable, relentless, and always rising from the clinical ashes to claim absolute athletic glory.'
    },
    diamond: {
      color: '#ffffff',
      filter: 'grayscale(0.65) brightness(0.85) contrast(1.15)',
      emblem: `<svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="emblem-svg"><path d="M6 3h12l4 6-10 12L2 9z"/><path d="M11 3 8 9l3 12"/><path d="M13 3l3 9-3 9"/><path d="M2 9h20"/></svg>`,
      text: '<strong style="color: #ffffff;">Diamond 💎:</strong> Cloaked in brilliant white. Sharp, unbreakable, crystalline under pressure, and ready to outsparkle the entire campus.'
    },
    titans: {
      color: '#67b884',
      filter: 'sepia(0.15) saturate(1.4) hue-rotate(95deg) brightness(0.65)',
      emblem: `<svg viewBox="0 0 24 24" fill="none" stroke="#67b884" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="emblem-svg"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
      text: '<strong style="color: #67b884;">Titans ⚡:</strong> Charged in athletic green. Powerful, giants of the field, dominating and taking no prisoners in the search for glory.'
    },
    aqua: {
      color: '#3b82f6',
      filter: 'sepia(0.1) saturate(1.5) hue-rotate(185deg) brightness(0.6)',
      emblem: `<svg viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="emblem-svg"><path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.5 0 2.5 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/></svg>`,
      text: '<strong style="color: #60a5fa;">Aqua 🌊:</strong> Flowing in deep blue. Deep, fluid, master of strategy, sweeping over opponents like a massive tidal wave.'
    }
  };

  let particleTimer = null;

  function spawnParticles(color) {
    if (!particleEmitter) return;
    if (particleTimer) clearInterval(particleTimer);
    particleEmitter.innerHTML = '';
    
    // Initial burst
    for (let i = 0; i < 10; i++) {
      createParticle(color);
    }
    
    // Constant slow float
    particleTimer = setInterval(() => {
      createParticle(color);
    }, 250);
  }

  function createParticle(color) {
    if (!particleEmitter || particleEmitter.children.length > 25) return;
    
    const p = document.createElement('div');
    p.className = 'visual-particle';
    
    const size = Math.random() * 5 + 3;
    const left = Math.random() * 90 + 5;
    const drift = (Math.random() * 60 - 30) + 'px';
    const scale = Math.random() * 0.5 + 0.7;
    const delay = Math.random() * 0.4;
    
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    p.style.left = left + '%';
    p.style.background = color;
    p.style.boxShadow = `0 0 10px ${color}`;
    p.style.setProperty('--particle-drift', drift);
    p.style.setProperty('--particle-scale', scale);
    p.style.animationDelay = delay + 's';
    
    particleEmitter.appendChild(p);
    
    setTimeout(() => {
      p.remove();
    }, 3000);
  }

  function updateHouseVisual(house) {
    const data = houseData[house];
    if (!data) return;

    // Apply color filter to base sports day photo
    if (thursdayImg) {
      thursdayImg.style.filter = data.filter;
    }

    // Populate and trigger emblem badge entry
    if (emblemBadge) {
      emblemBadge.innerHTML = data.emblem;
      emblemBadge.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.5), 0 0 35px ${data.color}`;
      emblemBadge.style.borderColor = `rgba(${hexToRgb(data.color)}, 0.35)`;
      emblemBadge.classList.remove('active');
      void emblemBadge.offsetWidth; // Reflow to reset transition
      emblemBadge.classList.add('active');
    }

    // Spawn floating colorful visual particles
    spawnParticles(data.color);
  }

  houseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      houseButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const house = btn.getAttribute('data-house');
      const data = houseData[house];
      
      // Update text preview with fading
      previewBox.style.opacity = 0;
      setTimeout(() => {
        previewBox.innerHTML = data.text;
        previewBox.style.opacity = 1;
      }, 150);

      // Inject custom CSS variable to highlight the card dynamically
      cardThursday.style.borderColor = `rgba(${hexToRgb(data.color)}, 0.25)`;
      cardThursday.style.boxShadow = `0 15px 40px rgba(${hexToRgb(data.color)}, 0.04)`;
      
      // Update sports day visual (color filter, beating emblem SVG, float particles)
      updateHouseVisual(house);
    });
  });

  // Initialize Thursday Sports Day card with Phoenix default on load
  setTimeout(() => {
    updateHouseVisual('phoenix');
    const phoenixColor = houseData.phoenix.color;
    cardThursday.style.borderColor = `rgba(${hexToRgb(phoenixColor)}, 0.25)`;
    cardThursday.style.boxShadow = `0 15px 40px rgba(${hexToRgb(phoenixColor)}, 0.04)`;
  }, 100);

  // Helper function to convert Hex to RGB values
  function hexToRgb(hex) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  }

  /* ==========================================================================
     4. DINNER PASSPORT WITH MASK PRICE TOGGLE
     ========================================================================== */
  const dinnerMaskToggle = document.getElementById('dinner-mask-toggle');
  const dinnerPriceDisplay = document.getElementById('dinner-dynamic-price');
  const btnBuyDinner = document.getElementById('btn-buy-dinner');

  if (dinnerMaskToggle) {
    dinnerMaskToggle.addEventListener('change', () => {
      if (dinnerMaskToggle.checked) {
        dinnerPriceDisplay.textContent = '₦7,000';
        dinnerPriceDisplay.nextElementSibling.textContent = 'w/ Mask included';
        btnBuyDinner.setAttribute('data-package', 'Dinner Only (With Mask)');
      } else {
        dinnerPriceDisplay.textContent = '₦6,000';
        dinnerPriceDisplay.nextElementSibling.textContent = 'Without Mask option';
        btnBuyDinner.setAttribute('data-package', 'Dinner Only (Without Mask)');
      }
    });
  }

  /* ==========================================================================
     5. DUAL COUNTDOWN WIDGET LOGIC
     ========================================================================== */
  const countdownTabs = document.querySelectorAll('.countdown-tab-btn');
  const timerDays = document.getElementById('timer-days');
  const timerHours = document.getElementById('timer-hours');
  const timerMinutes = document.getElementById('timer-minutes');
  const timerSeconds = document.getElementById('timer-seconds');

  // Absolute deadlines in GMT+1 (Nigeria time) as requested for 2026:
  // - Cooking Registration Deadline: May 31st, 2026 at 23:59:59
  // - Early Bird Deadline: June 2nd, 2026 at 23:59:59
  const deadlines = {
    'early-bird': new Date('2026-06-02T23:59:59+01:00').getTime(),
    'cooking': new Date('2026-05-31T23:59:59+01:00').getTime()
  };

  let currentTarget = 'early-bird';
  let timerInterval = null;

  // Check deadlines dynamically on every tick to close cooking and switch to late pricing
  function checkDeadlines() {
    const now = new Date().getTime();
    
    // 1. Cooking Registration Auto-Close (May 31st)
    const btnBuyCooking = document.getElementById('btn-buy-cooking');
    const cookingOption = document.querySelector('#reg-package option[value="Class Cooking Team Entry"]');
    
    if (now > deadlines['cooking']) {
      if (btnBuyCooking && !btnBuyCooking.classList.contains('closed')) {
        btnBuyCooking.classList.add('closed');
        btnBuyCooking.disabled = true;
        btnBuyCooking.style.background = 'rgba(255, 255, 255, 0.02)';
        btnBuyCooking.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        btnBuyCooking.style.color = 'var(--white-muted)';
        btnBuyCooking.style.cursor = 'not-allowed';
        btnBuyCooking.style.pointerEvents = 'none';
        btnBuyCooking.textContent = 'Registration Closed 🔒';
        
        if (cookingOption) {
          cookingOption.disabled = true;
          cookingOption.textContent = 'Cooking Team Registration (Closed 🔒)';
        }
      }
    }

    // 2. Early Bird Auto-Switch to Late Registration Pricing (June 2nd)
    const priceCardFull = document.getElementById('price-card-full');
    const warningBanner = document.getElementById('earlybird-warning');
    const footerSecondaryCta = document.getElementById('footer-secondary-cta');
    const navCtaBtn = document.getElementById('nav-cta-btn');
    const heroPrimaryCta = document.getElementById('hero-primary-cta');
    const fullExpOption = document.querySelector('#reg-package option[value="Full Experience"]');
    
    if (now > deadlines['early-bird']) {
      if (priceCardFull) {
        const amountEl = priceCardFull.querySelector('.price-amount');
        const subtextEl = priceCardFull.querySelector('.price-subtext');
        if (amountEl && amountEl.textContent !== '₦13,000') {
          amountEl.textContent = '₦13,000';
          if (subtextEl) subtextEl.textContent = 'Late Registration';
          priceCardFull.style.borderColor = 'rgba(255, 194, 71, 0.2)';
        }
      }

      if (warningBanner && !warningBanner.classList.contains('eb-ended')) {
        warningBanner.classList.add('eb-ended');
        warningBanner.style.background = 'rgba(255, 194, 71, 0.06)';
        warningBanner.style.borderColor = 'rgba(255, 194, 71, 0.15)';
        warningBanner.style.color = 'var(--velvet-gold)';
        warningBanner.innerHTML = `<span style="font-size: 20px;">ℹ️</span> <strong>Early Bird has ended. Late Registration rates are now active.</strong>`;
      }

      if (footerSecondaryCta && footerSecondaryCta.textContent !== 'Lock In My Pass') {
        footerSecondaryCta.textContent = 'Lock In My Pass';
      }
      if (navCtaBtn && navCtaBtn.textContent !== 'Get Your Pass') {
        navCtaBtn.textContent = 'Get Your Pass';
      }
      if (heroPrimaryCta && heroPrimaryCta.textContent.trim() !== 'Get Your Pass') {
        heroPrimaryCta.innerHTML = `Get Your Pass <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="arrow-icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>`;
      }

      if (fullExpOption && !fullExpOption.textContent.includes('13,000')) {
        fullExpOption.textContent = 'Package 1: The Full Experience (₦13,000)';
      }
    }
  }

  function updateTimer() {
    const now = new Date().getTime();
    
    // Always check deadline status and update DOM elements
    checkDeadlines();

    const difference = deadlines[currentTarget] - now;

    if (difference <= 0) {
      timerDays.textContent = '00';
      timerHours.textContent = '00';
      timerMinutes.textContent = '00';
      timerSeconds.textContent = '00';
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    timerDays.textContent = String(days).padStart(2, '0');
    timerHours.textContent = String(hours).padStart(2, '0');
    timerMinutes.textContent = String(minutes).padStart(2, '0');
    timerSeconds.textContent = String(seconds).padStart(2, '0');
  }


  // Handle switching tabs and active package filtering
  const timerDeadlineLabel = document.getElementById('timer-deadline-label');
  const priceCardFull = document.getElementById('price-card-full');
  const priceCardDinner = document.getElementById('price-card-dinner');
  const priceCardBasic = document.getElementById('price-card-basic');
  const priceCardCooking = document.getElementById('price-card-cooking');

  countdownTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      countdownTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      currentTarget = tab.getAttribute('data-target');
      
      // Update colors, labels, and package filtering
      if (currentTarget === 'cooking') {
        timerDays.style.color = 'var(--culinary-orange)';
        timerHours.style.color = 'var(--culinary-orange)';
        timerMinutes.style.color = 'var(--culinary-orange)';
        timerSeconds.style.color = 'var(--culinary-orange)';

        if (timerDeadlineLabel) {
          timerDeadlineLabel.textContent = 'Countdown to Cooking Competition Registration Deadline';
          timerDeadlineLabel.style.color = 'var(--culinary-orange)';
        }

        // Hide individual passes, show cooking competition entry card
        if (priceCardFull) priceCardFull.style.display = 'none';
        if (priceCardDinner) priceCardDinner.style.display = 'none';
        if (priceCardBasic) priceCardBasic.style.display = 'none';
        if (priceCardCooking) priceCardCooking.style.display = 'flex';
      } else {
        timerDays.style.color = 'var(--velvet-gold)';
        timerHours.style.color = 'var(--velvet-gold)';
        timerMinutes.style.color = 'var(--velvet-gold)';
        timerSeconds.style.color = 'var(--velvet-gold)';

        if (timerDeadlineLabel) {
          timerDeadlineLabel.textContent = 'Countdown to Early Bird Deadline';
          timerDeadlineLabel.style.color = 'var(--velvet-gold)';
        }

        // Show only Full Experience individual pass, hide the rest
        if (priceCardFull) priceCardFull.style.display = 'flex';
        if (priceCardDinner) priceCardDinner.style.display = 'none';
        if (priceCardBasic) priceCardBasic.style.display = 'none';
        if (priceCardCooking) priceCardCooking.style.display = 'none';
      }

      updateTimer();
    });
  });

  // Initialize default pricing card grid filter state (hide cooking card initially)
  if (priceCardCooking) {
    priceCardCooking.style.display = 'none';
  }

  // Start Countdown interval
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);

  /* ==========================================================================
     6. ULTRA-MINIMAL REGISTRATION MODAL CONTROLLER
     ========================================================================== */
  const checkoutModal = document.getElementById('checkout-modal');
  const btnCloseModal = document.getElementById('btn-modal-close');
  const modalTriggers = document.querySelectorAll('.trigger-register-modal');
  const packageSelect = document.getElementById('reg-package');
  const registrationForm = document.getElementById('payment-registration-form');
  const allPackageOptions = packageSelect ? Array.from(packageSelect.options) : [];

  // Open Modal logic with package pre-selection
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const selectedPkg = trigger.getAttribute('data-package');
      
      if (selectedPkg && packageSelect) {
        packageSelect.value = selectedPkg;
      }
      
      checkoutModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Lock background scroll
    });
  });

  // Close Modal logic
  function closeModal() {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Release scroll
    registrationForm.reset();
  }

  // Sticky Warning Bar Close Controller
  const stickyWarningBar = document.getElementById('earlybird-sticky-bar');
  const btnCloseStickyWarning = document.getElementById('btn-close-sticky-warning');
  if (btnCloseStickyWarning && stickyWarningBar) {
    btnCloseStickyWarning.addEventListener('click', () => {
      stickyWarningBar.style.transform = 'translate3d(0, 100%, 0)';
      stickyWarningBar.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      setTimeout(() => {
        stickyWarningBar.remove();
      }, 400);
    });
  }

  btnCloseModal.addEventListener('click', closeModal);
  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      closeModal();
    }
  });

  // Support ESC key close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && checkoutModal.classList.contains('active')) {
      closeModal();
    }
  });

  /* ==========================================================================
     7. TOAST NOTIFICATION CREATION ENGINE
     ========================================================================== */
  const toastOutlet = document.getElementById('toast-outlet');

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = document.createElement('span');
    icon.className = 'toast-icon';
    icon.textContent = '🚀';
    
    const text = document.createElement('span');
    text.className = 'toast-text';
    text.textContent = message;

    toast.appendChild(icon);
    toast.appendChild(text);
    toastOutlet.appendChild(toast);

    // Fade out and remove after 3 seconds
    setTimeout(() => {
      toast.classList.add('toast-out');
      toast.addEventListener('animationend', () => {
        toast.remove();
      });
    }, 3000);
  }

  /* ==========================================================================
     8. FORM VALIDATION & DYNAMIC WHATSAPP CHECKOUT REDIRECT ROUTING
     ========================================================================== */
  registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('reg-name').value.trim();
    const classVal = document.getElementById('reg-class').value;
    const emailVal = document.getElementById('reg-email').value.trim();
    const packageVal = document.getElementById('reg-package').value;

    // Basic Input Validations
    if (!nameVal || !classVal || !emailVal || !packageVal) {
      alert('Please fill out all fields correctly to proceed.');
      return;
    }

    if (!validateEmail(emailVal)) {
      alert('Please enter a valid email address.');
      return;
    }

    const nowTime = new Date().getTime();

    // Security Block: prevent submission of expired cooking entries
    if (packageVal === 'Class Cooking Team Entry' && nowTime > deadlines['cooking']) {
      alert('Cooking Competition registration has closed! Please select another package.');
      return;
    }

    // Determine WhatsApp destination phone number
    let targetPhone = '+2347032558781'; // Default: Rapha (Chairman)
    let contactName = 'Rapha';
    let textMessage = '';

    if (packageVal === 'Class Cooking Team Entry') {
      targetPhone = '2348072798645'; // McDonald (Vice Chairman)
      contactName = 'McDonald';
      
      // Compile class cooking battle receipt message
      textMessage = `🍳 Hello ${contactName}! I'd like to register our Class Cooking Team for the OSUMSA HW'26 Cooking Battle. Here are our registration details:

- *Team Representative*: ${nameVal}
- *Class/Level*: ${classVal}
- *Email*: ${emailVal}
- *Registration Fee*: ₦10,000 (Class Cooking Entry)

Please confirm our cooking registration slot! 🍲`;
    } else {
      targetPhone = '2347032558781'; // Rapha
      contactName = 'Rapha';
      
      // Map package names to readable pricing for ticket receipts (Late registration auto-switches value)
      let mappedPrice = '₦11,000';
      if (packageVal === 'Full Experience') {
        const isLate = nowTime > deadlines['early-bird'];
        mappedPrice = isLate ? '₦13,000' : '₦11,000';
      }
      if (packageVal === 'Dinner Only (With Mask)') mappedPrice = '₦7,000';
      if (packageVal === 'Dinner Only (Without Mask)') mappedPrice = '₦6,000';
      if (packageVal === 'Conference & Sports Only') mappedPrice = '₦5,000';

      // Compile standard access ticket receipt message
      textMessage = `👋 Hello ${contactName}! I'd like to confirm my reservation for OSUMSA Health Week 2026. Here are my ticket details:

- *Name*: ${nameVal}
- *Class/Level*: ${classVal}
- *Email*: ${emailVal}
- *Ticket Pass*: ${packageVal} (${mappedPrice})

Please guide me on confirming my spot and completing payment! 🎟️`;
    }

    // Fire sleek colorful popup status Toast
    showToast(`Redirecting to WhatsApp to finalize your booking with ${contactName}!`);

    // Clean and Close Modal after short delay
    setTimeout(() => {
      closeModal();
      
      // Compile clean URL and redirect in new tab
      const encodedMsg = encodeURIComponent(textMessage);
      const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
    }, 1200);
  });

  /* ==========================================================================
     9. MOBILE NAVIGATION MENU TOGGLE CONTROLLER
     ========================================================================== */
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('navbar-links-container');
  const mobileNavLinks = document.querySelectorAll('.nav-links .nav-link, .nav-links .nav-cta-mobile');

  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isActive = mobileMenuBtn.classList.contains('active');
      
      mobileMenuBtn.classList.toggle('active');
      navLinksContainer.classList.toggle('active');
      mobileMenuBtn.setAttribute('aria-expanded', !isActive);
    });

    // Close mobile menu when clicking outside of the navbar
    document.addEventListener('click', (e) => {
      if (navLinksContainer.classList.contains('active') && !e.target.closest('#main-navbar')) {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // Close menu when a navigation item is clicked
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Basic regex email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

});
