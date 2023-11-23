import React, { useState } from 'react';
import pms from '../../assets/logo_pms.png';
import './login.css';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Axios from '../../../infra/api/Axios';


const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!usuario || !senha) {
            setErro('Por favor, preencha todos os campos.');
            return;
        }
        try {
            const res = await Axios.post('/entrar', {
                usuario,
                senha,
            });
            if (!res.data.erro) {
                const tokenRecebido = res.data.token;
                Cookies.set('token', tokenRecebido);
                navigate('/painel');
            } else {
                setErro('Usuário ou senha incorretos.');
            }
        } catch (err) {
            console.error(err);
            if (err.response && err.response.status === 401) {
                setErro('Usuário ou senha incorretos.');
            } else {
                setErro('Ocorreu um erro durante o login. Por favor, consulte o administrador do sistema.');
            }
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12">
                    <div className="login-container">
                        <div className="login">
                            <div className="logo">
                                <img src={pms} alt="logo" className='img-fluid' />
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
                                            onChange={e => setUsuario(e.target.value)} />
                                    </div>
                                    <div className='elements'>
                                        <Form.Control type="password" placeholder="Senha" value={senha}
                                            onChange={e => setSenha(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className='elements'>
                                    <button type="submit" className="btn btn-primary btn-block">Entrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;