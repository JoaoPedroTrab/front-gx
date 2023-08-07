import React, { useState } from 'react';
import './categoriacad.css';
import { Form, Button } from 'react-bootstrap';
import Axios from '../../../infra/api/Axios.js';
import { useNavigate } from 'react-router-dom';

const CadastrarCategoria = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [atributos, setAtributos] = useState(['', '', '']);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dados = {
      nome,
      tipo,
      ...atributos.reduce((acc, atrib, index) => {
        acc[`atrib${index + 1}_cat`] = atrib;
        return acc;
      }, {}),
    };
    try {
      const res = await Axios.post('/entrar', dados);
      if (!res.data.erro) {
        // Faça alguma ação após o envio bem-sucedido
      }
    } catch (err) {
      console.error(err);
      setErro('Erro ao enviar o formulário!');
    }
  };

  const handleAtributoChange = (index, value) => {
    const novosAtributos = [...atributos];
    novosAtributos[index] = value;
    setAtributos(novosAtributos);
  };

  const adicionarAtributo = () => {
    if (atributos.length < 6) {
      setAtributos([...atributos, '']);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          <div className="categoria-container">
            <div className="cadastrocat">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className='elements'>
                    <Form.Control type="text" placeholder="Nome" value={nome}
                      onChange={e => setNome(e.target.value)} required />
                  </div>
                  <div className='elements'>
                    <Form.Control type="text" placeholder="Tipo" value={tipo}
                      onChange={e => setTipo(e.target.value)} required />
                  </div>
                  {atributos.map((atributo, index) => (
                    <div className="atributo-wrapper" key={index}>
                      <div className='elements'>
                        <Form.Control
                          type="text"
                          placeholder={`Atributo ${index + 1}`}
                          value={atributo}
                          onChange={e => handleAtributoChange(index, e.target.value)}
                          required={index < 3} // Definir como obrigatório apenas os três primeiros atributos
                        />
                      </div>
                      {index === atributos.length - 1 && index < 5 && (
                        <div className="btn-wrapper">
                          <Button type="button" className="btn btn-primary" onClick={adicionarAtributo}>
                            +
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className='elements'>
                  <Button type="submit" className="btn btn-primary btn-block">Cadastrar</Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
}
export default CadastrarCategoria;
