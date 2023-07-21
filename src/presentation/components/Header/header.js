import { Navbar, Button, InputGroup, Container, Form, FormControl, Nav } from 'react-bootstrap';
import './header.css';
import Logo from '../../assets/logo_pms.png';
import { FaSearch, FaSignOutAlt  } from 'react-icons/fa';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavbarToggle = () => {
    setIsCollapsed((prevCollapsed) => !prevCollapsed);
  }

  const logoff = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" onToggle={handleNavbarToggle}>
        <Container fluid>
          <Navbar.Brand>
            <Link to="/">
              <img alt="img-logo" className="imgNav" src={Logo} />
              <span className="logoNav"><strong>ESTOQUE</strong></span>
            </Link>
          </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
        <Form className="d-flex justify-content-center flex-grow-1 align-items-center">
            <InputGroup style={{ maxWidth: '275px' }}> {/* Adjust the width as needed */}
              <FormControl
                type="search"
                placeholder="Busca rápida"
                aria-label="search"
              />
              <Button className="search-button" variant="primary">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
          <Nav className="ms-lg-auto d-flex align-items-center">
              <Nav.Item className={`${!isCollapsed ? 'reduzido' : ''}`}>
                <span className="welcome"><strong>Olá {/* {decoded.nome} */}</strong></span>
                <Button className="search-button ms-1" onClick={logoff} variant="danger">
                  <FaSignOutAlt /> Logoff
                </Button>
              </Nav.Item>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  );
}

export default Header;