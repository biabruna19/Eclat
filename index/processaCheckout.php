<?php
// ARQUIVO: processa_checkout.php (VERSÃO CORRIGIDA PARA OS NOMES DE SUAS COLUNAS)

// 1. CONEXÃO COM O BANCO DE DADOS
require_once '../config/conexao.php'; 

// 2. DADOS DO CLIENTE E DO CARRINHO (SIMULAÇÃO)
$cliente_id = 1; // ID do usuário logado que está comprando
$carrinho_id = 1; // ID do carrinho ativo deste usuário
$endereco_entrega = "Rua das Flores, 123 - Centro, Cidade/UF"; 
$valor_total_simulado = 0; 

// 3. INICIA TRANSAÇÃO PDO
$pdo->beginTransaction();

try {
    // A. CALCULA O VALOR TOTAL E OBTÉM ITENS DO CARRINHO (AJUSTADO: itens_carrinho.carrinho, itens_carrinho.produto, itens_carrinho.qtd)
    $sql_itens_carrinho = "
        SELECT 
            ic.produto AS produto_id, 
            ic.qtd AS quantidade, 
            p.preco, 
            p.nome
        FROM itens_carrinho ic
        JOIN produtos p ON ic.produto = p.id
        WHERE ic.carrinho = :carrinho_id
    ";
    
    $stmt_itens = $pdo->prepare($sql_itens_carrinho);
    $stmt_itens->bindParam(':carrinho_id', $carrinho_id, PDO::PARAM_INT);
    $stmt_itens->execute();
    $itens_carrinho = $stmt_itens->fetchAll(PDO::FETCH_ASSOC);

    if (empty($itens_carrinho)) {
        throw new \Exception("Seu carrinho está vazio. Não é possível finalizar a compra.");
    }
    
    // Recalcula o valor total para garantir integridade
    foreach ($itens_carrinho as $item) {
        $valor_total_simulado += ($item['preco'] * $item['quantidade']);
    }


    // B. INSERE O NOVO PEDIDO NA TABELA 'pedidos' (Assumindo colunas padrão: cliente_id, data_pedido, valor_total, status, endereco_entrega)
$sql_insert_pedido = "
    INSERT INTO pedidos (usuario, data, valor_total, status, endereco_entrega) 
    VALUES (:usuario_id, NOW(), :valor_total, 'Processando', :endereco_entrega)
";
    
$stmt_insert = $pdo->prepare($sql_insert_pedido);
$stmt_insert->bindParam(':usuario_id', $cliente_id, PDO::PARAM_INT); 
$stmt_insert->bindParam(':valor_total', $valor_total_simulado);
$stmt_insert->bindParam(':endereco_entrega', $endereco_entrega);
$stmt_insert->execute();

$novo_pedido_id = $pdo->lastInsertId();


// C. COPIA OS ITENS DO CARRINHO PARA A TABELA 'itens_pedido' (CORRIGIDO PARA SUA ESTRUTURA: pedido, produto, qtd, preco_unitario)
$sql_insert_item = "
    INSERT INTO itens_pedido (pedido, produto, qtd, preco_unitario)
    VALUES (:pedido_id, :produto_id, :quantidade, :preco)
";
    $stmt_item = $pdo->prepare($sql_insert_item);

    foreach ($itens_carrinho as $item) {
        $stmt_item->bindParam(':pedido_id', $novo_pedido_id, PDO::PARAM_INT); // Mapeia para a coluna 'pedido'
        $stmt_item->bindParam(':produto_id', $item['produto_id'], PDO::PARAM_INT); // Mapeia para a coluna 'produto'
        // NOTA: O campo 'nome' (nome_produto_snapshot) foi removido do INSERT, pois a coluna não existe.
        $stmt_item->bindParam(':preco', $item['preco']); // Mapeia para a coluna 'preco_unitario'
        $stmt_item->bindParam(':quantidade', $item['quantidade'], PDO::PARAM_INT); // Mapeia para a coluna 'qtd'
        $stmt_item->execute();
    }

    // D. LIMPA OS ITENS DO CARRINHO (AJUSTADO: itens_carrinho.carrinho)
    $sql_limpar_carrinho = "DELETE FROM itens_carrinho WHERE carrinho = :carrinho_id";
    $stmt_limpar = $pdo->prepare($sql_limpar_carrinho);
    $stmt_limpar->bindParam(':carrinho_id', $carrinho_id, PDO::PARAM_INT);
    $stmt_limpar->execute();


    // E. FINALIZA A TRANSAÇÃO
    $pdo->commit();
    
    $mensagem_status = "Sucesso! Pedido #{$novo_pedido_id} criado. Total: R$ " . number_format($valor_total_simulado, 2, ',', '.');
    $classe_status = "success";

    header("Location: GerenciamentoPedidos.php?status={$classe_status}&msg=" . urlencode($mensagem_status));
    exit();


} catch (\PDOException $e) {
    $pdo->rollBack();
    $mensagem_status = "Erro no banco de dados ao processar o checkout: " . $e->getMessage();
    $classe_status = "error";

} catch (\Exception $e) {
    $pdo->rollBack();
    $mensagem_status = "Erro no checkout: " . $e->getMessage();
    $classe_status = "error";
}

header("Location: gerenciamentoPedidos.php?status={$classe_status}&msg=" . urlencode($mensagem_status));
exit();

?>