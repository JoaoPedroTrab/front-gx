import React from 'react';
import './menu.css'  
import { AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineAudit, AiOutlineBars } from "react-icons/ai"; //import dos Icons
import { Link } from 'react-router-dom';

const Menu = () => { 
    return (
        <div className='botoes'>
                <div className='top'>   {/*Buttons da parte de cima, Cadastrar e Retirar*/}
                    <Link to='/categoria/cadastro'>
                        <span className="top">
                            <div className='buttonOne'>
                                <div className='text-button'>
                                    <AiOutlineArrowUp />
                                    <b> Cadastrar</b>
                                </div>
                            </div>
                        </span>
                    </Link>
                    <Link to='/Retirada'>
                        <div className='buttonTwo'>
                            <div className='text-button'>
                                <AiOutlineArrowDown/>
                                <b> Retirar</b>
                            </div>
                        </div>
                    </Link> 
                </div>
                <div className='down'>  {/*Buttons da parte de baixo, Listar P. e Relatório*/}
                    <Link to="/painel">
                        <div className='buttonThree'>
                            <div className='text-button'>
                                <AiOutlineBars />
                                <b> Listar P.</b>
                            </div>
                        </div>
                    </Link>
                    <Link to="/relatorio"> 
                        <div className='buttonFour'>
                            <div className='text-button'>
                                <AiOutlineAudit />
                                <b> Relatórios</b>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
    );
}

export default Menu;