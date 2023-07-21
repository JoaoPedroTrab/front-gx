import React, {useEffect, useState } from "react";
import Axios from "../../../infra/api/Axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './pecas.css';

const Pecas = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        Axios.get("/especificacoes")
        .then(res => {
            setData(res.data);
            console.log(res.data);
        })
        .catch(err => console.log(err));
    }, []);

    function redirecionar(id) {
        window.location.href = `/pecas/${id}`;  
    }

    const pecas = data ? data.map((data) => {
        return (
            <tr key={data.id} onClick={() => redirecionar(data.id)}>
                <td>{data.id}</td>
                <td>{data.SKU}</td>
                <td>{data.nome}</td>
                <td>{data.is_active ? `ATIVA` : "INATIVA"}</td>
                <td>{data.saldo}</td>
                <td>{data.marca}</td>
                <td>{data.modelo}</td>
            </tr> 
        )
    }) : null;

    return (
        <div className="pecas">
            <div className="buttonArea">
                <Button className="botaocadastro" variant="primary" href="/pecas/cadastro">Nova Peça</Button>{''}
            </div>
  
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th><strong>#</strong></th>
                            <th>SKU</th> 
                            <th>Nome</th>
                            <th>Status</th>
                            <th>Saldo</th>
                            <th>Marca</th>
                            <th>Modelo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pecas}
                    </tbody>
                </Table>
            </div>
    )
}

export default Pecas;
