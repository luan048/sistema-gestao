import React from 'react';

import Siderbar from "../sidebar/sidebar";
import imgFundo from '../../public/imgFundo.png'

import './App.css';

function App() {

  return (
    <>
      <div className="container">
        <Siderbar />
        <div className="body">
          <img src={imgFundo} className='img-fundo' />
          <div className="conteudo-body">
            <h1 className="msg-saudacao">Bem-vindo(a)!</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
