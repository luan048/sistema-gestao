import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHouse} from '@fortawesome/free-solid-svg-icons'

import logoMenu from '../../public/logoMenu.jpg'

import './sidebar.css'

function Siderbar({fixed}) {

    const navigate = useNavigate()

    const homePage = () => {
        navigate('/')
    }

    const listPage = () => {
        navigate('/listPage')
    }

    const registerPage = () => {
        navigate('/registerPage')
    }

    const purchasePage = () => {
        navigate('/purchasePage')
    }

    const performaceMonth = () => {
        navigate('/performaceMonth')
    }

    
    return (
        <div className={`siderbar ${fixed ? 'fixed' : ''}`}>
            <img src={logoMenu} className="logoMenu" />
            <FontAwesomeIcon icon={faHouse} className="faHouse" onClick={homePage} />
            <div className="conteudo-sidebar">
                <button className="btn-cadastrar" onClick={registerPage}>Cadastrar Vendas</button>
                <button className="btn-visualizar" onClick={listPage} >Visualizar Vendas Totais</button>
                <button className="btn-materiais" onClick={purchasePage} >Cadastrar Materiais</button>
                <button className="btn-desempenho" onClick={performaceMonth} >Visualizar Desempenho</button>
            </div>
        </div>
    )
}

export default Siderbar