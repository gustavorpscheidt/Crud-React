const mysql = require('mysql2');

// Configurando os dados de conexão
const connection = mysql.createConnection({
  host: process.env.HOST,     // Endereço do servidor (ex: localhost)
  user: process.env.USER,          // Nome de usuário do MySQL
  password: process.env.PASSWORD, // Sua senha do MySQL
  database: process.env.DATABASE // Nome do banco de dados
});

// Testando a conexão
connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conexão realizada com sucesso!');
});
