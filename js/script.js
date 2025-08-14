// Main JavaScript file for GCS Website


let scrollPosition = 0;
// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
    // Load all sections first
    loadSections();
    initializeMenu();
    initializeCounters();
    initializeForms();
    initializeRotatingText();
    initializeScrollEffects();
    initializeVideo();
    initializeHeaderLogo();
    initializeBackToTop();
});

// Load all HTML sections
async function loadSections() {
    const sections = [
        // { id: 'header-section', file: 'sections/header.html' },
        { id: 'hero-section', file: 'sections/hero.html' },
        { id: 'services-section', file: 'sections/services.html' },
        { id: 'about-section', file: 'sections/about.html' },
        { id: 'stats-section', file: 'sections/stats.html' },
        { id: 'work-together-section', file: 'sections/work-together.html' },
        { id: 'clients-section', file: 'sections/clients.html' },
        { id: 'blogs-section', file: 'sections/blogs.html' },
        { id: 'certifications-section', file: 'sections/certifications.html' },
        { id: 'cta-section', file: 'sections/cta.html' },
        { id: 'newsletter-section', file: 'sections/newsletter.html' },
        { id: 'faq-section', file: 'sections/faq.html' },
        { id: 'footer-section', file: 'sections/footer.html' }
    ];

    for (const section of sections) {
        try {
            const response = await fetch(section.file);
            if (response.ok) {
                const html = await response.text();
                document.getElementById(section.id).innerHTML = html;
            }
        } catch (error) {
            console.error(`Error loading ${section.file}:`, error);
        }
    }

    // Initialize Bootstrap components after section is loaded
    if (document.getElementById('servicesCarousel')) {
        const servicesCarousel = new bootstrap.Carousel(document.getElementById('servicesCarousel'), {
            interval: 3000,  // Changed to 3 seconds for better visibility
            wrap: true,
            pause: 'hover'
        });

        // Add event listener for pause on hover
        document.getElementById('servicesCarousel').addEventListener('mouseenter', function () {
            servicesCarousel.pause();
        });

        // Add event listener for resume on mouse leave
        document.getElementById('servicesCarousel').addEventListener('mouseleave', function () {
            servicesCarousel.cycle();
        });
    }

    document.getElementById('servicesCarousel').addEventListener('mouseleave', function () {
        servicesCarousel.cycle();
    });

    // Initialize carousels immediately after sections are loaded
    if (document.getElementById('blogsCarousel')) {
        const blogsCarousel = new bootstrap.Carousel(document.getElementById('blogsCarousel'), {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });
    }

    // Initialize other components after sections are loaded
    setTimeout(() => {
        initializeMenu();
        initializeCounters();
        initializeForms();
        initializeRotatingText();
        initializeScrollEffects();
        initializeVideo();
    }, 100);
}

