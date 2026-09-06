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
            }, { duration: 400, fill: "forwards" });
        });
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
       PROJECTS HORIZONTAL SLIDER CONTROLS
       ===================================================== */
    const projectsTrack = document.getElementById("projectsTrack");
    const projectPrevBtn = document.getElementById("projectPrevBtn");
    const projectNextBtn = document.getElementById("projectNextBtn");
    const projectsProgressBar = document.getElementById("projectsProgressBar");

    if (projectsTrack) {
        const getScrollDistance = () => {
            const firstCard = projectsTrack.querySelector(".project-card");
            return firstCard ? firstCard.offsetWidth + 28 : 450;
        };

        if (projectPrevBtn) {
            projectPrevBtn.addEventListener("click", () => {
                projectsTrack.scrollBy({ left: -getScrollDistance(), behavior: "smooth" });
            });
        }

        if (projectNextBtn) {
            projectNextBtn.addEventListener("click", () => {
                projectsTrack.scrollBy({ left: getScrollDistance(), behavior: "smooth" });
            });
        }

        // Update progress bar
        const updateProgressBar = () => {
            if (!projectsProgressBar) return;
            const maxScroll = projectsTrack.scrollWidth - projectsTrack.clientWidth;
            if (maxScroll > 0) {
                const scrollPercentage = (projectsTrack.scrollLeft / maxScroll) * 100;
                projectsProgressBar.style.width = `${Math.max(18, scrollPercentage)}%`;
            } else {
                projectsProgressBar.style.width = "100%";
            }
        };

        projectsTrack.addEventListener("scroll", updateProgressBar);

        // Drag to scroll for mouse
        let isDown = false;
        let startX, scrollLeft;

        projectsTrack.addEventListener("mousedown", (e) => {
            isDown = true;
            projectsTrack.classList.add("dragging");
            startX = e.pageX - projectsTrack.offsetLeft;
            scrollLeft = projectsTrack.scrollLeft;
        });

        projectsTrack.addEventListener("mouseleave", () => {
            isDown = false;
            projectsTrack.classList.remove("dragging");
        });

        projectsTrack.addEventListener("mouseup", () => {
            isDown = false;
            projectsTrack.classList.remove("dragging");
        });

        projectsTrack.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - projectsTrack.offsetLeft;
            const walk = (x - startX) * 1.5;
            projectsTrack.scrollLeft = scrollLeft - walk;
        });
    }

    /* =====================================================
       CERTIFICATES HORIZONTAL SLIDER CONTROLS
       ===================================================== */
    const certificatesTrack = document.getElementById("certificatesTrack");
    const certPrevBtn = document.getElementById("certPrevBtn");
    const certNextBtn = document.getElementById("certNextBtn");
    const certificatesProgressBar = document.getElementById("certificatesProgressBar");

    if (certificatesTrack) {
        const getCertScrollDistance = () => {
            const firstCard = certificatesTrack.querySelector(".certificate-card");
            return firstCard ? firstCard.offsetWidth + 24 : 400;
        };

        if (certPrevBtn) {
            certPrevBtn.addEventListener("click", () => {
                certificatesTrack.scrollBy({ left: -getCertScrollDistance(), behavior: "smooth" });
            });
        }

        if (certNextBtn) {
            certNextBtn.addEventListener("click", () => {
                certificatesTrack.scrollBy({ left: getCertScrollDistance(), behavior: "smooth" });
            });
        }

        // Update progress bar
        const updateCertProgressBar = () => {
            if (!certificatesProgressBar) return;
            const maxScroll = certificatesTrack.scrollWidth - certificatesTrack.clientWidth;
            if (maxScroll > 0) {
                const scrollPercentage = (certificatesTrack.scrollLeft / maxScroll) * 100;
                certificatesProgressBar.style.width = `${Math.max(18, scrollPercentage)}%`;
            } else {
                certificatesProgressBar.style.width = "100%";
            }
        };

        certificatesTrack.addEventListener("scroll", updateCertProgressBar);

        // Drag to scroll for mouse
        let isCertDown = false;
        let certStartX, certScrollLeft;

        certificatesTrack.addEventListener("mousedown", (e) => {
            isCertDown = true;
            certificatesTrack.classList.add("dragging");
            certStartX = e.pageX - certificatesTrack.offsetLeft;
            certScrollLeft = certificatesTrack.scrollLeft;
        });

        certificatesTrack.addEventListener("mouseleave", () => {
            isCertDown = false;
            certificatesTrack.classList.remove("dragging");
        });

        certificatesTrack.addEventListener("mouseup", () => {
            isCertDown = false;
            certificatesTrack.classList.remove("dragging");
        });

        certificatesTrack.addEventListener("mousemove", (e) => {
            if (!isCertDown) return;
            e.preventDefault();
            const x = e.pageX - certificatesTrack.offsetLeft;
            const walk = (x - certStartX) * 1.5;
            certificatesTrack.scrollLeft = certScrollLeft - walk;
        });
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
       3D HERO THREE.JS CYBER NEURAL CANVAS
       ===================================================== */
    const heroCanvas = document.getElementById("hero3dCanvas");
    if (heroCanvas && typeof THREE !== "undefined") {
        try {
            const container = document.getElementById("hero3dContainer") || heroCanvas.parentElement;
            const scene = new THREE.Scene();

            const camera = new THREE.PerspectiveCamera(50, (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight), 0.1, 1000);
            camera.position.z = 24;

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

            // 1. Icosahedron Wireframe (AI Core)
            const icoGeometry = new THREE.IcosahedronGeometry(7, 1);
            const icoWireframe = new THREE.WireframeGeometry(icoGeometry);
            const icoLineMaterial = new THREE.LineBasicMaterial({
                color: 0xff5722,
                transparent: true,
                opacity: 0.38,
                linewidth: 1
            });
            const icoMesh = new THREE.LineSegments(icoWireframe, icoLineMaterial);
            sceneGroup.add(icoMesh);

            // 2. Glowing Nodes at vertices
            const nodeGeo = new THREE.BufferGeometry();
            const positions = icoGeometry.attributes.position.array;
            nodeGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
            const nodeMat = new THREE.PointsMaterial({
                color: 0xff7043,
                size: 0.45,
                transparent: true,
                opacity: 0.9
            });
            const nodePoints = new THREE.Points(nodeGeo, nodeMat);
            sceneGroup.add(nodePoints);

            // 3. Orbital Ring 1
            const ring1Geo = new THREE.TorusGeometry(10.5, 0.05, 16, 100);
            const ring1Mat = new THREE.MeshBasicMaterial({
                color: 0xff9800,
                transparent: true,
                opacity: 0.45
            });
            const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
            ring1.rotation.x = Math.PI / 3;
            sceneGroup.add(ring1);

            // 4. Orbital Ring 2
            const ring2Geo = new THREE.TorusGeometry(12.5, 0.04, 16, 100);
            const ring2Mat = new THREE.MeshBasicMaterial({
                color: 0xff5722,
                transparent: true,
                opacity: 0.35
            });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.rotation.y = Math.PI / 4;
            ring2.rotation.x = -Math.PI / 6;
            sceneGroup.add(ring2);

            // 5. Floating Starfield / AI Neural Particles
            const particleCount = 150;
            const particleGeo = new THREE.BufferGeometry();
            const particleCoords = new Float32Array(particleCount * 3);
            for (let i = 0; i < particleCount * 3; i += 3) {
                particleCoords[i] = (Math.random() - 0.5) * 50;
                particleCoords[i + 1] = (Math.random() - 0.5) * 40;
                particleCoords[i + 2] = (Math.random() - 0.5) * 30;
            }
            particleGeo.setAttribute("position", new THREE.BufferAttribute(particleCoords, 3));
            const particleMat = new THREE.PointsMaterial({
                color: 0xffab91,
                size: 0.22,
                transparent: true,
                opacity: 0.65
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
                icoMesh.rotation.x = elapsedTime * 0.15;
                icoMesh.rotation.y = elapsedTime * 0.2 + currentMouseX * 0.5;
                nodePoints.rotation.x = icoMesh.rotation.x;
                nodePoints.rotation.y = icoMesh.rotation.y;

                ring1.rotation.z = elapsedTime * 0.25;
                ring1.rotation.x = (Math.PI / 3) + currentMouseY * 0.3;
                ring2.rotation.z = -elapsedTime * 0.2;
                ring2.rotation.y = (Math.PI / 4) + currentMouseX * 0.3;

                particles.rotation.y = elapsedTime * 0.04;
                particles.rotation.x = elapsedTime * 0.02;

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
    const tiltCards = document.querySelectorAll(
        '[data-tilt="true"], .project-card, .certificate-card'
    );

    tiltCards.forEach(card => {
        // Add glare overlay if not present
        if (!card.querySelector(".tilt-glare")) {
            const glare = document.createElement("div");
            glare.className = "tilt-glare";
            card.appendChild(glare);
        }

        const maxTilt = parseFloat(card.getAttribute("data-tilt-max")) || 12;

        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -maxTilt;
            const rotateY = ((x - centerX) / centerX) * maxTilt;

            card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(8px)`;

            card.style.setProperty("--glare-x", `${(x / rect.width) * 100}%`);
            card.style.setProperty("--glare-y", `${(y / rect.height) * 100}%`);
        });

        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)";
        });
    });

});