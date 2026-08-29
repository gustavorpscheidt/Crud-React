// require('dotenv').config();
import "dotenv/config";//usar .env
import express from "express";//criar servidor mais facilmente
import connection from "./conexaoBanco.js";
import cors from "cors";
import jwt from 'jsonwebtoken';

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: process.env.URL_FRONT }));

function validaEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

app.post("/users/cadastro", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!validaEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    const sql = "insert into usuario (email, senha) values (?, ?)";
    const values = [email, senha];

    connection.query(sql, values, (error, results) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
          return res
            .status(409)
            .json({ error: "Este e-mail já está cadastrado." });
        }
        res.status(500).json({
          error: "Erro ao registrar usuário:" + error,
          message: "Erro ao registrar usuário:" + error,
        });
      } else {
        res.status(200).json({ message: "Usuário registrado com sucesso!" });
      }
    });

    res.status(200);
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }

  // res.status(200).json({"message": "User registered successfully!"});
});

app.get("/users", async (req, res) => {
  try {
    const sql = "select * from usuario";

    connection.query(sql, (error, results) => {
      if (error) {
        console.error("Erro ao executar a consulta:", error);
        res.status(500).json({ error: "Erro ao buscar usuários:" + error });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Nenhum usuário encontrado" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" + error });
  }
});
app.post("/users/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const sql = "select * from usuario where email = ? and senha = ?";
    const values = [email, senha];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao executar a consulta:", error);
        res.status(500).json({ error: "Erro ao fazer login:" + error });
      } else if (results.length === 0) {
        res.status(401).json({ error: "Email ou senha incorretos" });
      } else {
        res.status(200).json({ message: "Login realizado com sucesso!" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" + error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
