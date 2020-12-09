import "./evento-detalhes.css";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Firebase from "../../config/firebase";
import NavBar from "../../components/navbar/";

function EventoDetalhes(props) {
  const [evento, setEvento] = useState({});
  const [urlImg, setUrlImg] = useState({});
  const usuarioLogado = useSelector((state) => state.usuarioEmail);

  useEffect(() => {
    Firebase.firestore()
      .collection("eventos")
      .doc(props.match.params.id)
      .get()
      .then((response) => {
        setEvento(response.data());

        Firebase.storage()
          .ref(`imagens/${evento.foto}`)
          .getDownloadURL()
          .then((url) => setUrlImg(url));
      });
  });

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <img src={urlImg} className="img-banner" alt="Banner"></img>

          <div className="col-12 text-right mt-1 visualicacao">
            <i class="far fa-eye"></i>
            <samp>{evento.visualizacoes}</samp>
          </div>

          <h3 className="mx-auto mt-5 titulo">
            <strong>{evento.titulo}</strong>
          </h3>
        </div>
        <div className="row mt-5 d-flex justify-content-around">
          <div className="col-md-3 col-sm-12 box-infor p-3 my-2">
            <i className="fas fa-ticket-alt fa-2x"></i>
            <h5>
              <strong>Tipo</strong>
            </h5>
            <span className="mt-3">{evento.tipo}</span>
          </div>
          <div className="col-md-3 col-sm-12 box-infor p-3 my-2">
            <i className="fas fa-calendar-alt fa-2x"></i>
            <h5>
              <strong>Data</strong>
            </h5>
            <span className="mt-3">{evento.data}</span>
          </div>
          <div className="col-md-3 col-sm-12 box-infor p-3 my-2">
            <i className="fas fa-clock fa-2x"></i>
            <h5>
              <strong>Hora</strong>
            </h5>
            <span className="mt-3">{evento.hora}</span>
          </div>
        </div>
        <div className="row box-detalhes mt-5">
          <div className="col-12 text-center">
            <h5>
              <strong>Detalhes do Evento</strong>
            </h5>
          </div>
        </div>

        <div className="col-12 text-center">
          <p>{evento.detalhes}</p>
        </div>
        {usuarioLogado === evento.usuarioEmail ? (
          <Link to="" className="btn-editar">
            <i className="fas fa-pen-square fa-3x"></i>
          </Link>
        ) : null}
      </div>
    </>
  );
}

export default EventoDetalhes;
