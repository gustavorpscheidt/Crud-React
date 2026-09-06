import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/readTable.css";
import Table from "./table.jsx";

function Books(props) {

    const navigate = useNavigate();


return(

        <div className="Screen">
            <div className="table-holder">
                <Table tipe="books"/>

            </div>

            
        </div>




);

}

export default Books;
