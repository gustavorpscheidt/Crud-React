import { useState } from "react";
import { useNavigate } from "react-router-dom";


function FormLogin(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar(e) {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    
    const url = `${import.meta.env.VITE_API_URL}/users/login`;

    try {
       const resposta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
          credentials: "include",
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || `Erro na rede: ${resposta.status}`);
      }

      alert(dados.message);
    } catch (erro) {
      alert("Erro ao fazer login :" + erro.message);
      console.error("Erro ao fazer login :", erro);
      return; // Impede a navegação se houver erro
    }

    navigate("/home");
  }
  async function criar(e) {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/users/cadastro`;
    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, senha }),
      });
      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(dados.error || `Erro na rede: ${resposta.status}`);
      }

      alert(dados.message);
    } catch (erro) {
      alert("Erro ao cadastrar usuário :" + erro.message);
      console.error("Erro ao cadastrar usuário :", erro);
    }

  
  }
  
  return (
    <div className="form_holder">
      <form
        action=""
        className="form_login"
        onSubmit={(e) => (props.tipo === "login" ? entrar(e) : criar(e))}
      >
        <h2>{props.tipo === "login" ? "Login" : "Cadastro"}</h2>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          id="email_input"
          placeholder="Digite aqui seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Senha:</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite aqui sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <div className="btncad_holder">
          <button type="submit" id="btn_login">
            Entrar
          </button>
          <p className="texto_cadlog">
            {props.tipo === "login" ? (
              <>
                Não tem uma conta?
                <a href="/cadastro" className="link_form_login">
                  Cadastre-se
                </a>
              </>
            ) : (
              <>
                Já tem uma conta?{" "}
                <a href="/" className="link_form_login">
                  Faça login
                </a>
              </>
            )}
          </p>
        </div>
      </form>
    </div>
  );
}

export default FormLogin;
