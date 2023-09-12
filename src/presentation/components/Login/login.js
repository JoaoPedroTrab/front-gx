import React, { useState } from 'react';
import pms from '../../assets/logo_pms.png'; 
import './login.css';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from '../../../infra/api/Axios.js';
import {useNavigate} from 'react-router-dom';


const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const [erro, setErro] = useState('');

    async function handleSubmit (e) { 
        e.preventDefault();

        try {
            const res = await Axios.post('/entrar', {
                usuario,
                senha,
            }); //caso a validaçao da api /entrar retorne sem nenhum erro entra nesse if    
            if (!res.data.erro) {
                const tokenRecebido = res.data.token //armazena o token na variavel tokenrecebido
                localStorage.setItem('token', tokenRecebido); //armazena o token no localstorage
                navigate('/pecas'); //redireciona para a rota /menu  
            }
        }catch (err) {
            console.error(err);
            setErro('Usuário ou senha incorretos.'); //ver depois como jp manda do banco 
        }

    };

    return (
        <div className="container-fluid">
            <div className="row"> 
                <div className="col-md-12">
                    <di className="login-container">
                        <div className="login">
                            <div className="logo">
                                <img src={pms} alt="logo" className='img-fluid'/>
                                <h1 className='loginTitulo'><b>ESTOQUE</b></h1>
                            </div>
                            {erro && ( // Verifica se há erro para exibir a mensagem
                                <div className="alert alert-warning" role="alert">
                                    {erro}
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <div className='elements'>
                                        <Form.Control type="text" placeholder="Usuário" value={usuario}
                                        onChange={e => setUsuario(e.target.value)} required/>
                                    </div>
                                    <div className='elements'> 
                                        <Form.Control type="password" placeholder="Senha" value={senha}
                                        onChange={e => setSenha(e.target.value)} required/>
                                    </div>
                                </div>
                                <div className='elements'>
                                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                </div>
                            </form>
                        </div>
                    </di>
                </div>
            </div>
        </div>
    );    
}

export default Login;