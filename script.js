/* 
  Scripts for Freelance Portfolio
*/

document.addEventListener('DOMContentLoaded', () => {
    // Project Data
    const projects = [
        {
            title: "Luxuries",
            desc: "Premium lifestyle brand landing page.",
            tags: ["GSAP", "Three.js", "WebGl"],
            imgDesktop: "projects/luxuries.png",
            imgMobile: "projects/luxuries-mobile.jpeg",
            liveLink: "https://luxuries.vercel.app/"
        },
        {
            title: "Lumiere",
            desc: "Elegant lighting and furniture showcase website.",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            imgDesktop: "projects/lumiere.png",
            imgMobile: "projects/lumiere-mobile.jpeg",
            liveLink: "https://lumiere-seven-nu.vercel.app/"
        },
        {
            title: "Sunshine Herbal",
            desc: "Natural wellness product store with vibrant branding.",
            tags: ["HTML/CSS", "JavaScript", "Responsive"],
            imgDesktop: "projects/sunshine.png",
            imgMobile: "projects/sunshine-mobile.jpeg",
            liveLink: "https://sunshine-rho.vercel.app/"
        },
        {
            title: "HavenSpaces",
            desc: "Real estate listing platform for luxury properties.",
            tags: ["React", "API Integration", "Mapbox"],
            imgDesktop: "projects/havenspaces.png",
            imgMobile: "projects/havenspaces-mobile.jpeg",
            liveLink: "https://havenspaces.vercel.app/"
        },
        {
            title: "Urban Kicks",
            desc: "Sneakerhead marketplace with dynamic filtering.",
            tags: ["React", "Redux", "Node.js"],
            imgDesktop: "projects/urbankicks.png",
            imgMobile: "projects/urbankick-mobile.jpeg",
            liveLink: "https://urban-kicks-iota.vercel.app/"
        },
        {
            title: "Thrift Co.",
            desc: "A modern e-commerce platform for thrifting enthusiasts.",
            tags: ["React", "Vercel", "CSS Modules"],
            imgDesktop: "projects/thrift.png",
            imgMobile: "projects/thrift-mobile.jpeg",
            liveLink: "https://thrift-co-seven.vercel.app/"
        },
        {
            title: "Pet Store",
            desc: "One-stop shop for pet supplies and accessories.",
            tags: ["Vue.js", "Firebase", "SCSS"],
            imgDesktop: "projects/pet.png",
            imgMobile: "projects/pet-mobile.jpeg",
            liveLink: "https://pet-store-snowy.vercel.app/"
        },
        {
            title: "Room Sync",
            desc: "Roommate matching app for university students.",
            tags: ["Django", "Python", "PostgreSQL"],
            imgDesktop: "projects/roomsync.png",
            imgMobile: "projects/roomsync-mobile.jpeg",
            liveLink: "https://room-sync.vercel.app"
        },
        {
            title: "Smart Grocery Refill",
            desc: "Automated grocery refill system dashboard.",
            tags: ["IoT Dashboard", "React", "Chart.js"],
            imgDesktop: "projects/smartgrocery.png",
            imgMobile: "projects/smartgrocery-mobile.jpeg",
            liveLink: "https://smart-grocery-refill-system-glna.vercel.app/"
        },
        {
            title: "Custodia AI",
            desc: "AI-powered security and monitoring solution.",
            tags: ["Artificial Intelligence", "Python", "React"],
            imgDesktop: "projects/custodia.png",
            imgMobile: "projects/custodia-mobile.png",
            liveLink: "https://github.com/OVAIS69/Custodia.ai/"
        }
    ];

    // Render Projects
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
        projects.forEach((project, index) => {
            const card = document.createElement('div');
            card.className = 'project-card card-glass reveal';
            card.style.padding = '1.5rem';
            card.innerHTML = `
                <div class="img-container" style="cursor: pointer;" onclick="openModal(${index})">
                    <img src="${project.imgDesktop}" alt="${project.title}">
                </div>
                <h3>${project.title}</h3>
                <p style="margin-bottom: 1rem; font-size: 0.95rem; color: var(--color-text-muted);">${project.desc}</p>
                <div style="margin-bottom: 1rem;">
                    ${project.tags.slice(0, 3).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
                </div>
                <button class="btn btn-outline" onclick="openModal(${index})" style="width: 100%; font-size: 0.9rem;">View Details</button>
            `;
            projectsGrid.appendChild(card);
        });
    }

    // Modal Logic
    window.openModal = (index) => {
        const modal = document.getElementById('project-modal');
        const content = modal.querySelector('.modal-body');
        const p = projects[index];

        content.innerHTML = `
            <h2 style="margin-bottom: 0.5rem; color: var(--color-text-accent);">${p.title}</h2>
            <p style="color: var(--color-text-muted); margin-bottom: 2rem;">${p.desc}</p>
            
            <div class="modal-tabs">
                <button class="tab-btn active" onclick="switchTab('overview')">Overview</button>
                <button class="tab-btn" onclick="switchTab('tech')">Tech Stack</button>
            </div>
            
            <div id="tab-overview" class="tab-content active">
                <div class="grid grid-2" style="gap: 1rem; margin-bottom: 2rem;">
                    <img src="${p.imgDesktop}" style="border-radius: 8px; border: 1px solid var(--color-border);" alt="Desktop View">
                    <img src="${p.imgMobile}" style="border-radius: 8px; border: 1px solid var(--color-border); max-height: 400px; width: auto; margin: 0 auto; display: block;" alt="Mobile View">
                </div>
                <a href="${p.liveLink}" target="_blank" class="btn btn-primary" style="width: 100%;">Visit Live Website</a>
            </div>
            
            <div id="tab-tech" class="tab-content">
                <h3 style="margin-bottom: 1rem;">Technologies Used</h3>
                <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
                    ${p.tags.map(tag => `<span class="tech-tag" style="font-size: 1rem; padding: 0.5rem 1rem;">${tag}</span>`).join('')}
                </div>
                <p style="margin-top: 2rem; color: var(--color-text-muted);">
                    This project demonstrates modern web development practices, focusing on performance, accessibility, and user experience.
                </p>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.switchTab = (tabName) => {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        event.target.classList.add('active');
        document.getElementById(`tab-${tabName}`).classList.add('active');
    };

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
    });

    // Scroll Animations (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal, .stat-item').forEach(el => observer.observe(el));

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

    // Parallax Effect for Avatar
    // Integrated Parallax Effect (Scroll + Mouse)
    const avatarContainer = document.querySelector('.avatar-container');
    if (avatarContainer) {
        let scrollY = 0;
        let mouseX = 0;
        let mouseY = 0;

        // Scroll Parallax
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY * 0.5; // Scroll moves avatar down
            updateTransform();
        });

        // Mouse Parallax (Opposite movement)
        document.addEventListener('mousemove', (e) => {
            // Calculate distance from center: (Center - Current) makes it move opposite
            // Factor 0.03 controls the intensity
            mouseX = (window.innerWidth / 2 - e.clientX) * 0.03;
            mouseY = (window.innerHeight / 2 - e.clientY) * 0.03;
            updateTransform();
        });

        function updateTransform() {
            // Apply translation: X is just mouse, Y is Scroll + Mouse
            avatarContainer.style.transform = `translate(${mouseX}px, ${scrollY + mouseY}px)`;
        }
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    console.log('Website loaded successfully.');
});
