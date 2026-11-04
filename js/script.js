/* =========================================================
   MOHD SAHIL — MODERN BRUTALIST PORTFOLIO
   Refined Interactive Engine & Advanced Animations
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Ensure pristine deep black mode is always active
    document.body.classList.remove("dark-mode");

    /* =====================================================
       0. CINEMATIC AI INTRO — THE ID CARD STORY
       The ID Card is the central visual hero:
       Scene 1: Sudden dramatic physical gravity drop from above
       Scene 2: Animated holographic environment (particles, radar, vertical laser)
       Scene 3: JARVIS British AI voice introduction
       Scene 4: Smooth camera-like transition into homepage hero
       ===================================================== */
    const cinematicIntro = document.getElementById("cinematicIntro");
    if (cinematicIntro) {
        // Always trigger intro on initial page load and on every page refresh
        try {
            sessionStorage.removeItem("ms_portfolio_intro_seen_v1");
            sessionStorage.removeItem("intro_seen");
            localStorage.removeItem("ms_portfolio_intro_seen_v1");
        } catch (e) {}

        const urlParams = new URLSearchParams(window.location.search);
        // Only skip if explicitly requested via query parameter (e.g. ?skipIntro=true)
        if (urlParams.has("skipIntro") || urlParams.has("noIntro")) {
            document.body.classList.remove("intro-active");
            cinematicIntro.style.display = "none";
            setTimeout(() => {
                document.querySelectorAll(".reveal").forEach(el => el.classList.add("active"));
            }, 60);
            return;
        }

        document.body.classList.add("intro-active");

        const introAudio = document.getElementById("introAudio");
        const introSoundPill = document.getElementById("introSoundPill");
        const jarvisHoloCanvas = document.getElementById("jarvisHoloCanvas");
        const introClickPrompt = document.getElementById("introClickPrompt");
        const jarvisCardDropChassis = document.getElementById("jarvisCardDropChassis");
        const jarvisIntroHanger = document.getElementById("jarvisIntroHanger");
        const cardVerticalLaser = document.getElementById("cardVerticalLaser");
        const introWordTheater = document.getElementById("introWordTheater");
        const introCinemaWord = document.getElementById("introCinemaWord");
        const introWordText = document.getElementById("introWordText");
        const telemetryWordTrack = document.getElementById("telemetryWordTrack");
        const jarvisRailProgress = document.getElementById("jarvisRailProgress");

        let soundEnabled = true;
        let hasStarted = false;
        let hasTransitioned = false;
        let audioCtx = null;
        let activeTimers = [];
        let holoAnimFrame = null;
        let wordSyncFrame = null;
        let introStartTime = null;

        // Web Audio Synthesizer: Mechanical Drop, Biometric Chimes & Sub Swell
        function initAudio() {
            if (audioCtx) return;
            try {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (!AudioContextClass) return;
                audioCtx = new AudioContextClass();
            } catch (e) {
                console.warn("Web Audio not permitted:", e);
            }
        }

        // Scene 1: Sudden Physical Drop Sound (Air Whoosh + Lanyard Snap & Thud)
        function playDropSound() {
            if (!soundEnabled || !audioCtx) return;
            try {
                const now = audioCtx.currentTime;

                // 1. Initial rapid drop whoosh (0 to 300ms)
                const whooshOsc = audioCtx.createOscillator();
                const whooshGain = audioCtx.createGain();
                whooshOsc.type = "sine";
                whooshOsc.frequency.setValueAtTime(140, now);
                whooshOsc.frequency.exponentialRampToValueAtTime(50, now + 0.35);

                whooshGain.gain.setValueAtTime(0.01, now);
                whooshGain.gain.linearRampToValueAtTime(0.12, now + 0.15);
                whooshGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

                whooshOsc.connect(whooshGain);
                whooshGain.connect(audioCtx.destination);
                whooshOsc.start(now);
                whooshOsc.stop(now + 0.4);

                // 2. Mechanical lanyard tension snap & impact thud at impact (~420ms)
                setTimeout(() => {
                    if (!audioCtx || audioCtx.state === "closed") return;
                    const impactNow = audioCtx.currentTime;

                    // Sharp strap tension snap
                    const snapOsc = audioCtx.createOscillator();
                    const snapGain = audioCtx.createGain();
                    snapOsc.type = "triangle";
                    snapOsc.frequency.setValueAtTime(1350, impactNow);
                    snapOsc.frequency.exponentialRampToValueAtTime(450, impactNow + 0.05);

                    snapGain.gain.setValueAtTime(0.15, impactNow);
                    snapGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 0.07);

                    snapOsc.connect(snapGain);
                    snapGain.connect(audioCtx.destination);
                    snapOsc.start(impactNow);
                    snapOsc.stop(impactNow + 0.08);

                    // Weighted badge body thud
                    const thudOsc = audioCtx.createOscillator();
                    const thudGain = audioCtx.createGain();
                    thudOsc.type = "sine";
                    thudOsc.frequency.setValueAtTime(75, impactNow);
                    thudOsc.frequency.exponentialRampToValueAtTime(35, impactNow + 0.18);

                    thudGain.gain.setValueAtTime(0.18, impactNow);
                    thudGain.gain.exponentialRampToValueAtTime(0.001, impactNow + 0.22);

                    thudOsc.connect(thudGain);
                    thudGain.connect(audioCtx.destination);
                    thudOsc.start(impactNow);
                    thudOsc.stop(impactNow + 0.25);
                }, 400);
            } catch (e) {}
        }

        // Biometric Laser Ping
        function playScanPing() {
            if (!soundEnabled || !audioCtx) return;
            try {
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(680, now);
                osc.frequency.exponentialRampToValueAtTime(1150, now + 0.09);

                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.25);
            } catch (e) {}
        }

        // Verification Chime
        function playVerifyChime() {
            if (!soundEnabled || !audioCtx) return;
            try {
                const now = audioCtx.currentTime;
                const osc1 = audioCtx.createOscillator();
                const osc2 = audioCtx.createOscillator();
                const gain = audioCtx.createGain();

                osc1.type = "sine";
                osc1.frequency.setValueAtTime(880, now);
                osc1.frequency.setValueAtTime(1320, now + 0.08);

                osc2.type = "triangle";
                osc2.frequency.setValueAtTime(1760, now + 0.08);

                gain.gain.setValueAtTime(0.08, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

                osc1.connect(gain);
                osc2.connect(gain);
                gain.connect(audioCtx.destination);

                osc1.start(now);
                osc2.start(now + 0.08);
                osc1.stop(now + 0.38);
                osc2.stop(now + 0.38);
            } catch (e) {}
        }

        // Transition Whoosh
        function playTransitionWhoosh() {
            if (!soundEnabled || !audioCtx) return;
            try {
                const now = audioCtx.currentTime;
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = "sine";
                osc.frequency.setValueAtTime(110, now);
                osc.frequency.exponentialRampToValueAtTime(32, now + 0.7);

                gain.gain.setValueAtTime(0.14, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.75);

                osc.connect(gain);
                gain.connect(audioCtx.destination);
                osc.start(now);
                osc.stop(now + 0.8);
            } catch (e) {}
        }

        // Scene 2: Holographic Canvas Particle & Radar Animation
        function startHoloCanvas() {
            if (!jarvisHoloCanvas) return;
            const ctx = jarvisHoloCanvas.getContext("2d");
            let w = (jarvisHoloCanvas.width = window.innerWidth);
            let h = (jarvisHoloCanvas.height = window.innerHeight);

            window.addEventListener("resize", () => {
                if (!hasTransitioned && jarvisHoloCanvas) {
                    w = jarvisHoloCanvas.width = window.innerWidth;
                    h = jarvisHoloCanvas.height = window.innerHeight;
                }
            }, { passive: true });

            // Generate particles
            const particleCount = 42;
            const particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    vx: (Math.random() - 0.5) * 0.45,
                    vy: (Math.random() - 0.5) * 0.45,
                    size: Math.random() * 1.8 + 0.8,
                    isRed: Math.random() < 0.45
                });
            }

            let radarAngle = 0;

            function render() {
                if (hasTransitioned) return;
                ctx.clearRect(0, 0, w, h);

                // Draw subtle perspective grid lines
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(255, 61, 0, 0.04)";
                const gridSpacing = 65;
                for (let x = 0; x < w; x += gridSpacing) {
                    ctx.beginPath();
                    ctx.moveTo(x, 0);
                    ctx.lineTo(x, h);
                    ctx.stroke();
                }
                for (let y = 0; y < h; y += gridSpacing) {
                    ctx.beginPath();
                    ctx.moveTo(0, y);
                    ctx.lineTo(w, y);
                    ctx.stroke();
                }

                // Draw rotating radar circle directly behind centered hero ID card
                const cx = w * 0.5;
                const cy = h * 0.42;

                radarAngle += 0.012;
                ctx.save();
                ctx.translate(cx, cy);

                // Outer radar ring
                ctx.beginPath();
                ctx.arc(0, 0, 240, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255, 61, 0, 0.12)";
                ctx.lineWidth = 1.2;
                ctx.setLineDash([8, 12]);
                ctx.stroke();

                // Middle radar ring
                ctx.beginPath();
                ctx.arc(0, 0, 170, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255, 61, 0, 0.08)";
                ctx.lineWidth = 1;
                ctx.setLineDash([6, 10]);
                ctx.stroke();

                // Inner radar ring
                ctx.beginPath();
                ctx.arc(0, 0, 100, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
                ctx.setLineDash([4, 8]);
                ctx.stroke();

                // Rotating sweep line
                ctx.rotate(radarAngle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.lineTo(240, 0);
                ctx.strokeStyle = "rgba(255, 61, 0, 0.22)";
                ctx.setLineDash([]);
                ctx.stroke();

                ctx.restore();

                // Draw moving particles
                for (let i = 0; i < particleCount; i++) {
                    const p = particles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    if (p.x < 0) p.x = w;
                    if (p.x > w) p.x = 0;
                    if (p.y < 0) p.y = h;
                    if (p.y > h) p.y = 0;

                    ctx.fillStyle = p.isRed ? "rgba(255, 61, 0, 0.55)" : "rgba(255, 255, 255, 0.35)";
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fill();
                }

                holoAnimFrame = requestAnimationFrame(render);
            }
            render();
        }

        // =====================================================
        // AI VOICE & WORD-BY-WORD CINEMATIC TYPOGRAPHY ENGINE
        // Synchronized to exact uploaded audio: assets/audio/jarvis_intro.mp3
        // Calibrated audio onset & offset timing for every word
        // Word replaces previous word; huge typography behind hanging ID card
        // =====================================================
        const WORD_TIMELINE = [
            // Sentence 1: "Welcome, visitor."
            { word: "WELCOME", start: 0.46, end: 1.08, style: "accent" },
            { word: "VISITOR", start: 1.10, end: 1.88, style: "white" },

            // Sentence 2: "You are entering the world of Mohammad Sahil."
            { word: "YOU", start: 2.00, end: 2.36, style: "white" },
            { word: "ARE", start: 2.36, end: 2.68, style: "white" },
            { word: "ENTERING", start: 2.68, end: 3.32, style: "accent" },
            { word: "THE", start: 3.32, end: 3.47, style: "white" },
            { word: "WORLD", start: 3.47, end: 3.90, style: "white" },
            { word: "OF", start: 3.90, end: 4.20, style: "white" },
            { word: "MOHAMMAD", start: 4.20, end: 5.02, style: "red" },
            { word: "SAHIL", start: 5.02, end: 5.72, style: "red" },

            // Sentence 3: "Initializing personal portfolio."
            { word: "INITIALIZING", start: 6.28, end: 6.94, style: "red" },
            { word: "PERSONAL", start: 6.94, end: 7.50, style: "white" },
            { word: "PORTFOLIO", start: 7.50, end: 8.38, style: "accent" },

            // Sentence 4: "Identity verified." (Begins after digital chime at 9.14s)
            { word: "IDENTITY", start: 9.14, end: 9.64, style: "white" },
            { word: "VERIFIED", start: 9.64, end: 10.55, style: "verified" },

            // Sentence 5: "Let's begin." (Spoken calmly at 11.50s after pause)
            { word: "LET'S", start: 11.50, end: 11.83, style: "white" },
            { word: "BEGIN", start: 11.83, end: 12.25, style: "granted" }
        ];

        let activeWordIndex = -1;

        function showCinemaWord(item) {
            if (!introCinemaWord || !introWordText) return;

            const word = item.word;
            introWordText.textContent = word;

            // Apply size modifier based on length
            introCinemaWord.classList.remove("len-short", "len-medium", "len-long");
            if (word.length <= 5) {
                introCinemaWord.classList.add("len-short");
            } else if (word.length <= 8) {
                introCinemaWord.classList.add("len-medium");
            } else {
                introCinemaWord.classList.add("len-long");
            }

            // Apply style theme
            introCinemaWord.classList.remove("style-white", "style-accent", "style-red", "style-verified", "style-granted");
            introCinemaWord.classList.add(`style-${item.style}`);

            // Set duration to exact spoken duration of this word
            const dur = Math.max(0.18, item.end - item.start);
            introCinemaWord.style.animationDuration = `${dur.toFixed(2)}s`;

            // Retrigger entrance animation cleanly
            introCinemaWord.classList.remove("word-active");
            void introCinemaWord.offsetWidth; // Force reflow
            introCinemaWord.classList.add("word-active");

            // Update telemetry status tag
            if (telemetryWordTrack) {
                telemetryWordTrack.textContent = `SYNC_WORD [${word}] // ${item.start.toFixed(2)}s`;
            }

            // Milestones & audio effects
            if (word === "INITIALIZING") {
                if (cardVerticalLaser) cardVerticalLaser.classList.add("active");
                playScanPing();
            } else if (word === "VERIFIED") {
                playVerifyChime();
                if (cinematicIntro) {
                    cinematicIntro.classList.add("verified-flash");
                    setTimeout(() => cinematicIntro.classList.remove("verified-flash"), 600);
                }
            } else if (word === "BEGIN") {
                playScanPing();
            }
        }

        function hideCinemaWord() {
            if (introCinemaWord) {
                introCinemaWord.classList.remove("word-active");
            }
            if (telemetryWordTrack) {
                telemetryWordTrack.textContent = "VOICE_STREAM // STANDBY";
            }
        }

        function updateWordByAudioTime(currentTime) {
            if (hasTransitioned) return;

            // Find matching word
            let foundIndex = -1;
            for (let i = 0; i < WORD_TIMELINE.length; i++) {
                const item = WORD_TIMELINE[i];
                if (currentTime >= item.start && currentTime < item.end) {
                    foundIndex = i;
                    break;
                }
            }

            if (foundIndex !== activeWordIndex) {
                activeWordIndex = foundIndex;
                if (foundIndex !== -1) {
                    showCinemaWord(WORD_TIMELINE[foundIndex]);
                } else {
                    hideCinemaWord();
                }
            }
        }

        // Sub-millisecond continuous synchronization loop via requestAnimationFrame
        function pollAudioWordSync() {
            if (hasTransitioned) return;

            let timeSec = 0;
            if (introAudio && !introAudio.paused && introAudio.currentTime > 0) {
                timeSec = introAudio.currentTime;
            } else if (introStartTime !== null) {
                timeSec = (performance.now() - introStartTime) / 1000;
            }

            updateWordByAudioTime(timeSec);

            if (introAudio && introAudio.duration && jarvisRailProgress) {
                const pct = Math.min(100, Math.round((timeSec / introAudio.duration) * 100));
                jarvisRailProgress.style.width = `${pct}%`;
            }

            wordSyncFrame = requestAnimationFrame(pollAudioWordSync);
        }

        // Scene 4: Cinematic Transition into Homepage Hero
        function transitionToHomepage() {
            if (hasTransitioned) return;
            hasTransitioned = true;

            activeTimers.forEach(t => clearTimeout(t));
            if (wordSyncFrame) cancelAnimationFrame(wordSyncFrame);
            if (holoAnimFrame) cancelAnimationFrame(holoAnimFrame);

            if (introClickPrompt) {
                introClickPrompt.classList.remove("visible");
            }
            if (introSoundPill) {
                introSoundPill.classList.remove("visible");
            }
            if (introAudio) {
                try {
                    introAudio.pause();
                } catch (e) {}
            }
            playTransitionWhoosh();

            cinematicIntro.classList.add("intro-exiting");

            setTimeout(() => {
                document.body.classList.remove("intro-active");
                cinematicIntro.style.display = "none";

                // Trigger staggered hero entrance on homepage
                const reveals = document.querySelectorAll(".reveal");
                reveals.forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight + 200) {
                        el.classList.add("active");
                    }
                });
            }, 850);
        }

        // Connect HTML5 Audio Events
        if (introAudio) {
            introAudio.addEventListener("ended", () => {
                if (!hasTransitioned) {
                    if (jarvisRailProgress) jarvisRailProgress.style.width = "100%";
                    setTimeout(transitionToHomepage, 400);
                }
            });
        }

        // Start Visual Intro & Physical ID Card Drop
        function startVisualIntro() {
            if (hasStarted) return;
            hasStarted = true;
            introStartTime = performance.now();

            initAudio();

            if (introClickPrompt) {
                introClickPrompt.classList.remove("visible");
            }
            if (introSoundPill) {
                introSoundPill.classList.remove("visible");
            }

            // SCENE 1: Sudden Physical ID Card Drop from above!
            if (jarvisCardDropChassis) {
                jarvisCardDropChassis.classList.add("dropped");
            }
            if (jarvisIntroHanger) {
                jarvisIntroHanger.classList.add("swinging");
            }
            playDropSound();
            startHoloCanvas();
            if (jarvisRailProgress) jarvisRailProgress.style.width = "6%";

            // Start real-time word-by-word RAF loop
            pollAudioWordSync();

            // Total intro duration safety timeout based on actual audio duration
            const audioDuration = (introAudio && introAudio.duration && !isNaN(introAudio.duration) && introAudio.duration > 0)
                ? introAudio.duration
                : 12.3;

            const totalWaitMs = Math.round((audioDuration + 0.35) * 1000);
            activeTimers.push(setTimeout(() => {
                if (!hasTransitioned) {
                    if (jarvisRailProgress) jarvisRailProgress.style.width = "100%";
                    setTimeout(transitionToHomepage, 400);
                }
            }, totalWaitMs));
        }

        // Permanent Direct Auto-Play: Instant voice & visual intro on page open without any click or button
        function launchIntroWithSound() {
            if (hasStarted) return;

            // Start visual intro (ID Card 3D drop, pendulum sway, holograms) immediately
            startVisualIntro();

            if (introAudio) {
                introAudio.muted = false;
                introAudio.volume = 1.0;
                introAudio.currentTime = 0;

                const playPromise = introAudio.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        console.log("Direct unmuted voice playback active!");
                        if (audioCtx && audioCtx.state === "suspended") {
                            audioCtx.resume().catch(() => {});
                        }
                    }).catch((err) => {
                        console.warn("Direct unmuted autoplay blocked by browser policy. Armed silent fallback:", err);
                        // Silent listener for any natural user presence (no button, no prompt, completely invisible)
                        const resumeOnNaturalPresence = () => {
                            ['click', 'pointerdown', 'mousedown', 'keydown', 'touchstart', 'wheel', 'scroll'].forEach(evt => {
                                window.removeEventListener(evt, resumeOnNaturalPresence);
                            });

                            if (introAudio && !hasTransitioned && introAudio.paused) {
                                introAudio.muted = false;
                                introAudio.volume = 1.0;
                                introAudio.currentTime = 0;
                                introStartTime = performance.now();
                                introAudio.play().catch(() => {});
                                if (audioCtx && audioCtx.state === "suspended") {
                                    audioCtx.resume().catch(() => {});
                                }
                            }
                        };

                        ['click', 'pointerdown', 'mousedown', 'keydown', 'touchstart', 'wheel', 'scroll'].forEach(evt => {
                            window.addEventListener(evt, resumeOnNaturalPresence, { passive: true, once: true });
                        });
                    });
                }
            }
        }

        // Auto-launch intro with sound immediately
        launchIntroWithSound();

        // Keyboard Shortcuts (Escape to skip)
        window.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                transitionToHomepage();
            }
        });
    }

    /* =====================================================
       1. PORTFOLIO INITIALIZATION
       ===================================================== */
    document.body.classList.add("portfolio-ready");


    /* =====================================================
       2. CUSTOM CURSOR (DESKTOP ONLY — STARK BRUTALIST)
       ===================================================== */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursorDot && cursorRing && window.matchMedia("(pointer: fine)").matches) {
        let mouseX = -100;
        let mouseY = -100;
        let ringX = -100;
        let ringY = -100;

        window.addEventListener("mousemove", (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }, { passive: true });

        function animateCursor() {
            ringX += (mouseX - ringX) * 0.2;
            ringY += (mouseY - ringY) * 0.2;
            cursorRing.style.left = `${ringX}px`;
            cursorRing.style.top = `${ringY}px`;
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const interactiveSelectors = "a, button, input, textarea, select, .project-card, .certificate-card, .skill-item, .contact-item, .achievement-row, [role='button']";
        document.querySelectorAll(interactiveSelectors).forEach(el => {
            el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
            el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
        });
    }


    /* =====================================================
       3. SUBTLE NEURAL NETWORK BACKGROUND CANVAS
       Subtle moving red & white nodes, thin connecting lines, slow and elegant
       (No distracting wireframe spheres, no muddy glow orbs)
       ===================================================== */
    const neuralCanvas = document.getElementById("globalBgCanvas");
    if (neuralCanvas) {
        const ctx = neuralCanvas.getContext("2d");
        let width = 0;
        let height = 0;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            neuralCanvas.width = width * dpr;
            neuralCanvas.height = height * dpr;
            neuralCanvas.style.width = `${width}px`;
            neuralCanvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        }
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const mouse = { x: -9999, y: -9999, active: false };
        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        }, { passive: true });

        window.addEventListener("mouseleave", () => {
            mouse.active = false;
            mouse.x = -9999;
            mouse.y = -9999;
        });

        class NeuralNode {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.22; // Slow, elegant movement
                this.vy = (Math.random() - 0.5) * 0.22;
                this.radius = Math.random() * 1.4 + 1.1;
                this.isRed = Math.random() < 0.22; // 22% subtle red nodes
            }

            update() {
                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);
                    if (dist < 120 && dist > 1) {
                        const force = (1 - dist / 120) * 0.35;
                        this.x += (dx / dist) * force;
                        this.y += (dy / dist) * force;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < -15) this.x = width + 15;
                if (this.x > width + 15) this.x = -15;
                if (this.y < -15) this.y = height + 15;
                if (this.y > height + 15) this.y = -15;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.isRed ? "rgba(229, 57, 53, 0.75)" : "rgba(255, 255, 255, 0.35)";
                ctx.fill();
            }
        }

        const count = Math.min(65, Math.max(35, Math.floor((width * height) / 22000)));
        const nodes = Array.from({ length: count }, () => new NeuralNode());
        const maxDist = 110;

        function animateNeuralNet() {
            ctx.clearRect(0, 0, width, height);

            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update();
                nodes[i].draw();
            }

            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        if (nodes[i].isRed || nodes[j].isRed) {
                            ctx.strokeStyle = `rgba(229, 57, 53, ${alpha * 0.22})`;
                            ctx.lineWidth = 0.65;
                        } else {
                            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.06})`;
                            ctx.lineWidth = 0.5;
                        }
                        ctx.stroke();
                    }
                }

                if (mouse.active) {
                    const mdx = nodes[i].x - mouse.x;
                    const mdy = nodes[i].y - mouse.y;
                    const mDist = Math.hypot(mdx, mdy);
                    if (mDist < 120) {
                        const mAlpha = (1 - mDist / 120);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = `rgba(229, 57, 53, ${mAlpha * 0.25})`;
                        ctx.lineWidth = 0.75;
                        ctx.stroke();
                    }
                }
            }
        }

        let animFrameId = null;
        let isTabActive = !document.hidden;

        function loopNeuralNet() {
            if (!isTabActive) {
                animFrameId = null;
                return;
            }
            animateNeuralNet();
            animFrameId = requestAnimationFrame(loopNeuralNet);
        }

        document.addEventListener("visibilitychange", () => {
            isTabActive = !document.hidden;
            if (isTabActive && !animFrameId) {
                loopNeuralNet();
            }
        });

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReducedMotion) {
            loopNeuralNet();
        } else {
            animateNeuralNet(); // Draw once statically
        }
    }


    /* =====================================================
       4. HERO TERMINAL TYPING ANIMATION
       Compact, integrated, high-contrast, clean
       ===================================================== */
    const heroTypingText = document.getElementById("heroTypingText");
    if (heroTypingText) {
        const commands = [
            "optimizing_neural_architecture()",
            "evaluating_deep_learning_models()",
            "compiling_modern_brutalist_systems()",
            "tuning_hyperparameters()",
            "status: all_systems_nominal"
        ];

        let cmdIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 65;

        function typeLoop() {
            const currentCmd = commands[cmdIndex];

            if (isDeleting) {
                heroTypingText.textContent = currentCmd.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 30;
            } else {
                heroTypingText.textContent = currentCmd.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 65;
            }

            if (!isDeleting && charIndex === currentCmd.length) {
                typingSpeed = 1600;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                cmdIndex = (cmdIndex + 1) % commands.length;
                typingSpeed = 400;
            }

            setTimeout(typeLoop, typingSpeed);
        }
        typeLoop();
    }


    /* =====================================================
       5. HERO SUSPENDED ID CARD ANIMATION
       Realistic continuous pendulum swing handled via CSS keyframes
       ===================================================== */


    /* =====================================================
       6. NAVBAR & ACTIVE NAVIGATION
       ===================================================== */
    const header = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".desktop-nav a, .mobile-menu a");

    function updateActiveNav() {
        const scrollPosition = window.scrollY;

        if (header) {
            if (scrollPosition > 20) {
                header.style.boxShadow = "0 6px 20px rgba(0, 0, 0, 0.85)";
            } else {
                header.style.boxShadow = "none";
            }
        }

        let currentSectionId = "";
        sections.forEach(section => {
            const top = section.offsetTop - 150;
            const height = section.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();


    /* =====================================================
       7. MOBILE MENU TOGGLE
       ===================================================== */
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("show");
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("show");
            });
        });
    }


    /* =====================================================
       8. SKILLS FILTERING
       ===================================================== */
    const filterButtons = document.querySelectorAll(".skill-filter");
    const skillItems = document.querySelectorAll(".skill-item");

    if (filterButtons.length && skillItems.length) {
        filterButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                filterButtons.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");

                const filterValue = btn.getAttribute("data-filter");

                skillItems.forEach(item => {
                    const category = item.getAttribute("data-category");
                    if (filterValue === "all" || category === filterValue) {
                        item.style.display = "flex";
                        item.style.opacity = "1";
                    } else {
                        item.style.display = "none";
                        item.style.opacity = "0";
                    }
                });
            });
        });
    }


    /* =====================================================
       9. PROJECTS HORIZONTAL SLIDER
       Smooth auto-scroll, drag, and navigation controls
       ===================================================== */
    const projectsTrack = document.getElementById("projectsTrack");
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    const projectNextBtn = document.getElementById("projectNextBtn");
    const projectsProgressBar = document.getElementById("projectsProgressBar");

    if (projectsTrack) {
        let isProjectsPaused = false;
        let projectsScrollDir = 1;
        let projectsAccumulator = 0;
        let pauseCountdown = 0;

        const getProjectStep = () => {
            const firstCard = projectsTrack.querySelector(".project-card");
            return firstCard ? firstCard.offsetWidth + 24 : 420;
        };

        if (projectPrevBtn) {
            projectPrevBtn.addEventListener("click", () => {
                isProjectsPaused = true;
                projectsTrack.scrollBy({ left: -getProjectStep(), behavior: "smooth" });
                setTimeout(() => { isProjectsPaused = false; }, 2200);
            });
        }

        if (projectNextBtn) {
            projectNextBtn.addEventListener("click", () => {
                isProjectsPaused = true;
                projectsTrack.scrollBy({ left: getProjectStep(), behavior: "smooth" });
                setTimeout(() => { isProjectsPaused = false; }, 2200);
            });
        }

        const updateProjectsProgress = () => {
            if (!projectsProgressBar) return;
            const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
            if (maxScroll > 0) {
                const percent = (projectsTrack.scrollLeft / maxScroll) * 100;
                projectsProgressBar.style.width = `${Math.max(15, percent)}%`;
            } else {
                projectsProgressBar.style.width = "100%";
            }
        };

        projectsTrack.addEventListener("scroll", updateProjectsProgress, { passive: true });

        projectsTrack.addEventListener("mouseenter", () => isProjectsPaused = true);
        projectsTrack.addEventListener("mouseleave", () => isProjectsPaused = false);
        projectsTrack.addEventListener("touchstart", () => isProjectsPaused = true, { passive: true });
        projectsTrack.addEventListener("touchend", () => {
            setTimeout(() => isProjectsPaused = false, 2000);
        });

        // Mouse Drag to Scroll
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let dragDist = 0;

        projectsTrack.addEventListener("mousedown", (e) => {
            if (e.target.closest("a, button, .project-floating-btn, .project-action-link")) return;
            isDown = true;
            dragDist = 0;
            isProjectsPaused = true;
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollLeft = projectsTrack.scrollLeft;
        });

        window.addEventListener("mouseup", () => {
            if (isDown) {
                isDown = false;
                setTimeout(() => {
                    projectsTrack.classList.remove("dragging");
                }, 50);
            }
        });

        projectsTrack.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 1.4;
            dragDist = Math.abs(x - startX);
            if (dragDist > 10) {
                projectsTrack.classList.add("dragging");
                projectsTrack.scrollLeft = scrollLeft - walk;
            }
        });

        projectsTrack.addEventListener("click", (e) => {
            if (dragDist > 10) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        function autoScrollProjects() {
            if (!isProjectsPaused) {
                const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
                if (maxScroll > 5) {
                    if (pauseCountdown > 0) {
                        pauseCountdown--;
                    } else {
                        projectsAccumulator += 0.95 * projectsScrollDir;
                        if (Math.abs(projectsAccumulator) >= 1) {
                            const step = Math.trunc(projectsAccumulator);
                            projectsTrack.scrollLeft += step;
                            projectsAccumulator -= step;

                            if (projectsTrack.scrollLeft >= maxScroll - 2 && projectsScrollDir === 1) {
                                projectsScrollDir = -1;
                                pauseCountdown = 90;
                            } else if (projectsTrack.scrollLeft <= 2 && projectsScrollDir === -1) {
                                projectsScrollDir = 1;
                                pauseCountdown = 90;
                            }
                        }
                    }
                }
            }
            requestAnimationFrame(autoScrollProjects);
        }
        autoScrollProjects();
    }


    /* =====================================================
       10. CERTIFICATES HORIZONTAL SLIDER
       ===================================================== */
    const certificatesTrack = document.getElementById("certificatesTrack");
    const certPrevBtn = document.getElementById("certPrevBtn");
    const certNextBtn = document.getElementById("certNextBtn");
    const certificatesProgressBar = document.getElementById("certificatesProgressBar");

    if (certificatesTrack) {
        let isCertPaused = false;
        let certScrollDir = 1;
        let certAccumulator = 0;
        let certPauseTimer = 0;

        const getCertStep = () => {
            const firstCard = certificatesTrack.querySelector(".certificate-card");
            return firstCard ? firstCard.offsetWidth + 24 : 380;
        };

        if (certPrevBtn) {
            certPrevBtn.addEventListener("click", () => {
                isCertPaused = true;
                certificatesTrack.scrollBy({ left: -getCertStep(), behavior: "smooth" });
                setTimeout(() => { isCertPaused = false; }, 2200);
            });
        }

        if (certNextBtn) {
            certNextBtn.addEventListener("click", () => {
                isCertPaused = true;
                certificatesTrack.scrollBy({ left: getCertStep(), behavior: "smooth" });
                setTimeout(() => { isCertPaused = false; }, 2200);
            });
        }

        const updateCertProgress = () => {
            if (!certificatesProgressBar) return;
            const maxScroll = certificatesTrack.scrollWidth - certificatesTrack.clientWidth;
            if (maxScroll > 0) {
                const percent = (certificatesTrack.scrollLeft / maxScroll) * 100;
                certificatesProgressBar.style.width = `${Math.max(15, percent)}%`;
            } else {
                certificatesProgressBar.style.width = "100%";
            }
        };

        certificatesTrack.addEventListener("scroll", updateCertProgress, { passive: true });

        certificatesTrack.addEventListener("mouseenter", () => isCertPaused = true);
        certificatesTrack.addEventListener("mouseleave", () => isCertPaused = false);
        certificatesTrack.addEventListener("touchstart", () => isCertPaused = true, { passive: true });
        certificatesTrack.addEventListener("touchend", () => {
            setTimeout(() => isCertPaused = false, 2000);
        });

        let isCertDown = false;
        let certStartX = 0;
        let certScrollLeft = 0;
        let certDragDist = 0;

        certificatesTrack.addEventListener("mousedown", (e) => {
            if (e.target.closest("a, button")) return;
            isCertDown = true;
            certDragDist = 0;
            isCertPaused = true;
            certStartX = e.pageX - certificatesTrack.offsetLeft;
            certScrollLeft = certificatesTrack.scrollLeft;
        });

        window.addEventListener("mouseup", () => {
            if (isCertDown) {
                isCertDown = false;
                setTimeout(() => certificatesTrack.classList.remove("dragging"), 50);
            }
        });

        certificatesTrack.addEventListener("mousemove", (e) => {
            if (!isCertDown) return;
            const x = e.pageX - certificatesTrack.offsetLeft;
            const walk = (x - certStartX) * 1.4;
            certDragDist = Math.abs(x - certStartX);
            if (certDragDist > 10) {
                certificatesTrack.classList.add("dragging");
                certificatesTrack.scrollLeft = certScrollLeft - walk;
            }
        });

        certificatesTrack.addEventListener("click", (e) => {
            if (certDragDist > 10) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        function autoScrollCerts() {
            if (!isCertPaused) {
                const maxScroll = certificatesTrack.scrollWidth - certificatesTrack.clientWidth;
                if (maxScroll > 5) {
                    if (certPauseTimer > 0) {
                        certPauseTimer--;
                    } else {
                        certAccumulator += 0.95 * certScrollDir;
                        if (Math.abs(certAccumulator) >= 1) {
                            const step = Math.trunc(certAccumulator);
                            certificatesTrack.scrollLeft += step;
                            certAccumulator -= step;

                            if (certificatesTrack.scrollLeft >= maxScroll - 2 && certScrollDir === 1) {
                                certScrollDir = -1;
                                certPauseTimer = 90;
                            } else if (certificatesTrack.scrollLeft <= 2 && certScrollDir === -1) {
                                certScrollDir = 1;
                                certPauseTimer = 90;
                            }
                        }
                    }
                }
            }
            requestAnimationFrame(autoScrollCerts);
        }
        autoScrollCerts();
    }


    /* =====================================================
       11. 3D CARD HOVER TILT
       ===================================================== */
    const tiltCards = document.querySelectorAll('[data-tilt="true"], .project-card, .certificate-card');
    tiltCards.forEach(card => {
        const maxTilt = parseFloat(card.getAttribute("data-tilt-max")) || 5;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(800px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(3px)`;
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "";
        });
    });


    /* =====================================================
       12. INTERSECTION OBSERVER SCROLL REVEAL
       ===================================================== */
    const reveals = document.querySelectorAll(".reveal");

    // Immediately reveal elements that are already in or near the viewport
    function checkInitialReveals() {
        reveals.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 100) {
                el.classList.add("active");
            }
        });
    }
    checkInitialReveals();
    setTimeout(checkInitialReveals, 100);

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.02,
        rootMargin: "0px 0px 60px 0px"
    });

    reveals.forEach(el => {
        if (!el.classList.contains("active")) {
            revealObserver.observe(el);
        }
    });


    /* =====================================================
       13. CONTACT FORM SUBMISSION
       ===================================================== */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector(".form-submit");
            if (!submitBtn) return;

            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>TRANSMISSION SENT ✓</span><span>✓</span>`;
            submitBtn.style.background = "#2e7d32";
            submitBtn.style.borderColor = "#4caf50";

            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = "";
                submitBtn.style.borderColor = "";
                contactForm.reset();
            }, 3000);
        });
    }

});