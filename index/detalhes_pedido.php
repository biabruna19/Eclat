<?php
// ARQUIVO: detalhes_pedido.php
// Visualiza os detalhes completos de um pedido específico.

// 1. CONFIGURAÇÃO E CONEXÃO
require_once '../config/conexao.php'; 

// Variável para armazenar a mensagem de erro, se houver
$mensagem_erro = null;

// Verifica se o ID do pedido foi passado na URL
if (!isset($_GET['id']) || !is_numeric($_GET['id'])) {
    // Redireciona ou exibe erro se o ID for inválido ou faltando
    header("Location: GerenciamentoPedidos.php?status=error&msg=" . urlencode("ID do pedido inválido ou faltando."));
    exit();
}

$pedido_id = (int)$_GET['id'];
$pedido_detalhes = null;
$itens_pedido = [];

try {
    // 2. BUSCA DETALHES PRINCIPAIS DO PEDIDO E CLIENTE
    $sql_pedido = "
        SELECT 
            p.id, p.n_pedido, p.data, p.data_saida, p.data_entrega, p.status, 
            p.valor_total, p.valor_frete, p.valor_desconto, p.codigo_rastreio,
            u.nome AS nome_cliente, u.email AS email_cliente,
            fp.nome AS nome_forma_pagamento, fp.desconto_percentual,
            -- Campos de endereço de entrega
            e_entrega.logradouro, e_entrega.numero, e_entrega.bairro, e_entrega.cidade, e_entrega.estado, e_entrega.cep
        FROM pedidos p
        LEFT JOIN usuario u ON p.usuario = u.id
        LEFT JOIN forma_pagamento fp ON p.forma_pagamento_id = fp.id 
        -- NOVO JOIN: Liga o ID de Entrega à tabela de enderecos
        LEFT JOIN enderecos e_entrega ON p.endereco_entrega_id = e_entrega.id 
        WHERE p.id = :pedido_id
    ";

    // NOVIDADE: EXECUÇÃO DA CONSULTA PRINCIPAL
    $stmt_pedido = $pdo->prepare($sql_pedido);
    $stmt_pedido->bindParam(':pedido_id', $pedido_id, PDO::PARAM_INT);
    $stmt_pedido->execute();
    $pedido_detalhes = $stmt_pedido->fetch(PDO::FETCH_ASSOC);

    if (!$pedido_detalhes) {
        throw new \Exception("Pedido #{$pedido_id} não encontrado.");
    }

    // 3. BUSCA OS ITENS DO PEDIDO
    $sql_itens = "
        SELECT 
            ip.qtd, ip.preco_unitario, ip.variacao_tamanho, ip.variacao_material, -- Novos campos
            pr.nome AS nome_produto 
        FROM itens_pedido ip
        LEFT JOIN produtos pr ON ip.produto = pr.id
        WHERE ip.pedido = :pedido_id
    ";
    
    $stmt_itens = $pdo->prepare($sql_itens);
    $stmt_itens->bindParam(':pedido_id', $pedido_id, PDO::PARAM_INT);
    $stmt_itens->execute();
    $itens_pedido = $stmt_itens->fetchAll(PDO::FETCH_ASSOC);

} catch (\PDOException $e) {
    // Erro de banco de dados
    $mensagem_erro = "Erro no banco de dados: " . $e->getMessage();
} catch (\Exception $e) {
    // Erro de lógica (pedido não encontrado)
    $mensagem_erro = $e->getMessage();
}

// Função utilitária para formatar datas (se você não tiver uma já)
function formatarData($data) {
    if (empty($data) || $data === '0000-00-00 00:00:00') {
        return "Pendente";
    }
    try {
        return (new DateTime($data))->format('d/m/Y H:i');
    } catch (\Exception $e) {
        return "Inválida";
    }
}

