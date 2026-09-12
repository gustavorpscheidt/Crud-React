// require('dotenv').config();
import "dotenv/config";//usar .env
import express from "express";//criar servidor mais facilmente
import connection from "./conexaoBanco.js";
import cors from "cors";
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: process.env.URL_FRONT, credentials: true }));

function validaEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function verificarAdm(token) {
  return new Promise((resolve, reject) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id_user = decoded.id;

      const sql = "select * from usuario where id_usuario = ?";
      const values = [id_user];

      connection.query(sql, values, (error, results) => {
        if (error || results.length === 0) {
          return resolve(false); // Deu erro ou não achou? Retorna false
        }
        // Se achou, checa se é admin (retorna true ou false)
        resolve(results[0].is_admin === 1); 
      });

    } catch (error) {
      console.error("Erro ao verificar administrador:", error);
      resolve(false);
    }
  });
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

  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
});

app.get("/users", async (req, res) => {
  try {
   const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    if (!( await (verificarAdm(token)))) {
      return res.status(403).json({ error: "Acesso negado. Usuário não é administrador." });
    }
    const sql = "select * from usuario where is_admin = 0";

    connection.query(sql, (error, results) => {
      if (error) {

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

app.get("/books", async (req, res) => {
  try {
   const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    const sql = "select * from livro";

    connection.query(sql, (error, results) => {
      if (error) {

        res.status(500).json({ error: "Erro ao buscar livros:" + error });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Nenhum livro encontrado" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar livros" + error });
  }
});



app.get("/loan", async (req, res) => {
  try {
   const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }
    
    if (!( await (verificarAdm(token)))) {
      return res.status(403).json({ error: "Acesso negado. Usuário não é administrador." });
    }

const sql = `
    SELECT
        e.id_emprestimo,
        e.id_usuario,
        e.id_livro,
        u.email,
        l.titulo,
        l.autor,
        l.editora,
        l.ano,
        e.data_emprestimo,
        e.data_devolucao
    FROM emprestimo e
    INNER JOIN usuario u
        ON e.id_usuario = u.id_usuario
    INNER JOIN livro l
        ON e.id_livro = l.id_livro
`;




    connection.query(sql, (error, results) => {
      if (error) {

        res.status(500).json({ error: "Erro ao buscar empréstimos:" + error });
      } else if (results.length === 0) {
        res.status(404).json({ error: "Nenhum empréstimo encontrado" });
      } else {
        res.status(200).json(results);
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empréstimos" + error });
  }
});






app.post("/users/logout", async (req, res) => {
  try {
    res.clearCookie("token", { httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer logout" + error });
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
        const token = jwt.sign({ id: results[0].id_usuario }, process.env.JWT_SECRET, {
          expiresIn: '72h', // 72 horas
        });
     
        res.cookie("token", token, { httpOnly: true, sameSite: "lax", maxAge: 72 * 60 * 60 * 1000 }); // 72 horas

        res.status(200).json({ message: "Login realizado com sucesso!" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" + error });
  }
});
app.get("/users/isADM", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id_user = decoded.id;


    const sql = "select * from usuario where id_usuario = ?";
    const values = [id_user];

    connection.query(sql, values, (error, results) => {
      if (error) {
        console.error("Erro ao executar a consulta:", error);
        res.status(500).json({ error: "Erro ao verificar se é ADM:" + error });
      } else if (results.length === 0) {
        res.status(401).json({ message: "Usuário não encontrado"});
      } else {
        res.status(200).json({ message: "Usuário é administrador", isAdmin: results[0].is_admin });
      }
      }
    );



  }catch (error) {
    res.status(500).json({ error: "Erro ao verificar se é ADM" + error });
  }

});


app.put("/users", async (req, res) => {
  try {
    const { id_usuario, email, senha } = req.body;
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

      if (!validaEmail(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const idLogado = decoded.id;
  const ehAdmin = await verificarAdm(token);

if (!ehAdmin && id_usuario !== idLogado) {
    return res.status(403).json({
        error: "Acesso negado."
    });
}

    const sql = "update usuario set email = ?, senha = ? where id_usuario = ?";
    const values = [email, senha, id_usuario];

    connection.query(sql, values, (error, results) => {
      
      if (error) {
        console.error("Erro ao executar a consulta:", error);
        res.status(500).json({ error: "Erro ao atualizar usuário" + error });
      } else if(results.affectedRows === 0) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }else {
        res.status(200).json({ message: "Usuário atualizado com sucesso!" });
      }
    });

  }catch (error) {
    res.status(500).json({ error: "Erro ao atualizar usuário" + error });
  }

});

app.put("/books", async (req, res) => {
  try {
    const { id_livro, titulo, autor, ano, editora, quantidade } = req.body;
    const token = req.cookies.token;
    if(quantidade < 0){
      return res.status(400).json({ error: "Quantidade não pode ser negativa" });

    }
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

  const ehAdmin = await verificarAdm(token);

if (!ehAdmin ) {
    return res.status(403).json({
        error: "Acesso negado."
    });
}

    const sql = "update livro set titulo = ?, autor = ?, ano = ?, editora = ?, quantidade = ? where id_livro = ?";
    const values = [titulo, autor, ano, editora, quantidade, id_livro];

    connection.query(sql, values, (error, results) => {
      
      if (error) {
        console.error("Erro ao executar a consulta:", error);
        res.status(500).json({ error: "Erro ao atualizar livro" + error });
      } else if(results.affectedRows === 0) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }else {
        res.status(200).json({ message: "Livro atualizado com sucesso!" });
      }
    });

  }catch (error) {
    res.status(500).json({ error: "Erro ao atualizar livro" + error });
  }

});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
