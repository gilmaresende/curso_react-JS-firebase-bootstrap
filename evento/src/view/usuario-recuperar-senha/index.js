import "./usuario-recuperar-senha.css";

import React, { useState } from "react";
import Firebase from "../../config/firebase";
import NavBar from "../../components/navbar/";

import "firebase/auth";

function UsuarioRecuperarSenha() {
  const [email, setEmail] = useState();
  const [msg, setMsg] = useState();

  function recuperarSenha() {
    Firebase.auth()
      .sendPasswordResetEmail(email)
      .then((response) => {
        setMsg("Enviamos um link no e-mail para redefinir sua senha.");
      })
      .catch((error) => {
        setMsg("E-mail não encontrado, verifique seu e-mail.");
      });
  }

  return (
    <>
      <NavBar />
      <form className="text-center form-login mx-auto mt-5">
        <h3 className="mb-3 font-weight-bold">Recuperar Senha</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control my-2"
          placeholder="Email"
        />
        <div className="msg my-4 text-center">
          <sapn>{msg}</sapn>
        </div>

        <button
          type="button"
          className="btm btn-lg btn-block btn-enviar "
          onClick={recuperarSenha}
        >
          Recuperar Senha
        </button>
      </form>
    </>
  );
}
export default UsuarioRecuperarSenha;
