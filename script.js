/* 
  Scripts for Freelance Portfolio
*/

document.addEventListener('DOMContentLoaded', () => {
    // Project Data with Categories and Case Study Details
    const projects = [
        {
            title: "Luxuries",
            category: "Landing Page",
            desc: "Premium lifestyle brand landing page.",
            problem: "The client needed a high-end visual experience that matched their luxury price point while maintaining fast load times.",
            solution: "Implemented GSAP for smooth animations and Three.js for a custom 3D model viewer to showcase products in 360°.",
            result: "45% increase in session duration and a significant boost in brand perception.",
            tags: ["GSAP", "Three.js", "WebGl"],
            imgDesktop: "projects/luxuries.png",
            imgMobile: "projects/luxuries-mobile.jpeg",
            liveLink: "https://luxuries.vercel.app/"
        },
        {
            title: "Lumiere",
            category: "E-commerce",
            desc: "Elegant lighting and furniture showcase website.",
            problem: "The existing store was slow and didn't reflect the high quality of the bespoke lighting fixtures.",
            solution: "Built a headless commerce solution using Next.js for instant page transitions and Framer Motion for premium aesthetics.",
            result: "25% reduction in bounce rate and streamlined checkout process.",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            imgDesktop: "projects/lumiere.png",
            imgMobile: "projects/lumiere-mobile.jpeg",
            liveLink: "https://lumiere-seven-nu.vercel.app/"
        },
        {
            title: "Sunshine Herbal",
            category: "E-commerce",
            desc: "Natural wellness product store.",
            problem: "Product details were hard to find and the mobile experience was clunky.",
            solution: "Designed a mobile-first UI with a clean product grid and optimized search functionality.",
            result: "50% increase in mobile conversions within the first 3 months.",
            tags: ["HTML/CSS", "JavaScript", "Responsive"],
            imgDesktop: "projects/sunshine.png",
            imgMobile: "projects/sunshine-mobile.jpeg",
            liveLink: "https://sunshine-rho.vercel.app/"
        },
        {
            title: "HavenSpaces",
            category: "Web App",
            desc: "Real estate platform for luxury properties.",
            problem: "Users struggled to visualize property locations relative to amenities.",
            solution: "Integrated Mapbox API for an interactive map view and implemented real-time database filtering.",
            result: "Improved user retention and higher quality lead generation for agents.",
            tags: ["React", "API Integration", "Mapbox"],
            imgDesktop: "projects/havenspaces.png",
            imgMobile: "projects/havenspaces-mobile.jpeg",
            liveLink: "https://havenspaces.vercel.app/"
        },
        {
            title: "Urban Kicks",
            category: "E-commerce",
            desc: "Sneakerhead marketplace.",
            problem: "Scaling the marketplace required complex state management for thousands of SKU combinations.",
            solution: "Utilized Redux for robust state management and optimized Node.js backend for high-traffic inventory updates.",
            result: "Built a scalable foundation that supports 10k+ daily active users.",
            tags: ["React", "Redux", "Node.js"],
            imgDesktop: "projects/urbankicks.png",
            imgMobile: "projects/urbankick-mobile.jpeg",
            liveLink: "https://urban-kicks-iota.vercel.app/"
        },
        {
            title: "Room Sync",
            category: "Web App",
            desc: "Roommate matching app for students.",
            problem: "Matching logic was inaccurate and manual, leading to poor user satisfaction.",
            solution: "Developed a Python-based scoring algorithm and a Django-powered platform for automated matching.",
            result: "90% student satisfaction rate reported in the first university pilot.",
            tags: ["Django", "Python", "PostgreSQL"],
            imgDesktop: "projects/roomsync.png",
            imgMobile: "projects/roomsync-mobile.jpeg",
            liveLink: "https://room-sync.vercel.app"
        }
    ];

    let currentFilter = 'All';

    // Render Projects Gallery
    function renderProjects(filter = 'All') {
        const projectsGrid = document.getElementById('projects-grid');
        if (!projectsGrid) return;

        projectsGrid.style.opacity = '0';

        setTimeout(() => {
            projectsGrid.innerHTML = '';
            const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter);

            filtered.forEach((project, index) => {
                const card = document.createElement('div');
                card.className = 'project-card card-glass reveal active';
                card.style.padding = '1.5rem';
                card.innerHTML = `
                    <div class="img-container" style="cursor: pointer;" onclick="openModal('${project.title}')">
                        <img src="${project.imgDesktop}" alt="${project.title}">
                        <span class="category-badge">${project.category}</span>
                    </div>
                    <h3>${project.title}</h3>
                    <p style="margin-bottom: 1rem; font-size: 0.9rem; color: var(--color-text-muted);">${project.desc}</p>
                    <div style="margin-bottom: 1rem;">
                        ${project.tags.slice(0, 3).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn btn-outline" onclick="openModal('${project.title}')" style="width: 100%; font-size: 0.85rem;">Case Study</button>
                `;
                projectsGrid.appendChild(card);
            });
            projectsGrid.style.opacity = '1';
        }, 300);
    }

    // Modal Logic Expansion
    window.openModal = (projectTitle) => {
        const modal = document.getElementById('project-modal');
        const content = modal.querySelector('.modal-body');
        const p = projects.find(proj => proj.title === projectTitle);

        content.innerHTML = `
            <h2 style="margin-bottom: 0.5rem; color: var(--color-text-accent);">${p.title}</h2>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
                <span class="category-badge" style="position: static; display: inline-block;">${p.category}</span>
                ${p.tags.slice(0, 2).map(tag => `<span class="tech-tag" style="margin: 0;">${tag}</span>`).join('')}
            </div>
            
            <div class="modal-tabs">
                <button class="tab-btn active" onclick="switchTab('overview')">Case Study</button>
                <button class="tab-btn" onclick="switchTab(event, 'tech')">Tech Stack</button>
            </div>
            
            <div id="tab-overview" class="tab-content active">
                <div class="case-study-grid" style="display: grid; gap: 1.5rem; margin-bottom: 2rem;">
                    <div class="case-info card-glass" style="padding: 1.25rem; background: rgba(255,255,255,0.02);">
                        <h4 style="color: var(--color-text-accent); font-size: 0.9rem; margin-bottom: 0.5rem;">THE PROBLEM</h4>
                        <p style="font-size: 0.95rem; line-height: 1.5;">${p.problem}</p>
                    </div>
                    <div class="case-info card-glass" style="padding: 1.25rem; background: rgba(255,255,255,0.02);">
                        <h4 style="color: var(--color-text-accent); font-size: 0.9rem; margin-bottom: 0.5rem;">THE SOLUTION</h4>
                        <p style="font-size: 0.95rem; line-height: 1.5;">${p.solution}</p>
                    </div>
                    <div class="case-info card-glass" style="padding: 1.25rem; background: rgba(56, 189, 248, 0.05); border-color: rgba(56, 189, 248, 0.2);">
                        <h4 style="color: var(--color-text-accent); font-size: 0.9rem; margin-bottom: 0.5rem;">THE RESULT</h4>
                        <p style="font-size: 0.95rem; line-height: 1.5; color: var(--color-text-main); font-weight: 500;">${p.result}</p>
                    </div>
                </div>
                <div class="grid grid-2" style="gap: 1rem; margin-bottom: 2rem;">
                    <img src="${p.imgDesktop}" style="border-radius: 8px; border: 1px solid var(--color-border);" alt="Desktop View">
                    <img src="${p.imgMobile}" style="border-radius: 8px; border: 1px solid var(--color-border); max-height: 350px; width: auto; margin: 0 auto; display: block;" alt="Mobile View">
                </div>
                <a href="${p.liveLink}" target="_blank" class="btn btn-primary" style="width: 100%;">Visit Live Project</a>
            </div>
            
            <div id="tab-tech" class="tab-content">
                <h3 style="margin-bottom: 1rem;">Full Stack Composition</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${p.tags.map(tag => `<span class="tech-tag" style="font-size: 1rem; padding: 0.5rem 1rem;">${tag}</span>`).join('')}
                </div>
                <p style="margin-top: 2rem; color: var(--color-text-muted);">
                    Developed with a focus on high-conversion design patterns and scalable architecture.
                </p>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.switchTab = (event, tabName) => {
        const modal = document.getElementById('project-modal');
        modal.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        modal.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        event.target.classList.add('active');
        modal.querySelector(`#tab-${tabName}`).classList.add('active');
    };

    window.setFilter = (category) => {
        currentFilter = category;
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === category);
        });
        renderProjects(category);
    };

    // Initial Render
    renderProjects();

    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('project-modal').classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Mobile Menu Logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.innerHTML = navLinks.classList.contains('active')
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';

        });

        // Close menu when link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburger.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
            });
        });
    }

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        document.querySelectorAll('a, button, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('expand'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('expand'));
        });
    }

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Scroll Progress Tracker Logic
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        const progressBar = document.querySelector('.scroll-progress');
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });

    // Scroll Animations (Intersection Observer) with Staggered Reveal
    const isMobileView = window.innerWidth <= 768;
    const observerOptions = {
        threshold: isMobileView ? 0.02 : 0.1, // Trigger even earlier for better responsiveness
        rootMargin: "0px 0px -20px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Check if element is part of a grid for staggering
                const gridParent = entry.target.closest('.grid');
                if (gridParent) {
                    const children = Array.from(gridParent.querySelectorAll('.reveal'));
                    const childIndex = children.indexOf(entry.target);
                    if (childIndex !== -1) {
                        // Reduce stagger on mobile since items are stacked vertically
                        const staggerDelay = isMobileView ? 0.05 : 0.1;
                        entry.target.style.transitionDelay = `${childIndex * staggerDelay}s`;
                    }
                }

                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // ScrollSpy: Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinksList = document.querySelectorAll('.nav-links a');

    function scrollSpy() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                navLinksList.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);

    // Stats Counter Animation (Independent)
    const statsSection = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsStarted = false;

    function startCount(el) {
        const target = parseInt(el.getAttribute('data-target'));
        const countTo = target;
        const duration = 2000;
        const step = Math.ceil(target / (duration / 16));

        let current = 0;
        const timer = setInterval(() => {
            current += step;
            if (current >= countTo) {
                el.innerText = countTo + "+";
                clearInterval(timer);
            } else {
                el.innerText = Math.ceil(current);
            }
        }, 16);
    }

    const observerStats = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsStarted) {
                statNumbers.forEach(num => startCount(num));
                statsStarted = true;
            }
        });
    });

    if (statsSection) {
        observerStats.observe(statsSection);
    }


    // Smooth scrolling for anchor links 
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for fixed navbar
                    behavior: 'smooth'
                });
            }
        });
    });

    // Magnetic Button/Link Effect
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .nav-links a, .logo');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // Simplified cinematic entrance (no longer hiding body)
    document.body.classList.add('loaded');

    console.log('Website polished and loaded successfully.');
});
