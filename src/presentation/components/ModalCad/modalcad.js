import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Axios from '../../../infra/api/Axios'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import './modalcad.css'

function ModalCad({ show, handleClose, tipoCadastro, setToastInfo, setUltimoUpdate }) {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [atributos, setAtributos] = useState(['', '', '']);
  const [selectedValue, setSelectedValue] = useState("");
  const [options, setOptions] = useState([]);
  const [mostrarValue, setMostrarValue] = useState(false);
  const [subForms, setSubForms] = useState([]);

  useEffect(() => {
    loadOptions();
  }, []);

  async function loadOptions() {
    console.log("realizando LoadOptions");
    try {
      const res = await Axios.get(`/categorias`);
      setOptions(res.data);
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if (selectedValue) {
      setMostrarValue(true);
    }
  }, [selectedValue]);

  async function handleOptionChange(e) {
    loadOptions();
    const optionId = e.target.value;
    setSelectedValue(optionId);
    try {
      const res = await Axios.get(`/categorias`);
      setSubForms(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  const handleSubmitCategoria = async (e) => {
    e.preventDefault();
    const dados = {
      nome,
      tipo,
      ...atributos.reduce((acc, atrib, index) => {
        acc[`atrib${index + 1}_cat`] = atrib;
        return acc;
      }, {}),
    };

    console.log("Dados a serem enviados:", dados);

    try {
      const res = await Axios.post('/categorias', dados);
      console.log("Resposta do servidor:", res);

      if (!res.data.erro) {
        console.log("Categoria criada com sucesso!");
        console.log("Dados da categoria criada:", res.data);
        setToastInfo({
          show: true,
          tipo: 'sucesso',
          mensagem: `${res.status} : ${res.data.message}.`,
        });
        console.log("depois do toast true");
      } else {
        setToastInfo({
          show: true,
          tipo: 'erro',
          mensagem: `Erro ao cadastrar categoria.`,
        });
        console.error("Erro ao criar categoria:", res.data.erro);
      }
    } catch (err) {
      setToastInfo({
        show: true,
        tipo: 'erro',
        mensagem: `Erro  ${err.response.status} : ${err.response.data.message}.`,
      });
      console.error("Erro na solicitação:", err);
    }
    loadOptions();
    handleClose();
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

  const removerAtributo = () => {
    if (atributos.length >= 3) {
      const novosAtributos = [...atributos];
      novosAtributos.pop();
      setAtributos(novosAtributos);
    }
  };

  function SelecaoTipo() {
    return (
      <Form.Select required value={tipo} onChange={e => setTipo(e.target.value)}>
        <option selected disabled value="">Selecione o tipo de categoria</option>
        <option value="P">Peça</option>
        <option value="E">Equipamento</option>
      </Form.Select>
    );
  }

  function renderSubForms() { // opcoes  após o selecione 

    const subFormsById = subForms.filter(subForm => String(subForm.id) === String(selectedValue));
    // eslint-disable-next-line no-mixed-operators
    if (selectedValue && selectedValue !== "" || mostrarValue) {
      return (
        <div>
          {mostrarValue && (
            <div>  {/* first input quantidade  */}
              <Form.Label>Insira a quantidade:</Form.Label>
              <Form.Control type="number" id="saldo" name="saldo" required />
              <Form.Label>Insira a marca:</Form.Label>
              <Form.Control type="text" id="marca" name="marca" required />
              <Form.Label>Insira o modelo:</Form.Label>
              <Form.Control type="text" id="modelo" name="modelo" required />
              {console.log("teste 1")}
            </div>
          )}
          {selectedValue && selectedValue !== "" && (
            <div>
              {console.log("teste 2")}
              {console.log(subFormsById)} {/*  mapeia os subinputs que começam com "atrib"  */}
              {subFormsById.map(subForm => (
                <div key={subForm.id}>
                  {Object.keys(subForm).filter(key => key.startsWith('atrib')).map(catKey => (
                    <div key={catKey}>
                      <Form.Label>Insira a/o  {subForm[catKey]}:</Form.Label>
                      <Form.Control type="text" name={catKey} id={catKey} required />
                      {console.log("teste 3")}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )
    }
    return 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subFormsById = subForms.filter(subForm => String(subForm.id) === String(selectedValue));
    const fk_categorias_id = parseInt(selectedValue);
    const formElement = document.forms['formsEspecificaco']
    const formData = new FormData(formElement);
    const saldo = parseInt(formData.get('saldo'));
    const formDataJson = {};

    console.log(subFormsById)

    // eslint-disable-next-line array-callback-return
    subFormsById.map(subForm => { // mapeia o subforms 
      Object.keys(subForm).forEach(key => { //transforma em array e verifica os elementos
        if (key.endsWith("_cat")) {  //se terminar em _cat
          const value = e.target.elements[key].value;
          const newKey = key.replace("_cat", ""); // remove o _cat da chave
          formData.append(newKey, value); // adiciona o novo nome da chave e o valor no formData
          formData.delete(key, value);
        }
      });
    });

    console.log('Quantidade :', saldo);

    for (let [key, value] of formData.entries()) {
      formDataJson[key] = value;
    }
    formDataJson.fk_categorias_id = fk_categorias_id;
    console.log('aaaaaaa');
    console.log(formDataJson);
    try {
      const res = await Axios.post("/especificacoes", formDataJson);
      console.log(res.data);
      setToastInfo({
        show: true,
        tipo: 'sucesso',
        mensagem: `${res.status} : ${res.data.message}.`,
      });

    } catch (error) {
      console.error(error);
      setToastInfo({
        show: true,
        tipo: 'erro',
        mensagem: `Erro ao cadastrar peça.`,
      });
    }
    setUltimoUpdate(Date.now());
    handleClose();
  };

  function renderEspecificacaoModal() {
    return (
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmit} name="formsEspecificaco">
          <Modal.Header closeButton>
            <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
              <BsFillPlusCircleFill style={{ marginRight: '10px' }} /> Adicionar Peça
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label>Selecione o tipo de peça a ser adicionada:</Form.Label>
            <Form.Control as="select" value={selectedValue} onChange={handleOptionChange} onClick={loadOptions}>
              <option selected disabled value="">
                Selecione...
              </option>
              {options.map(option => (
                <option key={option.id} value={option.id}>
                  {option.nome}
                </option>
              ))}
            </Form.Control>
            {selectedValue && (
              <>
                {subForms.length > 0 ? (
                  renderSubForms()
                ) : (
                  <div>Carregando...</div>
                )}
              </>
            )}

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }

  function renderCategoriaModal() {
    return (
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={handleSubmitCategoria}>
          <Modal.Header closeButton>
            <Modal.Title style={{ display: 'flex', alignItems: 'center' }}>
              <BsFillPlusCircleFill style={{ marginRight: '10px' }} /> Adicionar Categoria
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="form-group">
              <div className='elements'>
                <Form.Control type="text" placeholder="Nome" value={nome}
                  onChange={e => setNome(e.target.value)} required />
              </div>
              <div className='elements'>
                <SelecaoTipo />
              </div>
              {atributos.map((atributo, index) => (
                <div className="atributo-wrapper" key={index}>
                  <div className='elements'>
                    <Form.Control
                      type="text"
                      placeholder={`Atributo ${index + 1}`}
                      value={atributo}
                      onChange={e => handleAtributoChange(index, e.target.value)}
                      required={index < 6}
                    />
                  </div>
                  {index === atributos.length - 1 && index < 5 && (
                    <div className="btn-wrapper">
                      <Button type="button"
                        className="btn btn-primary"
                        style=
                        {{
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={adicionarAtributo}>
                        <strong> + </strong>
                      </Button>
                    </div>
                  )}
                  {index === atributos.length - 1 && index >= 3 && (
                    <div className="btn-wrapper">
                      <Button type="button"
                        className="btn btn-danger"
                        style=
                        {{
                          width: '38px',
                          height: '38px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                        onClick={removerAtributo}>
                        <strong> - </strong>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
  return (
    <>
      {tipoCadastro === 'E' ? renderEspecificacaoModal() : null}
      {tipoCadastro === 'C' ? renderCategoriaModal() : null}
    </>
  );

}

export default ModalCad