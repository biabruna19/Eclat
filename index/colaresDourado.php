<?php
// ARQUIVO: index/colaresDourado.php

// 1. Configuração da Conexão (mantida)
require '../config/conexao.php'; 

// 2. Lógica de FAVORITOS (Com Cookies)
define("FAVORITES_KEY", "eclat_favoritos");

/**
 * Função para obter a lista de IDs de favoritos armazenados no cookie.
 * @return array A lista de IDs de produtos favoritos.
 */
function getFavoritesFromCookie() {
    if (isset($_COOKIE[FAVORITES_KEY])) {
        $favoritos = json_decode($_COOKIE[FAVORITES_KEY], true);
        // NOTA: É uma boa prática usar array_values() aqui também, como no colaresPrata.php
        return is_array($favoritos) ? array_values($favoritos) : [];
    }
    return [];
}

// Lista de IDs de produtos favoritos para verificar qual coração deve estar preenchido
$favoritos_ids = getFavoritesFromCookie();

// ----------------------------------------------------------------------------------
// 3. Catálogo de Produtos (Mock Data - Ajuste se estiver usando Banco de Dados Real)
// ----------------------------------------------------------------------------------
$PRODUTOS_DOURADO = [
    // IDs ÚNICOS SÃO CRUCIAIS PARA OS FAVORITOS
    [
        "id" => "colar_dourado_courant", 
        "nome" => "Courant", 
        "descricao" => "Colar em ouro 15K de design múltiplo", 
        "preco" => "799,00",
        "img" => "../imagens/Colares/colares_dourado/courant.png"
    ],
    [
        "id" => "colar_dourado_joie", 
        "nome" => "Joie", 
        "descricao" => "Colar em Ouro 18K de duas voltas com pingentes coloridos", 
        "preco" => "495,00",
        "img" => "../imagens/Colares/colares_dourado/joie.png"
    ],
    [
        "id" => "colar_dourado_argent", 
        "nome" => "Argent", 
        "descricao" => "Gargantilha Choker de Elos Grossos em Ouro 14K", 
        "preco" => "999,00",
        "img" => "../imagens/Colares/colares_dourado/argent.png"
    ],
    [
        "id" => "colar_dourado_monde", 
        "nome" => "Monde", 
        "descricao" => "Colar Choker em Ouro 18K com mini pingentes de coração", 
        "preco" => "890,99",
        "img" => "../imagens/Colares/colares_dourado/monde.png"
    ],
    [
        "id" => "colar_dourado_eclaire", 
        "nome" => "Éclairé", 
        "descricao" => "Gargantilha Choker Fita em Ouro 10K", 
        "preco" => "599,99",
        "img" => "../imagens/Colares/colares_dourado/éclairé.png"
    ],
    [
        "id" => "colar_dourado_dore", 
        "nome" => "Doré", 
        "descricao" => "Colar em Ouro 16K com pingente de coração único", 
        "preco" => "900,00",
        "img" => "../imagens/Colares/colares_dourado/doré.png"
    ],
    [
        "id" => "colar_dourado_battement", 
        "nome" => "Battement", 
        "descricao" => "Colar em Ouro 15K com pingente de coração de zircônia", 
        "preco" => "790,00",
        "img" => "../imagens/Colares/colares_dourado/battement.png"
    ],
    [
        "id" => "colar_dourado_univers", 
        "nome" => "Univers", 
        "descricao" => "Colar Choker Celestial em Ouro 18K com luas e estrelas de zircônia", 
        "preco" => "699,00",
        "img" => "../imagens/Colares/colares_dourado/univers.png"
    ],
    [
        "id" => "colar_dourado_etoile", 
        "nome" => "Étoilé", 
        "descricao" => "Colar Choker Estrela Solitária em Ouro 14K.", 
        "preco" => "679,90",
        "img" => "../imagens/Colares/colares_dourado/étoilé.png"
    ],
    [
        "id" => "colar_dourado_fantaisie", 
        "nome" => "Fantaisie", 
        "descricao" => "Colar Choker em Ouro 18K com pequenas contas de rubi.", 
        "preco" => "889,90",
        "img" => "../imagens/Colares/colares_dourado/fantaisie.png"
    ],
    [
        "id" => "colar_dourado_lumiere", 
        "nome" => "Lumiere", 
        "descricao" => "Colar Choker em Ouro 15K com pérolas e pingentes de folha", 
        "preco" => "600,00",
        "img" => "../imagens/Colares/colares_dourado/lumière.png"
    ],
    [
        "id" => "colar_dourado_lune", 
        "nome" => "Lune", 
        "descricao" => "Colar Ponto de Luz em Ouro 14K com pedra redonda.", 
        "preco" => "699,00",
        "img" => "../imagens/Colares/colares_dourado/lune.png"
    ],
];
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Éclat Joias - Colares Dourados</title>
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
    </div>
  </header>

    <section id="banner-carousel" class="relative w-full max-w-7xl mx-auto my-8 overflow-hidden rounded-lg shadow-lg"
        style="background-color: var(--color-secondary);" aria-live="polite">
        <div class="relative h-64 md:h-96 overflow-hidden">
            <div id="carousel-wrapper" class="flex transition-transform duration-500 ease-in-out">

                <div class="carousel-item w-full flex-shrink-0 relative" role="group" aria-label="Slide 1 de 3">
                    <img src="../imagens/Colares/étoile royale.png"
                        class="w-full h-full object-cover" alt="Banner de Promoção: 30% OFF Outono" loading="lazy">
                </div>

                <div class="carousel-item w-full flex-shrink-0 relative" role="group" aria-label="Slide 2 de 3">
                    <img src="../imagens/Colares/colares.png"
                        class="w-full h-full object-cover" alt="Banner da Nova Coleção Riviera" loading="lazy">
                </div>

                <div class="carousel-item w-full flex-shrink-0 relative" role="group" aria-label="Slide 3 de 3">
                    <img src="../imagens/Colares/versailles.png"
                        class="w-full h-full object-cover" alt="Banner: Frete Grátis" loading="lazy">
                </div>
            </div>
        </div>

        <div id="indicator-container" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-30">
        </div>
    </section>

    <section class="catalogo">

        <div id="provenca" class="collection-section section-dourado">
            <h2>Coleção Étoile Royale</h2>
            <p>O esplendor do ouro e o brilho eterno dos diamantes. Joias inspiradas na majestade e no luxo da realeza francesa</p>

            <div class="cards-grid" role="list" aria-label="Colares da Coleção Provença">
                
                <?php foreach ($PRODUTOS_DOURADO as $produto): 
                    // 4. Lógica para definir o estado do coração (preenchido ou vazio)
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

                    <img src="<?= htmlspecialchars($produto['img']) ?>" alt="Colar <?= htmlspecialchars($produto['nome']) ?>" loading="lazy">
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