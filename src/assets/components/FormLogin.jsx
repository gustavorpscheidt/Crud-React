import { useState } from "react";

function FormLogin({ tipo }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar(e) {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    //aplicar envio para api e redirecionamento para a página principal do sistema
  }
  async function criar(e) {
    e.preventDefault();

    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    //aplicar envio para api e redirecionamento para a página principal do sistema
  }
  return (
    <div className="form_holder">
      <form action="" className="form_login">
        <h2>Login </h2>
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
        <button type="submit" id="btn_login" onClick={(e) => entrar(e)}>
          Entrar
        </button>
      </form>
    </div>
  );
}

export default FormLogin;
