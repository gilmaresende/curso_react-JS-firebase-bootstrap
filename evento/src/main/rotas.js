import React from "react";

import { Route, Switch, HashRouter } from "react-router-dom";

import Login from "../view/login/";
import CadastroUsuario from "../view/usuario-novo";
import Home from "../view/home/";
import UsuarioRecuperarSenha from "../view/usuario-recuperar-senha";

function Rotas() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/novo-usuario" component={CadastroUsuario} />
        <Route exact path="/login" component={Login} />
        <Route
          exact
          path="/usuario-recuperar-senha"
          component={UsuarioRecuperarSenha}
        />
      </Switch>
    </HashRouter>
  );
}

export default Rotas;
