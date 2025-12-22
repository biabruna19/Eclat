<?php
// ARQUIVO: GerenciamentoPedidos.php
// Gerenciamento e listagem de todos os pedidos feitos no site.

// 1. CONEXÃO COM O BANCO DE DADOS
require_once '../config/conexao.php'; 

$mensagem_status = "";
$classe_status = "";

// 2. LÓGICA DE CARREGAMENTO DE PEDIDOS
try {
    // Consulta otimizada:
    // 1. JOIN com 'usuario' (correto)
    // 2. Formata a data diretamente no SQL
    $sql_select = "
        SELECT 
            p.id, 
            DATE_FORMAT(p.data, '%d/%m/%Y %H:%i') AS data_formatada, -- Formata a data no SQL
            p.status, 
            p.valor_total, 
            u.nome AS nome_cliente 
        FROM 
            pedidos p 
        LEFT JOIN 
            usuario u ON p.usuario = u.id
        ORDER BY p.data DESC
    ";
    
    $stmt_select = $pdo->query($sql_select);
    $pedidos = $stmt_select->fetchAll(PDO::FETCH_ASSOC);

} catch (\PDOException $e) {
    $pedidos = []; 
    $mensagem_status = "ERRO FATAL: Falha ao carregar pedidos. Detalhes: " . $e->getMessage();
    $classe_status = "error";
}

// 3. CONFIGURAÇÃO DO DASHBOARD E MENU
$usuario_nome = "Luiza"; 
$pagina_atual = "Pedidos"; 

$categorias_menu = [
    ["nome" => "Painel", "link" => "GerenciamentoHome.php"], 
    ["nome" => "Pedidos", "link" => "GerenciamentoPedidos.php"], // NOVA ABA!
    ["nome" => "Colares", "link" => "estoque_colares.php"],
    ["nome" => "Brincos", "link" => "estoque_brincos.php"],
    ["nome" => "Anéis", "link" => "estoque_aneis.php"],
    ["nome" => "Relógios", "link" => "estoque_relogios.php"],
    ["nome" => "Braceletes", "link" => "estoque_braceletes.php"],
];

// Função simples para estilizar o status (DEIXADA NO PHP)
function getStatusClass($status) {
    switch (strtolower($status)) {
        case 'pendente': return 'status-pendente';
        case 'enviado': return 'status-enviado';
        case 'entregue': return 'status-entregue';
        case 'cancelado': return 'status-cancelado';
        default: return 'status-desconhecido';
    }
}
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerenciamento de Pedidos | <?= htmlspecialchars($usuario_nome) ?></title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <style>
/* ------------------------------------- */
/* CSS REPLICADO E ADICIONAIS PARA STATUS */
/* ------------------------------------- */

body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f8f8; color: #333; }
.dashboard-container { display: flex; min-height: 100vh; }

