<?php
// ARQUIVO: estoque_colares.php
// Gerenciamento de estoque para a categoria Colares, com lógica de inserção, exibição, EDIÇÃO e EXCLUSÃO.

// 1. CONEXÃO COM O BANCO DE DADOS
// Assumindo que 'conexao.php' está em '../config/'
require_once '../config/conexao.php'; // Usa o arquivo de conexão fornecido

// Variáveis de status iniciais
$mensagem_status = "";
$classe_status = "";

// 2. LÓGICA DE PROCESSAMENTO (INSERÇÃO, EDIÇÃO E EXCLUSÃO)
// Verifica se o formulário foi submetido via POST (para todas as ações)
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Identifica qual ação foi solicitada pelo campo 'action' (campo oculto ou nome do botão)
    $action = $_POST['action'] ?? 'insert'; // Assume 'insert' como padrão

    try {
        switch ($action) {
            case 'insert':
                // --- Lógica de INSERÇÃO (MANTIDA) ---
                $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
                $descricao = filter_input(INPUT_POST, 'descricao', FILTER_SANITIZE_STRING);
                $caminho_imagem = filter_input(INPUT_POST, 'caminho_imagem', FILTER_SANITIZE_URL);
                $preco = filter_input(INPUT_POST, 'preco', FILTER_VALIDATE_FLOAT);
                $quantidade_estoque = filter_input(INPUT_POST, 'quantidade_estoque', FILTER_VALIDATE_INT);
                
                if (!$nome || !$descricao || $preco === false || $quantidade_estoque === false) {
                    $mensagem_status = "Erro: Dados incompletos ou inválidos para inserção. Preencha todos os campos.";
                    $classe_status = "error";
                } else {
                    $sql = "INSERT INTO colares (nome, descricao, preco, caminho_imagem, quantidade_estoque) 
                            VALUES (:nome, :descricao, :preco, :caminho_imagem, :quantidade_estoque)";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':nome', $nome);
                    $stmt->bindParam(':descricao', $descricao);
                    $stmt->bindParam(':preco', $preco);
                    $stmt->bindParam(':caminho_imagem', $caminho_imagem);
                    $stmt->bindParam(':quantidade_estoque', $quantidade_estoque);
                    $stmt->execute();
                    $mensagem_status = "Sucesso! Colar '{$nome}' adicionado ao estoque.";
                    $classe_status = "success";
                }
                break;

            case 'update':
                // --- Lógica de EDIÇÃO (UPDATE) ---
                $id = filter_input(INPUT_POST, 'edit_id', FILTER_VALIDATE_INT);
                $nome = filter_input(INPUT_POST, 'edit_nome', FILTER_SANITIZE_STRING);
                $descricao = filter_input(INPUT_POST, 'edit_descricao', FILTER_SANITIZE_STRING);
                $caminho_imagem = filter_input(INPUT_POST, 'edit_caminho_imagem', FILTER_SANITIZE_URL);
                $preco = filter_input(INPUT_POST, 'edit_preco', FILTER_VALIDATE_FLOAT);
                $quantidade_estoque = filter_input(INPUT_POST, 'edit_quantidade_estoque', FILTER_VALIDATE_INT);

                if ($id === false || !$nome || !$descricao || $preco === false || $quantidade_estoque === false) {
                    $mensagem_status = "Erro: Dados incompletos ou inválidos para edição.";
                    $classe_status = "error";
                } else {
                    $sql = "UPDATE colares SET 
                            nome = :nome, 
                            descricao = :descricao, 
                            preco = :preco, 
                            caminho_imagem = :caminho_imagem, 
                            quantidade_estoque = :quantidade_estoque 
                            WHERE id = :id";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':nome', $nome);
                    $stmt->bindParam(':descricao', $descricao);
                    $stmt->bindParam(':preco', $preco);
                    $stmt->bindParam(':caminho_imagem', $caminho_imagem);
                    $stmt->bindParam(':quantidade_estoque', $quantidade_estoque);
                    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                    $stmt->execute();
                    $mensagem_status = "Sucesso! Colar '{$nome}' (ID: {$id}) atualizado.";
                    $classe_status = "success";
                }
                break;
            
            case 'delete':
                // --- Lógica de EXCLUSÃO (DELETE) ---
                $id = filter_input(INPUT_POST, 'delete_id', FILTER_VALIDATE_INT);

                if ($id === false) {
                    $mensagem_status = "Erro: ID do produto para exclusão inválido.";
                    $classe_status = "error";
                } else {
                    $sql = "DELETE FROM colares WHERE id = :id";
                    $stmt = $pdo->prepare($sql);
                    $stmt->bindParam(':id', $id, PDO::PARAM_INT);
                    $stmt->execute();
                    
                    // Verifica se alguma linha foi afetada para dar o feedback correto
                    if ($stmt->rowCount() > 0) {
                        $mensagem_status = "Sucesso! Produto (ID: {$id}) excluído do estoque.";
                        $classe_status = "success";
                    } else {
                        $mensagem_status = "Atenção: Nenhum produto encontrado com ID: {$id} para exclusão.";
                        $classe_status = "error";
                    }
                }
                break;

            default:
                $mensagem_status = "Ação desconhecida.";
                $classe_status = "error";
                break;
        }

    } catch (\PDOException $e) {
        // Erro genérico do banco de dados (ex: tabela não existe, erro de sintaxe)
        $mensagem_status = "Erro no banco de dados: " . $e->getMessage();
        $classe_status = "error";
        // Em ambiente de desenvolvimento, você pode usar: error_log($e->getMessage());
    }

    // Redireciona para evitar reenvio do formulário (Post/Redirect/Get)
    // O status e a mensagem serão exibidos após o redirecionamento.
    if ($classe_status == "success") {
        header("Location: estoque_colares.php?status=success&msg=" . urlencode($mensagem_status));
        exit();
    } elseif ($classe_status == "error") {
         // Não redireciona se houve erro, assim a mensagem de erro detalhada fica visível
    }
}

