import React from 'react';

// Carregando os estilos
import './global.css';

// Importando as rotas
import Routes from './routes';

// Componente no React é uma Função que retorna Html
// Quando o html está escrito dentro do Javascript é chamado de JSX
// JSX = JavaScript e XML
function App() {
  return (
    <Routes />
  );
}

export default App;
