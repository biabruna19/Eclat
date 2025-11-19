<?php
// ==============================================
// ARQUIVO: conexao.php
// RESPONSÁVEL POR ESTABELECER A CONEXÃO COM O BD
// ==============================================

// Configurações do Banco de Dados
$host = 'localhost';          // Onde o MySQL está rodando (pode ser um IP externo no futuro)
$db   = 'ecommerce_joias';    // Nome do BD que você criou
$user = 'root';               // *** SEU USUÁRIO DO MYSQL *** (ALTERAR EM PRODUÇÃO!)
$pass = '';     // *** SUA SENHA DO MYSQL *** (NÃO USAR SENHAS REAIS EM EXEMPLOS PÚBLICOS)
$charset = 'utf8mb4';         // Codificação de caracteres

// Data Source Name (DSN) - String de conexão
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";

// Opções de configuração do PDO
$options = [
    // Lança exceções em caso de erros SQL, facilitando a depuração
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    
    // Define o formato padrão para buscar resultados (array associativo: ['coluna' => 'valor'])
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    
    // Desativa a emulação de prepared statements para maior segurança
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
     // Cria a instância de conexão (o objeto $pdo)
     $pdo = new PDO($dsn, $user, $pass, $options);
     
} catch (\PDOException $e) {
     // Em caso de falha na conexão, encerra o script e exibe o erro
     // (Em produção, você registraria o erro em um log e exibiria uma mensagem genérica)
     die("Falha na conexão com o banco de dados: " . $e->getMessage());
}

// O arquivo termina aqui. Qualquer outro arquivo PHP que o incluir (require 'conexao.php';)
// terá acesso imediato à variável $pdo, que é o objeto de conexão funcional.