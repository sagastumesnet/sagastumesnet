document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Services data
    const mainServices = [
        {emoji: '🆔', title: 'Creación de NIT', desc: 'Obtención rápida de su Número de Identificación Tributaria'},
        {emoji: '💰', title: 'Pago de Impuestos', desc: 'Gestión y pago ante la SAT'},
        {emoji: '💻', title: 'Agencia Virtual SAT', desc: 'Trámites en línea de SAT'},
        {emoji: '📋', title: 'Finiquito CGC', desc: 'Finiquito y adhesión en Contraloría'},
        {emoji: '🎓', title: 'Registro de Títulos', desc: 'Registro de títulos de diversificado'},
        {emoji: '📝', title: 'RTU', desc: 'Actualización y gestión'},
        {emoji: '📋', title: 'Licencias Sanitarias', desc: 'Trámite de licencias'},
        {emoji: '🏭', title: 'Registro de Marcas', desc: 'Protección legal de marcas'},
        {emoji: '📜', title: 'Antecedentes', desc: 'Penales, policiales, RENAS y migratorios'},
        {emoji: '📄', title: 'Certificados RENAP', desc: 'Registro civil'},
        {emoji: '⚖️', title: 'Solvencia Fiscal', desc: 'Constancias de SAT'},
        {emoji: '📊', title: 'Declaraguate', desc: 'Declaraciones electrónicas'},
        {emoji: '💼', title: 'Contabilidad', desc: 'Servicios contables'},
        {emoji: '🏪', title: 'Inscripción de Negocios', desc: 'Patentes de comercio'},
        {emoji: '✈️', title: 'Pasaportes', desc: 'Renovación y nuevos'},
        {emoji: '🚗', title: 'Traspasos en Línea', desc: 'Vehículos'}
    ];
    
    const additionalServices = [
        {emoji: '🚗', title: 'Expertajes Vehiculares', desc: 'Inspección y certificación'},
        {emoji: '💻', title: 'Software Original', desc: 'Office, antivirus, licencias'},
        {emoji: '🔧', title: 'Servicios Tecnológicos', desc: 'Reparación y venta de equipo'},
        {emoji: '₿', title: 'Asesoría en Criptomonedas', desc: 'Seguridad, trading, wallets'},
        {emoji: '🚦', title: 'Multas de Tránsito', desc: 'Verificación y pago'},
        {emoji: '🖨️', title: 'Servicios de Impresión', desc: 'Fotos y documentos'},
        {emoji: '📄', title: 'Escaneo y Digitalización', desc: 'Copiado, escaneo y respaldo'},
        {emoji: '💳', title: 'Pagos Electrónicos', desc: 'Transferencias seguras'},
        {emoji: '🔄', title: 'Activación Vehicular', desc: 'Activación e inactivación'},
        {emoji: '📊', title: 'Pequeño Contribuyente', desc: 'Gestión completa'},
        {emoji: '🔒', title: 'Emplasticado de Documentos', desc: 'Protección'},
        {emoji: '✈️', title: 'Solicitud de Visas', desc: 'Americana, Mexicana, Canadiense'},
        {emoji: '🆔', title: 'Licencias DIGECAM', desc: 'Trámites de armas'},
        {emoji: '📄', title: 'Solvencia Fiscal SAT', desc: 'Generación digital'},
        {emoji: '🏢', title: 'Cierre de Negocios', desc: 'Cese de actividades'},
        {emoji: '📅', title: 'Citas SAT', desc: 'Programación de citas'},
        {emoji: '🏥', title: 'Portal IGSS', desc: 'Trámites institucionales'},
        {emoji: '🚗', title: 'Conversión de Placas', desc: 'Temporal a metálica'},
        {emoji: '📋', title: 'Consulta Omisos SAT', desc: 'Estado de cumplimiento'}
    ];

    // Function to generate service cards
    function generateServiceCards(services, containerSelector) {
        const container = document.querySelector(containerSelector);
        if (!container) return;

        container.innerHTML = services.map(service => `
            <div class="service-card">
                <div class="service-icon">${service.emoji}</div>
                <h3>${service.title}</h3>
                <p>${service.desc}</p>
                <a href="#contacto" class="service-link">Más información <span class="arrow-right">→</span></a>
            </div>
        `).join('');
    }

    // Generate service cards
    generateServiceCards(mainServices, '.services-grid');
    generateServiceCards(additionalServices, '.additional-services');

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .feature-card, .step-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 50) {
                element.classList.add('animate');
            }
        });
    };

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();

    // Add CSS class for animation
    const style = document.createElement('style');
    style.textContent = `
        .service-card, .feature-card, .step-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .service-card.animate, .feature-card.animate, .step-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Add year to copyright
    const copyrightElement = document.querySelector('.copyright');
    if (copyrightElement) {
        const currentYear = new Date().getFullYear();
        copyrightElement.textContent = copyrightElement.textContent.replace('2025', currentYear);
    }
});