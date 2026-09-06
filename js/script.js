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

});