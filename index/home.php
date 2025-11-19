<?php
// ARQUIVO: index/home.php

// Esta linha "cria" o objeto de conexão $pdo, pois carrega o script 'conexao.php'
require '../config/conexao.php'; 

// A partir daqui, você pode buscar os anéis dourados:
// $stmt = $pdo->prepare("SELECT * FROM produtos WHERE categoria = 1 AND cor = 'Dourado'");
// $stmt->execute();
// $aneis = $stmt->fetchAll();

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Éclat Joias</title>

  <link rel="stylesheet" href="../css/home.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
    rel="stylesheet">

</head>

<body>
  <header class="top-nav">

    <button class="hamburger-menu">☰</button>
    <script>document.addEventListener('DOMContentLoaded', () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const navbar = document.querySelector('.navbar');

        hamburger.addEventListener('click', () => {
          navbar.classList.toggle('open');
        });
      });</script>

    <a href="../index/home.php" class="logo">
      <img src="../imagens/home/logo_oficial-removebg-preview.png" alt="logo">
    </a>
    <nav class="navbar">
      <div class="dropdown">
        <a href="#">Colares</a>
        <ul class="submenu">
          <li><a href="../index/colararesPrata.php">Versailles</a></li>
          <li><a href="../index/colaresDourado.php">Étoile Royale</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Brincos</a>
        <ul class="submenu">
          <li><a href="../index/brincosPratas.php">Monaco</a></li>
          <li><a href="../index/brincoDourado.php">Claire</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Anéis</a>
        <ul class="submenu">
          <li><a href="../index/aneisPratas.php">Caprice</a></li>
          <li><a href="../index/aneisDourado.php">Riviera</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Relógios</a>
        <ul class="submenu">
          <li><a href="../index/relogiosPrata.php">robuste</a></li>
          <li><a href="../index/relogioDourado.php">délicate</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Braceletes</a>
        <ul class="submenu">
          <li><a href="../index/braceletesPrata.php">Aurore</a></li>
          <li><a href="../index/braceletesDourado.php">Essence</a></li>
        </ul>
      </div>
    </nav>

    <script>
      document.addEventListener('DOMContentLoaded', function () {
        const dropdowns = document.querySelectorAll('.dropdown');

        dropdowns.forEach(dropdown => {
          const link = dropdown.querySelector('a');

          link.addEventListener('click', function (e) {
            // 1. Previne o link de navegar (só queremos mostrar/esconder o menu)
            e.preventDefault();

            // 3. Oculta todos os outros submenus abertos
            dropdowns.forEach(otherDropdown => {
              if (otherDropdown !== dropdown) {
                otherDropdown.classList.remove('show-submenu');
              }
            });

            // 2. Alterna a classe 'show-submenu' para mostrar/esconder o menu atual
            dropdown.classList.toggle('show-submenu');

            // Impede que o clique no link ative o detector de 'click-away' (passo 4)
            e.stopPropagation();
          });
        });

        // 4. Oculta o menu quando o usuário clica em qualquer lugar FORA do .dropdown
        document.addEventListener('click', function () {
          dropdowns.forEach(dropdown => {
            dropdown.classList.remove('show-submenu');
          });
        });
      });
    </script>

   <div class="icones">
    <a href="../index/favoritos.php" title="Favoritos">
        <i class="fas fa-heart"></i>
    </a>
    <a href="../index/usuario.php">
    <i class="fas fa-user"></i></a>
    
   <a href="../index/carrinho.php"> 
    <i class="fas fa-shopping-cart"></i> </a>
