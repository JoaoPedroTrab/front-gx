import React from 'react';
import Toast from 'react-bootstrap/Toast';

function ToastComponent({ show, onClose, tipo, mensagem }) {
  return (
    <Toast onClose={onClose} show={show} autohide delay={5000}
      style={{
        position: 'fixed',
        bottom: '20px',
      }}>
      <Toast.Header className={`bg-${tipo === 'erro' ? 'danger' : 'success'} text-white`}>
        <strong className="me-auto">{tipo === 'erro' ? 'ERRO' : 'SUCESSO'}</strong>
        <small>agora</small>
      </Toast.Header>
      <Toast.Body>{mensagem}</Toast.Body>
    </Toast>
  );
}

export default ToastComponent;