import CadastrarCategoria from '../components/CategoriaCad/categoriacad.js';
import HeaderPMS from '../components/Header/header.js';

function routeCadastroCategoria() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
            <HeaderPMS/>
            <CadastrarCategoria/>
        </div>
    );
}

export default routeCadastroCategoria;