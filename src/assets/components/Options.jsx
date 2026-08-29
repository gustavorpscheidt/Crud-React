import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../css/options.css'

function Options(props) {
    const navigate = useNavigate();
    if(props.isADM){

    //ADM
  return (
    <>
    <div className="form-holder">

    <h1>O que deseja visualizar? </h1>

        <button className="btn_redirect">Usuários</button>
        <button className="btn_redirect">livros</button>
        <button className="btn_redirect">Emprestimos</button>
       
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
