import "./evento-cadastro.css";

import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import Firebase from "../../config/firebase";
import "firebase/auth";
import NavBar from "../../components/navbar/";

import { useSelector, useDispatch } from "react-redux";

function EventoCadastro() {
  const [msgTipo, setMsgTipo] = useState();
  const [titulo, setTitulo] = useState();
  const [tipo, setTipo] = useState();
  const [detalhes, setDetalhes] = useState();
  const [data, setData] = useState();
  const [hora, setHora] = useState();
  const [foto, setFoto] = useState();
  const [carregando, setCarregando] = useState();
  const usuarioEmail = useSelector((state) => state.usuarioEmail);

  const storage = Firebase.storage();
  const db = Firebase.firestore();

  async function cadastrarEvento() {
    setCarregando(true);
    setMsgTipo(null);

    const dataSave = {
      titulo,
      tipo,
      detalhes,
      data,
      hora,
      usuarioEmail: usuarioEmail,
      visualizacoes: 0,
      foto: foto.name,
      public: 1,
      dataCadastro: new Date(),
    };

    await storage
      .ref(`imagens/${foto.name}`)
      .put(foto)
      .then((response) => {
        db.collection("eventos")
          .add(dataSave)
          .then((reseponse2) => {
            setMsgTipo("SUCESSO");
          })
          .catch((erro) => {
            setMsgTipo("ERRO");
          });
      });
    setCarregando(false);
  }

  return (
    <>
      <NavBar />
      <div className="col-12 mt-5">
        <div className="row">
          <h3 className="mx-auto font-weight-bold">Novo Evento</h3>
        </div>
        <form>
          <div className="form-group">
            <label>Título:</label>
            <input
              onChange={(e) => setTitulo(e.target.value)}
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>Tipo do Evento:</label>
            <select
              onChange={(e) => setTipo(e.target.value)}
              className="form-control"
            >
              <option disabled selected value>
                -- Selecione um tipo --
              </option>
              <option>Festa</option>
              <option>Teatro</option>
              <option>Show</option>
              <option>Evento</option>
            </select>
          </div>
          <div className="form-group">
            <label>Descrição:</label>
            <textarea
              onChange={(e) => setDetalhes(e.target.value)}
              rows="3"
              type="text"
              className="form-control"
            />
          </div>
          <div className="form-group row">
            <div className="col-6">
              <label>Data:</label>
              <input
                onChange={(e) => setData(e.target.value)}
                type="date"
                className="form-control"
              />
            </div>
            <div className="col-6">
              <label>Hora:</label>
              <input
                onChange={(e) => setHora(e.target.value)}
                type="time"
                className="form-control"
              />
            </div>
          </div>
          <div className="form-group">
            <label>Upload da Foto:</label>
            <input
              onChange={(e) => setFoto(e.target.files[0])}
              type="file"
              className="form-control"
            />
          </div>
          <div className="row">
            {carregando ? (
              <div className="spinner-border text-danger mx-auto" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                onClick={cadastrarEvento}
                type="button"
                className="btn btn-lg btn-block mt-3 mb-5 btn-cadastro"
              >
                Publicar Evento
              </button>
            )}
          </div>
        </form>
        <div className="msg-login text-center my-2">
          {msgTipo === "SUCESSO" ? (
            <span>
              <strong>WoW!</strong> Evento Publicado! &#128526;
            </span>
          ) : msgTipo === "ERRO" ? (
            <span>
              <strong>Ops!</strong> Não foi possivel publicar o evento!
              &#128546;
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
export default EventoCadastro;
