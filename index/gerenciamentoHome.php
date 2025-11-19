<?php
// ARQUIVO: GerenciamentoHome.php
// Painel de controle principal do gerenciamento de estoque.

// ** FUTURA LÓGICA DE AUTENTICAÇÃO **
// session_start();
// if (!isset($_SESSION['usuario_logado'])) { 
//     header('Location: login.php'); 
//     exit; 
// }

// Define o nome do usuário logado (usando um mock temporário)
$usuario_nome = "Luiza";

// Lista das categorias para o menu lateral
$categorias_menu = [
    // Certifique-se de que estes links correspondem aos nomes dos seus arquivos de estoque
    ["nome" => "Colares", "link" => "estoque_colares.php"],
    ["nome" => "Brincos", "link" => "estoque_brincos.php"],
    ["nome" => "Anéis", "link" => "estoque_aneis.php"],
    ["nome" => "Relógios", "link" => "estoque_relogios.php"], // Adicionado
    ["nome" => "Braceletes", "link" => "estoque_braceletes.php"], // Adicionado
    ["nome" => "Pedidos", "link" => "gerenciamentoPedidos.php"], // Adicionado
];
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciamento de Estoque | <?= htmlspecialchars($usuario_nome) ?></title>
    
  <link rel="stylesheet" href="../css/gerenciamento.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>
    
    <div class="sidebar">
        <h2>Gerenciamento</h2>
        <nav>
            <?php foreach ($categorias_menu as $categoria): ?>
                <a href="<?= htmlspecialchars($categoria['link']) ?>">
                    <?= htmlspecialchars($categoria['nome']) ?>
                </a>
            <?php endforeach; ?>
        </nav>
    </div>

    <header class="top-nav">
        <div class="user-profile">
            <span><?= htmlspecialchars($usuario_nome) ?></span>
         <a href="login.html" title="Sair da Conta" class="icone-sair"> 
            <i class="fa-solid fa-right-from-bracket"></i>
        </a>
        </div>
    </header>

    <div class="main-content">
        <div class="estoque-header">
            <h1 style="margin-bottom: 5px; color: #3a1e10;">Bem-vinda, <?= htmlspecialchars($usuario_nome) ?>!</h1>
            
            <p style="color: #3a1e10; font-size: 1.2em; font-weight: bold;">Veja o estoque</p>

            <p style="margin-top: 20px; color: #3a1e10;">
                Utilize o menu lateral para selecionar uma categoria e gerenciar os produtos. 
            </p>
        </div>
        
        </div>

</body>
</html>