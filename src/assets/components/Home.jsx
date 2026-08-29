import { useEffect, useRef } from 'react'
import '../css/home.css'
import { useNavigate } from 'react-router-dom';
import Options from  './Options.jsx';

function Home() {
  const navigate = useNavigate();
  const verificacaoIniciada = useRef(false);



  async function verificarLogin() {

    
    const url = `${import.meta.env.VITE_API_URL}/users/isADM`;
    const resposta = await fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Inclui cookies na requisição
    });
    const dados = await resposta.json();
    if (!resposta.ok) {
      if (dados.error === "Token não fornecido") {
        alert("Você não está logado. Redirecionando para a tela de login.");
        navigate("/");
        return false;
      }
    }
    return true;


  }
  async function isADM() {
    
    
    const url = `${import.meta.env.VITE_API_URL}/users/isADM`;
    const resposta = await fetch(url, {
      method: "Get",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Inclui cookies na requisição
    });
    const dados = await resposta.json();
    if (!resposta.ok) {
      
        alert("erro " + dados.message);
        navigate("/");

        return false;
      
    }
    return dados.isADM;

    
  }
  async function logout(e) {
    e.preventDefault();
    const url = `${import.meta.env.VITE_API_URL}/users/logout`;
    const resposta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Inclui cookies na requisição
    });
    alert("saindo");
    navigate("/");
}
  useEffect(() => {
    if (verificacaoIniciada.current) {
      return;
    }
    verificacaoIniciada.current = true;
    verificarLogin();
  }, []);

  return (
   
    <div className='screen'>
      {/* <button onClick={(e) => logout(e)}>logout</button> */}

   


       
        
         <Options isADM = {isADM()}/>
        

     

      
     
      
    
    </div>
  )
}

export default Home
