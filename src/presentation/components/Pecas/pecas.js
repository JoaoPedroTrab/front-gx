import React, {useEffect, useState } from "react";
import Axios from "../../../infra/api/Axios";
import {useNavigate} from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import ModalCad from '../ModalCad/modalcad.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import './pecas.css';

const Pecas = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [exibirModal, setExibirModal] = useState(false);

    const handleShow = () => {
        setExibirModal(true);
      };
    
      const handleClose = () => {
        setExibirModal(false);
      };

    useEffect(() => {
        Axios.get("/categorias")
        .then(res => {
           setData(res.data);
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
        { field: 'tipo', headerName: 'Tipo', width: 150, renderCell: (params) => params.value === 'P' ? 'PEÇA' : (params.value === 'E' ? 'EQUIPAMENTO' : '') },
      ];

    return (
        <div className="pecas">
            <div className="buttonArea">
                <DropdownButton id="dropdown-basic-button" title="Cadastrar">
                    <Dropdown.Item onClick={handleShow} >Nova Peça</Dropdown.Item>
                    <Dropdown.Item onClick={handleShow} >Nova Categoria</Dropdown.Item>
                </DropdownButton>
            </div>

            <ModalCad show={exibirModal} handleClose = {handleClose} />

            <div style={{ height: 700, width: '100%', margin: 'auto' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    onRowClick={(params) => redirecionar(params.row.id)}
                />
            </div>
        </div>
    )
}

export default Pecas;
