import Menu from '../components/Menu/menu.js';
import HeaderPMS from '../components/Header/header.js';

function routeMenu() {
    return (
        <div className='flex-column'>
            <HeaderPMS/>
                <Menu/>
        </div>
    );
}

export default routeMenu;