function initializeMenu() {
    // Menu data
    const menuData = {
        home: [],
        about: [
            { text: 'About Us', url: '#about' },
            { text: 'Projects', url: '#projects' },
            { text: 'Our Clients', url: '#clients' },
            { text: 'Gallery', url: '#gallery' },
            { text: 'Events', url: '#events' },
            { text: 'Our Business Partners', url: '#business-partners' }
        ],
        services: [
            { text: 'SMART SURVEILLANCE', url: './smart-surveillance.html' },
            { text: 'INTELLIGENT TRANSPORTATION SYSTEM', url: './intelligent-transport.html' },
            { text: 'SMART CITY', url: '#smart-city' },
            { text: 'INTERNET OF THINGS', url: './iot.html' },
            { text: 'CYBERSECURITY', url: './cyberSecurity.html' },
            { text: 'GIS', url: '#gis' },
            { text: 'CLOUD SERVICES', url: './cloudServices.html' },
            { text: 'DATA CENTER', url: './data-center' },
            { text: 'INFRASTRUCTURE', url: './infrastructure' },
            { text: 'FIBER OPTIC', url: './fibre-optics.html' }
        ],
        software: [
            { text: 'Enterprise Applications', url: './enterprise.html' },
            { text: 'Track & Trace', url: './trade-and-trace.html' },
            { text: 'ARtificail Intellignece', url: './artifical-intelligance.html' },
            { text: 'Fintech', url: './fintech.html' },
            { text: 'Analytics', url: './analytics-power-bi.html' },
            { text: 'CRM', url: './crm.html' },
            { text: 'ERP', url: '' },
            { text: 'Access Control', url: './access-control.html' }
        ],
        products: [
            { text: 'AI-Powered Smart e-Challan System', url: '#ai-powered-smart-e-challan-system' },
            { text: 'Smart Surveillance System', url: '#smart-surveillance-system' },
            { text: 'Safe Cities Solutions', url: '#safe-cities-solutions' },
            { text: 'Smart Cities Development', url: '#smart-cities-development' },
            { text: 'Emergency & Response System', url: '#emergency-response-system' },
            { text: 'Call Management System', url: '#call-management-system' },
            { text: 'AI-Based Attendance Management', url: '#ai-based-attendance-management' },
            { text: 'Site Monitoring Solutions', url: '#site-monitoring-solutions' }
        ],
        career: [
            { text: 'Career', url: './career.html' }
        ],
        contact: [
            { text: 'Contact', url: './contactUs.html' }
        ]
    };

    // Get elements
    const navItems = document.querySelectorAll('.nav-item');
    const servicesMenu = document.getElementById('dynamicServicesMenu');

    function updateServicesMenu(section) {
        const servicesMenu = document.getElementById('dynamicServicesMenu');
        servicesMenu.innerHTML = '';

        const services = menuData[section] || [];

        services.forEach((service, index) => {
            const li = document.createElement('li');
            li.classList.add('services-link'); // only li needs this class

            const a = document.createElement('a');
            a.href = service.url;
            a.textContent = service.text;
            // a.style.color = "#fff";

            li.appendChild(a);
            servicesMenu.appendChild(li);

            // Add animation class after a small delay
            setTimeout(() => {
                li.classList.add('show');
            }, index * 100);
        });
    }

    // Initial load - show Home services by default
    updateServicesMenu('home');

    // Add hover/click event listeners
    navItems.forEach(item => {
        const section = item.getAttribute('data-section');
        const arrow = item.querySelector('.nav-arrow');

        // Add click event handler
        // item.addEventListener('click', (e) => {
        //     e.preventDefault();

        //     // Toggle active state
        //     item.classList.toggle('active');

        //     // Update services menu
        //     updateServicesMenu(section);

        //     // Rotate arrow
        //     if (arrow) {
        //         arrow.classList.toggle('active');
        //     }

        //     // Close other active items
        //     navItems.forEach(otherItem => {
        //         if (otherItem !== item && otherItem.classList.contains('active')) {
        //             otherItem.classList.remove('active');
        //             const otherArrow = otherItem.querySelector('.nav-arrow');
        //             if (otherArrow) {
        //                 otherArrow.classList.remove('active');
        //             }
        //         }
        //     });
        // });
        item.addEventListener('click', (e) => {
            const link = item.querySelector('a');
            const href = link?.getAttribute('href') || '';
        
            // Agar link # se start hota hai (anchor) tabhi prevent karo
            if (href.startsWith('#')) {
                e.preventDefault();
                // Toggle active state
                item.classList.toggle('active');
                updateServicesMenu(section);
        
                if (arrow) arrow.classList.toggle('active');
        
                navItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherArrow = otherItem.querySelector('.nav-arrow');
                        if (otherArrow) otherArrow.classList.remove('active');
                    }
                });
            }
        });
        
        // Add hover event for desktop
        item.addEventListener('mouseenter', () => {
            if (!item.classList.contains('active')) {
                updateServicesMenu(section);
                if (arrow) {
                    arrow.classList.add('active');
                }
            }
        });

        // Add mouseleave event for desktop
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                if (arrow) {
                    arrow.classList.remove('active');
                }
            }
        });
    });

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const closeSidebar = document.getElementById('closeSidebar');

    if (!menuToggle || !sidebar || !sidebarOverlay || !closeSidebar) {
        console.log('Menu elements not found, retrying...');
        setTimeout(initializeMenu, 100);
        return;
    }

    console.log('Initializing full screen sidebar menu...');

    menuToggle.addEventListener('click', function (e) {
        e.preventDefault();
        console.log('Opening full screen sidebar...');
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Add active classes
        sidebar.classList.add('active');
        sidebarOverlay.classList.add('active');

        // Prevent body scroll
        document.body.classList.add('sidebar-open');
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPosition}px`;

        // Trigger social links animation
        const socialLinks = document.querySelectorAll('.social-links-vertical a');
        socialLinks.forEach((link, index) => {
            // Reset animation
            link.style.animation = 'none';
            link.offsetHeight; // Force reflow
            link.style.animation = `slideInFromRight 0.6s ease forwards`;
            link.style.animationDelay = `${0.4 + index * 0.2}s`;
        });

    });


    // Close sidebar functions
    function closeSidebarMenu() {
        console.log('Closing full screen sidebar...');

        // Remove active classes
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');


        // Restore body scroll
        document.body.classList.remove('sidebar-open');
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        wwindow.scrollTo({
            top: scrollPosition,
            left: 0,
            behavior: 'instant'
        });
    }

    closeSidebar.addEventListener('click', function (e) {
        e.preventDefault();

        // Add active class for rotation animation
        this.classList.add('active');

        // Remove active class after animation completes
        setTimeout(() => {
            this.classList.remove('active');
        }, 500); // Match the CSS transition duration

        closeSidebarMenu();
    });
    // Close sidebar on overlay click
    sidebarOverlay.addEventListener('click', function (e) {
        if (e.target === sidebarOverlay) {
            closeSidebarMenu();
        }
    });

    // Close sidebar on escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebarMenu();
        }
    });

    // Handle nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Close sidebar after clicking a link
            // setTimeout(closeSidebarMenu, 300);
        });
    });

    // Handle window resize - close sidebar on very large screens
    window.addEventListener('resize', debounce(function () {
        if (window.innerWidth > 1200 && sidebar.classList.contains('active')) {
            closeSidebarMenu();
        }
    }, 100));

    // Prevent scrolling on sidebar content when at top/bottom
    sidebar.addEventListener('touchmove', function (e) {
        if (sidebar.scrollTop === 0 && e.touches[0].clientY > e.touches[0].clientY) {
            e.preventDefault();
        }
        if (sidebar.scrollTop === sidebar.scrollHeight - sidebar.clientHeight && e.touches[0].clientY < e.touches[0].clientY) {
            e.preventDefault();
        }
    });
}
// Enhanced mobile sidebar functionality
function initializeMobileSidebar() {
    // Only run on mobile devices
    if (window.innerWidth > 768) return;

    const navItems = document.querySelectorAll('.nav-item[data-section]');

    // Your existing menuData from main.js will be used
    const menuData = {
        home: [],
        about: [
            'About Us',
            'Projects',
            'Our Clients',
            'Gallery',
            'Events',
            'Our Business Partners'
        ],
        services: [
            { text: 'SMART SURVEILLANCE', url: './smart-surveillance.html' },
            { text: 'INTELLIGENT TRANSPORTATION SYSTEM', url: './intelligent-transport.html' },
            { text: 'SMART CITY', url: '#smart-city' },
            { text: 'INTERNET OF THINGS', url: './iot.html' },
            { text: 'CYBERSECURITY', url: './cyberSecurity.html' },
            { text: 'GIS', url: '#gis' },
            { text: 'CLOUD SERVICES', url: './cloudServices.html' },
            { text: 'DATA CENTER', url: './data-center' },
            { text: 'INFRASTRUCTURE', url: './infrastructure' },
            { text: 'FIBER OPTIC', url: './fibre-optics.html' }
        ],
        software: [
            'Enterprise Applications',
            'Track & Trace',
            'ARtificail Intellignece',
            'Fintech',
            'Analytics',
            'CRM',
            'ERP',
            'Access Control'
        ],
        products: [
            'AI-Powered Smart e-Challan System',
            'Smart Surveillance System',
            'Safe Cities Solutions',
            'Smart Cities Development',
            'Emergency & Response System',
            'Call Management System',
            'AI-Based Attendance Management',
            'Site Monitoring Solutions'
        ],
        career: [
            { text: 'Career', url: './career.html' }
        ],
        contact: [
            { text: 'Contact', url: './contactUs.html' }
        ]
    };

    // Create mobile submenus for each nav item with services
    navItems.forEach((navItem, index) => {
        console.log('Processing nav item:', index, navItem);

        let section = navItem.getAttribute('data-section');

        // If no data-section, try to determine section from text content
        if (!section) {
            const navLink = navItem.querySelector('.nav-link');
            if (navLink) {
                const text = navLink.textContent.trim().toLowerCase();
                console.log('Nav link text:', text);

                if (text.includes('service')) {
                    section = 'services';
                    navItem.setAttribute('data-section', 'services');
                } else if (text.includes('software') || text.includes('solution')) {
                    section = 'software';
                    navItem.setAttribute('data-section', 'software');
                } else if (text.includes('about')) {
                    section = 'about';
                    navItem.setAttribute('data-section', 'about');
                } else if (text.includes('home')) {
                    section = 'home';
                    navItem.setAttribute('data-section', 'home');
                }

                console.log('Determined section:', section);
            }
        }

        const services = menuData[section];
        console.log('Services for section', section, ':', services);

        if (services && services.length > 0) {
            // Create mobile submenu if it doesn't exist
            if (!navItem.querySelector('.mobile-services-submenu')) {
                console.log('Creating mobile submenu for:', section);
                createMobileSubmenu(navItem, services);
            }

            // Add click handler to the entire nav item area (this makes the + clickable)
            navItem.addEventListener('click', handleMobileMenuClick, true);

            console.log(`✅ Initialized toggle for: ${section}`);
        } else {
            // For menu items without services, prevent sidebar closing
            const navLink = navItem.querySelector('.nav-link');
            if (navLink) {
                navLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    console.log('Clicked nav item without services:', navLink.textContent);
                    return false;
                }, true);
            }
        }
    });
}

// Create mobile submenu
function createMobileSubmenu(navItem, services) {
    const submenuContainer = document.createElement('div');
    submenuContainer.className = 'mobile-services-submenu';

    const servicesList = document.createElement('ul');
    servicesList.className = 'mobile-services-list';

    services.forEach(service => {
        const listItem = document.createElement('li');
        const serviceLink = document.createElement('a');
        serviceLink.href = '#';
        serviceLink.textContent = service;
        serviceLink.addEventListener('click', handleMobileServiceClick);

        listItem.appendChild(serviceLink);
        servicesList.appendChild(listItem);
    });

    submenuContainer.appendChild(servicesList);
    navItem.appendChild(submenuContainer);
}

// Handle mobile menu item clicks
function handleMobileMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const navItem = event.currentTarget.closest('.nav-item');
    const submenu = navItem.querySelector('.mobile-services-submenu');

    if (!submenu) return;

    // Close other open submenus
    closeMobileSubmenus(navItem);

    // Toggle current submenu
    const isExpanded = navItem.classList.contains('mobile-expanded');

    if (isExpanded) {
        // Close current submenu
        navItem.classList.remove('mobile-expanded');
        submenu.classList.remove('expanded');
    } else {
        // Open current submenu
        navItem.classList.add('mobile-expanded');
        submenu.classList.add('expanded');

        // Smooth scroll to show the opened submenu
        setTimeout(() => {
            const submenuRect = submenu.getBoundingClientRect();
            const sidebarContent = document.querySelector('.sidebar-content');
            const contentRect = sidebarContent.getBoundingClientRect();

            if (submenuRect.bottom > contentRect.bottom) {
                submenu.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 100);
    }
}

// Handle mobile service clicks
function handleMobileServiceClick(event) {
    event.preventDefault();

    // Remove active class from all service links
    document.querySelectorAll('.mobile-services-list a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked service
    event.currentTarget.classList.add('active');

    // Get service name
    const serviceName = event.currentTarget.textContent;
    console.log('Mobile service clicked:', serviceName);
}

// Close other mobile submenus
// function initializeMobileSidebar() {
//     // Only run on mobile devices
//     if (window.innerWidth > 768) return;

//     console.log('Initializing mobile sidebar...');

//     // Find nav items - try multiple selectors to ensure we find them
//     let navItems = document.querySelectorAll('.nav-item[data-section]');

//     // If data-section attribute doesn't exist, find nav items by text content
//     if (navItems.length === 0) {
//         navItems = document.querySelectorAll('.nav-item');
//         console.log('Found nav items without data-section:', navItems.length);
//     }

//     // Your existing menuData from main.js will be used
//     const menuData = {
//         'home': [],
//         'about': [
//             'Company Profile',
//             'Projects',
//             'Our Clients',
//             'Gallery',
//             'Events'
//         ],
//         'services': [
//             'SMART SURVEILLANCE',
//             'INTELLIGENT TRANSPORTATION SYSTEM',
//             'SMART CITY',
//             'INTERNET OF THINGS',
//             'CYBERSECURITY',
//             'GIS',
//             'CLOUD SERVICES',
//             'DATA CENTER',
//             'INFRASTRUCTURE',
//             'FIBER OPTIC'
//         ],
//         'software': [
//             'Enterprise Applications',
//             'Track & Trace',
//             'ARtificail Intellignece',
//             'Fintech',
//             'Analytics',
//             'CRM',
//             'ERP',
//             'Access Control'
//         ]
//     };

//     // Remove existing nav-link click handlers that close sidebar
//     const existingNavLinks = document.querySelectorAll('.nav-link');
//     existingNavLinks.forEach(link => {
//         // Clone the element to remove all event listeners
//         const newLink = link.cloneNode(true);
//         link.parentNode.replaceChild(newLink, link);
//     });

//     // Create mobile submenus for each nav item with services
//     // REPLACE this part in your remaining initializeMobileSidebar function:
//     navItems.forEach((navItem, index) => {
//         console.log('Processing nav item:', index, navItem);

//         let section = navItem.getAttribute('data-section');

//         // If no data-section, try to determine section from text content
//         if (!section) {
//             const navLink = navItem.querySelector('.nav-link');
//             if (navLink) {
//                 const text = navLink.textContent.trim().toLowerCase();
//                 console.log('Nav link text:', text);

//                 if (text.includes('service')) {
//                     section = 'services';
//                     navItem.setAttribute('data-section', 'services');
//                 } else if (text.includes('software') || text.includes('solution')) {
//                     section = 'software';
//                     navItem.setAttribute('data-section', 'software');
//                 } else if (text.includes('about')) {
//                     section = 'about';
//                     navItem.setAttribute('data-section', 'about');
//                 } else if (text.includes('home')) {
//                     section = 'home';
//                     navItem.setAttribute('data-section', 'home');
//                 }

//                 console.log('Determined section:', section);
//             }
//         }

//         const services = menuData[section];
//         console.log('Services for section', section, ':', services);

//         if (services && services.length > 0) {
//             // Create mobile submenu if it doesn't exist
//             if (!navItem.querySelector('.mobile-services-submenu')) {
//                 console.log('Creating mobile submenu for:', section);
//                 createMobileSubmenu(navItem, services);
//             }

//             // Add click handler to the entire nav item area (this makes the + clickable)
//             navItem.addEventListener('click', handleMobileMenuClick, true);

//             console.log(`✅ Initialized toggle for: ${section}`);
//         } else {
//             // For menu items without services, prevent sidebar closing
//             const navLink = navItem.querySelector('.nav-link');
//             if (navLink) {
//                 navLink.addEventListener('click', function (e) {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     e.stopImmediatePropagation();
//                     console.log('Clicked nav item without services:', navLink.textContent);
//                     return false;
//                 }, true);
//             }
//         }
//     });

//     console.log('Mobile sidebar initialization complete');
// }

// Create mobile submenu
function createMobileSubmenu(navItem, services) {
    console.log('Creating mobile submenu with services:', services);

    const submenuContainer = document.createElement('div');
    submenuContainer.className = 'mobile-services-submenu';

    const servicesList = document.createElement('ul');
    servicesList.className = 'mobile-services-list';

    services.forEach((service, index) => {
        console.log('Adding service:', service);
        const listItem = document.createElement('li');
        const serviceLink = document.createElement('a');
        serviceLink.href = '#';
        serviceLink.textContent = service;
        serviceLink.addEventListener('click', handleMobileServiceClick);

        listItem.appendChild(serviceLink);
        servicesList.appendChild(listItem);
    });

    submenuContainer.appendChild(servicesList);
    navItem.appendChild(submenuContainer);

    console.log('Mobile submenu created and appended');
    return submenuContainer;
}

// Handle mobile menu item clicks
function handleMobileMenuClick(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();

    const navItem = event.currentTarget.closest('.nav-item');
    const submenu = navItem.querySelector('.mobile-services-submenu');

    if (!submenu) return false;

    // Close other submenus
    closeMobileSubmenus(navItem);

    // Toggle current submenu
    const isExpanded = navItem.classList.contains('mobile-expanded');

    if (isExpanded) {
        console.log('Closing submenu');
        navItem.classList.remove('mobile-expanded');
        submenu.classList.remove('expanded');
    } else {
        console.log('Opening submenu');
        navItem.classList.add('mobile-expanded');
        submenu.classList.add('expanded');

        // Scroll into view
        setTimeout(() => {
            const submenuRect = submenu.getBoundingClientRect();
            const sidebarContent = document.querySelector('.sidebar-content');
            if (sidebarContent && submenuRect.bottom > window.innerHeight) {
                submenu.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest'
                });
            }
        }, 100);
    }

    return false;
}

// Handle mobile service clicks
function handleMobileServiceClick(event) {
    event.preventDefault();

    // Remove active class from all service links
    document.querySelectorAll('.mobile-services-list a').forEach(link => {
        link.classList.remove('active');
    });

    // Add active class to clicked service
    event.currentTarget.classList.add('active');

    // Get service name
    const serviceName = event.currentTarget.textContent;
    console.log('Mobile service clicked:', serviceName);

}

// Close other mobile submenus
function closeMobileSubmenus(currentNavItem) {
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
        if (item !== currentNavItem) {
            const submenu = item.querySelector('.mobile-services-submenu');

            if (submenu) {
                item.classList.remove('mobile-expanded');
                submenu.classList.remove('expanded');
            }
        }
    });
}

// Reset mobile submenus when sidebar is closed
function resetMobileSubmenus() {
    document.querySelectorAll('.nav-item[data-section]').forEach(item => {
        const submenu = item.querySelector('.mobile-services-submenu');

        if (submenu) {
            item.classList.remove('mobile-expanded');
            submenu.classList.remove('expanded');
        }
    });
}
function resetMenuStates() {
    // Reset all nav item active states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');

        // Reset arrows
        const arrow = item.querySelector('.nav-arrow');
        if (arrow) {
            arrow.classList.remove('active');
        }
    });

    // Reset dynamic services menu to default (empty/home)
    const servicesMenu = document.getElementById('dynamicServicesMenu');
    if (servicesMenu) {
        servicesMenu.innerHTML = '';
    }

    // Reset all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
}

// Enhanced sidebar close function to reset mobile submenus
function enhancedCloseSidebar() {
    resetMobileSubmenus();
    resetMenuStates();

    // Reset all menu items to their initial state
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        item.classList.remove('mobile-expanded');

        const submenu = item.querySelector('.mobile-services-submenu');
        if (submenu) {
            submenu.classList.remove('expanded');
            submenu.style.display = '';
        }
    });

    // Call your existing close function logic
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    if (sidebar) {
        sidebar.classList.remove('active');
        // Reset any additional menu states
        sidebar.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    }
    if (sidebarOverlay) sidebarOverlay.classList.remove('active');

    document.body.classList.remove('sidebar-open');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    window.scrollTo({
        top: scrollPosition,
        left: 0,
        behavior: 'instant'
    });
}

// Handle window resize to switch between mobile and desktop
function handleSidebarResize() {
    if (window.innerWidth <= 768) {
        // Initialize mobile functionality
        initializeMobileSidebar();
    } else {
        // Reset mobile functionality and ensure desktop works
        resetMobileSubmenus();

        // Remove mobile submenus from DOM
        document.querySelectorAll('.mobile-services-submenu').forEach(submenu => {
            submenu.remove();
        });

        // Remove mobile event listeners and restore desktop functionality
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        navItems.forEach(item => {
            const navLink = item.querySelector('.nav-link');
            if (navLink) {
                navLink.removeEventListener('click', handleMobileMenuClick);
                item.classList.remove('mobile-expanded');
            }
        });

        // Re-initialize your existing menu functionality for desktop
        if (typeof updateServicesMenu === 'function') {
            // Restore desktop hover functionality
            navItems.forEach(item => {
                const section = item.getAttribute('data-section');
                const arrow = item.querySelector('.nav-arrow');

                item.addEventListener('mouseenter', () => {
                    updateServicesMenu(section);
                    if (arrow) arrow.classList.add('active');
                });

                item.addEventListener('mouseleave', () => {
                    if (arrow) {
                        arrow.style.opacity = '0';
                        arrow.style.visibility = 'hidden';
                    }
                });
            });
        }
    }
}

// Enhanced touch handling for better mobile experience
function addEnhancedTouchSupport() {
    if (!('ontouchstart' in window)) return;

    let touchStartY = 0;
    let touchStartTime = 0;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        link.addEventListener('touchend', function (e) {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            const deltaY = Math.abs(touchEndY - touchStartY);
            const deltaTime = touchEndTime - touchStartTime;

            // If it's a tap (not a scroll), handle the click
            if (deltaY < 10 && deltaTime < 500) {
                if (window.innerWidth <= 768) {
                    handleMobileMenuClick(e);
                }
            }
        }, { passive: true });
    });
}

// Integration with your existing code
document.addEventListener('DOMContentLoaded', function () {
    // Wait for your existing initialization to complete
    setTimeout(() => {
        // Initialize mobile functionality
        if (window.innerWidth <= 768) {
            initializeMobileSidebar();
        }

        // Add touch support
        addEnhancedTouchSupport();

        // Handle resize events
        window.addEventListener('resize', debounce(handleSidebarResize, 250));

        // Override your existing nav-link click handlers for mobile
        if (window.innerWidth <= 768) {
            overrideExistingNavHandlers();
        }

        // Enhanced close sidebar functionality
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (closeSidebar) {
            closeSidebar.addEventListener('click', enhancedCloseSidebar);
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function (e) {
                if (e.target === sidebarOverlay) {
                    enhancedCloseSidebar();
                }
            });
        }

        // Enhanced escape key handling
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    enhancedCloseSidebar();
                }
            }
        });

    }, 600); // Wait for your existing initialization
});

// Override existing nav handlers for mobile
function overrideExistingNavHandlers() {
    // Find and override the existing nav-link handlers that close the sidebar
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        // Create a new element to remove all existing event listeners
        const newLink = link.cloneNode(true);
        link.parentNode.replaceChild(newLink, link);

        // Add our mobile-specific handlers
        const navItem = newLink.closest('.nav-item');
        const section = navItem?.getAttribute('data-section');

        if (section && (section === 'services' || section === 'software' || section === 'about')) {
            // For items with services, add mobile click handler
            newLink.addEventListener('click', handleMobileMenuClick, true);
        } else {
            // For other items, prevent sidebar closing but allow navigation
            newLink.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                e.stopImmediatePropagation();

                // Optional: Add navigation logic here for home, portfolio, etc.
                console.log('Mobile nav clicked:', newLink.textContent);

                return false;
            }, true);
        }
    });
}

// Additional function to completely disable existing sidebar close behavior on mobile
function disableMobileSidebarAutoClose() {
    if (window.innerWidth > 768) return;

    // Override the existing closeSidebarMenu function temporarily
    const originalCloseSidebarMenu = window.closeSidebarMenu;

    window.closeSidebarMenu = function () {
        // Only close if explicitly called, not from nav-link clicks
        const isExplicitClose = arguments[0] === 'explicit';
        if (isExplicitClose) {
            if (originalCloseSidebarMenu) {
                originalCloseSidebarMenu();
            } else {
                enhancedCloseSidebar();
            }
        }
        // Otherwise, do nothing (prevent auto-close)
    };
}

// Utility function to add mobile service category (if needed)
window.addMobileServiceCategory = function (categoryKey, services) {
    if (window.innerWidth > 768) return;

    const navItem = document.querySelector(`[data-section="${categoryKey}"]`);
    if (navItem && !navItem.querySelector('.mobile-services-submenu')) {
        createMobileSubmenu(navItem, services);

        const navLink = navItem.querySelector('.nav-link');
        if (navLink) {
            navLink.addEventListener('click', handleMobileMenuClick);
        }
    }
};

// Utility function to update mobile services (if needed)
window.updateMobileServices = function (categoryKey, services) {
    if (window.innerWidth > 768) return;

    const navItem = document.querySelector(`[data-section="${categoryKey}"]`);
    const existingSubmenu = navItem?.querySelector('.mobile-services-submenu');

    if (existingSubmenu) {
        existingSubmenu.remove();
    }

    if (navItem && services && services.length > 0) {
        createMobileSubmenu(navItem, services);
    }
};

// Export functions for external use if needed
window.mobileSidebarUtils = {
    initialize: initializeMobileSidebar,
    reset: resetMobileSubmenus,
    close: enhancedCloseSidebar,
    addCategory: window.addMobileServiceCategory,
    updateServices: window.updateMobileServices
};

// Handle window resize to switch between mobile and desktop
function handleSidebarResize() {
    if (window.innerWidth <= 768) {
        // Initialize mobile functionality
        initializeMobileSidebar();
    } else {
        // Reset mobile functionality and ensure desktop works
        resetMobileSubmenus();

        // Remove mobile submenus from DOM
        document.querySelectorAll('.mobile-services-submenu').forEach(submenu => {
            submenu.remove();
        });

        // Remove mobile event listeners and restore desktop functionality
        const navItems = document.querySelectorAll('.nav-item[data-section]');
        navItems.forEach(item => {
            const navLink = item.querySelector('.nav-link');
            if (navLink) {
                navLink.removeEventListener('click', handleMobileMenuClick);
                item.classList.remove('mobile-expanded');
            }
        });

        // Re-initialize your existing menu functionality for desktop
        if (typeof updateServicesMenu === 'function') {
            // Restore desktop hover functionality
            navItems.forEach(item => {
                const section = item.getAttribute('data-section');
                const arrow = item.querySelector('.nav-arrow');

                item.addEventListener('mouseenter', () => {
                    updateServicesMenu(section);
                    if (arrow) arrow.classList.add('active');
                });

                item.addEventListener('mouseleave', () => {
                    if (arrow) {
                        arrow.style.opacity = '0';
                        arrow.style.visibility = 'hidden';
                    }
                });
            });
        }
    }
}

// Enhanced touch handling for better mobile experience
function addEnhancedTouchSupport() {
    if (!('ontouchstart' in window)) return;

    let touchStartY = 0;
    let touchStartTime = 0;

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('touchstart', function (e) {
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }, { passive: true });

        link.addEventListener('touchend', function (e) {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndTime = Date.now();
            const deltaY = Math.abs(touchEndY - touchStartY);
            const deltaTime = touchEndTime - touchStartTime;

            // If it's a tap (not a scroll), handle the click
            if (deltaY < 10 && deltaTime < 500) {
                if (window.innerWidth <= 768) {
                    handleMobileMenuClick(e);
                }
            }
        }, { passive: true });
    });
}

// Integration with your existing code
document.addEventListener('DOMContentLoaded', function () {
    // Wait for your existing initialization to complete
    setTimeout(() => {
        // Initialize mobile functionality
        if (window.innerWidth <= 768) {
            initializeMobileSidebar();
        }

        // Add touch support
        addEnhancedTouchSupport();

        // Handle resize events
        window.addEventListener('resize', debounce(handleSidebarResize, 250));

        // Enhanced close sidebar functionality
        const closeSidebar = document.getElementById('closeSidebar');
        const sidebarOverlay = document.getElementById('sidebarOverlay');

        if (closeSidebar) {
            closeSidebar.addEventListener('click', enhancedCloseSidebar);
        }

        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function (e) {
                if (e.target === sidebarOverlay) {
                    enhancedCloseSidebar();
                }
            });
        }

        // Enhanced escape key handling
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                const sidebar = document.getElementById('sidebar');
                if (sidebar && sidebar.classList.contains('active')) {
                    enhancedCloseSidebar();
                }
            }
        });

    }, 500); // Wait for your existing initialization
});

// Utility function to add mobile service category (if needed)
window.addMobileServiceCategory = function (categoryKey, services) {
    if (window.innerWidth > 768) return;

    const navItem = document.querySelector(`[data-section="${categoryKey}"]`);
    if (navItem && !navItem.querySelector('.mobile-services-submenu')) {
        createMobileSubmenu(navItem, services);

        const navLink = navItem.querySelector('.nav-link');
        if (navLink) {
            navLink.addEventListener('click', handleMobileMenuClick);
        }
    }
};

// Utility function to update mobile services (if needed)
window.updateMobileServices = function (categoryKey, services) {
    if (window.innerWidth > 768) return;

    const navItem = document.querySelector(`[data-section="${categoryKey}"]`);
    const existingSubmenu = navItem?.querySelector('.mobile-services-submenu');

    if (existingSubmenu) {
        existingSubmenu.remove();
    }

    if (navItem && services && services.length > 0) {
        createMobileSubmenu(navItem, services);
    }
};

// Export functions for external use if needed
window.mobileSidebarUtils = {
    initialize: initializeMobileSidebar,
    reset: resetMobileSubmenus,
    close: enhancedCloseSidebar,
    addCategory: window.addMobileServiceCategory,
    updateServices: window.updateMobileServices
};
// Initialize scroll effects
function initializeScrollEffects() {
    // Header background opacity on scroll
    window.addEventListener('scroll', function () {
        const header = document.querySelector('.header-section');
        if (!header) return;

        const scrollY = window.scrollY;
        const opacity = Math.min(scrollY / 100, 0.95);

        header.style.backgroundColor = `rgba(42, 42, 42, ${opacity})`;
    });

    // Smooth scrolling for anchor links
    document.addEventListener('click', function (e) {
        if (e.target.matches('a[href^="#"]')) {
            e.preventDefault();
            const target = document.querySelector(e.target.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Initialize video functionality
function initializeVideo() {
    // Ensure video plays properly
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
        // Handle video loading
        video.addEventListener('loadeddata', function () {
            this.play().catch(e => {
                console.log('Video autoplay failed:', e);
            });
        });

        // Intersection Observer for performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(e => {
                        console.log('Video play failed:', e);
                    });
                } else {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.1 });

        observer.observe(video);
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize rotating text animation - UPDATED VERSION
function initializeRotatingText() {
    console.log('Initializing rotating text...');
    // Get only the rotating texts in the hero title
    const rotatingTexts = document.querySelectorAll('.hero-title .rotating-text');
    console.log('Found rotating texts:', rotatingTexts.length);

    if (rotatingTexts.length === 0) {
        // console.log('No rotating texts found, retrying in 500ms...');
        setTimeout(initializeRotatingText, 500);
        return;
    }

    let currentTextIndex = 0;
    let isRotating = true;

    function rotateText() {
        if (!isRotating) return;

        console.log('Rotating text:', currentTextIndex);

        // Remove active class and add exit animation
        rotatingTexts[currentTextIndex].classList.remove('active');
        rotatingTexts[currentTextIndex].classList.add('exit');

        // Move to next text (loop back to start when at end)
        currentTextIndex = (currentTextIndex + 1) % rotatingTexts.length;

        // After exit animation completes, activate next text
        setTimeout(() => {
            // Remove exit class from all texts
            rotatingTexts.forEach(text => text.classList.remove('exit'));
            // Add active class to next text
            rotatingTexts[currentTextIndex].classList.add('active');
        }, 300);
    }

    // Initialize first text
    rotatingTexts[0].classList.add('active');

    // Start continuous rotation every 2 seconds
    const rotationInterval = setInterval(rotateText, 2000);

    // Add a cleanup function to stop rotation if needed
    window.addEventListener('unload', () => {
        isRotating = false;
        clearInterval(rotationInterval);
    });
}

// Initialize rotating text when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing rotating text...');
    initializeRotatingText();
    observer.observe(document.querySelector('#cta-section'));

    setTimeout(() => {
        showNewsletterPopup();
    }, 3000);

});

// Also try initializing after a short delay in case of dynamic content
setTimeout(() => {
    console.log('Initializing rotating text after delay...');
    initializeRotatingText();
}, 1000);

// Optimized scroll handler
const optimizedScrollHandler = debounce(function () {
    // Add any existing JavaScript code here

    // Volume control functionality
    document.addEventListener('DOMContentLoaded', function () {
        const video = document.getElementById('backgroundVideo');
        const volumeToggle = document.getElementById('volumeToggle');
        const volumeSlider = document.getElementById('volumeSlider');

        // Set initial volume
        video.volume = volumeSlider.value;

        // Update volume when slider is moved
        volumeSlider.addEventListener('input', function () {
            video.volume = this.value;
        });

        // Toggle mute/unmute
        volumeToggle.addEventListener('click', function () {
            if (video.muted) {
                video.muted = false;
                this.innerHTML = '<i class="fas fa-volume-up"></i>';
            } else {
                video.muted = true;
                this.innerHTML = '<i class="fas fa-volume-mute"></i>';
            }
        });
    });
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Loading animation
window.addEventListener('load', function () {
    document.body.classList.add('loaded');
});

// Error handling for missing elements
function safeQuerySelector(selector, callback) {
    const element = document.querySelector(selector);
    if (element && callback) {
        callback(element);
    }
    return element;
}

// Resize handler for responsive adjustments
window.addEventListener('resize', debounce(function () {
    // Handle responsive adjustments
    const sidebar = document.getElementById('sidebar');
    if (sidebar && window.innerWidth > 768) {
        // Optionally close mobile menu on desktop
        if (sidebar.classList.contains('active')) {
            const closeSidebar = document.getElementById('closeSidebar');
            if (closeSidebar) {
                closeSidebar.click();
            }
        }
    }
}, 250));

// Preload critical resources
function preloadResources() {
    const resources = [
        'assets/videos/hero-video.mp4',
        'assets/images/logo.png'
    ];

    resources.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = src;
        link.as = src.includes('.mp4') ? 'video' : 'image';
        document.head.appendChild(link);
    });
}

// Initialize preloading
preloadResources();

// Initialize counters for stats section
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/[^\d]/g, ''));
                const suffix = counter.textContent.replace(/[\d\s]/g, '');
                animateCounter(counter, target, suffix);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }

        let displayValue = Math.floor(current).toLocaleString();
        if (suffix.includes('Billion')) {
            displayValue = (current / 1000000000).toFixed(1000000000) + ' Billion';
        }
        element.textContent = displayValue + suffix.replace(/\d+|\s*Billion/g, '');
    }, stepTime);
}

// Initialize carousels/sliders
function initializeCarousels() {
    // Services carousel
    initializeServiceCarousel();

    // Blogs carousel
    initializeBlogCarousel();
}

function initializeServiceCarousel() {
    const prevBtn = document.querySelector('.services-navigation .nav-prev');
    const nextBtn = document.querySelector('.services-navigation .nav-next');
    const servicesGrid = document.querySelector('.services-section .row.g-4');

    if (!prevBtn || !nextBtn || !servicesGrid) return;

    let currentIndex = 0;
    const services = servicesGrid.children;
    const totalServices = services.length;
    const servicesPerView = window.innerWidth >= 992 ? 4 : window.innerWidth >= 768 ? 2 : 1;

    function updateCarousel() {
        const translateX = -(currentIndex * (100 / servicesPerView));
        servicesGrid.style.transform = `translateX(${translateX}%)`;
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % Math.ceil(totalServices / servicesPerView);
        updateCarousel();
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = currentIndex === 0 ? Math.ceil(totalServices / servicesPerView) - 1 : currentIndex - 1;
        updateCarousel();
    });
}

function initializeBlogCarousel() {
    const blogsCarousel = document.getElementById('blogsCarousel');
    if (blogsCarousel) {
        // Initialize Bootstrap carousel
        const carousel = new bootstrap.Carousel(blogsCarousel, {
            interval: 5000,
            wrap: true,
            pause: 'hover'
        });

        // Add event listeners for navigation arrows
        const prevBtn = document.querySelector('.custom-carousel-control.prev');
        const nextBtn = document.querySelector('.custom-carousel-control.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                carousel.prev();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                carousel.next();
            });
        }
    }
}

// Initialize forms
function initializeForms() {
    // Newsletter forms
    const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                // Simulate form submission
                const button = this.querySelector('button');
                const originalText = button.textContent;

                button.textContent = 'Subscribing...';
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = 'Subscribed!';
                    button.style.background = '#10B981';

                    setTimeout(() => {
                        button.textContent = originalText;
                        button.disabled = false;
                        button.style.background = '';
                        this.reset();
                    }, 2000);
                }, 1500);
            }
        });
    });

}

// Smooth reveal animations
function initializeRevealAnimations() {
    const revealElements = document.querySelectorAll('.service-card, .vmv-card, .blog-card, .client-logo, .work-visuals, .certification-logo, .product-card');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(element);
    });
}

// Initialize reveal animations after page load
window.addEventListener('load', function () {
    setTimeout(() => {
        initializeRevealAnimations();
    }, 500);
});

// Initialize video functionality
function initializeVideo() {
    const video = document.getElementById('heroVideo');
    if (video) {
        // Set up error handling
        video.onerror = function () {
            console.error('Video failed to load:', video.error);
        };

        // Wait for video to load
        video.addEventListener('loadeddata', function () {
            console.log('Video loaded successfully');
            // Start muted
            video.muted = true;

            // Try to play
            video.play().catch(error => {
                console.error('Autoplay failed:', error);
            });
        });

        // Add click-to-play functionality
        const heroSection = document.getElementById('heroSection');
        if (heroSection) {
            heroSection.addEventListener('click', function () {
                // Ensure video is loaded before trying to unmute/play
                if (video.readyState >= video.HAVE_CURRENT_DATA) {
                    // Unmute and play when clicked
                    video.muted = false;
                    video.play().catch(error => {
                        console.error('Play failed after click:', error);
                    });
                }
            });
        }
    }
}

// Initialize video when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeVideo);

// Parallax effect for hero section
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');

    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = heroSection.querySelector('.video-background');

            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }
}

// Initialize parallax
initializeParallax();

// Additional sidebar-specific functions
function initializeSidebarFeatures() {
    // Auto-close sidebar on window resize to desktop
    window.addEventListener('resize', function () {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && window.innerWidth > 1024 && sidebar.classList.contains('active')) {
            const closeSidebar = document.getElementById('closeSidebar');
            if (closeSidebar) {
                closeSidebar.click();
            }
        }
    });

    // Prevent body scroll when sidebar is open
    const sidebar = document.getElementById('sidebar');
    if (sidebar) {
        const observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.attributeName === 'class') {
                    if (sidebar.classList.contains('active')) {
                        document.body.style.overflow = 'hidden';
                    } else {
                        document.body.style.overflow = '';
                    }
                }
            });
        });

        observer.observe(sidebar, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
}

// Initialize sidebar features
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initializeSidebarFeatures, 200);
});

// Handle active navigation states based on scroll position
function initializeActiveNavigation() {
    const sections = ['hero', 'about', 'services', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        let current = '';

        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    current = section;
                }
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', debounce(updateActiveNav, 100));
}

// Initialize active navigation
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(initializeActiveNavigation, 300);

});
function toggleFAQ(element) {
    const faqItem = element.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');

    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });

    // If the clicked item wasn't active, open it
    if (!isActive) {
        faqItem.classList.add('active');
    }
}


// Initialize first FAQ as open
document.addEventListener('DOMContentLoaded', function () {
    const firstFAQ = document.querySelector('.faq-item');
    if (firstFAQ) {
        firstFAQ.classList.add('active');
    }
});


// Newsletter Popup JavaScript
class NewsletterPopup {
    constructor() {
        this.overlay = document.getElementById('newsletterOverlay');
        this.popup = document.getElementById('newsletterPopup');
        this.closeBtn = document.getElementById('closeBtn');
        this.form = document.getElementById('newsletterForm');
        this.emailInput = document.getElementById('emailInput');
        this.successMessage = document.getElementById('successMessage');

        this.isShown = false;
        this.hasSubscribed = false;

        this.init();
    }

    init() {
        // Show popup after page loads (delay for better UX)
        setTimeout(() => {
            this.showPopup();
        }, 2000); // Show after 2 seconds

        // Close button click
        this.closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.hidePopup();
        });

        // Click outside popup to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hidePopup();
            }
        });

        // Prevent popup content clicks from closing
        this.popup.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubscription();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isShown) {
                this.hidePopup();
            }
        });

        // Prevent body scroll when popup is open
        this.overlay.addEventListener('transitionend', () => {
            if (this.isShown) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    showPopup() {
        if (!this.hasSubscribed) {
            this.isShown = true;
            this.overlay.classList.add('show');
        }
    }

    hidePopup() {
        this.isShown = false;
        this.overlay.classList.remove('show');
    }

    handleSubscription() {
        const email = this.emailInput.value.trim();

        if (email && this.isValidEmail(email)) {
            // Hide form and show success message
            this.form.style.display = 'none';
            this.successMessage.style.display = 'block';

            // Store subscription status
            this.hasSubscribed = true;
            localStorage.setItem('newsletterSubscribed', 'true');

            // Auto close after success
            setTimeout(() => {
                this.hidePopup();
            }, 3000);

            // Here you would typically send the email to your server
            console.log('Email subscribed:', email);

            // Optional: Send to your backend
            // this.sendToServer(email);
        } else {
            alert('Please enter a valid email address');
        }
    }

    isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Optional: Send email to server
    sendToServer(email) {
        fetch('/api/newsletter-subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Subscription successful:', data);
            })
            .catch(error => {
                console.error('Subscription error:', error);
            });
    }

    // Public method to show popup manually
    show() {
        this.showPopup();
    }

    // Public method to hide popup manually
    hide() {
        this.hidePopup();
    }
}

// Initialize newsletter popup when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Check if user already subscribed
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');

    if (!hasSubscribed) {
        window.newsletterPopup = new NewsletterPopup();
    }
});

// Optional: Manual trigger functions (you can call these from anywhere)
function showNewsletter() {
    if (window.newsletterPopup) {
        window.newsletterPopup.show();
    }
}

function hideNewsletter() {
    if (window.newsletterPopup) {
        window.newsletterPopup.hide();
    }
}

var i = 0;
var txt = '';
var speed = 70;
var started = false;


// if (window.location.pathname.includes('/pages/smart-surveillance.html')) {
//     txt = 'Let’s Talk About Making  <br> Your Spaces More Secure.';
// } else {
//     txt = 'PLANNING SOMETHING BIG?';
// }

// Conditional text based on route
if (window.location.pathname.includes('/pages/smart-surveillance.html')) {
    txt = 'Let’s Talk About Making <br> Your Spaces More Secure.';
} else if (window.location.pathname.includes('/pages/about-Us.html')) {
   txt = 'Let’s Talk About Making <br> Your Spaces More Secure.';;
} else {
    txt = 'PLANNING SOMETHING BIG?';
}

function typeWriter(callback) {
    if (i < txt.length) {
        if (txt.substring(i, i + 4) === '<br>') {
            document.getElementById("typewriter").innerHTML += '<br>';
            i += 4; // skip "<br>"
        } else {
            document.getElementById("typewriter").innerHTML += txt.charAt(i);
            i++;
        }
        setTimeout(() => typeWriter(callback), speed);
    } else {
        if (typeof callback === 'function') {
            callback();
        }
    }
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
            started = true;
            typeWriter(() => {
                document.querySelectorAll(".word-animate").forEach(el =>
                    el.classList.add("word-animate-animation")
                );
            });
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.8 });


function showNewsletterPopup() {
    document.getElementById("black-overlay-div").style.opacity = "1";
    document.getElementById("black-overlay-div").style.visibility = "visible";
    document.getElementById("global-newsletter-section").style.top = "0";
    document.body.style.overflow = 'hidden';
}

function hideNewsletterPopup() {
    document.getElementById("black-overlay-div").style.opacity = "0";
    document.getElementById("black-overlay-div").style.visibility = "hidden";
    document.getElementById("global-newsletter-section").style.top = "100%";
    document.body.style.overflowY = 'auto';
}


function initializeHeaderLogo() {
    const header = document.querySelector('.header-section');
    const logoImg = document.getElementById('logoImg');
    // const heroSection = document.getElementById('heroSection');
    const heroSection = document.getElementById('heroSection') || document.getElementById('image-hero-section');

    // Detect relative path
    const basePath = window.location.pathname.includes('/pages/') ? '../assets/images/' : 'assets/images/';

    // Logo paths
    const originalLogo = basePath + 'GCS-logo.webp';
    const scrolledLogo = basePath + 'GCS-LOGO-VECTOR.webp';

    let ticking = false;

    function updateHeader() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const heroBottom = heroSection.offsetTop + heroHeight;

        if (scrollPosition >= heroBottom) {
            header.classList.add('scrolled');
            logoImg.src = scrolledLogo;
        } else {
            header.classList.remove('scrolled');
            logoImg.src = originalLogo;
        }
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    window.addEventListener('resize', function () {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    updateHeader();
}


// Back to Top Button
function initializeBackToTop() {
    console.log('🚀 Initializing Back to Top...');

    const backToTopBtn = document.getElementById('backToTop');
    const progressCircle = document.getElementById('progressCircle');
    const heroSection = document.getElementById('heroSection');
    
    image-hero-section
    console.log('Elements found:', {
        button: !!backToTopBtn,
        progress: !!progressCircle,
        hero: !!heroSection
    });

    if (!backToTopBtn || !progressCircle || !heroSection) {
        console.error('❌ Required elements not found:', {
            button: !!backToTopBtn,
            progress: !!progressCircle,
            hero: !!heroSection
        });
        return;
    }

    // Set initial progress
    const circumference = 2 * Math.PI * 32;
    progressCircle.style.strokeDasharray = circumference;
    progressCircle.style.strokeDashoffset = circumference;

    console.log('✅ Progress ring initialized');

    function updateBackToTop() {
        const scrollPosition = window.scrollY;
        const heroHeight = heroSection.offsetHeight;
        const heroBottom = heroSection.offsetTop + heroHeight;

        // Calculate progress based on total document scroll
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollPosition / docHeight, 1);

        // Update progress ring
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;

        // Show button only after hero section is passed
        const heroPassed = scrollPosition >= heroBottom;

        // REMOVED: All debugInfo references

        if (heroPassed) {
            console.log('✅ Showing button');
            backToTopBtn.classList.add('show');
        } else {
            console.log('❌ Hiding button');
            backToTopBtn.classList.remove('show');
            backToTopBtn.classList.remove('completed');
        }

        // Add completed effect when near bottom (95%)
        if (scrollPercent > 0.95) {
            backToTopBtn.classList.add('completed');
        } else {
            backToTopBtn.classList.remove('completed');
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', updateBackToTop);

    // Handle window resize
    window.addEventListener('resize', updateBackToTop);

    // Click event for back to top
    backToTopBtn.addEventListener('click', function () {
        console.log('🔝 Back to top clicked');
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Initial check
    updateBackToTop();
    console.log('✅ Initialization complete');
}

// Multiple initialization methods to ensure it works
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeBackToTop);
} else {
    initializeBackToTop();
}

// Fallback
window.addEventListener('load', initializeBackToTop);

// document.addEventListener('DOMContentLoaded', function () {

//     const defaultSwiperConfig = {
//         spaceBetween: 30,
//         slidesPerGroup: 1,
//         autoplay: {
//             delay: 1000,
//             disableOnInteraction: false,
//         },
//         loop: true,
//         speed: 1500,
//         watchSlidesProgress: true,
//         watchOverflow: true,
//         allowTouchMove: true,
//         breakpoints: {
//             320: {
//                 slidesPerView: 1,
//                 spaceBetween: 20
//             },
//             640: {
//                 slidesPerView: 2,
//                 spaceBetween: 25
//             },
//             768: {
//                 slidesPerView: 3,
//                 spaceBetween: 30
//             },
//             1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 30
//             }
//         }
//     };

//     const swipersData = [
//         {
//             container: '#blogsSwiper',
//             prevBtn: '#blogsPrev',
//             nextBtn: '#blogsNext',
//             customConfig: {} // Uses default 4 slides at 1024px
//         },
//         {
//             container: '#servicesSwiper',
//             prevBtn: '#servicesPrev',
//             nextBtn: '#servicesNext',
//             customConfig: {} // Uses default 4 slides at 1024px
//         },
//         {
//             container: '#productsSwiper', // ID for the product swiper
//             prevBtn: '#productsPrev',
//             nextBtn: '#productsNext',
//             customConfig: {
//                 breakpoints: {
//                     1024: {
//                         slidesPerView: 3,
//                         spaceBetween: 30
//                     }
//                 }
//             }
//         }
//     ];

//     swipersData.forEach(data => {
//         const swiperElement = document.querySelector(data.container);
//         if (swiperElement) {
//             // Merge default config with custom overrides
//             const mergedConfig = structuredClone(defaultSwiperConfig);
//             if (data.customConfig.breakpoints) {
//                 mergedConfig.breakpoints = {
//                     ...mergedConfig.breakpoints,
//                     ...data.customConfig.breakpoints
//                 };
//             }

//             const swiper = new Swiper(data.container, mergedConfig);


//             document.querySelector(data.prevBtn)?.addEventListener('click', () => swiper.slidePrev());
//             document.querySelector(data.nextBtn)?.addEventListener('click', () => swiper.slideNext());

//             swiperElement.addEventListener('mouseenter', () => swiper.autoplay.stop());
//             swiperElement.addEventListener('mouseleave', () => swiper.autoplay.start());
//         }
//     });
// });



// document.addEventListener('DOMContentLoaded', function () {
//     const defaultSwiperConfig = {
//         spaceBetween: 30,
//         slidesPerGroup: 1,
//         autoplay: {
//             delay: 1000,
//             disableOnInteraction: false,
//         },
//         loop: true,
//         speed: 1000,
//         watchSlidesProgress: true,
//         watchOverflow: true,
//         allowTouchMove: true,
//         breakpoints: {
//             320: {
//                 slidesPerView: 1,
//                 spaceBetween: 20
//             },
//             640: {
//                 slidesPerView: 2,
//                 spaceBetween: 25
//             },
//             768: {
//                 slidesPerView: 3,
//                 spaceBetween: 30
//             },
//             1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 30
//             }
//         }
//     };

//     const swipersData = [
//         {
//             container: '#blogsSwiper',
//             prevBtn: '#blogsPrev',
//             nextBtn: '#blogsNext',
//             customConfig: {
//                 autoplay: false,
//             }
//         },
//         {
//             container: '#servicesSwiper',
//             prevBtn: '#servicesPrev',
//             nextBtn: '#servicesNext',
//             customConfig: {
//                 autoplay: false,
//             }
//         },
//         {
//             container: '#productsSwiper',
//             prevBtn: '#productsPrev',
//             nextBtn: '#productsNext',
//             customConfig: {
//                 autoplay: false, // This will now be respected
//                 breakpoints: {
//                     1024: {
//                         slidesPerView: 3,
//                         spaceBetween: 30
//                     }
//                 }
//             }
//         }
//     ];

//     swipersData.forEach(data => {
//         const swiperElement = document.querySelector(data.container);
//         if (swiperElement) {
//             const mergedConfig = structuredClone(defaultSwiperConfig);

//             // Merge all other customConfig keys
//             Object.assign(mergedConfig, data.customConfig);

//             // Deep merge breakpoints
//             if (data.customConfig.breakpoints) {
//                 mergedConfig.breakpoints = {
//                     ...defaultSwiperConfig.breakpoints,
//                     ...data.customConfig.breakpoints
//                 };
//             }

//             const swiper = new Swiper(data.container, mergedConfig);

//             document.querySelector(data.prevBtn)?.addEventListener('click', () => swiper.slidePrev());
//             document.querySelector(data.nextBtn)?.addEventListener('click', () => swiper.slideNext());

//             if (mergedConfig.autoplay !== false) {
//                 swiperElement.addEventListener('mouseenter', () => swiper.autoplay.stop());
//                 swiperElement.addEventListener('mouseleave', () => swiper.autoplay.start());
//             }
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', function () {

    const defaultSwiperConfig = {
        spaceBetween: 30,
        slidesPerGroup: 1,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
        },
        loop: true,
        speed: 1500,
        watchSlidesProgress: true,
        watchOverflow: true,
        allowTouchMove: true,
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 25
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 30
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 30
            }
        }
    };

    const swipersData = [
        {
            container: '#blogsSwiper',
            prevBtn: '#blogsPrev',
            nextBtn: '#blogsNext',
            customConfig: {
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 25
                    },
                    768: {
                        slidesPerView: 2,  // 2 cards on iPad
                        spaceBetween: 25
                    },
                    1024: {
                        slidesPerView: 4,  // 4 cards on desktop
                        spaceBetween: 30
                    }
                }
            }
        },
        {
            container: '#servicesSwiper',
            prevBtn: '#servicesPrev',
            nextBtn: '#servicesNext',
            customConfig: {
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 25
                    },
                    768: {
                        slidesPerView: 2,  // 2 cards on iPad
                        spaceBetween: 25
                    },
                    1024: {
                        slidesPerView: 4,  // 4 cards on desktop
                        spaceBetween: 30
                    }
                }
            }
        },
        {
            container: '#productsSwiper',
            prevBtn: '#productsPrev',
            nextBtn: '#productsNext',
            customConfig: {
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 25
                    },
                    768: {
                        slidesPerView: 2,  // 2 cards on iPad for products
                        spaceBetween: 25
                    },
                    1024: {
                        slidesPerView: 3,  // 3 cards on desktop for products
                        spaceBetween: 30
                    }
                }
            }
        }
    ];

    swipersData.forEach(data => {
        const swiperElement = document.querySelector(data.container);
        if (swiperElement) {
            // Merge default config with custom overrides
            const mergedConfig = structuredClone(defaultSwiperConfig);
            if (data.customConfig.breakpoints) {
                mergedConfig.breakpoints = {
                    ...mergedConfig.breakpoints,
                    ...data.customConfig.breakpoints
                };
            }

            const swiper = new Swiper(data.container, mergedConfig);

            document.querySelector(data.prevBtn)?.addEventListener('click', () => swiper.slidePrev());
            document.querySelector(data.nextBtn)?.addEventListener('click', () => swiper.slideNext());

            swiperElement.addEventListener('mouseenter', () => swiper.autoplay.stop());
            swiperElement.addEventListener('mouseleave', () => swiper.autoplay.start());
        }
    });
});         

