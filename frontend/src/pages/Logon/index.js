import React from "react";
import "./styles.css";
import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
// import { FiLogIn } from "react-icons";

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Bn" />
        <form action="">
          <h1> Faça seu Logon</h1>

          <input placeholder="Sua id"></input>
          <button type="submit">Entrar</button>

          <a href="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </a>
        </form>
      </section>

      <img src={{ heroesImg }} alt="Heroes" />
    </div>
  );
}
