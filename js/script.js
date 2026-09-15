/* =========================================================
   MOHD SAHIL PORTFOLIO - SCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       PAGE LOADER
       ===================================================== */
    const pageLoader = document.getElementById("pageLoader");
    const loaderNumber = pageLoader ? pageLoader.querySelector(".loader-number") : null;
    const loaderLineSpan = pageLoader ? pageLoader.querySelector(".loader-line span") : null;

    if (pageLoader) {
        let progress = 0;
        const loaderInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 15) + 10;
            if (progress >= 100) {
                progress = 100;
                clearInterval(loaderInterval);
                if (loaderNumber) loaderNumber.textContent = "100";
                if (loaderLineSpan) loaderLineSpan.style.width = "100%";

                setTimeout(() => {
                    pageLoader.classList.add("hide");
                    document.body.classList.add("page-ready");
                }, 300);
            } else {
                if (loaderNumber) loaderNumber.textContent = progress < 10 ? `0${progress}` : `${progress}`;
                if (loaderLineSpan) loaderLineSpan.style.width = `${progress}%`;
            }
        }, 50);

        // Fallback safety hide after 2 seconds
        setTimeout(() => {
            if (!pageLoader.classList.contains("hide")) {
                pageLoader.classList.add("hide");
                document.body.classList.add("page-ready");
            }
        }, 2000);
    } else {
        document.body.classList.add("page-ready");
    }


    /* =====================================================
       CUSTOM CURSOR
       ===================================================== */
    const cursorDot = document.querySelector(".cursor-dot");
    const cursorRing = document.querySelector(".cursor-ring");

    if (cursorDot && cursorRing) {
        window.addEventListener("mousemove", (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorRing.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 250, fill: "forwards" });
        });

        // Hover scale feedback for interactive elements
        const interactiveSelectors = "a, button, input, textarea, select, .project-card, .certificate-card, .cert-nav-btn, .project-nav-btn, .project-action-link, .project-floating-btn, [role='button']";
        const attachCursorHover = () => {
            document.querySelectorAll(interactiveSelectors).forEach(el => {
                el.removeEventListener("mouseenter", addHover);
                el.removeEventListener("mouseleave", removeHover);
                el.addEventListener("mouseenter", addHover);
                el.addEventListener("mouseleave", removeHover);
            });
        };
        function addHover() { document.body.classList.add("cursor-hover"); }
        function removeHover() { document.body.classList.remove("cursor-hover"); }
        attachCursorHover();
    }


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuBtn = document.querySelector(".menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");

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
       THEME TOGGLE (DARK / LIGHT)
       ===================================================== */
    const themeToggle = document.getElementById("themeToggle");
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const isDark = document.body.classList.contains("dark-mode");
            localStorage.setItem("theme", isDark ? "dark" : "light");
        });
    }


    /* =====================================================
       SKILLS FILTER
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
                        item.classList.remove("hidden");
                        item.style.display = "block";
                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";
                    } else {
                        item.classList.add("hidden");
                        item.style.display = "none";
                    }
                });
            });
        });
    }


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, section, .skill-card, .project-card, " +
        ".achievement-item, .certificate-card, .experience-item"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navItems = document.querySelectorAll(".desktop-nav a, .mobile-menu a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {
                currentSection = section.getAttribute("id");
            }

        });

        navItems.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });
    }

    window.addEventListener("scroll", updateActiveNav);
    updateActiveNav();


    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const header = document.querySelector("header");

    function navbarEffect() {

        if (!header) return;

        if (window.scrollY > 30) {
            header.style.boxShadow = "0 5px 25px rgba(0,0,0,0.05)";
        } else {
            header.style.boxShadow = "none";
        }
    }

    window.addEventListener("scroll", navbarEffect);
    navbarEffect();


    /* =====================================================
       SMOOTH ANCHOR SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       HERO IMAGE PARALLAX
       ===================================================== */

    const heroImage = document.querySelector(".hero-image-card");

    if (heroImage && window.innerWidth > 700) {

        window.addEventListener("scroll", () => {

            const scrollValue = window.scrollY;

            if (scrollValue < window.innerHeight) {

                const movement = scrollValue * 0.025;

                heroImage.style.transform =
                    `translateY(${movement}px) rotate(2deg)`;
            }

        });

    }


    /* =====================================================
       PROJECT IMAGE HOVER
       ===================================================== */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach(card => {

        card.addEventListener("mouseenter", () => {

            const image = card.querySelector(".project-image img");

            if (image) {
                image.style.transform = "scale(1.06)";
            }

        });

        card.addEventListener("mouseleave", () => {

            const image = card.querySelector(".project-image img");

            if (image) {
                image.style.transform = "scale(1)";
            }

        });

    });


    /* =====================================================
       SKILL CARD MICRO INTERACTION
       ===================================================== */

    const skillCards = document.querySelectorAll(".skill-card");

    skillCards.forEach(card => {

        card.addEventListener("mousemove", event => {

            if (window.innerWidth <= 700) return;

            const rect = card.getBoundingClientRect();

            const x =
                event.clientX - rect.left;

            const y =
                event.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX =
                ((y - centerY) / centerY) * -2;

            const rotateY =
                ((x - centerX) / centerX) * 2;

            card.style.transform =
                `translateY(-4px) perspective(500px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)`;

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform = "";

        });

    });


    /* =====================================================
       CARD VISIBILITY & STATE ENGINE
       (Keeps all cards crisp, 100% visible, sharp & easily interactive)
       ===================================================== */
    function apply3DCurve(track) {
        if (!track) return;
        const cards = track.children;
        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];
            if (!card.classList.contains("project-card") && !card.classList.contains("certificate-card")) continue;
            card.style.opacity = "1";
            card.style.filter = "none";
            card.style.clipPath = "none";
        }
    }

    /* =====================================================
       PROJECTS HORIZONTAL SLIDER (ROUND 3D ELEVATOR SCROLL & HOVER PAUSE)
       ===================================================== */
    const projectsTrack = document.getElementById("projectsTrack");
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    const projectNextBtn = document.getElementById("projectNextBtn");
    const projectsProgressBar = document.getElementById("projectsProgressBar");

    if (projectsTrack) {
        let isProjectsPaused = false;
        let projectsScrollDirection = 1;
        let isProjectsVisible = true;
        let projectsResumeTimer = null;
        let projectsAccumulator = 0;
        let projectsPauseTimer = 0;

        const getScrollDistance = () => {
            const firstCard = projectsTrack.querySelector(".project-card");
            return firstCard ? firstCard.offsetWidth + 32 : 450;
        };

        const pauseAndResumeProjects = () => {
            isProjectsPaused = true;
            clearTimeout(projectsResumeTimer);
            projectsResumeTimer = setTimeout(() => {
                isProjectsPaused = false;
            }, 2500);
        };

        if (projectPrevBtn) {
            projectPrevBtn.addEventListener("click", () => {
                pauseAndResumeProjects();
                projectsTrack.scrollBy({ left: -getScrollDistance(), behavior: "smooth" });
            });
            projectPrevBtn.addEventListener("mouseenter", () => isProjectsPaused = true);
            projectPrevBtn.addEventListener("mouseleave", () => isProjectsPaused = false);
        }

        if (projectNextBtn) {
            projectNextBtn.addEventListener("click", () => {
                pauseAndResumeProjects();
                projectsTrack.scrollBy({ left: getScrollDistance(), behavior: "smooth" });
            });
            projectNextBtn.addEventListener("mouseenter", () => isProjectsPaused = true);
            projectNextBtn.addEventListener("mouseleave", () => isProjectsPaused = false);
        }

        // Update progress bar and 3D curve
        const updateProjectsView = () => {
            apply3DCurve(projectsTrack);
            if (!projectsProgressBar) return;
            const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
            if (maxScroll > 0) {
                const scrollPercentage = (projectsTrack.scrollLeft / maxScroll) * 100;
                projectsProgressBar.style.width = `${Math.max(18, scrollPercentage)}%`;
            } else {
                projectsProgressBar.style.width = "100%";
            }
        };

        projectsTrack.addEventListener("scroll", updateProjectsView, { passive: true });
        window.addEventListener("resize", () => apply3DCurve(projectsTrack));

        // Hover & Touch Pause
        projectsTrack.addEventListener("mouseenter", () => {
            isProjectsPaused = true;
        });

        projectsTrack.addEventListener("mouseleave", () => {
            isProjectsPaused = false;
        });

        projectsTrack.addEventListener("touchstart", () => {
            isProjectsPaused = true;
        }, { passive: true });

        projectsTrack.addEventListener("touchend", () => {
            pauseAndResumeProjects();
        });

        // Drag to scroll for mouse
        let isDown = false;
        let startX = 0;
        let scrollLeft = 0;
        let isDragging = false;
        let dragDistance = 0;

        projectsTrack.addEventListener("mousedown", (e) => {
            // Never initiate track dragging if clicked on interactive elements
            if (e.target.closest("a, button, .project-floating-btn, .project-action-link, .project-nav-btn")) {
                isDown = false;
                isDragging = false;
                return;
            }
            isDown = true;
            isDragging = false;
            dragDistance = 0;
            isProjectsPaused = true;
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollLeft = projectsTrack.scrollLeft;
        });

        window.addEventListener("mouseup", () => {
            if (isDown) {
                isDown = false;
                setTimeout(() => {
                    projectsTrack.classList.remove("dragging");
                    isDragging = false;
                    dragDistance = 0;
                }, 50);
            }
        });

        projectsTrack.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            dragDistance = Math.abs(x - startX);
            if (dragDistance > 12) {
                isDragging = true;
                projectsTrack.classList.add("dragging");
                projectsTrack.scrollLeft = scrollLeft - walk;
                apply3DCurve(projectsTrack);
            }
        });

        // Prevent link opening ONLY if user was deliberately dragging the track
        projectsTrack.addEventListener("click", (e) => {
            if (isDragging && dragDistance > 12) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        // Visibility observer
        const projectsObserver = new IntersectionObserver((entries) => {
            isProjectsVisible = entries[0].isIntersecting;
            if (isProjectsVisible) apply3DCurve(projectsTrack);
        }, { threshold: 0.1 });
        projectsObserver.observe(projectsTrack);

        // Smooth 60FPS Elevator Auto-Scroll with 3D Curve (Speed increased to 1.35px)
        function autoScrollProjects() {
            if (!isProjectsPaused && isProjectsVisible) {
                const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
                if (maxScroll > 5) {
                    if (projectsPauseTimer > 0) {
                        projectsPauseTimer--;
                    } else {
                        projectsAccumulator += 1.35 * projectsScrollDirection;
                        if (Math.abs(projectsAccumulator) >= 1) {
                            const step = Math.trunc(projectsAccumulator);
                            projectsTrack.scrollLeft += step;
                            projectsAccumulator -= step;
                            apply3DCurve(projectsTrack);

                            if (projectsTrack.scrollLeft >= maxScroll - 2 && projectsScrollDirection === 1) {
                                projectsScrollDirection = -1;
                                projectsPauseTimer = 90; // pause at end for ~1.5s
                            } else if (projectsTrack.scrollLeft <= 2 && projectsScrollDirection === -1) {
                                projectsScrollDirection = 1;
                                projectsPauseTimer = 90; // pause at start for ~1.5s
                            }
                        }
                    }
                }
            }
            requestAnimationFrame(autoScrollProjects);
        }
        autoScrollProjects();
        setTimeout(() => apply3DCurve(projectsTrack), 300);
    }

    /* =====================================================
       CERTIFICATES HORIZONTAL SLIDER (ROUND 3D ELEVATOR SCROLL & HOVER PAUSE)
       ===================================================== */
    const certificatesTrack = document.getElementById("certificatesTrack");
    const certPrevBtn = document.getElementById("certPrevBtn");
    const certNextBtn = document.getElementById("certNextBtn");
    const certificatesProgressBar = document.getElementById("certificatesProgressBar");

    if (certificatesTrack) {
        let isCertPaused = false;
        let certScrollDirection = 1;
        let isCertVisible = true;
        let certResumeTimer = null;
        let certAccumulator = 0;
        let certPauseTimer = 0;

        const getCertScrollDistance = () => {
            const firstCard = certificatesTrack.querySelector(".certificate-card");
            return firstCard ? firstCard.offsetWidth + 28 : 400;
        };

        const pauseAndResumeCert = () => {
            isCertPaused = true;
            clearTimeout(certResumeTimer);
            certResumeTimer = setTimeout(() => {
                isCertPaused = false;
            }, 2500);
        };

        if (certPrevBtn) {
            certPrevBtn.addEventListener("click", () => {
                pauseAndResumeCert();
                certificatesTrack.scrollBy({ left: -getCertScrollDistance(), behavior: "smooth" });
            });
            certPrevBtn.addEventListener("mouseenter", () => isCertPaused = true);
            certPrevBtn.addEventListener("mouseleave", () => isCertPaused = false);
        }

        if (certNextBtn) {
            certNextBtn.addEventListener("click", () => {
                pauseAndResumeCert();
                certificatesTrack.scrollBy({ left: getCertScrollDistance(), behavior: "smooth" });
            });
            certNextBtn.addEventListener("mouseenter", () => isCertPaused = true);
            certNextBtn.addEventListener("mouseleave", () => isCertPaused = false);
        }

        // Update progress bar and 3D curve
        const updateCertView = () => {
            apply3DCurve(certificatesTrack);
            if (!certificatesProgressBar) return;
            const maxScroll = certificatesTrack.scrollWidth - certificatesTrack.clientWidth;
            if (maxScroll > 0) {
                const scrollPercentage = (certificatesTrack.scrollLeft / maxScroll) * 100;
                certificatesProgressBar.style.width = `${Math.max(18, scrollPercentage)}%`;
            } else {
                certificatesProgressBar.style.width = "100%";
            }
        };

        certificatesTrack.addEventListener("scroll", updateCertView, { passive: true });
        window.addEventListener("resize", () => apply3DCurve(certificatesTrack));

        // Hover & Touch Pause
        certificatesTrack.addEventListener("mouseenter", () => {
            isCertPaused = true;
        });

        certificatesTrack.addEventListener("mouseleave", () => {
            isCertPaused = false;
        });

        certificatesTrack.addEventListener("touchstart", () => {
            isCertPaused = true;
        }, { passive: true });

        certificatesTrack.addEventListener("touchend", () => {
            pauseAndResumeCert();
        });

        // Drag to scroll for mouse
        let isCertDown = false;
        let certStartX = 0;
        let certScrollLeft = 0;
        let isCertDragging = false;
        let certDragDistance = 0;

        certificatesTrack.addEventListener("mousedown", (e) => {
            if (e.target.closest("a, button, .cert-link, .cert-nav-btn")) {
                isCertDown = false;
                isCertDragging = false;
                return;
            }
            isCertDown = true;
            isCertDragging = false;
            certDragDistance = 0;
            isCertPaused = true;
            certStartX = e.pageX - certificatesTrack.offsetLeft;
            certScrollLeft = certificatesTrack.scrollLeft;
        });

        window.addEventListener("mouseup", () => {
            if (isCertDown) {
                isCertDown = false;
                setTimeout(() => {
                    certificatesTrack.classList.remove("dragging");
                    isCertDragging = false;
                    certDragDistance = 0;
                }, 50);
            }
        });

        certificatesTrack.addEventListener("mousemove", (e) => {
            if (!isCertDown) return;
            const x = e.pageX - certificatesTrack.offsetLeft;
            const walk = (x - certStartX) * 1.5;
            certDragDistance = Math.abs(x - certStartX);
            if (certDragDistance > 12) {
                isCertDragging = true;
                certificatesTrack.classList.add("dragging");
                certificatesTrack.scrollLeft = certScrollLeft - walk;
                apply3DCurve(certificatesTrack);
            }
        });

        // Prevent accidental link open when user was dragging
        certificatesTrack.addEventListener("click", (e) => {
            if (isCertDragging && certDragDistance > 12) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);

        // Visibility observer
        const certObserver = new IntersectionObserver((entries) => {
            isCertVisible = entries[0].isIntersecting;
            if (isCertVisible) apply3DCurve(certificatesTrack);
        }, { threshold: 0.1 });
        certObserver.observe(certificatesTrack);

        // Smooth 60FPS Elevator Auto-Scroll with 3D Curve (Speed increased to 1.35px)
        function autoScrollCertificates() {
            if (!isCertPaused && isCertVisible) {
                const maxScroll = certificatesTrack.scrollWidth - certificatesTrack.clientWidth;
                if (maxScroll > 5) {
                    if (certPauseTimer > 0) {
                        certPauseTimer--;
                    } else {
                        certAccumulator += 1.35 * certScrollDirection;
                        if (Math.abs(certAccumulator) >= 1) {
                            const step = Math.trunc(certAccumulator);
                            certificatesTrack.scrollLeft += step;
                            certAccumulator -= step;
                            apply3DCurve(certificatesTrack);

                            if (certificatesTrack.scrollLeft >= maxScroll - 2 && certScrollDirection === 1) {
                                certScrollDirection = -1;
                                certPauseTimer = 90; // pause at end for ~1.5s
                            } else if (certificatesTrack.scrollLeft <= 2 && certScrollDirection === -1) {
                                certScrollDirection = 1;
                                certPauseTimer = 90; // pause at start for ~1.5s
                            }
                        }
                    }
                }
            }
            requestAnimationFrame(autoScrollCertificates);
        }
        autoScrollCertificates();
        setTimeout(() => apply3DCurve(certificatesTrack), 300);
    }

    /* =====================================================
       MASKED CONTACT HOVER & CLICK REVEAL
       ===================================================== */
    const maskedContacts = document.querySelectorAll(".contact-item .masked-contact");
    maskedContacts.forEach(item => {
        const fullText = item.getAttribute("data-full");
        const maskedText = item.textContent;

        const parentLink = item.closest(".contact-item");
        if (parentLink && fullText) {
            parentLink.addEventListener("mouseenter", () => {
                item.textContent = fullText;
            });

            parentLink.addEventListener("mouseleave", () => {
                item.textContent = maskedText;
            });

            parentLink.addEventListener("click", () => {
                item.textContent = fullText;
            });
        }
    });

    const contactForm = document.querySelector("#contactForm") || document.querySelector(".contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const button =
                contactForm.querySelector(".form-submit");

            if (!button) return;

            const originalText =
                button.textContent;

            button.textContent = "Message Sent ✓";

            button.style.transform = "translateY(-2px)";

            setTimeout(() => {

                button.textContent = originalText;
                button.style.transform = "";

                contactForm.reset();

            }, 2500);

        });

    }


    /* =====================================================
       IMAGE FALLBACK
       ===================================================== */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            image.style.display = "none";

            const parent = image.parentElement;

            if (
                parent &&
                !parent.querySelector(".image-fallback")
            ) {

                const fallback =
                    document.createElement("div");

                fallback.className =
                    "image-fallback";

                fallback.textContent = "MS";

                fallback.style.cssText = `
                    width: 100%;
                    height: 100%;
                    display: grid;
                    place-items: center;
                    font-size: 42px;
                    font-weight: 700;
                    color: #b8b8b5;
                `;

                parent.appendChild(fallback);
            }

        });

    });


    /* =====================================================
       GLOBAL INTERACTIVE CYBER CONSTELLATION & NEURAL CANVAS
       (Runs across all sections & pages with dynamic interactivity)
       ===================================================== */
    const globalCanvas = document.getElementById("globalBgCanvas");
    if (globalCanvas) {
        const ctx = globalCanvas.getContext("2d");
        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        function resizeGlobalCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            globalCanvas.width = width * dpr;
            globalCanvas.height = height * dpr;
            globalCanvas.style.width = `${width}px`;
            globalCanvas.style.height = `${height}px`;
            ctx.scale(dpr, dpr);
        }
        resizeGlobalCanvas();
        window.addEventListener("resize", resizeGlobalCanvas);

        // Track global mouse state across all sections
        const mouse = {
            x: -9999,
            y: -9999,
            radius: 175,
            active: false
        };

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

        // Click shockwaves array
        const shockwaves = [];
        window.addEventListener("pointerdown", (e) => {
            if (shockwaves.length < 5) {
                shockwaves.push({
                    x: e.clientX,
                    y: e.clientY,
                    radius: 5,
                    maxRadius: 180,
                    alpha: 0.85
                });
            }
        });

        // Theme-aware palette helper
        function isDarkMode() {
            return document.body.classList.contains("dark-mode");
        }

        // Particle Class
        class CyberNode {
            constructor() {
                this.reset(true);
            }

            reset(initial = false) {
                this.x = initial ? Math.random() * width : (Math.random() > 0.5 ? -10 : width + 10);
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.65;
                this.vy = (Math.random() - 0.5) * 0.65;
                this.baseRadius = Math.random() * 1.8 + 1.2;
                this.radius = this.baseRadius;
                this.pulseSpeed = Math.random() * 0.03 + 0.015;
                this.pulsePhase = Math.random() * Math.PI * 2;
                this.isAccent = Math.random() < 0.28; // 28% orange accent nodes
                this.isSpecial = Math.random() < 0.08; // Special glowing rotating diamond
                this.ringAngle = Math.random() * Math.PI * 2;
                this.ringSpeed = (Math.random() - 0.5) * 0.02;
            }

            update() {
                this.pulsePhase += this.pulseSpeed;
                this.ringAngle += this.ringSpeed;

                // Mouse gravitational attraction
                if (mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < mouse.radius && dist > 1) {
                        const force = (1 - dist / mouse.radius) * 0.85;
                        this.x += (dx / dist) * force;
                        this.y += (dy / dist) * force;
                    }
                }

                // Shockwave reaction
                for (let i = 0; i < shockwaves.length; i++) {
                    const sw = shockwaves[i];
                    const dx = this.x - sw.x;
                    const dy = this.y - sw.y;
                    const dist = Math.hypot(dx, dy);
                    if (Math.abs(dist - sw.radius) < 25 && dist > 0) {
                        const push = ((25 - Math.abs(dist - sw.radius)) / 25) * 4;
                        this.x += (dx / dist) * push;
                        this.y += (dy / dist) * push;
                    }
                }

                this.x += this.vx;
                this.y += this.vy;

                // Screen edge wrap
                if (this.x < -30) this.x = width + 30;
                if (this.x > width + 30) this.x = -30;
                if (this.y < -30) this.y = height + 30;
                if (this.y > height + 30) this.y = -30;
            }

            draw() {
                const dark = isDarkMode();
                const pulsingSize = this.baseRadius + Math.sin(this.pulsePhase) * 0.6;

                let fillColor;
                if (this.isAccent) {
                    fillColor = dark ? "rgba(255, 107, 53, 0.9)" : "rgba(255, 87, 34, 0.85)";
                } else {
                    fillColor = dark ? "rgba(230, 230, 240, 0.65)" : "rgba(35, 35, 40, 0.45)";
                }

                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0.5, pulsingSize), 0, Math.PI * 2);
                ctx.fillStyle = fillColor;
                ctx.fill();

                // Special nodes: draw rotating diamond wireframe
                if (this.isSpecial) {
                    ctx.save();
                    ctx.translate(this.x, this.y);
                    ctx.rotate(this.ringAngle);
                    ctx.strokeStyle = dark ? "rgba(255, 138, 101, 0.45)" : "rgba(255, 87, 34, 0.38)";
                    ctx.lineWidth = 1;
                    ctx.strokeRect(-6, -6, 12, 12);
                    ctx.restore();
                }
            }
        }

        // Floating Cyber Geometric Glyphs (Hexagons, Crosses, Reticles)
        class CyberGlyph {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.22;
                this.vy = (Math.random() - 0.5) * 0.22;
                this.size = Math.random() * 24 + 14;
                this.rotation = Math.random() * Math.PI * 2;
                this.rotSpeed = (Math.random() - 0.5) * 0.008;
                this.type = Math.floor(Math.random() * 3); // 0: Hexagon, 1: Cross +, 2: Concentric Reticle
                this.alpha = Math.random() * 0.18 + 0.08;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;
                this.rotation += this.rotSpeed;

                if (this.x < -50) this.x = width + 50;
                if (this.x > width + 50) this.x = -50;
                if (this.y < -50) this.y = height + 50;
                if (this.y > height + 50) this.y = -50;
            }

            draw() {
                const dark = isDarkMode();
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);
                ctx.strokeStyle = dark ? `rgba(255, 110, 64, ${this.alpha * 1.3})` : `rgba(255, 87, 34, ${this.alpha * 0.9})`;
                ctx.lineWidth = 1.2;

                if (this.type === 0) {
                    // Wireframe Hexagon
                    ctx.beginPath();
                    for (let i = 0; i < 6; i++) {
                        const angle = (i * Math.PI) / 3;
                        const px = Math.cos(angle) * (this.size / 2);
                        const py = Math.sin(angle) * (this.size / 2);
                        if (i === 0) ctx.moveTo(px, py);
                        else ctx.lineTo(px, py);
                    }
                    ctx.closePath();
                    ctx.stroke();
                } else if (this.type === 1) {
                    // Cyber Cross +
                    const len = this.size * 0.4;
                    ctx.beginPath();
                    ctx.moveTo(-len, 0);
                    ctx.lineTo(len, 0);
                    ctx.moveTo(0, -len);
                    ctx.lineTo(0, len);
                    ctx.stroke();
                } else {
                    // Cyber Reticle Ring
                    const r = this.size * 0.35;
                    ctx.beginPath();
                    ctx.arc(0, 0, r, 0, Math.PI * 2);
                    ctx.moveTo(0, -r - 4); ctx.lineTo(0, -r + 2);
                    ctx.moveTo(0, r - 2); ctx.lineTo(0, r + 4);
                    ctx.moveTo(-r - 4, 0); ctx.lineTo(-r + 2, 0);
                    ctx.moveTo(r - 2, 0); ctx.lineTo(r + 4, 0);
                    ctx.stroke();
                }
                ctx.restore();
            }
        }

        // Initialize Nodes & Glyphs based on viewport size
        const nodeCount = Math.min(110, Math.max(50, Math.floor((width * height) / 14000)));
        const nodes = Array.from({ length: nodeCount }, () => new CyberNode());
        const glyphs = Array.from({ length: 9 }, () => new CyberGlyph());

        const maxConnectionDist = 135;

        // Render Loop
        function renderGlobalCanvas() {
            ctx.clearRect(0, 0, width, height);
            const dark = isDarkMode();

            // 1. Draw Shockwaves
            for (let i = shockwaves.length - 1; i >= 0; i--) {
                const sw = shockwaves[i];
                sw.radius += 5;
                sw.alpha *= 0.94;

                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.strokeStyle = dark ? `rgba(255, 110, 64, ${sw.alpha * 0.7})` : `rgba(255, 87, 34, ${sw.alpha * 0.6})`;
                ctx.lineWidth = 1.8;
                ctx.stroke();

                if (sw.radius > sw.maxRadius || sw.alpha < 0.02) {
                    shockwaves.splice(i, 1);
                }
            }

            // 2. Update & Draw Cyber Glyphs
            for (let i = 0; i < glyphs.length; i++) {
                glyphs[i].update();
                glyphs[i].draw();
            }

            // 3. Update & Draw Nodes
            for (let i = 0; i < nodes.length; i++) {
                nodes[i].update();
                nodes[i].draw();
            }

            // 4. Draw Connecting Laser Threads
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.hypot(dx, dy);

                    if (dist < maxConnectionDist) {
                        const alpha = (1 - dist / maxConnectionDist);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);

                        if (nodes[i].isAccent || nodes[j].isAccent) {
                            ctx.strokeStyle = dark 
                                ? `rgba(255, 107, 53, ${alpha * 0.38})`
                                : `rgba(255, 87, 34, ${alpha * 0.28})`;
                            ctx.lineWidth = 0.9;
                        } else {
                            ctx.strokeStyle = dark
                                ? `rgba(255, 255, 255, ${alpha * 0.12})`
                                : `rgba(0, 0, 0, ${alpha * 0.07})`;
                            ctx.lineWidth = 0.65;
                        }
                        ctx.stroke();
                    }
                }

                // 5. Connect Laser Tether to Mouse
                if (mouse.active) {
                    const mdx = nodes[i].x - mouse.x;
                    const mdy = nodes[i].y - mouse.y;
                    const mDist = Math.hypot(mdx, mdy);

                    if (mDist < 160) {
                        const mAlpha = (1 - mDist / 160);
                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.strokeStyle = dark
                            ? `rgba(255, 110, 64, ${mAlpha * 0.55})`
                            : `rgba(255, 87, 34, ${mAlpha * 0.45})`;
                        ctx.lineWidth = 1.1;
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(renderGlobalCanvas);
        }
        renderGlobalCanvas();
    }


    /* =====================================================
       3D HERO THREE.JS CYBER NEURAL CORE
       ===================================================== */
    const heroCanvas = document.getElementById("hero3dCanvas");
    if (heroCanvas && typeof THREE !== "undefined") {
        try {
            const container = document.getElementById("hero3dContainer") || heroCanvas.parentElement;
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(45, (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight), 0.1, 1000);
            camera.position.z = 26;

            const renderer = new THREE.WebGLRenderer({
                canvas: heroCanvas,
                alpha: true,
                antialias: true,
                powerPreference: "high-performance"
            });
            renderer.setSize(container.clientWidth || window.innerWidth, container.clientHeight || window.innerHeight);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

            // Central 3D Group
            const sceneGroup = new THREE.Group();
            scene.add(sceneGroup);

            // 1. Inner Golden AI Core (Icosahedron)
            const innerGeo = new THREE.IcosahedronGeometry(4.5, 1);
            const innerWire = new THREE.WireframeGeometry(innerGeo);
            const innerMat = new THREE.LineBasicMaterial({
                color: 0xffb74d,
                transparent: true,
                opacity: 0.75,
                linewidth: 1.5
            });
            const innerCore = new THREE.LineSegments(innerWire, innerMat);
            sceneGroup.add(innerCore);

            // 2. Outer Cyber Crystal Shell (Octahedron/Icosahedron 8)
            const outerGeo = new THREE.IcosahedronGeometry(7.8, 1);
            const outerWire = new THREE.WireframeGeometry(outerGeo);
            const outerMat = new THREE.LineBasicMaterial({
                color: 0xff5722,
                transparent: true,
                opacity: 0.45,
                linewidth: 1.2
            });
            const outerShell = new THREE.LineSegments(outerWire, outerMat);
            sceneGroup.add(outerShell);

            // 3. Glowing Vertex Nodes
            const nodeGeo = new THREE.BufferGeometry();
            const positions = outerGeo.attributes.position.array;
            nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            const nodeMat = new THREE.PointsMaterial({
                color: 0xff7043,
                size: 0.55,
                transparent: true,
                opacity: 0.95
            });
            const nodePoints = new THREE.Points(nodeGeo, nodeMat);
            sceneGroup.add(nodePoints);

            // 4. Orbital Rings (3 Toruses at dynamic angles)
            const ring1Geo = new THREE.TorusGeometry(11, 0.06, 16, 120);
            const ring1Mat = new THREE.MeshBasicMaterial({
                color: 0xff7043,
                transparent: true,
                opacity: 0.55
            });
            const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
            ring1.rotation.x = Math.PI / 3;
            sceneGroup.add(ring1);

            const ring2Geo = new THREE.TorusGeometry(13.2, 0.05, 16, 120);
            const ring2Mat = new THREE.MeshBasicMaterial({
                color: 0xffb74d,
                transparent: true,
                opacity: 0.45
            });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.rotation.y = Math.PI / 3.5;
            ring2.rotation.x = -Math.PI / 5;
            sceneGroup.add(ring2);

            const ring3Geo = new THREE.TorusGeometry(15, 0.04, 16, 120);
            const ring3Mat = new THREE.MeshBasicMaterial({
                color: 0xff5722,
                transparent: true,
                opacity: 0.35
            });
            const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
            ring3.rotation.z = Math.PI / 4;
            ring3.rotation.x = Math.PI / 2.2;
            sceneGroup.add(ring3);

            // Orbiting Satellite Beads on Rings
            const satGeo = new THREE.SphereGeometry(0.32, 12, 12);
            const satMat1 = new THREE.MeshBasicMaterial({ color: 0xfff3e0 });
            const sat1 = new THREE.Mesh(satGeo, satMat1);
            sceneGroup.add(sat1);

            const satMat2 = new THREE.MeshBasicMaterial({ color: 0xffab40 });
            const sat2 = new THREE.Mesh(satGeo, satMat2);
            sceneGroup.add(sat2);

            const satMat3 = new THREE.MeshBasicMaterial({ color: 0xff5722 });
            const sat3 = new THREE.Mesh(satGeo, satMat3);
            sceneGroup.add(sat3);

            // 5. Starfield / Neural Point Cloud
            const particleCount = 200;
            const particleGeo = new THREE.BufferGeometry();
            const particleCoords = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount * 3; i += 3) {
                particleCoords[i] = (Math.random() - 0.5) * 55;
                particleCoords[i + 1] = (Math.random() - 0.5) * 45;
                particleCoords[i + 2] = (Math.random() - 0.5) * 35;
            }
            particleGeo.setAttribute("position", new THREE.BufferAttribute(particleCoords, 3));
            const particleMat = new THREE.PointsMaterial({
                color: 0xffab91,
                size: 0.28,
                transparent: true,
                opacity: 0.75
            });
            const particles = new THREE.Points(particleGeo, particleMat);
            scene.add(particles);

            // Responsive offset on right side (near visual portrait)
            function updatePosition() {
                if (window.innerWidth > 992) {
                    sceneGroup.position.set(6, 0, 0);
                } else {
                    sceneGroup.position.set(0, 0, -4);
                }
            }
            updatePosition();

            // Mouse interaction with smooth interpolation
            let targetMouseX = 0;
            let targetMouseY = 0;
            let currentMouseX = 0;
            let currentMouseY = 0;

            window.addEventListener("mousemove", (e) => {
                targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
                targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
            }, { passive: true });

            // Resize handling
            function onResize() {
                if (!container) return;
                const width = container.clientWidth || window.innerWidth;
                const height = container.clientHeight || window.innerHeight;
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
                renderer.setSize(width, height);
                updatePosition();
            }
            window.addEventListener("resize", onResize);

            // Intersection Observer to stop animation loop when off-screen
            let isVisible = true;
            const heroObserver = new IntersectionObserver((entries) => {
                isVisible = entries[0].isIntersecting;
            }, { threshold: 0.05 });
            heroObserver.observe(container);

            // Animation Loop
            let clock = new THREE.Clock();
            function animate() {
                requestAnimationFrame(animate);
                if (!isVisible) return;

                const elapsedTime = clock.getElapsedTime();

                // Smooth lerp mouse
                currentMouseX += (targetMouseX - currentMouseX) * 0.05;
                currentMouseY += (targetMouseY - currentMouseY) * 0.05;

                // Rotations
                innerCore.rotation.x = -elapsedTime * 0.25;
                innerCore.rotation.y = -elapsedTime * 0.35;

                outerShell.rotation.x = elapsedTime * 0.15;
                outerShell.rotation.y = elapsedTime * 0.2 + currentMouseX * 0.5;
                nodePoints.rotation.x = outerShell.rotation.x;
                nodePoints.rotation.y = outerShell.rotation.y;

                ring1.rotation.z = elapsedTime * 0.28;
                ring1.rotation.x = (Math.PI / 3) + currentMouseY * 0.3;

                ring2.rotation.z = -elapsedTime * 0.22;
                ring2.rotation.y = (Math.PI / 3.5) + currentMouseX * 0.3;

                ring3.rotation.z = elapsedTime * 0.18;
                ring3.rotation.y = -currentMouseX * 0.25;

                // Orbiting satellites calculation
                const angle1 = elapsedTime * 0.8;
                sat1.position.set(Math.cos(angle1) * 11, Math.sin(angle1) * Math.cos(Math.PI / 3) * 11, Math.sin(angle1) * Math.sin(Math.PI / 3) * 11);

                const angle2 = -elapsedTime * 0.65;
                sat2.position.set(Math.cos(angle2) * 13.2, Math.sin(angle2) * 13.2, Math.sin(angle2) * Math.cos(Math.PI / 3.5) * 13.2);

                const angle3 = elapsedTime * 0.5;
                sat3.position.set(Math.cos(angle3) * 15, Math.sin(angle3) * Math.sin(Math.PI / 2.2) * 15, Math.sin(angle3) * Math.cos(Math.PI / 2.2) * 15);

                particles.rotation.y = elapsedTime * 0.035;
                particles.rotation.x = elapsedTime * 0.018;

                sceneGroup.rotation.x = currentMouseY * 0.3;
                sceneGroup.rotation.y = currentMouseX * 0.4;

                renderer.render(scene, camera);
            }
            animate();

        } catch (err) {
            console.warn("Three.js 3D initialization warning:", err);
        }
    }


    /* =====================================================
       3D INTERACTIVE CARD TILT WITH DYNAMIC GLARE
       ===================================================== */
    const allGlaredCards = document.querySelectorAll(
        '[data-tilt="true"], .project-card, .certificate-card'
    );

    allGlaredCards.forEach(card => {
        // Add glare overlay if not present
        if (!card.querySelector(".tilt-glare")) {
            const glare = document.createElement("div");
            glare.className = "tilt-glare";
            card.appendChild(glare);
        }

        const isStandaloneTilt = card.hasAttribute("data-tilt") && card.getAttribute("data-tilt") === "true";
        const maxTilt = parseFloat(card.getAttribute("data-tilt-max")) || 12;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);

            if (isStandaloneTilt) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -maxTilt;
                const rotateY = ((x - centerX) / centerX) * maxTilt;
                card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;
            }
        });

        if (isStandaloneTilt) {
            card.addEventListener("mouseleave", () => {
                card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
            });
        }
    });

});