import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/readTable.css";
import Table from "./table.jsx";

function Users(props) {

    const navigate = useNavigate();


return(

        <div className="Screen">
            <div className="table-holder">
                <Table tipe="users"/>

            </div>

            
        </div>




);

}

export default Users;
