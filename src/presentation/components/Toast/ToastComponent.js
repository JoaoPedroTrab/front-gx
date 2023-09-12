import React from 'react';
import Toast from 'react-bootstrap/Toast';

function ToastComponent({ show, onClose, tipo, mensagem }) {
  return (
    <Toast onClose={onClose} show={show} autohide delay={200000}
      style={{
        position: 'fixed',
        bottom: '20px',
      }}>
      <Toast.Header className={`bg-${tipo === 'erro' ? 'danger' : 'success'} text-white`}>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{tipo === 'erro' ? 'Erro' : 'Sucesso'}</strong>
        <small>agora</small>
      </Toast.Header>
      <Toast.Body>{mensagem}</Toast.Body>
    </Toast>
  );
}

export default ToastComponent;