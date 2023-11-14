import React from 'react';
import SubPecas from '../components/SubPecas/SubPecas.js';
import HeaderPMS from '../components/Header/header.js';

function routeSubPecas() {
    return (
        <div className='flex-column'>
            <HeaderPMS/>
            <SubPecas/> 
        </div>
    );
}

export default routeSubPecas;