// Função de status (reutilizada do GerenciamentoPedidos.php)
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
    <title>Detalhes do Pedido #<?php echo $pedido_id; ?></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">

    <style>
        /* Estilos do GerenciamentoPedidos.php para consistência */
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8f8f8; color: #333; margin: 20px; }
        .gerenciamento-container { max-width: 900px; margin: 0 auto; }
        .detalhes-header { background-color: #fff8f1; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 5px solid #cfa266; }
        .detalhes-header h2 { margin-top: 0; color: #54321D; }
        .detalhes-card { background-color: white; border: 1px solid #eee; border-radius: 8px; padding: 20px; margin-bottom: 20px; box-shadow: 0 2px 5px rgba(0,0,0,0.05); }
        .detalhes-card h3 { color: #cfa266; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-bottom: 15px; }
        .detalhes-card p { margin: 8px 0; }
        .tabela-itens { width: 100%; border-collapse: collapse; margin-top: 10px; }
        .tabela-itens th, .tabela-itens td { text-align: left; padding: 12px; border-bottom: 1px solid #f8f8f8; }
        .tabela-itens th { background-color: #cfa266; color: white; font-size: 0.9em; text-transform: uppercase; }
        .tabela-itens tr:nth-child(even) { background-color: #fdf6ed; }

        /* Estilos de Status (Replicados do GerenciamentoPedidos) */
        .status-badge { padding: 5px 10px; border-radius: 4px; font-weight: bold; font-size: 0.8em; text-transform: uppercase; display: inline-block; }
        .status-pendente { background-color: #fff3cd; color: #856404; }
        .status-enviado { background-color: #d1ecf1; color: #0c5460; }
        .status-entregue { background-color: #d4edda; color: #155724; }
        .status-cancelado { background-color: #f8d7da; color: #721c24; }
        .status-message.error { padding: 15px; margin-bottom: 20px; border-radius: 6px; font-weight: bold; background-color: #ffe6e6; color: #c0392b; border: 1px solid #c0392b; }
        
        a { color: #54321D; text-decoration: none; font-weight: bold; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="gerenciamento-container">
        <?php if ($mensagem_erro !== null): ?>
            <div class="status-message error">
                <?php echo htmlspecialchars($mensagem_erro); ?>
            </div>
            <a href="GerenciamentoPedidos.php">Voltar para Pedidos</a>
        <?php elseif ($pedido_detalhes): ?>

            <div class="detalhes-header">
                <h2>Detalhes do Pedido #<?php echo htmlspecialchars($pedido_detalhes['id']); ?></h2>
                <a href="GerenciamentoPedidos.php">Voltar para Pedidos</a>
            </div>

            <div class="detalhes-card">
                <h3>Informações do Cliente</h3>
                <p><strong>Nome:</strong> <?php echo htmlspecialchars($pedido_detalhes['nome_cliente'] ?? 'N/A'); ?></p>
                <p><strong>Email:</strong> <?php echo htmlspecialchars($pedido_detalhes['email_cliente'] ?? 'N/A'); ?></p>
                
                <p>
                    <strong>Endereço de Entrega:</strong> 
                    <?php 
                        // CORRIGIDO: Concatena os campos do JOIN
                        $logradouro = htmlspecialchars($pedido_detalhes['logradouro'] ?? 'N/A');
                        $numero = htmlspecialchars($pedido_detalhes['numero'] ?? 'S/N');
                        $bairro = htmlspecialchars($pedido_detalhes['bairro'] ?? 'N/A');
                        $cidade = htmlspecialchars($pedido_detalhes['cidade'] ?? 'N/A');
                        $estado = htmlspecialchars($pedido_detalhes['estado'] ?? 'N/A');
                        $cep = htmlspecialchars($pedido_detalhes['cep'] ?? 'N/A');
                        
                        echo "{$logradouro}, {$numero} - {$bairro}, {$cidade}/{$estado} CEP: {$cep}";
                    ?>
                </p>
                <p><strong>Código de Rastreio:</strong> <?php echo htmlspecialchars($pedido_detalhes['codigo_rastreio'] ?? 'N/A'); ?></p>
            </div>
            
            <div class="detalhes-card">
                <h3>Pagamento e Valores</h3>
                <p><strong>Forma de Pagamento:</strong> <?php echo htmlspecialchars($pedido_detalhes['nome_forma_pagamento'] ?? 'N/A'); ?> (<?php echo htmlspecialchars($pedido_detalhes['desconto_percentual'] ?? 0); ?>% Desconto)</p>
                <p><strong>Valor Desconto:</strong> R$ <?php echo number_format($pedido_detalhes['valor_desconto'], 2, ',', '.'); ?></p>
                <p><strong>Valor Frete:</strong> R$ <?php echo number_format($pedido_detalhes['valor_frete'], 2, ',', '.'); ?></p>
                <p><strong>Valor Total (Final):</strong> R$ **<?php echo number_format($pedido_detalhes['valor_total'], 2, ',', '.'); ?>**</p>
            </div>

            <div class="detalhes-card">
                <h3>Status e Datas</h3>
                <p><strong>Nº Pedido (Interno):</strong> <?php echo htmlspecialchars($pedido_detalhes['n_pedido'] ?? 'N/A'); ?></p>
                <p><strong>Data do Pedido:</strong> <?php echo formatarData($pedido_detalhes['data']); ?></p>
                <p><strong>Data de Saída:</strong> <?php echo formatarData($pedido_detalhes['data_saida']); ?></p>
                <p><strong>Data de Entrega:</strong> <?php echo formatarData($pedido_detalhes['data_entrega']); ?></p>
                <p><strong>Status Atual:</strong> 
                    <span class="status-badge <?= getStatusClass($pedido_detalhes['status']) ?>">
                        <?php echo htmlspecialchars($pedido_detalhes['status']); ?>
                    </span>
                </p>
            </div>

            <div class="detalhes-card">
                <h3>Itens Comprados</h3>
                <?php if (empty($itens_pedido)): ?>
                    <p>Nenhum item encontrado para este pedido.</p>
                <?php else: ?>
                    <table class="tabela-estoque tabela-itens">
                        <thead>
                            <tr>
                                <th>Produto</th>
                                <th>Variação</th>
                                <th>Qtd.</th>
                                <th>Preço Unitário</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php foreach ($itens_pedido as $item): ?>
                                <?php $subtotal = $item['qtd'] * $item['preco_unitario']; ?>
                                <tr>
                                    <td><?php echo htmlspecialchars($item['nome_produto'] ?? 'Produto Removido/N/A'); ?></td>
                                    <td>
                                        Tamanho: <?php echo htmlspecialchars($item['variacao_tamanho'] ?? 'N/A'); ?><br>
                                        Material: <?php echo htmlspecialchars($item['variacao_material'] ?? 'N/A'); ?>
                                    </td>
                                    <td><?php echo htmlspecialchars($item['qtd']); ?></td>
                                    <td>R$ <?php echo number_format($item['preco_unitario'], 2, ',', '.'); ?></td>
                                    <td>R$ **<?php echo number_format($subtotal, 2, ',', '.'); ?>**</td>
                                </tr>
                            <?php endforeach; ?>
                        </tbody>
                    </table>
                <?php endif; ?>
            </div>

        <?php endif; ?>
    </div>
</body>
</html>