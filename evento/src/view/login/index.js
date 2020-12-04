import "./login.css";

import React, { useState } from "react";
import Firebase from "../../config/firebase";
import "firebase/auth";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();

  function logar() {
    Firebase.auth()
      .signInWithEmailAndPassword(email, senha)
      .then((response) => {
        {
          setMsgTipo("SUCESSO");
        }
      })
      .catch((error) => {
        setMsgTipo("ERRO");
      });
  }

  return (
    <div className="login-content d-flex aling-center">
      {" "}
      <form className="form-signin mx-auto">
        <div className="text-center mb-4">
          {/* <img
            className="mb-4"
            src="/docs/4.5/assets/brand/bootstrap-solid.svg"
            alt=""
            width="72"
            height="72"
          /> */}
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
          <a href="#" className="mx-2">
            Recuperar Senha
          </a>
          <span className="text-white">&#9733;</span>
          <a href="#" className="mx-2">
            Quero Cadastrar
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
