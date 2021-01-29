import React from "react";
import Previsao from "../previsao/Previsao";
import Praticagem from "../praticagem/Praticagem";
import Voos from "../voos/Voos";
import Hero from "../hero/Hero";
import Decolagens from "../decolagens/Decolagens";

const Home = () => {
  return (
    <div>
      <Hero />
      <Voos />
      <Decolagens />
      <Previsao />
      <Praticagem />
    </div>
  );
};

export default Home;
