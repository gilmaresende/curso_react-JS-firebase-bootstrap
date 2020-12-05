import React, { useState } from "react";
import Firebase from "../../config/firebase";
import NavBar from "../../components/navbar/";

import "firebase/auth";

import "./usuario-novo.css";

function NovoUsuario() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [msgTipo, setMsgTipo] = useState();
  const [msg, setMsg] = useState();
  const [carregando, setCarregando] = useState();
  function cadastrar() {
    setCarregando(true);

    setMsg(null);

    if (!email || !senha) {
      setMsgTipo("ERRO");
      setMsg("você precisa infomar o email e senha para concluir o cadastro!");
      return;
    }

    Firebase.auth()
      .createUserWithEmailAndPassword(email, senha)
      .then((response) => {
        setMsgTipo("SUCESSO");
      })
      .catch((error) => {
        switch (error.code) {
          case "auth/weak-password":
            setMsg("A senha deve ter pelo menos 6 caracteres!");
            break;
          case "auth/email-already-in-use":
            setMsg("O e-mail já esta sendo utilizado por outra conta!");
            break;
          case "auth/invalid-email":
            setMsg("Formato e-mail invalido!");
            break;
          default:
            setMsg("Não foi possível cadastrar. Tente novamente mais tarde!");
            break;
        }
        setMsgTipo("ERRO");
      });

    setCarregando(false);
  }

  return (
    <div>
      <NavBar />
      <div className="form-cadastro">
        <form className="text-center form-login mx-auto mt-5">
          <h1 chassName="h3 mb-3 text-black font-weight-bold">Novo Cadastro</h1>{" "}
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="mail"
            className="form-control my-2"
            placeholder="Email"
          ></input>
          <input
            onChange={(e) => setSenha(e.target.value)}
            type="password"
            className="form-control my-2"
            placeholder="Senha"
          ></input>
          {carregando ? (
            <div className="spinner-border text-danger" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button
              onClick={cadastrar}
              type="button"
              className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
            >
              Cadastrar
            </button>
          )}
          <div className="msg-login text-black text-center my-5">
            {msgTipo === "SUCESSO" ? (
              <span>
                <strong>WoW!</strong> Usuário Cadastrado com Sucesso! &#128526;
              </span>
            ) : msgTipo === "ERRO" ? (
              <span>
                <strong> Ops!</strong>
                {msg} &#128546;
              </span>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
//
export default NovoUsuario;
