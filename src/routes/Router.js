import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Login from '../presentation/pages/rotaLogin.js';
import Menu from '../presentation/pages/rotaMenu.js';
import Pecas from '../presentation/pages/rotaPecas.js';
import CadastrarCategoria from '../presentation/pages/rotaCategoriaCad.js';
import SubPecas from '../presentation/pages/rotaSubPecas.js';
//import PrivateRoutes from './utils/privateRoute';

function RouterApp() { 
    return ( 
        <Router>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/painel" element={<Pecas/>}/>
                <Route path="/categoria/cadastro" element={<CadastrarCategoria/>}/> 
                <Route path="/painel/peca/:id" element={<SubPecas/>}/>  
            </Routes>
        </Router>
    );
}

export default RouterApp;