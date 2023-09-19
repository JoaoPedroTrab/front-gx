import React, {useEffect, useState } from "react";
import Axios from "../../../infra/api/Axios";
import {useNavigate} from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import ModalCad from '../ModalCad/modalcad.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { IoBarChart } from "react-icons/io5";
import './pecas.css';
import ToastComponent from '../Toast/ToastComponent';

const Pecas = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const [exibirModalE, setExibirModalE] = useState(false);
    const [exibirModalC, setExibirModalC] = useState(false);
    const [tipoCadastro, setTipoCadastro] = useState('');
    const [nomes, setNomes] = useState('');
    const [toastInfo, setToastInfo] = useState({
        show: false,
        tipo: '',
        mensagem: '',
      });

    const handleCloseToast = () => {
        setToastInfo({ ...toastInfo, show: false });
      };

    const handleShowE = () => {
        setTipoCadastro('E');
        setExibirModalE(true);
      };
    
    const handleShowC = () => {
        setTipoCadastro('C');
        setExibirModalC(true);
    };
    
    const handleCloseE = () => {
        setExibirModalE(false);
    };

    const handleCloseC = () => {
        setExibirModalC(false);
      };

    useEffect(() => {
        Axios.get("/especificacoes")
        .then(res => {
            const dados = res.data;
            const dataComNomesCategoria = dados.map(item => ({
              ...item,
              nomes: item.categoria.nome,
            }));
            setData(dataComNomesCategoria);
          })
        .catch(err => console.log(err));
    }, []);

    function redirecionar(id) {
        navigate(`/pecas/${id}`);  
    }

    const columns = [
        { field: 'id', headerName: 'ID', width: 100},
        { field: 'SKU', headerName: 'SKU', width: 150 },
        { field: 'nomes', headerName: 'Nome', width: 175 },
        { field: 'marca', headerName: 'Marca', width: 150 },
        { field: 'modelo', headerName: 'Modelo', width: 150 },
        { field: 'is_active', headerName: 'Status', width: 150, renderCell: (params) => params.value ? 'ATIVA' : 'INATIVA' },
      ];

    return (
        <div className="pecas">
            <div className="buttonArea">
                <div className="buttons">
                    <DropdownButton id="dropdown-basic-button" title="Cadastrar... ">
                        <Dropdown.Item onClick={handleShowE} >Nova Especificação</Dropdown.Item>
                        <Dropdown.Item onClick={handleShowC} >Nova Categoria</Dropdown.Item>
                    </DropdownButton>
                </div>
                <div className="buttons">
                <Button variant="primary"> <IoBarChart/> Relatórios</Button>
                </div> 
            </div>

            <ModalCad 
                show={exibirModalE}
                handleClose = {handleCloseE}
                tipoCadastro = {tipoCadastro}
                toastInfo={toastInfo} 
                setToastInfo={setToastInfo}
            />

            <ModalCad 
                show={exibirModalC} 
                handleClose = {handleCloseC} 
                tipoCadastro= {tipoCadastro}   
                toastInfo={toastInfo} 
                setToastInfo={setToastInfo}
            />

            <div style={{ width: '100%', margin: 'auto' }}>
                <DataGrid
                    rows={data}
                    columns={columns}
                    onRowClick={(params) => redirecionar(params.row.id)}
                    initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 10,
                          },
                        },
                      }}
                      pageSizeOptions={[10]}
                />
            </div>
            <ToastComponent
            show={toastInfo.show}
            onClose={handleCloseToast}
            tipo={toastInfo.tipo}
            mensagem={toastInfo.mensagem}
          />

        </div>
    )
}

export default Pecas;
