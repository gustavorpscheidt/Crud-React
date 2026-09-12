import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css";

function Table(props) {
    const navigate = useNavigate();
    const [usuarios, setUsuarios] = useState([]);
    const [livros, setLivros] = useState([]);
    const [emprestimos, setEmprestimos] = useState([]);

    async function getusers() {
        const url = `${import.meta.env.VITE_API_URL}/users`;
        try {
            const resposta = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const dados = await resposta.json();

            if (!resposta.ok) {

                if (resposta.status !== 404) {
                    alert(dados.error || `Erro na rede: ${resposta.status}`);
                }
                // Se não achou livros, retorna um array vazio para não quebrar o estado
                return [];
            }
            if (resposta.status === 401) {
                navigate("/login");
            }
            if (resposta.status === 403) {
                alert("Acesso negado. Usuário não é administrador.");
                navigate("/home");
            }

            return dados;
        } catch (erro) {
            alert("Erro ao procurar usuário: " + erro.message);
            console.error("Erro ao procurar usuário:", erro);
        }
    }

    async function getBooks() {
        const url = `${import.meta.env.VITE_API_URL}/books`;
        try {
            const resposta = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const dados = await resposta.json();

            if (!resposta.ok) {

                if (resposta.status !== 404) {
                    alert(dados.error || `Erro na rede: ${resposta.status}`);
                }
                // Se não achou livros, retorna um array vazio para não quebrar o estado
                return [];
            }

            if (resposta.status === 401) {
                navigate("/login");
            }

            return dados;
        } catch (erro) {
            alert("Erro ao procurar livro: " + erro.message);
            console.error("Erro ao procurar livro:", erro);
            return []; // Retorna um array vazio em caso de falha crítica na rede
        }
    }



    async function getLoans() {
        const url = `${import.meta.env.VITE_API_URL}/loan`;
        try {
            const resposta = await fetch(url, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include"
            });
            const dados = await resposta.json();

            if (!resposta.ok) {

                if (resposta.status !== 404) {
                    alert(dados.error || `Erro na rede: ${resposta.status}`);
                }
                // Se não achou livros, retorna um array vazio para não quebrar o estado
                return [];
            }
            if (resposta.status === 401) {
                navigate("/login");
            }
            if (resposta.status === 403) {
                alert("Acesso negado. Usuário não é administrador.");
                navigate("/home");
            }

            return dados;
        } catch (erro) {
            alert("Erro ao procurar empréstimo: " + erro.message);
            console.error("Erro ao procurar empréstimo:", erro);
        }
    }

    useEffect(() => {
        if (props.tipe === "users") {
            const fetchUsers = async () => {
                const users = await getusers();
                if (Array.isArray(users)) {
                    setUsuarios(users);
                }
            };
            fetchUsers();
        } else if (props.tipe === "books") {
            const fetchBooks = async () => {
                const books = await getBooks();
                if (Array.isArray(books)) {
                    setLivros(books);
                }
            };
            fetchBooks();
        } else if (props.tipe === "loans") {
            const fetchLoans = async () => {
                const loans = await getLoans();
                if (Array.isArray(loans)) {
                    setEmprestimos(loans);
                }
            };
            fetchLoans();
        }
    }, [props.tipe]); // Escuta variações na propriedade para atualizar dinamicamente

    if (props.tipe === "users") {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Email</th>
                        <th>É Administrador</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios && Array.isArray(usuarios) ? (
                        usuarios.map((user) => (
                            <tr key={user.id_usuario}>
                                <td>{user.id_usuario}</td>
                                <td>{user.email}</td>
                                <td>{user.is_admin ? "Sim" : "Não"}</td>
                                <td className="actions">
                                    <button
                                        onClick={() =>
                                            navigate("/editar", {
                                                state: {
                                                    info: user,
                                                    tipo: "users"
                                                }
                                            })
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button>Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>Nenhum usuário encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    } else if (props.tipe === "books") {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Título</th>
                        <th>Autor</th>
                        <th>Editora</th>
                        <th>Ano</th>
                        <th>Quantidade</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {livros && Array.isArray(livros) && livros.length > 0 ? (
                        livros.map((livro) => (
                            <tr key={livro.id_livro}>
                                <td>{livro.id_livro}</td>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.editora}</td>
                                <td>{livro.ano}</td>
                                <td>{livro.quantidade}</td>
                                <td className="actions">
                                    <button
                                    
                                        onClick={() =>
                                            navigate("/editar", {
                                                state: {
                                                    info: livro,
                                                    tipo: "books"
                                                }
                                            })
                                        }
                                    >Editar</button>
                                    <button>Excluir</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>Nenhum livro encontrado</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    } else if (props.tipe === "loans") {
        return (
            <>

                <table>
                    <thead>
                        <tr>
                            <th>Id_usuario</th>
                            <th>Id_emprestimo</th>
                            <th>Id_livro</th>
                            <th>email</th>
                            <th>titulo</th>
                            <th>autor</th>
                            <th>data devolução</th>
                            <th>Data Emprestimo</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emprestimos && Array.isArray(emprestimos) && emprestimos.length > 0 ? (
                            emprestimos.map((loan) => (
                                <tr key={loan.id_emprestimo}>
                                    <td>{loan.id_usuario}</td>
                                    <td>{loan.id_emprestimo}</td>
                                    <td>{loan.id_livro}</td>
                                    <td>{loan.email}</td>
                                    <td>{loan.titulo}</td>
                                    <td>{loan.autor}</td>
                                    <td>{loan.data_devolucao}</td>
                                    <td>{loan.data_emprestimo}</td>
                                    
                                    <td className="actions">
                                        <button
                                        
                                        onClick={() =>
                                            navigate("/editar", {
                                                state: {
                                                    info: loan,
                                                    tipo: "loans"
                                                }
                                            })
                                        }
                                        >Editar</button>
                                        <button>Excluir</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" style={{ textAlign: "center" }}>
                                    Nenhum empréstimo encontrado
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

            </>

        );


    }

    return null;
}

export default Table;
