import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../presentation/pages/rotaLogin.js';
import Menu from '../presentation/pages/rotaMenu.js';
import Cadastro from '../presentation/pages/rotaCadastro.js';
import Pecas from '../presentation/pages/rotaPecas.js';
import CadastrarCategoria from '../presentation/pages/rotaCategoriaCad.js';
import modalCad from '../presentation/pages/rotaModalCad.js';
//import PrivateRoutes from './utils/privateRoute';

function RouterApp() { 
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/cadastros" element={<Cadastro/>}/>
                <Route path="/painel" element={<Pecas/>}/>
                <Route path="/categoria/cadastro" element={<CadastrarCategoria/>}/> "
            </Routes>
        </Router>
    );
}

export default RouterApp;