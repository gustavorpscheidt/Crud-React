import { useState } from 'react'
import '../css/home.css'
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();

  function entrar(e,caminho) {
    e.preventDefault()
    const texto = event.target.textContent
    navigate(caminho)

  }


  return (
    <div className='screen'>

      <div className="form-holder">
        <h1 className="titulo">O que deseja fazer?</h1>
        
          <button type="submit" className="opcao" onClick={(e) => entrar(e,"/adm")}>tela de ADM</button>
          <button type="submit" className="opcao" onClick={(e) => entrar(e,"")}>Opção 2</button>
          <button type="submit" className="opcao" onClick={(e) => entrar(e,"")}>Opção 3</button>
          <button type="submit" className="opcao" onClick={(e) => entrar(e,"")}>Opção 4</button>
        

      </div>

      
     
      
    
    </div>
  )
}

export default Home