// 3. TRATAMENTO DE MENSAGEM APÓS REDIRECIONAMENTO (DEPOIS DE INSERIR/EDITAR/EXCLUIR)
if (isset($_GET['status']) && isset($_GET['msg'])) {
    $classe_status = $_GET['status'] == 'success' ? 'success' : 'error';
    $mensagem_status = htmlspecialchars($_GET['msg']);
}


// 4. LÓGICA DE CARREGAMENTO DE PRODUTOS
// Prepara e executa a query para buscar todos os colares
$sql_select = "SELECT id, nome, descricao, preco, caminho_imagem, quantidade_estoque FROM colares ORDER BY nome ASC";
$stmt_select = $pdo->query($sql_select);
$colares = $stmt_select->fetchAll(PDO::FETCH_ASSOC);

// 5. CONFIGURAÇÃO DO DASHBOARD E MENU
$usuario_nome = "Luiza"; 
$pagina_atual = "Colares"; 

$categorias_menu = [
    ["nome" => "Painel", "link" => "GerenciamentoHome.php"], 
    ["nome" => "Colares", "link" => "estoque_colares.php"],
    ["nome" => "Brincos", "link" => "estoque_brincos.php"],
    ["nome" => "Anéis", "link" => "estoque_aneis.php"],
    ["nome" => "Relógios", "link" => "estoque_relogios.php"],
    ["nome" => "Braceletes", "link" => "estoque_braceletes.php"],
];
?>

<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estoque - Colares | <?= htmlspecialchars($usuario_nome) ?></title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <style>
/* ------------------------------------- */
/* RESET E TIPOGRAFIA GERAL */
/* ------------------------------------- */
body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #fdf6ed; 
    color: #54321D;
}

.dashboard-container {
    display: flex;
    min-height: 100vh;
}

