<?php
// ARQUIVO: estoque_brincos.php
// Gerenciamento de estoque para a categoria Brincos, com lógica de inserção, exibição, exclusão e edição.

// 1. CONEXÃO COM O BANCO DE DADOS
require_once '../config/conexao.php'; 

// Variáveis de status iniciais
$mensagem_status = "";
$classe_status = "";

// 2. LÓGICA DE PROCESSAMENTO (INSERÇÃO, EXCLUSÃO, EDIÇÃO)

// --- AÇÃO DE EXCLUSÃO (via GET) ---
if (isset($_GET['acao']) && $_GET['acao'] == 'excluir' && isset($_GET['id'])) {
    $id_para_excluir = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    
    if ($id_para_excluir) {
        try {
            // -- ATENÇÃO: Tabela 'brincos' --
            $sql_excluir = "DELETE FROM brincos WHERE id = :id";
            $stmt_excluir = $pdo->prepare($sql_excluir);
            $stmt_excluir->bindParam(':id', $id_para_excluir, PDO::PARAM_INT);
            $stmt_excluir->execute();
            
            if ($stmt_excluir->rowCount() > 0) {
                $mensagem_status = "Sucesso! Brinco (ID: {$id_para_excluir}) excluído do estoque.";
                $classe_status = "success";
            } else {
                $mensagem_status = "Erro: Nenhum brinco encontrado com o ID {$id_para_excluir} para exclusão.";
                $classe_status = "error";
            }
        } catch (\PDOException $e) {
            $mensagem_status = "Erro no banco de dados ao excluir: Tabela 'brincos' não existe. ";
            $classe_status = "error";
        }
        // Redireciona para limpar o parâmetro GET e evitar re-exclusão
        header("Location: estoque_brincos.php?status={$classe_status}&msg=" . urlencode($mensagem_status));
        exit();
    }
}

// Lógica para pegar mensagens de status do redirecionamento
if (isset($_GET['status']) && isset($_GET['msg'])) {
    $classe_status = filter_input(INPUT_GET, 'status', FILTER_SANITIZE_STRING);
    $mensagem_status = filter_input(INPUT_GET, 'msg', FILTER_SANITIZE_STRING);
}

// Verifica se o formulário de Adicionar ou Editar foi submetido via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Coletar e validar os dados do formulário
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_STRING);
    $descricao = filter_input(INPUT_POST, 'descricao', FILTER_SANITIZE_STRING);
    $caminho_imagem = filter_input(INPUT_POST, 'caminho_imagem', FILTER_SANITIZE_URL);
    $preco = filter_input(INPUT_POST, 'preco', FILTER_VALIDATE_FLOAT);
    $quantidade_estoque = filter_input(INPUT_POST, 'quantidade_estoque', FILTER_VALIDATE_INT);
    $acao = filter_input(INPUT_POST, 'acao', FILTER_SANITIZE_STRING);
    
    // Validação básica
    if (!$nome || !$descricao || $preco === false || $quantidade_estoque === false) {
        $mensagem_status = "Erro: Dados incompletos ou inválidos. Preencha todos os campos.";
        $classe_status = "error";
    } else {
        try {
            // --- AÇÃO DE EDIÇÃO (via POST) ---
            if ($acao == 'editar') {
                $id_produto = filter_input(INPUT_POST, 'id_produto', FILTER_VALIDATE_INT);

                if (!$id_produto) {
                    throw new \Exception("ID do produto para edição inválido.");
                }

                // -- ATENÇÃO: Tabela 'brincos' --
                $sql = "UPDATE brincos SET 
                        nome = :nome, 
                        descricao = :descricao, 
                        preco = :preco, 
                        caminho_imagem = :caminho_imagem, 
                        quantidade_estoque = :quantidade_estoque 
                        WHERE id = :id_produto";
                
                $stmt = $pdo->prepare($sql);
                $stmt->bindParam(':id_produto', $id_produto, PDO::PARAM_INT);
                $operacao = "editado";
                $nome_produto_op = $nome;

            // --- AÇÃO DE INSERÇÃO (via POST) ---
            } else { // Assume que é 'adicionar' se não for 'editar'
                // -- ATENÇÃO: Tabela 'brincos' --
                $sql = "INSERT INTO brincos (nome, descricao, preco, caminho_imagem, quantidade_estoque) 
                        VALUES (:nome, :descricao, :preco, :caminho_imagem, :quantidade_estoque)";
                
                $stmt = $pdo->prepare($sql);
                $operacao = "adicionado";
                $nome_produto_op = $nome;
            }
            
            // Vincula os valores comuns (Proteção contra SQL Injection)
            $stmt->bindParam(':nome', $nome);
            $stmt->bindParam(':descricao', $descricao);
            $stmt->bindParam(':preco', $preco);
            $stmt->bindParam(':caminho_imagem', $caminho_imagem);
            $stmt->bindParam(':quantidade_estoque', $quantidade_estoque);
            
            // Executa o comando
            $stmt->execute();
            
            $mensagem_status = "Sucesso! Brinco '{$nome_produto_op}' {$operacao} ao estoque.";
            $classe_status = "success";

            // Redireciona para recarregar a lista
            header("Location: estoque_brincos.php?status={$classe_status}&msg=" . urlencode($mensagem_status));
            exit();

        } catch (\PDOException $e) {
            $mensagem_status = "Erro no banco de dados: Tabela 'brincos' não existe ou erro SQL: " . $e->getMessage();
            $classe_status = "error";
        } catch (\Exception $e) {
            $mensagem_status = "Erro: " . $e->getMessage();
            $classe_status = "error";
        }
    }
}

