<!-- Carregue isso ANTES de carregar auth.js -->
<script>
  // Configurar API_BASE_URL dinamicamente
  window.API_BASE_URL = localStorage.getItem('API_BASE_URL') || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'http://localhost:5000/api'
      : 'https://seu-backend-railway.com/api');
</script>
