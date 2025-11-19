<?php
// ARQUIVO: index/carrinho.php (Lógica PHP e AJAX)

// 1. INICIA A SESSÃO
session_start();

// 2. Inicializa o array de carrinho na sessão se ele ainda não existir
if (!isset($_SESSION['cart'])) {
    $_SESSION['cart'] = [];
}

// Função auxiliar para verificar se a requisição é AJAX (requerendo o cabeçalho X-Requested-With)
function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // -----------------------------------------------------------
    // A) Lógica de ADIÇÃO (POST de formulário vindo de outra página)
    // -----------------------------------------------------------
    if (isset($_POST['action']) && $_POST['action'] === 'add' && !is_ajax()) {
        
        $id = $_POST['id'] ?? null;
        $nome = $_POST['nome'] ?? 'Produto';
        // CONVERSÃO CRUCIAL: Deve ser um float para cálculo
        $preco = (float)($_POST['preco'] ?? 0.00); 
        $img = $_POST['img'] ?? '';
        $variant = $_POST['variant'] ?? 'Padrão';

        // Garante que temos um ID e um preço válido antes de adicionar
        if ($id && $preco > 0) {
            $newItem = [
                'id' => $id,
                'name' => $nome,
                'price' => $preco,
                'image' => $img,
                'variant' => $variant,
                'qty' => 1
            ];

            $foundIndex = -1;
            // Verifica se o item já existe para apenas incrementar a quantidade
            foreach ($_SESSION['cart'] as $index => $item) {
                if ($item['id'] === $id && $item['variant'] === $variant) {
                    $foundIndex = $index;
                    break;
                }
            }

            if ($foundIndex !== -1) {
                $_SESSION['cart'][$foundIndex]['qty']++;
            } else {
                $_SESSION['cart'][] = $newItem;
            }
        }
        
        // Redireciona para a mesma página (GET) para evitar reenvio do formulário
        header('Location: carrinho.php');
        exit;
    } 

    // -----------------------------------------------------------
    // B) Lógica de ATUALIZAÇÃO/REMOÇÃO (POST AJAX vindo do carrinho.js)
    // -----------------------------------------------------------
    else if (isset($_POST['action']) && is_ajax()) {
        
        header('Content-Type: application/json');
        
        $action = $_POST['action'];
        $index = isset($_POST['index']) ? (int)$_POST['index'] : -1;
        
        $response = ['success' => false, 'message' => 'Ação não processada.'];

        try {
            if (!isset($_SESSION['cart'])) {
                 throw new Exception('Carrinho não inicializado.');
            }
            
            if ($action !== 'clear' && ($index < 0 || $index >= count($_SESSION['cart']))) {
                 throw new Exception('Índice do item inválido.');
            }

            switch ($action) {
                case 'remove':
                    array_splice($_SESSION['cart'], $index, 1);
                    $response['message'] = 'Item removido do carrinho.';
                    break;

                case 'update_qty':
                    $qty = isset($_POST['qty']) ? (int)$_POST['qty'] : 1;
                    if ($qty < 1) {
                        array_splice($_SESSION['cart'], $index, 1);
                        $response['message'] = 'Item removido (quantidade zero).';
                    } else {
                        $_SESSION['cart'][$index]['qty'] = $qty;
                        $response['message'] = 'Quantidade atualizada.';
                    }
                    break;
                    
                case 'clear':
                    $_SESSION['cart'] = [];
                    $response['message'] = 'Carrinho limpo com sucesso.';
                    break;

                default:
                    throw new Exception('Ação AJAX não suportada.');
            }
            
            $response['success'] = true;
            $response['cart'] = $_SESSION['cart'];

        } catch (Exception $e) {
            http_response_code(500);
            $response['message'] = 'Erro: ' . $e->getMessage();
        }

        echo json_encode($response);
        exit;
    }
}
// -----------------------------------------------------------
// Início da Renderização HTML
// -----------------------------------------------------------
?>
<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Carrinho de Joias</title>
   <link rel="stylesheet" href="./../css/carrinho.css">
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

    <main class="container main-grid" role="main">
        <section class="products-area" aria-label="Lista de produtos">
            <h2 class="section-title">Produtos</h2>
            <div id="productList" class="product-list" aria-live="polite">
                 
            </div>
        </section>

        <aside class="cart-area" aria-label="Resumo do carrinho">
            <h2 class="section-title">Seu Carrinho</h2>

            <div id="cartItems" class="cart-items" aria-live="polite">
                <p class="muted">Seu carrinho está vazio.</p>
            </div>

            <div class="coupon-box">
                <label for="couponInput">Cupom de desconto</label>
                <div class="coupon-row">
                    <input id="couponInput" type="text" placeholder="Digite o código" aria-label="Código do cupom" />
                    <button id="applyCouponBtn" class="btn">Aplicar</button>
                </div>
            </div>

            <div class="shipping-box">
                <label for="cepInput">Calcular frete (CEP)</label>
                <div class="coupon-row">
                    <input id="cepInput" type="text" placeholder="Ex: 01001000" aria-label="CEP" />
                    <button id="calcShippingBtn" class="btn">Calcular</button>
                </div>
                <p id="shippingInfo" class="muted small"></p>
            </div>

            <div class="summary-box" aria-label="Resumo do pedido">
                <div class="summary-row"><span>Subtotal</span><span id="subtotal">R$ 0,00</span></div>
                <div class="summary-row"><span>Impostos</span><span id="taxes">R$ 0,00</span></div>
                <div class="summary-row"><span>Frete</span><span id="shipping">R$ 0,00</span></div>
                <div class="summary-row"><span>Desconto</span><span id="discount">- R$ 0,00</span></div>
                <div class="summary-total"><span>Total</span><strong id="total">R$ 0,00</strong></div>
            </div>

            <div class="payment-box">
                <label>Formas de pagamento</label>
                <ul class="payment-list">
                    <li>Cartão de crédito (parcelas até 6x)</li>
                    <li>Pix</li>
                    <li>Boleto</li>
                </ul>
                <button id="checkoutBtn" class="btn checkout">Finalizar Compra</button>
            </div>
        </aside>
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

    <script>
        // CRUCIAL: PHP injeta os dados da sessão no JS
        window.phpCartData = <?php echo json_encode($_SESSION['cart'] ?? []); ?>;
    </script>
    <script src="js/script.js"></script> 
    <script src="../js/carrinho.js"></script>
</body>
</html>