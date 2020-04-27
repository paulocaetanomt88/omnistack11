import React from 'react';
// BrowserRouter é o que precisa para que as rotas funcionem
// Route é cada uma das rotas
// Switch 
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './pages/Logon';
import Cadastro from './pages/Cadastro';
import Perfil from './pages/Perfil';
import NovoCaso from './pages/NovoCaso';

export default function Routes() {
    // Switch vai garantir que apenas uma rota seja executada por momento
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/casos/novo" component={NovoCaso} />
            </Switch>
        </BrowserRouter>
    );
}