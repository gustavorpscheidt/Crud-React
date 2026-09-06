import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/table.css";


function Table(props) {

    const navigate = useNavigate();

    if (props.tipe === "users") {
        function getusers() {
           

        }
        return (



            
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th className="actions">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                        </tr>

                    </tbody>
                </table>

            




        );
    }

}

export default Table;
