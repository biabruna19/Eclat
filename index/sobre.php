<?php
// ARQUIVO: index/sobre.php

// Esta linha "cria" o objeto de conexão $pdo, pois carrega o script 'conexao.php'
require '../config/conexao.php'; 

// A partir daqui, você pode buscar os anéis dourados:
// $stmt = $pdo->prepare("SELECT * FROM produtos WHERE categoria = 1 AND cor = 'Dourado'");
// $stmt->execute();
// $aneis = $stmt->fetchAll();

?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Éclat Joias - Colares</title>

  <link rel="stylesheet" href="../css/sobre.css">

  <link
    href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap"
    rel="stylesheet">

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <script src="https://cdn.tailwindcss.com"></script>
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
          <li><a href="../index/colararesPrata.php">Coleção Prata</a></li>
          <li><a href="../index/colaresDourado.php">Coleção Dourada</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Brincos</a>
        <ul class="submenu">
          <li><a href="../index/brincosPratas.php">Coleção Prata</a></li>
          <li><a href="../index/brincoDourado.php">Coleção Dourada</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Anéis</a>
        <ul class="submenu">
          <li><a href="../index/aneisPratas.php">Coleção Prata</a></li>
          <li><a href="../index/aneisDourado.php">Coleção Dourada</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Relógios</a>
        <ul class="submenu">
          <li><a href="../index/relogiosPrata.php">Coleção Prata</a></li>
          <li><a href="../index/relogioDourado.php">Coleção Dourada</a></li>
        </ul>
      </div>

      <div class="dropdown">
        <a href="#">Braceletes</a>
        <ul class="submenu">
          <li><a href="../index/braceletesPrata.php">Coleção Prata</a></li>
          <li><a href="../index/braceletesDourado.php">Coleção Dourada</a></li>
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
  <main>
    <section class="essence-hero">
      <div class="container">
        <div class="text-content">
          <h1>Conheça nossa essência</h1>
          <p>O legado da nossa história se reflete em cada peça, unindo tradição, elegância e significado.</p>
        </div>
        <div class="image-content">
          <div class="model-image"></div>
        </div>
      </div>
    </section>

    <section class="story-section">
      <div class="container content-grid">
        <div class="image-box">
          <img src="../imagens/sobre/imghistoria.jpg" alt="Joias de ouro em corrente e brincos">
        </div>
        <div class="text-box">
          <h2>A Jornada de Éclat</h2>
          <p>Éclat nasceu não apenas do desejo de criar joias, mas de reascender um brilho. Nossa verdadeira inspiração veio de uma emprededora, que guardava em suas mãos a mestria e a tradição de peças únicas, mas não possuía os recursos ou a visibilidade para alçar seu trabalho. Vimos em seu esforço a representação do brilho silenciado; uma arte que merecia ser celebrada e compartilhada com o mundo. Nosso propósito se tornou o resgate desse potencial, oferecendo a ela não apenas uma plataforma, mas uma parceira para florescer. Assim, cada peça da Éclat carrega a força desse recomeço, fundindo essa paixão autêntica com a sofisticação atemporal e o savoir-faire da França. Nossas coleções são um eterno tributo ao estilo parisiense e à elegância da Riviera, garantindo que o legado da nossa história se reflita em cada detalhe, unindo tradição, elegância e significado.</p>
        </div>
      </div>
    </section>
  </main>
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