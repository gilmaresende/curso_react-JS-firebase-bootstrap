import "./evento-detalhes.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Firebase from "../../config/firebase";
import NavBar from "../../components/navbar/";

function EventoDetalhes() {
  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <div className="row">
          <img src="https://via.placeholder.com/150x100" className="img-banner" alt="Banner"></img>
        </div>
        <div className="row"></div>
      </div>
    </>
  );
}

export default EventoDetalhes;
