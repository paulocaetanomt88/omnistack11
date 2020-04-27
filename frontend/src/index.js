//Importando o React
import React from 'react';

//Importando o ReactDOM, que é a integração do React com o navegador
// DOM é a árvore de elementos
import ReactDOM from 'react-dom';

// Importando o arquivo App.js
import App from './App';

// Processo de renderização (colocar em tela)
// colocando o App.js dentro da div com id 'root' no index.html
ReactDOM.render(<App />, document.getElementById('root'));