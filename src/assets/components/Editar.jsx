import { useState } from 'react'
import '../css/form.css'
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";


function Editar(props) {
    const location = useLocation();
    const { info, tipo } = location.state || {};
    const navigate = useNavigate();

    if (!info || !tipo) {
        return <div>Erro ao enviar dados entre páginas.</div>;
    }

        async function enviarFormularioBooks(id_livro, titulo, autor, ano, editora, quantidade) {
        const url = `${import.meta.env.VITE_API_URL}/books`;
        try {
            const resposta = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id_livro, titulo, autor, ano, editora, quantidade })
            });
            const dados = await resposta.json();
            alert(dados.message || dados.error);
            if(!dados.error){
               navigate("/home");
            }
        } catch (erro) {
            alert("Erro ao procurar usuário: " + erro.message);
            console.error("Erro ao procurar usuário:", erro);
        }


    }




    async function enviarFormularioUsers(id_usuario, email, senha) {
        const url = `${import.meta.env.VITE_API_URL}/users`;
        try {
            const resposta = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ id_usuario, email, senha })
            });
            const dados = await resposta.json();
            alert(dados.message || dados.error);
            if(!dados.error){
               navigate("/home");
            }
        } catch (erro) {
            alert("Erro ao procurar usuário: " + erro.message);
            console.error("Erro ao procurar usuário:", erro);
        }


    }



    if (tipo === "users") {

        const [email, setEmail] = useState(info.email);
        const [senha, setSenha] = useState(info.senha);


        return (
            <div id='form_holder'>
               <form
    className="form_editar"
    onSubmit={(e) => {
        e.preventDefault();
        enviarFormularioUsers(info.id_usuario, email, senha);
    }}
>

                    <label htmlFor="email" className="titulo">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="senha" className="titulo">Senha:</label>
                    <input
                        type="password"
                        id="senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                    />

                    <button type="submit" id="btn_editar">Editar</button>
                </form>

            </div>
        )

    }
    if(tipo === "books") {
    
        const [titulo, setTitulo] = useState(info.titulo);
        const [autor, setAutor] = useState(info.autor);
        const [ano, setAno] = useState(info.ano);
        const [editora, setEditora] = useState(info.editora);
        const [quantidade, setQuantidade] = useState(info.quantidade);

        return (
            <div id='form_holder'>
               <form
    className="form_editar"
    onSubmit={(e) => {
        e.preventDefault();
        enviarFormularioBooks(info.id_livro, titulo, autor, ano, editora, quantidade);
    }}
>

                    <label htmlFor="titulo" className="titulo">Título:</label>
                    <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <label htmlFor="autor" className="titulo">Autor:</label>
                    <input
                        type="text"
                        id="autor"
                        value={autor}
                        onChange={(e) => setAutor(e.target.value)}
                    />
                    <label htmlFor="ano" className="titulo">Ano:</label>
                    <input
                        type="number"
                        id="ano"
                        value={ano}
                        onChange={(e) => setAno(e.target.value)}
                    />
                    <label htmlFor="editora" className="titulo">Editora:</label>
                    <input
                        type="text"
                        id="editora"
                        value={editora}
                        onChange={(e) => setEditora(e.target.value)}
                    />
                    <label htmlFor="quantidade" className="titulo">Quantidade:</label>
                    <input
                        type="number"
                        id="quantidade"
                        value={quantidade}
                        onChange={(e) => setQuantidade(e.target.value)}
                    />

                    <button type="submit" id="btn_editar">Editar</button>
                </form>

            </div>
        )

        


    }

        if(tipo === "loans") {
    }
}

export default Editar;
