import "./evento-card.css";

import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Firebase from "../../config/firebase";

import { useSelector, useDispatch } from "react-redux";

function EventoCard({ id, img, titulo, detalhes, visualizacoes }) {
  const [urlImagem, setUrlImagem] = useState();

  useEffect(() => {
    Firebase.storage()
      .ref(`imagens/${img}`)
      .getDownloadURL()
      .then((url) => setUrlImagem(url));
  }, [urlImagem]);

  return (
    <div className="col-md-3 col-sm-12">
      <img
        src={urlImagem}
        className="card-img-top img-cartao"
        alt="Imagem do Evento"
      />
      <div>
        <h5>{titulo}</h5>
        <p className="card-text text-justify">{detalhes}</p>
        <div className="row rodape-card d-flex align-items-center ">
          <div className="col-6 ">
            <Link
              to={`/evento-detalhes/${id}`}
              className="btn btn-sm btn-detalhes"
            >
              + detalhes
            </Link>
          </div>
          <div className="col-6 text-right">
            <i class="far fa-eye"></i>
            <samp>{` ${visualizacoes}`}</samp>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventoCard;
