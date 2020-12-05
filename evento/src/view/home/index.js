import "./home.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import NavBar from "../../components/navbar/";

function Home() {
  return (
    <>
      <NavBar />
      <h1>{`Bem vindo ${useSelector((state) => state.usuarioLogado)}`}</h1>
    </>
  );
}
export default Home;