/* ------------------------------------- */
/* HEADER: TOPO (FIXO) */
/* ------------------------------------- */

.top-nav {
    display: flex;
    justify-content: flex-end; 
    align-items: center;
    padding: 15px 30px;
    background-color: #fdf6ed; 
    border-bottom: 1px solid #fdf6ed;
    box-shadow: 0 1px 5px rgba(0,0,0,0.05);
    position: fixed;
    top: 0;
    left: 250px;
    right: 0;
    height: 65px;
    z-index: 1000;
}

.user-profile {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 16px;
    color: #200e01;
}

.user-profile i {
    font-size: 20px;
    color: #cfa266;
}

/* ------------------------------------- */
/* SIDEBAR: MENU LATERAL (FIXO) */
/* ------------------------------------- */

.sidebar {
    width: 250px;
    background-color: #54321D; /* Roxo Escuro */
    color: white;
    padding-top: 20px;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1001; 
    box-shadow: 2px 0 10px rgba(0,0,0,0.15);
}

.sidebar h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 24px;
    color: #fdf6ed; 
    font-weight: 300;
    letter-spacing: 1px;
}

.sidebar nav a {
    display: block;
    padding: 15px 25px;
    text-decoration: none;
    color: #fdf6ed;
    font-size: 16px;
    border-left: 5px solid transparent;
    transition: background-color 0.3s, border-left-color 0.3s, color 0.3s;
}

.sidebar nav a:hover {
    background-color: #3a1e10; /* Magenta Claro */
    border-left-color: #cfa266; /* Amarelo Vibrante */
    color: white;
}

.sidebar nav a.active {
    background-color: #3a1e10; /* Magenta Claro */
    border-left-color: #cfa266; /* Amarelo Vibrante */
    font-weight: bold;
    color: white;
}

/* ------------------------------------- */
/* CONTEÚDO PRINCIPAL */
/* ------------------------------------- */

.main-content {
    margin-left: 250px;
    padding: 80px 30px 30px 30px;
    flex-grow: 1;
    background-color: #fdf6ed;
}

.estoque-header {
    margin-bottom: 40px;
}

.estoque-header h1 {
    color: #54321D;
    font-size: 2.2em;
    margin-bottom: 5px;
}

.estoque-header p {
    color: #7f8c8d;
    font-size: 1em;
    font-weight: normal;
}

/* ------------------------------------- */
/* ESTILO GERAL DE TABELA */
/* ------------------------------------- */

.tabela-estoque {
    width: 100%;
    border-collapse: collapse; 
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
    border-radius: 8px;
    overflow: hidden; 
}

.tabela-estoque th, 
.tabela-estoque td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #fdf6ed;
}

.tabela-estoque th {
    background-color: #fff8f1; 
    color: #3a1e10;
    font-size: 0.9em;
    font-weight: 600;
    text-transform: uppercase;
}

.tabela-estoque tr:hover {
    background-color: #fdf6ed; 
}

.tabela-estoque .col-acoes {
    width: 120px; 
    text-align: center;
}

/* ------------------------------------- */
/* BOTÕES DE AÇÕES NA TABELA (EDITAR/EXCLUIR) */
/* ------------------------------------- */
.btn-editar, .btn-excluir-tabela {
    padding: 8px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9em;
    margin: 0 3px;
    transition: background-color 0.2s;
}

.btn-editar {
    background-color: #cfa266; /* Azul */
    color: white;
}
.btn-editar:hover {
    background-color: #ceb18bff;
}

.btn-excluir-tabela {
    background-color: #3a1e10; /* Vermelho */
    color: white;
}
.btn-excluir-tabela:hover {
    background-color: #552d1aff;;
}

/* ------------------------------------- */
/* CONTROLES E BOTÕES GERAIS */
/* ------------------------------------- */

