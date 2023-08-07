import React, {useEffect, useState } from "react";
import Axios from "../../../infra/api/Axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import {useNavigate} from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import './pecas.css';

const Pecas = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("/especificacoes")
        .then(res => {
           const dataWithKeys = res.data.map((item, index) => ({ ...item, id: index + 1 }));
           setData(dataWithKeys);
           console.log(dataWithKeys);
        })
        .catch(err => console.log(err));
    }, []);

    function redirecionar(id) {
        navigate(`/pecas/${id}`);  
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 70},
        { field: 'SKU', headerName: 'SKU', width: 150 },
        { field: 'nome', headerName: 'Nome', width: 200 },
        { field: 'is_active', headerName: 'Status', width: 120, renderCell: (params) => params.value ? 'ATIVA' : 'INATIVA' },
        { field: 'saldo', headerName: 'Saldo', width: 120 },
        { field: 'marca', headerName: 'Marca', width: 150 },
        { field: 'modelo', headerName: 'Modelo', width: 150 },
      ];

    return (
        <div className="pecas">
            <div className="buttonArea">
                <Button className="botaocadastro" variant="primary">Nova Peça</Button>{''}
            </div>
  
            <div style={{ height: 700, width: '100%', margin: 'auto' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    count={-1}
                    pageSize={10}
                    rowsPerPage={[10]}
                    onRowClick={(params) => redirecionar(params.row.id)}
                />
            </div>
        </div>
    )
}

export default Pecas;
