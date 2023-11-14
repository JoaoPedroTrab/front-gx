import React from 'react';
import Pecas from '../components/Pecas/pecas.js';
import HeaderPMS from '../components/Header/header.js';


function routePecas() {
    return (
        <div className='flex-column'>
            <HeaderPMS/>
            <Pecas/> 
        </div>
    );
}

export default routePecas;