.btn-novo-produto,
.btn-cancelar,
.btn-adicionar,
.btn-salvar-edicao { /* Adicionado para o modal de edição */
    padding: 10px 18px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s, opacity 0.2s;
}

.btn-novo-produto {
    background-color: #cfa266; /* Rosa Claro */
    color: white;
    padding: 12px 25px;
    margin-bottom: 30px;
    display: inline-block; 
    font-size: 1.1em;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.btn-novo-produto:hover {
    background-color: #d1b794ff;
}

.btn-cancelar {
    background-color: #3a1e10;
    color: white;
}
.btn-cancelar:hover {
    background-color: #382b24ff;
}

.btn-adicionar {
    background-color: #3a1e10; /* Roxo Escuro */
    color: white;
    font-size: 12px;
}
.btn-adicionar:hover {
    background-color: #382b24ff;
}

.btn-salvar-edicao { /* Estilo do botão Salvar Edição */
    background-color: #3a1e10; /* Verde */
    color: white;
    font-size: 12px;
}
.btn-salvar-edicao:hover {
    background-color: #382b24ff;
}

/* ------------------------------------- */
/* MODAL */
/* ------------------------------------- */

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6); 
    backdrop-filter: blur(8px); 
    display: none; 
    justify-content: center;
    align-items: center;
    z-index: 10000; 
}

.modal-content {
    background-color:#fdf6ed;
    padding: 40px;
    border-radius: 12px;
    width: 90%;
    max-width: 400px; 
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
}

.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #200e01; }
.form-group input, .form-group textarea {
    width: 100%; padding: 12px; border: 1px solid #cfa266; border-radius: 6px; box-sizing: border-box; font-size: 1em;
}
.modal-actions {
    display: flex; justify-content: flex-end; gap: 10px; margin-top: 3px; 
}

/* ------------------------------------- */
/* MENSAGENS DE FEEDBACK */
/* ------------------------------------- */

.feedback-message {
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 6px;
    font-weight: bold;
    /* display: none; */ /* Removido para que o PHP possa controlar a exibição */
}
.feedback-message.success {
    background-color: #e6ffe6;
    color: #27ae60;
    border: 1px solid #27ae60;
    /* display: block; */
}
.feedback-message.error {
    background-color: #ffe6e6;
    color: #c0392b;
    border: 1px solid #c0392b;
    /* display: block; */
}

