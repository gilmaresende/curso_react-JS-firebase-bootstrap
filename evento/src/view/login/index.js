import "./login.css";

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Firebase from "../../config/firebase";
import "firebase/auth";

import { useSelector, useDispatch } from "react-redux";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  const dispatch = useDispatch();

  function logar() {
    Firebase.auth()
      .signInWithEmailAndPassword(email, senha)
      .then((response) => {
        setMsgTipo("SUCESSO");
        setTimeout(() => {
          dispatch({ type: "LOG_IN", usuarioEmail: email });
        }, 2000);
        console.log(response.user.uid);
      })
      .catch((error) => {
        setMsgTipo("ERRO");
      });
  }

  return (
    <div className="login-content d-flex aling-center">
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/" />
      ) : null}
      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          <i class="far fa-smile-wink text-white fa-5x"></i>
          <h1 className="h3 mb-3 font-weight-normal text-white font-weight-bold">
            Login
          </h1>
        </div>

        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          id="inputEmail"
          className="form-control my-2"
          placeholder="Email"
        />

        <input
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          id="inputPassword"
          className="form-control my-2"
          placeholder="Senha"
        />

        <button
          onClick={logar}
          className="btn btn-lg btn-block btn-login"
          type="button"
        >
          Logar
        </button>

        <div className="msg-login text-white text-center my-5">
          {msgTipo === "SUCESSO" ? (
            <span>
              <strong>WoW!</strong> Você esta conectado! &#128526;
            </span>
          ) : msgTipo === "ERRO" ? (
            <span>
              <strong>Ops!</strong> Verificaque estão corretos! &#128546;
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="opcoes-login mt-5 text-center">
          <Link to="/usuario-recuperar-senha" className="mx-2">
            Recuperar Senha
          </Link>
          <span className="text-white">&#9733;</span>
          <Link to="/novo-usuario" className="mx-2">
            Quero Cadastrar
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
