import { useState } from "react";

function FormLogin(props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function entrar(e) {
    e.preventDefault();
    alert("esse é o login");
    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    //aplicar envio para api e redirecionamento para a página principal do sistema
  }
  async function criar(e) {
    e.preventDefault();
    alert("Cadastro realizado com sucesso!");
    if (email.trim() === "" || senha.trim() === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }
    //aplicar envio para api e redirecionamento para a página principal do sistema
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
                Não tem uma conta?<a href="/cadastro" className="link_form_login">
                  Cadastre-se
                </a>
              </>
            ) : (
              <>
                Já tem uma conta? <a href="/" className="link_form_login">
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
