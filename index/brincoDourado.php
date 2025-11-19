<?php
// ARQUIVO: index/brincoDourado.php

// Esta linha "cria" o objeto de conexão $pdo, pois carrega o script 'conexao.php'
require '../config/conexao.php'; 

// 1. Lógica de FAVORITOS (Com Cookies)
define("FAVORITES_KEY", "eclat_favoritos");

/**
 * Função para obter a lista de IDs de favoritos armazenados no cookie.
 * @return array A lista de IDs de produtos favoritos.
 */
function getFavoritesFromCookie() {
    if (isset($_COOKIE[FAVORITES_KEY])) {
        $favoritos = json_decode($_COOKIE[FAVORITES_KEY], true);
        // Garante que o array está reindexado para ser consistente (como no colaresPrata)
        return is_array($favoritos) ? array_values($favoritos) : []; 
    }
    return [];
}

// Lista de IDs de produtos favoritos para verificar qual coração deve estar preenchido
$favoritos_ids = getFavoritesFromCookie();

// ----------------------------------------------------------------------------------
// 2. Catálogo de Produtos (Mock Data - IDs ÚNICOS são CRUCIAIS)
// ----------------------------------------------------------------------------------
$PRODUTOS_DOURADO = [
    [
        "id" => "brinco_dourado_montecaos", 
        "nome" => "Montécaos", 
        "descricao" => "Dourado 18k Argola Clássica 18mm", 
        "preco" => "250,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Montécaos.png"
    ],
    [
        "id" => "brinco_dourado_pastis", 
        "nome" => "Pastis", 
        "descricao" => "Dourado 18k Quadrado Liso Moderno", 
        "preco" => "495,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Pastis.png"
    ],
    [
        "id" => "brinco_dourado_bugnes", 
        "nome" => "Bugnes", 
        "descricao" => "Dourado 18k com Pérola Natural Pequena", 
        "preco" => "360,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Bugnes.png"
    ],
    [
        "id" => "brinco_dourado_nougat", 
        "nome" => "Nougat", 
        "descricao" => "Dourado 18k Argola Texturizada 20mm", 
        "preco" => "199,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Nougat.png"
    ],
    [
        "id" => "brinco_dourado_bourdaloue", 
        "nome" => "Bourdaloue", 
        "descricao" => "Dourado 18k Redondo Fosco Minimalista", 
        "preco" => "469,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Bourdaloue.png"
    ],
    [
        "id" => "brinco_dourado_teurgoule", 
        "nome" => "Teurgoule", 
        "descricao" => "Dourado 18k com Corrente Fina e Cristal Branco", 
        "preco" => "799,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Teurgoule.png"
    ],
    [
        "id" => "brinco_dourado_calisson", 
        "nome" => "Calisson", 
        "descricao" => "Dourado 18k Argola com Detalhe Torcidos", 
        "preco" => "2.199,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Calisson.png"
    ],
    [
        "id" => "brinco_dourado_dragee", 
        "nome" => "Dragée", 
        "descricao" => "Dourado 18k com Zircônias Cravejadas", 
        "preco" => "469,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Dragée.png"
    ],
    [
        "id" => "brinco_dourado_perouges", 
        "nome" => "Pérouges", 
        "descricao" => "Dourado 18k com Pêndulo Alongado", 
        "preco" => "499,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Pérouges.png"
    ],
    [
        "id" => "brinco_dourado_croquant", 
        "nome" => "Croquant", 
        "descricao" => "Dourado 18k com Ponto de Luz 4mm", 
        "preco" => "495,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Croquant.png"
    ],
    [
        "id" => "brinco_dourado_florentin", 
        "nome" => "Toulon", // Nome 'Toulon' mantido do seu código original
        "descricao" => "Dourado 18k, com laços 6mm", 
        "preco" => "349,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Florentin.png"
    ],
    [
        "id" => "brinco_dourado_pain_depi", 
        "nome" => "Toulouse", // Nome 'Toulouse' mantido do seu código original
        "descricao" => "Dourado 18k longo com Detalhe Vazado", 
        "preco" => "199,00",
        "img" => "../imagens/Brincos/Dourado/Brinco Pain d'épi.png"
    ],
];
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Éclat Joias - Brincos Dourados</title>

    <link rel="stylesheet" href="../css/joias.css"> 
    <link rel="stylesheet" href="../css/favoritos.css"> 

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
document.addEventListener('DOMContentLoaded', function() {
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');

        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            dropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('show-submenu');
                }
            });

            dropdown.classList.toggle('show-submenu');
            e.stopPropagation(); 
        });
    });

    document.addEventListener('click', function() {
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

    <section id="banner-carousel" class="relative w-full max-w-7xl mx-auto my-8 overflow-hidden rounded-lg shadow-lg"
        style="background-color: var(--color-secondary);" aria-live="polite">
        <div class="relative h-64 md:h-96 overflow-hidden">
            <div id="carousel-wrapper" class="flex transition-transform duration-500 ease-in-out">

                <div class="carousel-item w-full flex-shrink-0 relative" role="group" aria-label="Slide 1 de 3">
                    <img src="../imagens/Brincos/claire.png"
                        class="w-full h-full object-cover" alt="Banner de Brincos Claire" loading="lazy">
                </div>

                <div class="carousel-item w-full flex-shrink-0 relative" role="group" aria-label="Slide 2 de 3">
                    <img src="../imagens/Brincos/brincos.png"
                        class="w-full h-full object-cover" alt="Banner de Brincos" loading="lazy">
                </div>

                <div class="carousel-item w-full flex-shrink-0 relative" role="group" aria-label="Slide 3 de 3">
                    <img src="../imagens/Brincos/monaco.png"
                        class="w-full h-full object-cover" alt="Banner de Brincos Monaco" loading="lazy">
                </div>
            </div>
        </div>

        <div id="indicator-container" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        </div>
    </section>

    <section class="catalogo">

        <div id="claire" class="collection-section section-dourado">
            <h2>Coleção Claire</h2>
            <p>O esplendor do ouro e o brilho eterno dos diamantes. Joias inspiradas na majestade e no luxo da realeza francesa.</p>

            <div class="cards-grid" role="list" aria-label="Brincos da Coleção Claire">
                
                <?php foreach ($PRODUTOS_DOURADO as $produto): 
                    // Lógica para definir o estado do coração (preenchido ou vazio)
                    $is_favorito = in_array($produto['id'], $favoritos_ids);

                    // Define as classes corretas (favorited para o botão, fas/far para o ícone)
                    $fav_btn_class = $is_favorito ? 'favorited' : '';
                    $fav_icon_class = $is_favorito ? 'fas' : 'far'; 
                ?>

                <div class="card card-dourado" 
                    role="listitem"
                    data-id="<?= htmlspecialchars($produto['id']) ?>"
                    data-nome="<?= htmlspecialchars($produto['nome']) ?>"
                    data-descricao="<?= htmlspecialchars($produto['descricao']) ?>"
                    data-preco="<?= htmlspecialchars($produto['preco']) ?>"
                    data-img="<?= htmlspecialchars($produto['img']) ?>">

                    <img src="<?= htmlspecialchars($produto['img']) ?>" alt="Brinco <?= htmlspecialchars($produto['nome']) ?>" loading="lazy">
                    <div class="card-content">
                        <h3><?= htmlspecialchars($produto['nome']) ?></h3>
                        <p><?= htmlspecialchars($produto['descricao']) ?></p>
                        <p class="preco">R$ <?= htmlspecialchars($produto['preco']) ?></p>
                         <form action="carrinho.php" method="POST" style="margin-top: 10px;">
                            <input type="hidden" name="action" value="add">
                            <input type="hidden" name="id" value="<?= htmlspecialchars($produto['id']) ?>">
                            <input type="hidden" name="nome" value="<?= htmlspecialchars($produto['nome']) ?>">
                            <input type="hidden" name="preco" value="<?= str_replace(',', '.', str_replace('.', '', $produto['preco'])) ?>"> 
                            <input type="hidden" name="img" value="<?= htmlspecialchars($produto['img']) ?>">
                            <input type="hidden" name="variant" value="unidade-padrao"> 

                            <button type="submit" class="btn-comprar">Comprar</button>
                        </form>
                        
                        <button class="add-fav js-toggle-favorite <?= $fav_btn_class ?>" title="Adicionar aos favoritos">
                            <i class="<?= $fav_icon_class ?> fa-heart"></i>
                        </button>
                    </div>
                </div>

                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <div class="secao-separador-sutil">
        <hr>

        <footer class="footer-minimal">
            <div class="container footer-content-wrapper-three-cols">

                <div class="footer-col footer-col-logo">
                    <a href="../index/home.php" class="footer-logo">
                        <img src="../imagens/home/logo_oficial-removebg-preview.png" alt="Logo Éclat Joias"
                            loading="lazy">
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

        <script src="../js/carrossel.js"></script>
        <script src="../js/favoritos_script.js" defer></script> 
</body>

</html>