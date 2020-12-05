import React from "react";

import { Route, Switch, HashRouter, Redirect } from "react-router-dom";

import Login from './view/login/'
import CadastroUsuario from './view/usuario-novo'

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/novo-usuario" component={CadastroUsuario} />
      </Switch>
    </HashRouter>
  );
}

export default Rotas;
