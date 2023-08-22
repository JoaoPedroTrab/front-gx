import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Axios from '../../../infra/api/Axios.js';

function ModalCad({show, handleClose}) {
    const [selectedValue, setSelectedValue] = useState("");
    const [options, setOptions] = React.useState([]);
    const [mostrarValue, setMostrarValue] = useState(false);
    const [subForms, setSubForms] = useState([]);

    useEffect(() => {
        async function fetchOptionsData() {
        try {
            const res = await Axios.get('/categorias');
            setOptions(res.data);
        } catch (err) {
            console.error(err);
        }
    }
    fetchOptionsData();
    }, []);


    useEffect(() => {
        if(selectedValue) {
            setMostrarValue(true);
        }
    }, [selectedValue]);

    async function handleOptionChange(e) {
        const optionId = e.target.value;
        setSelectedValue(optionId);
        try {
            const res = await Axios.get(`/categorias`);
            setSubForms(res.data);
        } catch (err) {
            console.error(err);
        }
    }

    function renderSubForms() { // opcoes  após o selecione 

        const subFormsById = subForms.filter(subForm => String(subForm.id) === String(selectedValue));
        if (selectedValue && selectedValue !== "" || mostrarValue) { 
          return (
            <div>
              {mostrarValue && (
                <div>  {/* first input quantidade  */ } 
                  <Form.Label>Insira a quantidade:</Form.Label>
                  <Form.Control type="number" id="saldo" name="saldo"/>
                  {console.log("teste 1")}
                </div>
              )}
              {selectedValue && selectedValue !== "" && (
                <div>
                  {console.log("teste 2")}
                  {console.log(subFormsById)} {/*  mapeia os subinputs que começam com "atrib"  */}
                  {subFormsById.map(subForm => (
                    <div key={subForm.id}>
                      {Object.keys(subForm).filter(key => key.startsWith('atrib') ).map(catKey => (
                        <div key={catKey}>
                          <Form.Label>{subForm[catKey]}</Form.Label>
                          <Form.Control type="text" name={catKey} id={catKey} />
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

      const handleSubmit = async(e) => {
        e.preventDefault();
        const subFormsById = subForms.filter(subForm => String(subForm.id) === String(selectedValue));
        const fk_categorias_id = parseInt(selectedValue);
        const formData = new FormData(e.target);
        const saldo = parseInt(formData.get('saldo'));
        const formDataJson = {};
    
        console.log(subFormsById)
    
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
        console.log(formDataJson);
        try {
          const response = await Axios.post("http://172.22.2.22:3030/api/especificacoes", formDataJson);
          console.log(response.data);
          alert("Peça cadastrada com sucesso");
        } catch (error) {
          console.error(error);
          alert("error")
        }
      };
    

    return (
        <>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Peça</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                <Form.Label>Selecione a peça a ser adicionada:</Form.Label>
                <Form.Control as="select" value={selectedValue} onChange={handleOptionChange}>
                    <option selected disabled value="">Selecione...</option>
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
                </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Adicionar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }

export default ModalCad
