import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Axios from '../../../infra/api/Axios';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './SubPecas.css'

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
                navigate('/painel')
            }
        }
    }, [id, navigate]);

    useEffect(() => {
        loadIdInfo();
    }, [loadIdInfo]);

    function changeStatus() {
        setIsActive(!isActive);
    }

    function submitAtualizacoes(e) {
        e.preventDefault();
        alert('submit funcionou');
    }

   /*    
<Form.Check
   type="switch"
   id="custom-switch"
   label={`${isActive ? "Inativar Peça" : "Ativar Peça"}`}
   defaultChecked
   onClick={changeStatus}
/> 
*/
    return (
        <div className='container'>
            {dados && (
                <div className='center'>
                    <div className='formSP'>
                        <Form onSubmit={submitAtualizacoes}>
                            <div>
                                <h2> ID {dados.id} - {dados.categoria.nome} </h2>
                                <p> SKU {dados.sku} </p>
                            </div>
                            <div>
                                <h3> Informacoes</h3>
                                <div className='info'>
                                    <h4> MARCA  </h4>
                                    <h4> {dados.marca} </h4>
                                </div>
                                <div className='info'>
                                    <h4> MODELO </h4>
                                    <h4> {dados.modelo} </h4>
                                </div>
                                <div>
                                    <h3> Atributos</h3>
                                </div>
                                <div>
                                    <div className='info-atributos'>
                                        <h5>{dados.categoria.atrib1}</h5>
                                        <h5>{dados.atrib1}</h5>
                                    </div>
                                    <hr className='line'></hr>
                                    <div className='info-atributos'>
                                        <h5>{dados.categoria.atrib2}</h5>
                                        <h5>{dados.atrib2}</h5>
                                    </div>
                                    <hr className='line'></hr>
                                    <div className='info-atributos'>
                                        <h5>{dados.categoria.atrib3}</h5>
                                        <h5>{dados.atrib3}</h5>
                                    </div>
                                    <hr className='line'></hr>
                                     {/* mudar para null */}
                                    {dados.atrib4 !== `000` && (
                                        <div>
                                            <div className='info-atributos'>
                                                <h5>{dados.categoria.atrib4}</h5>
                                                <h5>{dados.atrib4}</h5>
                                            </div>
                                            <hr className='line'></hr>
                                        </div>
                                    )}
                                    {dados.atrib5 !== `000` && (
                                        <div>
                                            <div className='info-atributos'>
                                                <h5>{dados.categoria.atrib5}</h5>
                                                <h5>{dados.atrib5}</h5>
                                            </div>
                                            <hr className='line'></hr>
                                        </div>
                                    )}
                                    {dados.atrib6 !== `000` && (
                                        <div>
                                            <div className='info-atributos'>
                                                <h5>{dados.categoria.atrib6}</h5>
                                                <h5>{dados.atrib6}</h5>
                                            </div>
                                            <hr className='line'></hr>
                                        </div>
                                    )}
                                </div>
                                <div className='info'>
                                    <h3> Quantidade</h3>
                                    <div className='buttons-quantidade'>
                                        <Button 
                                        variant="dark"
                                        disabled={!isActive}
                                        className='inputsQuantidade'>
                                            +
                                        </Button>    
                                    </div>
                                    <Form.Control
                                        type="text"
                                        placeholder={`XXXX`}
                                        readOnly
                                        style={{ width: '80px', backgroundColor: 'rgba(200, 200, 200)', textAlign: 'center' }}
                                    />
                                    <div className='buttons-quantidade'>
                                        <Button 
                                        variant="dark"
                                        className='inputsQuantidade'
                                        disabled={!isActive}>
                                            -
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Form>
                        <div className='buttons-submit'>
                            <Button
                                variant="outline-dark"
                                onClick={changeStatus}
                            > {`${isActive ? "Inativar" : "Ativar"}`}</Button>
                            <Button
                                variant='dark'>
                                Atualizar
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