</div>
  </header>



  <section class="banner-principal"></section>

  <section class="secao-brilho-interativo">
    <h2 class="titulo-secao-brilho">Nosso brilho para você!</h2>
    <p class="subtitulo-secao-brilho">
      Descubra as joias que definem a sua elegância. Clique e explore por categoria:
    </p>

    <div class="circulos-interativos-wrapper">

      <a href="../index/brincoDourado.php" class="circulo-card circulo-1">
        <div class="circulo-overlay">
          <h3>Brincos Finos</h3>
          <p>Sofisticação para qualquer ocasião.</p>
          <span class="btn-ver-mais">Ver Mais</span>
        </div>
        <h3 class="circulo-titulo-estatico">Brincos Clássicos</h3>
      </a>

      <a href="../index/aneisDourado.php" class="circulo-card circulo-2">
        <div class="circulo-overlay">
          <h3>Anéis Delicados</h3>
          <p>Design minimalista e classe.</p>
          <span class="btn-ver-mais">Ver Mais</span>
        </div>
        <h3 class="circulo-titulo-estatico">Anéis Delicados</h3>
      </a>

      <a href="../index/colaresDourado.php" class="circulo-card circulo-3">
        <div class="circulo-overlay">
          <h3>Colares Elegantes</h3>
          <p>Ilumine seu visual com exclusividade.</p>
          <span class="btn-ver-mais">Ver Mais</span>
        </div>
        <h3 class="circulo-titulo-estatico">Colares & Chokers</h3>
      </a>

    </div>
  </section>

  <div class="secao-separador-sutil">
    <hr>
  </div>

  <section class="eclat-destaque-essencia">
    <i class="essencia-icone fas fa-gem"></i>

    <p class="essencia-subtitulo">Éclat: A Sua Essência</p>

    <h2 class="essencia-titulo">Luxo em Cada Detalhe</h2>

    <p class="essencia-descricao">
      Nascemos do desejo de criar joias que tocam a alma. Cada criação é um reflexo da beleza que existe em você.
      Somos a Éclat e celebramos sua singularidade com peças que brilham tanto quanto você.
    </p>

  </section>

  <div class="secao-separador-sutil">
    <hr>
  </div>

  <section class="secao-historia-harmonizada">
    <div class="container-historia-harmonizada container">
      <div class="imagem-historia">
        <img src="../imagens/home/sessão 4 - img3.png" alt="Anel minimalista de ouro em um fundo suave."
          class="history-image">
      </div>

      <div class="texto-historia">
        <h2 class="titulo-historia">Nosso Legado: Tradição, Elegância e Significado</h2>
        <p>A Éclat Joias nasceu de uma paixão por peças que transcendem o tempo. Nosso legado se reflete em cada
          detalhe, unindo tradição, elegância e significado em um design moderno e sofisticado.</p>
        <p>Utilizamos apenas ouro 18k e prata de lei, garantindo a durabilidade e o brilho eterno que suas
          memórias merecem. Mais do que joias, criamos heranças para a próxima geração.</p>
        <a href="../index/sobre.php" class="btn-historia">Conheça a Essência Éclat</a>
      </div>

    </div>
  </section>

  <div class="secao-separador-sutil">
    <hr>
  </div>

  <section class="eclat-qualidades-site">
    <div class="container qualidades-wrapper">

      <div class="qualidade-item">
        <i class="qualidade-icone fas fa-shipping-fast"></i>
        <h4 class="qualidade-titulo">Envio Premium Rápido</h4>
        <p class="qualidade-texto">
          Receba suas joias com segurança e agilidade. Oferecemos rastreamento completo e embalagem de luxo exclusiva.
        </p>
      </div>

      <div class="qualidade-item">
        <i class="qualidade-icone fas fa-lock"></i>
        <h4 class="qualidade-titulo">Compra 100% Segura</h4>
        <p class="qualidade-texto">
          Seus dados são criptografados. Pagamento transparente via Pix ou cartão em até 10x sem juros.
        </p>
      </div>

      <div class="qualidade-item">
        <i class="qualidade-icone fas fa-award"></i>
        <h4 class="qualidade-titulo">Garantia Éclat</h4>
        <p class="qualidade-texto">
          Cada peça acompanha certificado de autenticidade e garantia vitalícia contra defeitos de fabricação.
        </p>
      </div>
    </div>
  </section>

  <div class="secao-separador-sutil">
    <hr>
  </div>


 <section class="section connect-section">
  <div class="container connect-grid">

    <div class="connect-box about-link">
      <h2>Suas Joias Favoritas</h2>
      <p>Acesse sua lista de desejos e encontre as peças que conquistaram seu brilho.</p>
      <a href="favoritos.php" class="connect-btn">Acesse Aqui</a>
    </div>

    <div class="connect-box newsletter">
      <h2>Seja Exclusivo</h2>
      <p>Receba lançamentos e convites VIP diretamente no seu email.</p>
      
      <form class="newsletter-form" id="newsletterForm">
        <input type="email" placeholder="Seu melhor e-mail" required>
        <button type="submit" class="subscribe-btn">Inscrever-se</button>
      </form>
      
      <p id="confirmation-message" class="hidden-confirmation">
        ✨ Inscrição realizada com sucesso! Verifique seu e-mail para novidades.
      </p>
      
      </div>
  </div>
</section>




<script>
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('newsletterForm');
    const confirmationMessage = document.getElementById('confirmation-message');

    if (form && confirmationMessage) {
      form.addEventListener('submit', function (event) {
        // 1. Previne o comportamento padrão (recarregar a página)
        event.preventDefault();

        // 2. Simula o envio de dados
        console.log('E-mail enviado, simulando inscrição.');

        // 3. Esconde o formulário
        form.style.display = 'none';

        // 4. Mostra a mensagem de confirmação
        confirmationMessage.classList.remove('hidden-confirmation');
        confirmationMessage.classList.add('visible-confirmation');
      });
    }
  });
</script>

</body>

</html>
  <div class="secao-separador-sutil">
    <hr>

    <footer class="footer-minimal">
      <div class="container footer-content-wrapper-three-cols">

        <div class="footer-col footer-col-logo">
          <a href="../index/home.php" class="footer-logo">
            <img src="../imagens/home/logo_oficial-removebg-preview.png" alt="Logo Éclat Joias" loading="lazy">
          </a>
          <p>Elegância. Tradição. Significado.</p>
        </div>


        <div class="footer-col footer-col-links">
          <h3>Navegue por Categoria</h3>
          <ul class="category-list-two-cols">
            <li><a href="../index/usuario.php">Conta</a></li>
            <li><a href="../index/favoritos.php">Favoritos</a></li>
            <li><a href="../index/sobre.php">Nossa Historia</a></li>
          </ul>
        </div>

        <div class="footer-col footer-col-social">
          <h3>Siga a Éclat</h3>
          <div class="social-icons">
            <a href="https://www.instagram.com/eclatjoias_oficial/?utm_source=qr&igsh=MWVtY21zY3A1b3huOQ%3D%3D#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="https://www.facebook.com/share/17oPPh1v44/" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
            <a href="https://pin.it/4njZyGX1p" aria-label="Pinterest"><i class="fab fa-pinterest-p"></i></a>
          </div>
        </div>

      </div>

      <div class="footer-copyright">
        <div class="container">
          <p>© 2025 Éclat Joias. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
</body>

</html>