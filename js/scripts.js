// ==================== INICIALIZAÇÃO ==================== //
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeButtons();
    initializeScrollAnimations();
    initializeSmoothScroll();
});

// ==================== NAVEGAÇÃO RESPONSIVA ==================== //
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu ao clicar no hamburger
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            
            // Atualizar link ativo
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Navbar sticky com mudança de estilo
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';\n        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });
}

// ==================== BOTÕES E INTERAÇÕES ==================== //
function initializeButtons() {
    const ctaButtons = document.querySelectorAll('#cta-button');
    const actionButtons = document.querySelectorAll('.btn-primary, .btn-outline');

    // Botões CTA principais
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            showSuccessModal('Perfeito! 🎉', 'Sua jornada para o sucesso começa aqui!\\nEm breve você receberá mais informações.');
        });
    });

    // Outros botões de ação
    actionButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.id || this.id !== 'cta-button') {
                e.preventDefault();
                const buttonText = this.textContent.trim();
                showNotification(`${buttonText}`, 'info');
            }
        });
    });
}

// ==================== ANIMAÇÕES AO SCROLL ==================== //
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos animáveis
    document.querySelectorAll('.feature-card, .pricing-card, .section-title').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ==================== SCROLL SUAVE ==================== //
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^=\"#\"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== MODAIS E NOTIFICAÇÕES ==================== //
function showSuccessModal(title, message) {
    // Remove modal anterior se existir
    const existingModal = document.getElementById('success-modal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.id = 'success-modal';
    modal.innerHTML = `
        <div style=\"
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease;
        \">
            <div style=\"
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                animation: slideInUp 0.3s ease;
            \">
                <h2 style=\"color: #667eea; margin-bottom: 1rem;\">${title}</h2>
                <p style=\"color: #64748b; margin-bottom: 2rem; line-height: 1.6;\">${message}</p>
                <button onclick=\"this.closest('[id=success-modal]').remove()\" style=\"
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                \" onmouseover=\"this.style.transform='translateY(-3px)'\" onmouseout=\"this.style.transform='translateY(0)'\">
                    Continuar
                </button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Auto-remover após 5 segundos
    setTimeout(() => {
        if (document.getElementById('success-modal')) {
            document.getElementById('success-modal').remove();
        }
    }, 5000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 2001;
        animation: slideInUp 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== CSS DINÂMICO PARA ANIMAÇÕES ==================== //
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(10px, 10px);
    }
    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }
    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -7px);
    }
`;
document.head.appendChild(style);

console.log('✨ Scripts carregados e otimizados!');