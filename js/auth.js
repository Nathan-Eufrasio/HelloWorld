// ==================== AUTH PAGE INITIALIZATION ==================== //
// API_BASE_URL é definida em config.js (carregado globalmente)
// Fallback caso config.js não esteja carregado
const API_BASE_URL = window.API_BASE_URL || localStorage.getItem('API_BASE_URL') || 'http://localhost:5000/api';

document.addEventListener('DOMContentLoaded', function() {
    initializeAuthForms();
    initializeNavigation();
    setupFormValidation();
});

// ==================== FORM TOGGLE ==================== //
function toggleAuthForm(e) {
    e.preventDefault();
    
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotForm = document.getElementById('forgot-form');
    
    // Determine which form to show based on link text
    const linkText = e.target.textContent.toLowerCase();
    
    // Hide all forms
    loginForm.classList.remove('active');
    registerForm.classList.remove('active');
    forgotForm.classList.remove('active');
    
    // Show appropriate form
    if (linkText.includes('crie') || linkText.includes('cria')) {
        registerForm.classList.add('active');
    } else if (linkText.includes('faça') || linkText.includes('faca')) {
        loginForm.classList.add('active');
    } else if (linkText.includes('voltar')) {
        loginForm.classList.add('active');
    }
}

// ==================== FORGOT PASSWORD TOGGLE ==================== //
document.addEventListener('DOMContentLoaded', function() {
    const forgotLinks = document.querySelectorAll('a[href="#forgot-password"]');
    forgotLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.getElementById('login-form').classList.remove('active');
            document.getElementById('register-form').classList.remove('active');
            document.getElementById('forgot-form').classList.add('active');
        });
    });
});

// ==================== PASSWORD VISIBILITY TOGGLE ==================== //
function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const icon = event.target.closest('button').querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// ==================== FORM VALIDATION ==================== //
function setupFormValidation() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const forgotForm = document.getElementById('forgotForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
    
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegisterSubmit);
    }
    
    if (forgotForm) {
        forgotForm.addEventListener('submit', handleForgotSubmit);
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Validação básica
    if (!email || !password) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor, digite um email válido', 'error');
        return;
    }
    
    // Simular autenticação (em produção, enviar para servidor)
    showSuccessModal('Login Realizado! 🎉', 'Bem-vindo de volta à Flamezz Shop!\\nVocê será redirecionado em 2 segundos...');
    
    setTimeout(() => {
        // Redirecionar para dashboard ou página inicial
        window.location.href = 'index.html';
    }, 2000);
}

function handleRegisterSubmit(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm').value;
    const terms = document.getElementById('terms').checked;
    
    // Validações
    if (!name || !email || !password || !confirmPassword) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor, digite um email válido', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('A senha deve ter no mínimo 8 caracteres', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('As senhas não correspondem', 'error');
        return;
    }
    
    if (!terms) {
        showNotification('Você deve aceitar os termos de serviço', 'error');
        return;
    }
    
    // Simular registro (em produção, enviar para servidor)
    showSuccessModal('Conta Criada! 🎉', 'Sua conta Flamezz Shop foi criada com sucesso!\\nVocê será redirecionado em 2 segundos...');
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function handleForgotSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('forgot-email').value;
    
    if (!email) {
        showNotification('Por favor, digite seu email', 'error');
        return;
    }
    
    if (!validateEmail(email)) {
        showNotification('Por favor, digite um email válido', 'error');
        return;
    }
    
    // Simular envio de email (em produção, enviar para servidor)
    showSuccessModal('Email Enviado! 📧', 'Verifique sua caixa de entrada para o link de recuperação de senha.\\nO link expira em 1 hora.');
    
    setTimeout(() => {
        document.getElementById('forgot-form').classList.remove('active');
        document.getElementById('login-form').classList.add('active');
        document.getElementById('forgotForm').reset();
    }, 3000);
}

// ==================== EMAIL VALIDATION ==================== //
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ==================== SOCIAL LOGIN ==================== //
function socialLogin(provider) {
    // Em produção, integrar com OAuth do Google ou Facebook
    showNotification(`Login com ${provider.charAt(0).toUpperCase() + provider.slice(1)} será implementado em breve`, 'info');
}

// ==================== FORM INITIALIZATION ==================== //
function initializeAuthForms() {
    // Mostrar formulário de login por padrão
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.classList.add('active');
    }
}

// ==================== NOTIFICATIONS ==================== //
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

function showSuccessModal(title, message) {
    const existingModal = document.getElementById('success-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.id = 'success-modal';
    modal.innerHTML = `
        <div style="
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
        ">
            <div style="
                background: white;
                padding: 2rem;
                border-radius: 12px;
                max-width: 500px;
                text-align: center;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                animation: slideInUp 0.3s ease;
            ">
                <h2 style="color: #667eea; margin-bottom: 1rem;">${title}</h2>
                <p style="color: #64748b; margin-bottom: 2rem; line-height: 1.6; white-space: pre-line;">${message}</p>
                <button onclick="this.closest('[id=success-modal]').remove()" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 32px;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s;
                " onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform='translateY(0)'">
                    Continuar
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    setTimeout(() => {
        if (document.getElementById('success-modal')) {
            document.getElementById('success-modal').remove();
        }
    }, 5000);
}

// ==================== REUTILIZAR NAVEGAÇÃO DO MAIN ==================== //
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
        }
    });
}