// 3. LÓGICA DE CARREGAMENTO DE PRODUTOS
try {
    // -- ATENÇÃO: Tabela 'brincos' --
    $sql_select = "SELECT id, nome, descricao, preco, caminho_imagem, quantidade_estoque FROM brincos ORDER BY nome ASC";
    $stmt_select = $pdo->query($sql_select);
    $brincos = $stmt_select->fetchAll(PDO::FETCH_ASSOC);

    // Converte o array de brincos para JSON para uso no JavaScript
    $brincos_json = json_encode($brincos);
    
} catch (\PDOException $e) {
    // Caso a tabela não exista, inicializa o array como vazio 
    $brincos = []; 
    $brincos_json = "[]";
    // E define uma mensagem de erro se ainda não houver uma
    if (empty($mensagem_status)) {
        $mensagem_status = "ERRO FATAL: Tabela 'brincos' não foi encontrada. Por favor, crie a tabela no seu banco de dados.";
        $classe_status = "error";
    }
}


// 4. CONFIGURAÇÃO DO DASHBOARD E MENU
$usuario_nome = "Luiza"; 
// -- ATENÇÃO: Página atual 'Brincos' --
$pagina_atual = "Brincos"; 

$categorias_menu = [
    ["nome" => "Painel", "link" => "GerenciamentoHome.php"], 
    ["nome" => "Colares", "link" => "estoque_colares.php"],
    ["nome" => "Brincos", "link" => "estoque_brincos.php"], // Link correto
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
    <title>Estoque - Brincos | <?= htmlspecialchars($usuario_nome) ?></title>
    
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    
    <style>
/* ------------------------------------- */
/* CSS REPLICADO DO ESTOQUE GERAL */
/* ------------------------------------- */
body { margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #fdf6ed; color: #333; }
.dashboard-container { display: flex; min-height: 100vh; }
.top-nav { display: flex; justify-content: flex-end; align-items: center; padding: 15px 30px; background-color: #fdf6ed; border-bottom: 1px solid #fdf6ed; box-shadow: 0 1px 5px rgba(0,0,0,0.05); position: fixed; top: 0; left: 250px; right: 0; height: 65px; z-index: 1000; }
.user-profile { display: flex; align-items: center; gap: 10px; font-size: 16px; color: #3a1e10; }
.user-profile i { font-size: 20px; color: #cfa266; }
.sidebar { width: 250px; background-color: #54321D; color: white; padding-top: 20px; position: fixed; top: 0; left: 0; bottom: 0; z-index: 1001; box-shadow: 2px 0 10px rgba(0,0,0,0.15); }
.sidebar h2 { text-align: center; margin-bottom: 40px; font-size: 24px; color: #ffffff; font-weight: 300; letter-spacing: 1px; }
.sidebar nav a { display: block; padding: 15px 25px; text-decoration: none; color: #ecf0f1; font-size: 16px; border-left: 5px solid transparent; transition: background-color 0.3s, border-left-color 0.3s, color 0.3s; }
.sidebar nav a:hover { background-color: #3a1e10; border-left-color: #cfa266; color: white; }
.sidebar nav a.active { background-color: #3a1e10; border-left-color: #cfa266; font-weight: bold; color: white; }
.main-content { margin-left: 250px; padding: 80px 30px 30px 30px; flex-grow: 1; background-color: #fdf6ed; }
.estoque-header { margin-bottom: 40px; }
.estoque-header h1 { color: #54321D; font-size: 2.2em; margin-bottom: 5px; }
.estoque-header p { color: #cfa266; font-size: 1em; font-weight: normal; }
.tabela-estoque { width: 100%; border-collapse: collapse; margin-top: 20px; background-color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.05); border-radius: 8px; overflow: hidden; }
.tabela-estoque th, .tabela-estoque td { padding: 15px; text-align: left; border-bottom: 1px solid #fdf6ed; }
.tabela-estoque th { background-color: #fff8f1; color: #3a1e10; font-size: 0.9em; font-weight: 600; text-transform: uppercase; }
.tabela-estoque tr:hover { background-color: #fdf6ed; }
.tabela-estoque .col-acoes { width: 120px; text-align: center; }
.btn-editar, .btn-excluir-tabela { padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; font-size: 1em; margin: 0 3px; transition: background-color 0.2s; line-height: 1; }
.btn-editar { background-color: #cfa266; color: white; }
.btn-editar:hover { background-color: #d6ba94ff; }
.btn-excluir-tabela { background-color: #3a1e10; color: white; }
.btn-excluir-tabela:hover { background-color: #3a271dff; }
.btn-novo-produto, .btn-cancelar, .btn-adicionar, .btn-salvar-edicao { padding: 10px 18px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600; transition: background-color 0.2s, opacity 0.2s; }
.btn-novo-produto { background-color: #cfa266; color: white; padding: 12px 25px; margin-bottom: 30px; display: inline-block; font-size: 1.1em; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
.btn-novo-produto:hover { background-color: #d6ba96ff; }
.btn-cancelar { background-color: #3a1e10; color: white; }
.btn-cancelar:hover { background-color: #33221aff; }
.btn-adicionar { background-color: #3a1e10; color: white; font-size: 12px; }
.btn-adicionar:hover { background-color: #3a251bff; }
.btn-salvar-edicao { background-color: #3a1e10; color: white; font-size: 12px; }
.btn-salvar-edicao:hover { background-color: #3a251bff; }
.modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.6); backdrop-filter: blur(8px); display: none; justify-content: center; align-items: center; z-index: 10000; }
.modal-content { background-color: #fdf6ed; padding: 40px; border-radius: 12px; width: 90%; max-width: 400px; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5); animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
.form-group { margin-bottom: 20px; }
.form-group label { display: block; font-weight: 600; margin-bottom: 8px; color: #200e01; }
.form-group input, .form-group textarea { width: 100%; padding: 12px; border: 1px solid #cfa266; border-radius: 6px; box-sizing: border-box; font-size: 1em; }
.modal-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 3px; }
.feedback-message { padding: 15px; margin-bottom: 20px; border-radius: 6px; font-weight: bold; display: none; }
.feedback-message.success { background-color: #e6ffe6; color: #27ae60; border: 1px solid #27ae60; display: block; }
.feedback-message.error { background-color: #ffe6e6; color: #c0392b; border: 1px solid #c0392b; display: block; }
@media (max-width: 900px) { .sidebar { transform: translateX(-100%); transition: transform 0.3s ease-in-out; box-shadow: 5px 0 10px rgba(0,0,0,0.3); } .sidebar.open { transform: translateX(0); } .main-content { margin-left: 0; padding-top: 80px; } .top-nav { left: 0; justify-content: space-between; } .dashboard-container { display: block; } }

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
                <h1>Estoque de Brincos</h1>
                <p style="color: #cfa266;">Veja o estoque atual e faça ajustes. Lembre-se de criar a tabela 'brincos' no banco.</p>
            </div>
            
            <?php if (!empty($mensagem_status)): ?>
                <div class="feedback-message <?= $classe_status ?>">
                    <?= htmlspecialchars($mensagem_status) ?>
                </div>
            <?php endif; ?>

            <button class="btn-novo-produto" id="btn-abrir-modal-adicionar">Adicionar Novo Produto</button>

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
                        <?php if (!empty($brincos)): ?>
                            <?php foreach ($brincos as $brinco): ?>
                                <tr>
                                    <td><?= htmlspecialchars($brinco['id']) ?></td>
                                    <td><?= htmlspecialchars($brinco['nome']) ?></td>
                                    <td><?= htmlspecialchars($brinco['descricao']) ?></td>
                                    <td>R$ <?= number_format($brinco['preco'], 2, ',', '.') ?></td>
                                    <td><?= htmlspecialchars($brinco['quantidade_estoque']) ?></td>
                                    <td class="col-acoes">
                                        <button class="btn-editar" data-id="<?= $brinco['id'] ?>"><i class="fas fa-edit"></i></button>
                                        <button class="btn-excluir-tabela" data-id="<?= $brinco['id'] ?>"><i class="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            <?php endforeach; ?>
                        <?php else: ?>
                            <tr>
                                <td colspan="6" style="text-align: center;">Nenhum brinco encontrado no estoque.</td>
                            </tr>
                        <?php endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="modal-overlay" id="modal-novo-produto">
            <div class="modal-content">
                <h2>Adicionar Novo Brinco</h2>
                <form id="form-novo-produto" action="estoque_brincos.php" method="POST">
                    
                    <div class="form-group">
                        <label for="produto-nome">Nome do Produto:</label>
                        <input type="text" id="produto-nome" name="nome" required placeholder="ex: Brinco de Argola Grande">
                    </div>
                    <div class="form-group">
                        <label for="produto-descricao">Descrição:</label>
                        <textarea id="produto-descricao" name="descricao" required placeholder="ex: Banhado a ouro 18k, 5cm de diâmetro"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="produto-preco">Preço (Ex: 89.90):</label>
                        <input type="number" id="produto-preco" name="preco" step="0.01" required placeholder="ex: 89.90">
                    </div>
                    <div class="form-group">
                        <label for="produto-img">Caminho da Imagem:</label>
                        <input type="text" id="produto-img" name="caminho_imagem" required placeholder="ex: ../imagens/Brincos/ArgolaGrande.jpg">
                    </div>
                    <div class="form-group">
                        <label for="produto-estoque">Estoque Inicial:</label>
                        <input type="number" id="produto-estoque" name="quantidade_estoque" required value="1" min="1">
                    </div>
                    <input type="hidden" name="acao" value="adicionar">
                    
                    <div class="modal-actions">
                        <button type="button" class="btn-cancelar" id="btn-fechar-modal-adicionar">Cancelar</button>
                        <button type="submit" class="btn-adicionar">Adicionar ao Estoque</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="modal-overlay" id="modal-editar-produto">
            <div class="modal-content">
                <h2>Editar Brinco</h2>
                <form id="form-editar-produto" action="estoque_brincos.php" method="POST">
                    <input type="hidden" name="id_produto" id="editar-id-produto">
                    <input type="hidden" name="acao" value="editar">
                    
                    <div class="form-group">
                        <label for="editar-produto-nome">Nome do Produto:</label>
                        <input type="text" id="editar-produto-nome" name="nome" required>
                    </div>
                    <div class="form-group">
                        <label for="editar-produto-descricao">Descrição:</label>
                        <textarea id="editar-produto-descricao" name="descricao" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="editar-produto-preco">Preço (Ex: 89.90):</label>
                        <input type="number" id="editar-produto-preco" name="preco" step="0.01" required>
                    </div>
                    <div class="form-group">
                        <label for="editar-produto-img">Caminho da Imagem:</label>
                        <input type="text" id="editar-produto-img" name="caminho_imagem" required>
                    </div>
                    <div class="form-group">
                        <label for="editar-produto-estoque">Quantidade em Estoque:</label>
                        <input type="number" id="editar-produto-estoque" name="quantidade_estoque" required min="0">
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn-cancelar" id="btn-fechar-modal-editar">Cancelar</button>
                        <button type="submit" class="btn-salvar-edicao">Salvar Edição</button>
                    </div>
                </form>
            </div>
        </div>


    </div> 
    
    <script>
        // 1. DADOS DOS PRODUTOS (passados do PHP para o JS)
        // ATENÇÃO: VARIÁVEL AGORA USA OS DADOS DE BRINCOS
        const brincosData = <?= $brincos_json ?>;

        const modalAdicionar = document.getElementById('modal-novo-produto');
        const modalEditar = document.getElementById('modal-editar-produto');

        // Modal Adicionar - Abertura e Fechamento
        document.getElementById('btn-abrir-modal-adicionar').addEventListener('click', () => {
            modalAdicionar.style.display = 'flex';
        });
        document.getElementById('btn-fechar-modal-adicionar').addEventListener('click', () => { 
            modalAdicionar.style.display = 'none';
        });
        modalAdicionar.addEventListener('click', (e) => {
            if (e.target.id === 'modal-novo-produto') {
                e.target.style.display = 'none';
            }
        });
        
        // Modal Editar - Fechamento
        document.getElementById('btn-fechar-modal-editar').addEventListener('click', () => {
            modalEditar.style.display = 'none';
        });
        modalEditar.addEventListener('click', (e) => {
            if (e.target.id === 'modal-editar-produto') {
                e.target.style.display = 'none';
            }
        });


        // 3. Lógica dos Botões da Tabela (Editar e Excluir)

        // Botões de Editar
        document.querySelectorAll('.btn-editar').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                // ATENÇÃO: Busca no array correto (brincosData)
                const produto = brincosData.find(b => b.id == id); 

                if (produto) {
                    // Preenche o Modal de Edição
                    document.getElementById('editar-id-produto').value = produto.id;
                    document.getElementById('editar-produto-nome').value = produto.nome;
                    document.getElementById('editar-produto-descricao').value = produto.descricao;
                    document.getElementById('editar-produto-preco').value = parseFloat(produto.preco).toFixed(2); 
                    document.getElementById('editar-produto-img').value = produto.caminho_imagem;
                    document.getElementById('editar-produto-estoque').value = produto.quantidade_estoque;
                    
                    modalEditar.style.display = 'flex';
                } else {
                    alert('Erro: Produto não encontrado para edição.');
                }
            });
        });

        // Botões de Excluir
        document.querySelectorAll('.btn-excluir-tabela').forEach(button => {
            button.addEventListener('click', function() {
                const id = this.getAttribute('data-id');
                const produto = brincosData.find(b => b.id == id);
                const nomeProduto = produto ? produto.nome : `(ID: ${id})`;

                if (confirm(`Tem certeza que deseja EXCLUIR o brinco "${nomeProduto}"? Esta ação é irreversível!`)) {
                    // Redireciona para o script PHP com os parâmetros de exclusão
                    window.location.href = `estoque_brincos.php?acao=excluir&id=${id}`;
                }
            });
        });
        
    </script>
</body>
</html>