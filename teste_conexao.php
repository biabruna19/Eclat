<?php
// O caminho '../config/conexao.php' está correto, pois sobe um nível (de 'index' para 'eclat_site01')
// e depois entra na pasta 'config'.
require 'config/conexao.php'; 

// Se o require funcionar e o código de conexao.php não gerar um 'die', 
// o objeto $pdo estará disponível aqui.

try {
    // 1. Tenta buscar as categorias para confirmar o acesso ao BD
    $stmt = $pdo->query("SELECT id, descricao FROM categoria");
    $categorias = $stmt->fetchAll();

    echo "<h1>TESTE DE CONEXÃO E LEITURA</h1>";
    echo "<p>Conexão com o banco de dados 'ecommerce_joias' estabelecida com sucesso!</p>";
    
    // 2. Exibe as categorias que foram inseridas inicialmente
    if (count($categorias) > 0) {
        echo "<h2>Categorias Encontradas:</h2>";
        echo "<ul>";
        foreach ($categorias as $categoria) {
            echo "<li>ID: {$categoria['id']} - Descrição: {$categoria['descricao']}</li>";
        }
        echo "</ul>";
    } else {
        echo "<p>Atenção: A tabela 'categoria' está vazia, mas a conexão funcionou.</p>";
    }

} catch (PDOException $e) {
    // Esta parte só será executada se houver um erro de SQL (ex: tabela não existe)
    echo "<h1>ERRO</h1>";
    echo "<p>Erro ao executar a consulta (conexão funcionou, mas a query falhou):</p>";
    echo "<pre>{$e->getMessage()}</pre>";
}
?>