<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Perfil do Usuário | Éclat Joias</title>

    <link rel="stylesheet" href="./../css/usuario.css">

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">

    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    
    <style>
        /* Estilos básicos para o botão Sair, caso o arquivo 'usuario.css' não o cubra */
        .logout-btn {
    background-color: #3a1e10; /* Cor escura do seu tema */
    color: white;
    border: none;
    padding: 7px 17px;
    margin-top: 20px;
    width: 70%; /* Ocupa a largura da seção do perfil */
    cursor: pointer;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    transition: background-color 0.3s;
}

        .logout-btn:hover {
            background-color: #54321D; /* Tom mais claro no hover */
        }
        
        /* Ajuste do layout para que o botão fique abaixo da imagem dentro da seção */
        .userProfile .profile {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    </style>
</head>

<body>

    <header class="top-nav">
        <button class="hamburger-menu">☰</button>

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
    <span class="main_bg"></span>

    <div class="container">
        <section class="userProfile card">
            <div class="profile">
                <figure>
                    <img src="../imagens/usuario/usuario.png" alt="Placeholder de Usuário" width="250px" height="250px">
                </figure>
               <a href="login.html" class="logout-btn">Sair da sua Conta</a>
            </div>
        </section>

        <section class="work_skills card">
            <div class="work">
            </div>

            <div class="skills">
                <h1 class="heading">Feedback</h1>

                <div class="feedback-item" id="rating-qualidade">
                    <span>Qualidade</span>
                    <div class="feedback-stars" data-rating="4">
                        <i class="ri-star-fill" data-value="1"></i>
                        <i class="ri-star-fill" data-value="2"></i>
                        <i class="ri-star-fill" data-value="3"></i>
                        <i class="ri-star-fill" data-value="4"></i>
                        <i class="ri-star-fill empty" data-value="5"></i>
                    </div>
                </div>

                <div class="feedback-item" id="rating-entrega">
                    <span>Entrega</span>
                    <div class="feedback-stars" data-rating="5">
                        <i class="ri-star-fill" data-value="1"></i>
                        <i class="ri-star-fill" data-value="2"></i>
                        <i class="ri-star-fill" data-value="3"></i>
                        <i class="ri-star-fill" data-value="4"></i>
                        <i class="ri-star-fill" data-value="5"></i>
                    </div>
                </div>

                <div class="feedback-item" id="rating-seguranca">
                    <span>Segurança</span>
                    <div class="feedback-stars" data-rating="3">
                        <i class="ri-star-fill" data-value="1"></i>
                        <i class="ri-star-fill" data-value="2"></i>
                        <i class="ri-star-fill" data-value="3"></i>
                        <i class="ri-star-fill empty" data-value="4"></i>
                        <i class="ri-star-fill empty" data-value="5"></i>
                    </div>
                </div>
            </div>
        </section>


        <section class="userDetails card">
            <div class="userName">
                <h1 class="name">Luiza Soares</h1>
                <div class="map">
                    <i class="ri-map-pin-fill"></i>
                    <span>São Paulo, Brasil</span>
                </div>
            </div>

            <div class="user-satisfaction-message">
                <p id="userMessage">
                    "A experiência de compra é maravilhosa. Gosto muito da loja e sou cliente fiel há anos. Recomendo sempre!"
                </p>
            </div>
        </section>

        <section class="timeline_about card">
            <div class="tabs">
                <ul>
                    <li class="about active">
                        <i class="ri-user-3-fill ri"></i>
                        <span>Sobre</span>

                        <button class="edit-btn" onclick="openEditModal()">
                            <i class="ri-pencil-fill"></i>
                            <span>Editar</span>
                        </button>
                    </li>
                </ul>
            </div>

            <div class="contact_info">
                <h1 class="heading">Informações de contato</h1>
                <ul>
                    <li class="phone">
                        <h1 class="label">Telefone:</h1>
                        <span class="info" id="infoPhone"> +11 234 567 890</span>
                    </li>
                    <li class="address">
                        <h1 class="label">Endereço:</h1>
                        <span class="info" id="infoAddress">Estrada da Aldeinha 1016 - <br> Carapicuiba, São Paulo</span>
                    </li>
                    <li class="email">
                        <h1 class="label">Email:</h1>
                        <span class="info" id="infoEmail">Luiza@gmail.com</span>
                    </li>
                </ul>
            </div>
        </section>
    </div>
    <div id="editModal" class="modal">
        <div class="modal-content card">
            <div class="modal-header">
                <h2 class="modal-heading">Editar Informações de Contato</h2>
                <span class="close-btn" onclick="closeEditModal()">&times;</span>
            </div>
            <form id="editForm">
                <label for="editMessage">Mensagem de Satisfação:</label>
                <textarea id="editMessage" rows="3"></textarea>
                <label for="editPhone">Telefone:</label>
                <input type="text" id="editPhone" name="phone">
                <label for="editAddress">Endereço:</label>
                <input type="text" id="editAddress" name="address">
                <label for="editEmail">Email:</label>
                <input type="email" id="editEmail" name="email">
                <button type="button" class="save-btn" onclick="saveChanges()">Salvar Alterações</button>
            </form>
        </div>
    </div>
    
    <footer class="footer-minimal">
        <div class="footer-max-width footer-content-wrapper-three-cols"> 
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
            <div class="footer-max-width">
                <p>© 2025 Éclat Joias. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
    <script>
        // --- FUNÇÃO PARA SAIR E REDIRECIONAR (NOVA) ---
        function logoutAndRedirect() {
            // Em um sistema real (PHP/Backend), aqui você faria uma requisição para encerrar a sessão.
            // Exemplo: fetch('logout.php').then(...);

            // Simulação de saída: Redireciona para a página de login
            // Presumindo que a página de login está em 'index.html' ou 'login.html' na pasta raiz ou em ../index/login.php
            window.location.href = '../index/login.php'; 
            
            // Se a sua página de login for o arquivo HTML que construímos, ajuste o caminho
            // Exemplo: window.location.href = 'login.html';
        }
        
        // --- SCRIPTS DE NAVEGAÇÃO/HAMBURGUER ---
        document.addEventListener('DOMContentLoaded', () => {
            const hamburger = document.querySelector('.hamburger-menu');
            const navbar = document.querySelector('.navbar');

            hamburger.addEventListener('click', () => {
                navbar.classList.toggle('open');
            });
        });

        // --- SCRIPTS DE DROPDOWN/SUBMENU ---
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

        // === FUNÇÕES DO MODAL DE EDIÇÃO ===
        const modal = document.getElementById('editModal');

        function openEditModal() {
            // 1. Preenche o formulário com as informações atuais
            document.getElementById('editPhone').value = document.getElementById('infoPhone').textContent.trim();
            document.getElementById('editAddress').value = document.getElementById('infoAddress').textContent.replace('<br>', ' ').trim();
            document.getElementById('editEmail').value = document.getElementById('infoEmail').textContent.trim();
            document.getElementById('editMessage').value = document.getElementById('userMessage').textContent.replace(/"/g, '').trim();

            // 2. Exibe o modal
            modal.style.display = 'flex';
        }

        function closeEditModal() {
            // Esconde o modal
            modal.style.display = 'none';
        }

        function saveChanges() {
            // 1. Captura os novos valores
            const newPhone = document.getElementById('editPhone').value;
            const newAddress = document.getElementById('editAddress').value;
            const newEmail = document.getElementById('editEmail').value;
            const newMessage = document.getElementById('editMessage').value;

            // 2. Atualiza o DOM com os novos valores (Simulação de salvamento)
            document.getElementById('infoPhone').textContent = newPhone;
            const addressElement = document.getElementById('infoAddress');
            // Para manter a quebra de linha no endereço, podemos usar <br> para estilização:
            addressElement.innerHTML = newAddress.replace(/, /g, ' - <br> ');
            document.getElementById('infoEmail').textContent = newEmail;
            document.getElementById('userMessage').textContent = `"${newMessage}"`;

            // 3. Fecha o modal
            closeEditModal();
            alert('Informações atualizadas com sucesso!');
        }


        // === FUNÇÕES DAS ESTRELAS CLICÁVEIS ===
        document.addEventListener('DOMContentLoaded', () => {
            const ratingContainers = document.querySelectorAll('.feedback-stars');

            const updateStars = (container, rating) => {
                const stars = container.querySelectorAll('i');
                stars.forEach(star => {
                    const value = parseInt(star.getAttribute('data-value'));
                    if (value <= rating) {
                        star.classList.remove('empty');
                    } else {
                        star.classList.add('empty');
                    }
                });
                container.setAttribute('data-rating', rating);
            };

            ratingContainers.forEach(container => {
                const initialRating = parseInt(container.getAttribute('data-rating'));
                updateStars(container, initialRating);

                const stars = container.querySelectorAll('i');
                stars.forEach(star => {
                    star.addEventListener('click', () => {
                        const newRating = parseInt(star.getAttribute('data-value'));
                        updateStars(container, newRating);
                        // Aqui você enviaria a nova avaliação
                    });

                    star.addEventListener('mouseover', () => {
                        const hoverRating = parseInt(star.getAttribute('data-value'));
                        const tempStars = container.querySelectorAll('i');
                        tempStars.forEach(s => {
                            const value = parseInt(s.getAttribute('data-value'));
                            if (value <= hoverRating) {
                                s.classList.remove('temp-empty');
                            } else {
                                s.classList.add('temp-empty');
                            }
                        });
                    });

                    star.addEventListener('mouseout', () => {
                        container.querySelectorAll('i').forEach(s => {
                            s.classList.remove('temp-empty');
                        });
                    });
                });
            });
        });
    </script>
</body>

</html>