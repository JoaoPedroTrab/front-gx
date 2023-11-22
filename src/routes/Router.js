// RouterApp.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from '../presentation/pages/rotaLogin.js';
import Pecas from '../presentation/pages/rotaPecas.js';
import SubPecas from '../presentation/pages/rotaSubPecas.js';
import PrivateRoute from './privateRoute';

function RouterApp() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <PrivateRoute path="/painel" element={<Pecas />} />
                <Route path="/painel/peca/:id" element={<SubPecas />} />
                <Route
                    path="/*"
                    element={<Navigate to="/login" />} 
                />
            </Routes>
        </Router>
    );
}

export default RouterApp;