/* HEADER */
.top-nav { display: flex; justify-content: flex-end; align-items: center; padding: 15px 30px; background-color: #fdf6ed; border-bottom: 1px solid #eee; box-shadow: 0 1px 5px rgba(0,0,0,0.05); position: fixed; top: 0; left: 250px; right: 0; height: 65px; z-index: 1000; }
.user-profile { display: flex; align-items: center; gap: 10px; font-size: 16px; color: #3a1e10; }
.user-profile i { font-size: 20px; color: #cfa266; }

/* SIDEBAR */
.sidebar { width: 250px; background-color: #54321D; color: white; padding-top: 20px; position: fixed; top: 0; left: 0; bottom: 0; z-index: 1001; box-shadow: 2px 0 10px rgba(0,0,0,0.15); }
.sidebar h2 { text-align: center; margin-bottom: 40px; font-size: 24px; color: #ffffff; font-weight: 300; letter-spacing: 1px; }
.sidebar nav a { display: block; padding: 15px 25px; text-decoration: none; color: #ecf0f1; font-size: 16px; border-left: 5px solid transparent; transition: background-color 0.3s, border-left-color 0.3s, color 0.3s; }
.sidebar nav a:hover { background-color: #3a1e10; border-left-color: #cfa266; color: white; }
.sidebar nav a.active { background-color: #3a1e10; border-left-color: #cfa266; font-weight: bold; color: white; }

/* CONTEÚDO PRINCIPAL */
.main-content { margin-left: 250px; padding: 80px 30px 30px 30px; flex-grow: 1; background-color: #fdf6ed; }
.estoque-header { margin-bottom: 40px; }
.estoque-header h1 { color: #54321D; font-size: 2.2em; margin-bottom: 5px; }
.estoque-header p { color: #cfa266; font-size: 1em; font-weight: normal; }

/* TABELA DE PEDIDOS */
.tabela-estoque { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; }
.tabela-estoque th, .tabela-estoque td { padding: 15px; text-align: left; border-bottom: 1px solid #fdf6ed; }
.tabela-estoque th { background-color: #fff8f1; color: #3a1e10; font-size: 0.9em; font-weight: 600; text-transform: uppercase; }
.tabela-estoque tr:hover { background-color: #fdf6ed; }

/* Estilo para o botão "Ver Detalhes" */
.btn-detalhes {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #cfa266; /* Cor da Marca */
    color: white;
    font-size: 1em;
    transition: background-color 0.2s;
}
.btn-detalhes:hover {
    background-color: #d1ba9cff;
}

/* ESTILOS PARA STATUS (NOVOS) */
.status-badge {
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 0.8em;
    text-transform: uppercase;
    display: inline-block;
}

.status-pendente {
    background-color: #fff3cd;
    color: #856404;
}
.status-enviado {
    background-color: #d1ecf1;
    color: #0c5460;
}
.status-entregue {
    background-color: #d4edda;
    color: #155724;
}
.status-cancelado {
    background-color: #f8d7da;
    color: #721c24;
}

/* MENSAGENS DE FEEDBACK */
.feedback-message { padding: 15px; margin-bottom: 20px; border-radius: 6px; font-weight: bold; display: none; }
.feedback-message.success { background-color: #e6ffe6; color: #27ae60; border: 1px solid #27ae60; display: block; }
.feedback-message.error { background-color: #ffe6e6; color: #c0392b; border: 1px solid #c0392b; display: block; }


    </style>
</head>
<body>
    
    <div class="dashboard-container">
    
        <div class="sidebar">
            <h2>Gerenciamento</h2>
            <nav>
                <?php foreach ($categorias_menu as $categoria): ?>
                    <?php 
                        $classe_ativa = ($categoria['nome'] == $pagina_atual) ? 'active' : '';
                    ?>
                    <a href="<?= htmlspecialchars($categoria['link']) ?>" class="<?= $classe_ativa ?>">
                        <?= htmlspecialchars($categoria['nome']) ?>
                    </a>
                <?php endforeach; ?>
            </nav>
        </div>

        <header class="top-nav">
            <div class="user-profile">
                <span><?= htmlspecialchars($usuario_nome) ?></span>
                <a href="login.html" style="text-decoration: none; color: inherit;">
            <i class="fa-solid fa-right-from-bracket"></i>
        </a>
            </div>
        </header>

        <div class="main-content">
            <div class="estoque-header">
                <h1>Gerenciamento de Pedidos</h1>
                <p style="color: #cfa266;">Acompanhe o status e os detalhes de todas as vendas.</p>
            </div>
            
            <?php if (!empty($mensagem_status)): ?>
                <div class="feedback-message <?= $classe_status ?>">
                    <?= htmlspecialchars($mensagem_status) ?>
                </div>
            <?php endif; ?>

            <div class="estoque-tabela-container">
                <table class="tabela-estoque">
                    <thead>
                        <tr>
                            <th>ID do Pedido</th>
                            <th>Cliente</th>
                            <th>Data</th>
                            <th>Valor Total</th>
                            <th>Status</th>
                            <th class="col-acoes">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if (!empty($pedidos)): ?>
                            <?php foreach ($pedidos as $pedido): ?>
                                <tr>
                                    <td>#<?= htmlspecialchars($pedido['id']) ?></td>
                                    <td><?= htmlspecialchars($pedido['nome_cliente'] ?? 'Cliente Desconhecido') ?></td> 
                                    <td><?= htmlspecialchars($pedido['data_formatada']) ?></td> 
                                    <td>R$ <?= number_format($pedido['valor_total'], 2, ',', '.') ?></td>
                                    <td>
                                        <span class="status-badge <?= getStatusClass($pedido['status']) ?>">
                                            <?= htmlspecialchars($pedido['status']) ?>
                                        </span>
                                    </td>
                                    <td class="col-acoes">
                                        <button class="btn-detalhes" data-id="<?= $pedido['id'] ?>"><i class="fas fa-eye"></i> Detalhes</button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="6" style="text-align: center;">Nenhum pedido encontrado.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div> 
    
    <script>
        // Lógica futura de modal/redirecionamento para ver detalhes do pedido
        document.querySelectorAll('.btn-detalhes').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                // Redirecionamento correto para a página de detalhes:
                window.location.href = `detalhes_pedido.php?id=${id}`; 
            });
        });
    </script>
</body>
</html>