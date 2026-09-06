import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/options.css'

function Options(props) {

    const navigate = useNavigate();


    if(props.isADM){
      function handleRedirect(path) {
        navigate(path);
      }

    //ADM
  return (
    <>
    <div className="form-holder">

    <h1>O que deseja visualizar? </h1>

        <button className="btn_redirect" onClick={() => handleRedirect("/users")}>Usuários</button>
        <button className="btn_redirect" onClick={() => handleRedirect("/books")}>livros</button>
        <button className="btn_redirect" onClick={() => handleRedirect("/loans")}>Emprestimos</button>
       
    </div>
    
    
    </>

  );
}
//usuario normal
return(
    <>
    
    
    </>


);
}

export default Options;