/* ------------------------------------- */
/* RESPONSIVIDADE */
/* ------------------------------------- */
@media (max-width: 900px) {
    .sidebar { transform: translateX(-100%); transition: transform 0.3s ease-in-out; box-shadow: 5px 0 10px rgba(0,0,0,0.3); }
    .sidebar.open { transform: translateX(0); }
    .main-content { margin-left: 0; padding-top: 80px; }
    .top-nav { left: 0; justify-content: space-between; }
    .dashboard-container { display: block; }
}

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
                <i class="fas fa-user"></i>
            </div>
        </header>

        <div class="main-content">
            <div class="estoque-header">
                <h1>Estoque de Colares</h1>
                <p style="color: #cfa266;">Veja o estoque atual e faça ajustes.</p>
            </div>
            
            <?php if (!empty($mensagem_status)): ?>
                <div class="feedback-message <?= $classe_status ?>" style="display: block;">
                    <?= htmlspecialchars($mensagem_status) ?>
                </div>
            <?php endif; ?>

            <button class="btn-novo-produto" id="btn-abrir-modal">Adicionar Novo Produto</button>

            <div class="estoque-tabela-container">
                <table class="tabela-estoque">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Descrição</th>
                            <th>Preço</th>
                            <th>Estoque</th>
                            <th class="col-acoes">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php if ($colares): ?>
                            <?php foreach ($colares as $colar): ?>
                                <tr data-id="<?= htmlspecialchars($colar['id']) ?>"
                                    data-nome="<?= htmlspecialchars($colar['nome']) ?>"
                                    data-descricao="<?= htmlspecialchars($colar['descricao']) ?>"
                                    data-preco="<?= htmlspecialchars($colar['preco']) ?>"
                                    data-img="<?= htmlspecialchars($colar['caminho_imagem']) ?>"
                                    data-estoque="<?= htmlspecialchars($colar['quantidade_estoque']) ?>">
                                    
                                    <td><?= htmlspecialchars($colar['id']) ?></td>
                                    <td><?= htmlspecialchars($colar['nome']) ?></td>
                                    <td><?= htmlspecialchars($colar['descricao']) ?></td>
                                    <td>R$ <?= number_format($colar['preco'], 2, ',', '.') ?></td>
                                    <td><?= htmlspecialchars($colar['quantidade_estoque']) ?></td>
                                    <td class="col-acoes">
                                        <button class="btn-editar js-editar" data-id="<?= $colar['id'] ?>"><i class="fas fa-edit"></i></button>
                                        <button class="btn-excluir-tabela js-excluir" data-id="<?= $colar['id'] ?>"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="6" style="text-align: center;">Nenhum colar encontrado no estoque.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
    </div> 
    
    <div class="modal-overlay" id="modal-novo-produto">
        <div class="modal-content">
            <h2>Adicionar Novo Colar</h2>
            <form id="form-novo-produto" action="estoque_colares.php" method="POST">
                <input type="hidden" name="action" value="insert"> <div class="form-group">
                    <label for="produto-nome">Nome do Produto:</label>
                    <input type="text" id="produto-nome" name="nome" required placeholder="ex: Colar Toulon">
                </div>
                <div class="form-group">
                    <label for="produto-descricao">Descrição:</label>
                    <textarea id="produto-descricao" name="descricao" required placeholder="ex: Ouro 18k com rubis refinados"></textarea>
                </div>
                <div class="form-group">
                    <label for="produto-preco">Preço (Ex: 1599.99):</label>
                    <input type="number" id="produto-preco" name="preco" step="0.01" required placeholder="ex: 2199.00">
                </div>
                <div class="form-group">
                    <label for="produto-img">Caminho da Imagem:</label>
                    <input type="text" id="produto-img" name="caminho_imagem" required placeholder="ex: ../imagens/Colares/Colar Toulon.jpg">
                </div>
                <div class="form-group">
                    <label for="produto-estoque">Estoque Inicial:</label>
                    <input type="number" id="produto-estoque" name="quantidade_estoque" required value="1" min="1">
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn-cancelar" id="btn-fechar-modal">Cancelar</button>
                    <button type="submit" class="btn-adicionar">Adicionar ao Estoque</button>
                </div>
            </form>
        </div>
    </div>

    <div class="modal-overlay" id="modal-editar-produto">
        <div class="modal-content">
            <h2>Editar Colar: <span id="edit-nome-titulo"></span></h2>
            <form id="form-editar-produto" action="estoque_colares.php" method="POST">
                <input type="hidden" name="action" value="update"> 
                <input type="hidden" name="edit_id" id="edit-id"> 
                
                <div class="form-group">
                    <label for="edit-produto-nome">Nome do Produto:</label>
                    <input type="text" id="edit-produto-nome" name="edit_nome" required>
                </div>
                <div class="form-group">
                    <label for="edit-produto-descricao">Descrição:</label>
                    <textarea id="edit-produto-descricao" name="edit_descricao" required></textarea>
                </div>
                <div class="form-group">
                    <label for="edit-produto-preco">Preço (Ex: 1599.99):</label>
                    <input type="number" id="edit-produto-preco" name="edit_preco" step="0.01" required>
                </div>
                <div class="form-group">
                    <label for="edit-produto-img">Caminho da Imagem:</label>
                    <input type="text" id="edit-produto-img" name="edit_caminho_imagem" required>
                </div>
                <div class="form-group">
                    <label for="edit-produto-estoque">Estoque Atual:</label>
                    <input type="number" id="edit-produto-estoque" name="edit_quantidade_estoque" required min="0">
                </div>
                
                <div class="modal-actions">
                    <button type="button" class="btn-cancelar" id="btn-fechar-modal-edicao">Cancelar</button>
                    <button type="submit" class="btn-salvar-edicao">Salvar Edição</button>
                </div>
            </form>
        </div>
    </div>
    
    <form id="form-excluir-produto" action="estoque_colares.php" method="POST" style="display: none;">
        <input type="hidden" name="action" value="delete">
        <input type="hidden" name="delete_id" id="delete-id">
    </form>


    <script>
        // Lógica para abrir e fechar o modal de NOVO PRODUTO (MANTIDA)
        document.getElementById('btn-abrir-modal').addEventListener('click', () => {
            document.getElementById('modal-novo-produto').style.display = 'flex';
        });
        document.getElementById('btn-fechar-modal').addEventListener('click', () => {
            document.getElementById('modal-novo-produto').style.display = 'none';
        });

        // Fechar o modal de NOVO PRODUTO clicando fora (MANTIDA)
        document.getElementById('modal-novo-produto').addEventListener('click', (e) => {
            if (e.target.id === 'modal-novo-produto') {
                e.target.style.display = 'none';
            }
        });


        // ----------------------------------------------------
        // LÓGICA DO MODAL DE EDIÇÃO E BOTÕES DE AÇÃO
        // ----------------------------------------------------

        const modalEdicao = document.getElementById('modal-editar-produto');
        const btnFecharEdicao = document.getElementById('btn-fechar-modal-edicao');
        const formEdicao = document.getElementById('form-editar-produto');
        const formExclusao = document.getElementById('form-excluir-produto');
        const inputDeleteId = document.getElementById('delete-id');
        
        // 1. ABRIR MODAL DE EDIÇÃO
        document.querySelectorAll('.js-editar').forEach(button => {
            button.addEventListener('click', (e) => {
                // Pega a linha (TR) pai do botão para extrair os dados
                const row = e.target.closest('tr');
                if (!row) return;

                // Extrai os dados do produto usando os data-attributes da TR
                const id = row.dataset.id;
                const nome = row.dataset.nome;
                const descricao = row.dataset.descricao;
                const preco = row.dataset.preco;
                const img = row.dataset.img;
                const estoque = row.dataset.estoque;

                // Preenche o modal de edição
                document.getElementById('edit-nome-titulo').textContent = nome;
                document.getElementById('edit-id').value = id;
                document.getElementById('edit-produto-nome').value = nome;
                document.getElementById('edit-produto-descricao').value = descricao;
                document.getElementById('edit-produto-preco').value = parseFloat(preco).toFixed(2);
                document.getElementById('edit-produto-img').value = img;
                document.getElementById('edit-produto-estoque').value = estoque;

                // Abre o modal
                modalEdicao.style.display = 'flex';
            });
        });
        
        // 2. FECHAR MODAL DE EDIÇÃO
        btnFecharEdicao.addEventListener('click', () => {
            modalEdicao.style.display = 'none';
        });

        // Fechar o modal de EDIÇÃO clicando fora
        modalEdicao.addEventListener('click', (e) => {
            if (e.target.id === 'modal-editar-produto') {
                e.target.style.display = 'none';
            }
        });


        // 3. EXCLUIR PRODUTO
        document.querySelectorAll('.js-excluir').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.dataset.id || e.target.closest('button').dataset.id;
                const row = e.target.closest('tr');
                const nomeProduto = row ? row.dataset.nome : `ID ${id}`;

                // Confirmação via JavaScript
                if (confirm(`Tem certeza que deseja EXCLUIR o produto "${nomeProduto}" (ID: ${id})? Essa ação é irreversível!`)) {
                    // Preenche o formulário oculto e o submete
                    inputDeleteId.value = id;
                    formExclusao.submit();
                }
            });
        });
    </script>
</body>
</html>