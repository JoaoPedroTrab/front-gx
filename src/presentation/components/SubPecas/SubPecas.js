import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../../../infra/api/Axios';
import { useCallback } from 'react';

export default function SubPecas() {

    const [dados, setDados] = useState(null);
    let { id } = useParams();

    const loadIdInfo = useCallback(async () => {
        try {
            const res = await Axios.get(`/especificacoes/${id}`);
            console.log(res.data[0]);
            setDados(res.data[0]);
        } catch (error) {
            console.log(error);
        }
    }, [id]);

    useEffect(() => {
        loadIdInfo();
    }, [loadIdInfo]);


    return (
        <div>
        {dados && (
            <div>
                <h3> ID: {dados.id} </h3>
                <h3> TIPO: {dados.categoria.nome} </h3>
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

            </div>
            )}
        </div>
    );
}
