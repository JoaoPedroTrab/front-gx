import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../../../infra/api/Axios';
import {useNavigate} from 'react-router-dom';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function SubPecas() {
    const navigate = useNavigate();
    const [dados, setDados] = useState(null);
    const [isChanging, setIsChanging] = useState(false);
    const [isActive, setIsActive] = useState(true);
    let { id } = useParams();

    const loadIdInfo = useCallback(async () => {
        try {
            const res = await Axios.get(`/especificacoes/${id}`);
            console.log(res.data[0]);
            console.log(res.data[0]);
            setDados(res.data[0]);
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 404) { 
               navigate('/erro/peca/404  ')
            }
        }
    }, [id]);

    useEffect(() => {
        loadIdInfo();
    }, []);

    function changeQuantidade() {
        setIsChanging(isActive);
    } 
    
    function changeStatus() {
        setIsActive(!isActive);
    }

    function submitAtualizacoes(e) {
        e.preventDefault();
        alert('submit funcionou');
    }

    return (
        <div>
        {dados && (
            <div>                
                <Form onSubmit={submitAtualizacoes}>
                <Button 
                    variant="warning"
                    onClick={changeQuantidade}
                    disabled={!isActive} 
                    > Adicionar/Remover </Button>

                <Button 
                    variant="danger"
                    onClick={changeStatus}
                    > Inativar </Button>

                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={`${isActive ? "Inativar Peça" : "Ativar Peça"}`}
                        defaultChecked
                        onClick={changeStatus}
                    />

                <h3> ID: {dados.id} </h3>
                <h3> TIPO:</h3>
                <Form.Control
                type="text"
                placeholder={`${dados.categoria.nome}`}
                disabled={!isChanging}
                readOnly={!isChanging}
                />
                <h3> MARCA: {dados.marca} </h3>
                <h3> MODELO: {dados.modelo} </h3>
                <h3> QUANTIDADE: {dados.saldo} </h3>
                <h3> ATRIB1 {dados.categoria.atrib1}: {dados.atrib1} </h3>
                <h3> ATRIB2 {dados.categoria.atrib2}: {dados.atrib2} </h3>
                <h3> ATRIB3 {dados.categoria.atrib3}: {dados.atrib3} </h3>
                {dados.atrib4 !== null && (
                    <h3> ATRIB4 {dados.categoria.atrib4}: {dados.atrib4} </h3>
                )}
                {dados.atrib5 !== null && (
                    <h3> ATRIB5{dados.categoria.atrib5}: {dados.atrib5} </h3>
                )}
                {dados.atrib6 !== null && (
                    <h3> ATRIB6{dados.categoria.atrib6}: {dados.atrib6} </h3>
                )}
                <h3> SKU: {dados.sku} </h3>
                </Form>
            </div>
            )}
        </div>
    );
}
