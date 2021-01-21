import React, { useEffect, useState } from "react";
import Chart from "../chart/Chart";
import Previsao from "../previsao/Previsao";
import Praticagem from "../praticagem/Praticagem";
import Voos from "../voos/Voos";
import Hero from "../hero/Hero";
import Decolagens from "../decolagens/Decolagens";
import moment from "moment";

const Home = () => {
  const [previsao, setPrevisao] = useState([]);
  const [aeroTodos, setAeroTodos] = useState([]);
  const [details, setDetails] = useState();
  const [praticagem, setPraticagem] = useState([]);
  const [decolagens, setDecolagens] = useState([]);

  const diaHoje = moment().format("DD/MM/YYYY");
  let dias = aeroTodos.map(todos => {
    return todos;
  });

  useEffect(() => {
    async function previsao() {
      const res = await fetch("https://api.migueldias.net/buzios/previsao");
      res.json().then(res => setPrevisao(res));
    }

    previsao();

    async function voosHojeHms() {
      const res = await fetch("https://api.migueldias.net/buzios/voos");
      res.json().then(res => setAeroTodos(res));
    }

    voosHojeHms();

    async function details() {
      const res = await fetch("https://api.migueldias.net/buzios/details");
      res.json().then(res => setDetails(res));
    }

    details();

    async function praticos() {
      const res = await fetch("https://api.migueldias.net/buzios/praticagem");
      res.json().then(res => setPraticagem(res));
    }

    praticos();

    async function decolagens() {
      const res = await fetch(
        "https://api.migueldias.net/buzios/voos/decolagem"
      );
      res
        .json()
        .then(res =>
          setDecolagens(
            res.filter(i => i.saida_aero !== "" && i.data === diaHoje)
          )
        );
    }

    decolagens();

    const interval = setInterval(() => {
      // previsao();
      // voosHojeHms();
      // details();
      decolagens();
    }, 20000);
    return () => clearInterval(interval);
  }, [diaHoje]);

  // Resultado de voo por dia ordenado
  const amanha = moment()
    .add(+1, "Day")
    .format("DD/MM/YYYY");

  const doisDias = moment()
    .add(+2, "Day")
    .format("DD/MM/YYYY");

  const tresDias = moment()
    .add(+3, "Day")
    .format("DD/MM/YYYY");

  const quatroDias = moment()
    .add(+4, "Day")
    .format("DD/MM/YYYY");

  const prevHoje = previsao.filter(i => i.data === diaHoje);
  const prevAmanha = previsao.filter(i => i.data === amanha);
  const prevDoisDias = previsao.filter(i => i.data === doisDias);
  const prevTresDias = previsao.filter(i => i.data === tresDias);
  const prevQuatroDias = previsao.filter(i => i.data === quatroDias);

  const perHoje = parseFloat(prevHoje.map(i => i.ondaPeriodo));
  const perAmanha = parseFloat(prevAmanha.map(i => i.ondaPeriodo));
  const perDoisDias = parseFloat(prevDoisDias.map(i => i.ondaPeriodo));
  const perTresDias = parseFloat(prevTresDias.map(i => i.ondaPeriodo));
  const perQuatroDias = parseFloat(prevQuatroDias.map(i => i.ondaPeriodo));

  const heliHoje = dias.filter(res => res.data === diaHoje);
  const rjpilots = praticagem.filter(
    res =>
      (res.data === diaHoje && res.navio.includes("SAPURA")) ||
      res.navio.includes("CBO") ||
      res.navio.includes("SKANDI") ||
      res.navio.includes("BRAM") ||
      res.navio.includes("STARNAV") ||
      res.navio.includes("SEVEN")
  );

  return (
    <div>
      <Hero details={details} />
      <Voos
        voos={heliHoje}
        prevHoje={prevHoje}
        prevAmanha={prevAmanha}
        prevTresDias={prevTresDias}
        prevQuatroDias={prevQuatroDias}
        prevDoisDias={prevDoisDias}
        perHoje={perHoje}
        perAmanha={perAmanha}
        perDoisDias={perDoisDias}
        perTresDias={perTresDias}
        perQuatroDias={perQuatroDias}
      />
      <Decolagens decolagens={decolagens} />
      <Previsao
        voos={heliHoje}
        prevHoje={prevHoje}
        prevAmanha={prevAmanha}
        prevTresDias={prevTresDias}
        prevQuatroDias={prevQuatroDias}
        prevDoisDias={prevDoisDias}
        perHoje={perHoje}
        perAmanha={perAmanha}
        perDoisDias={perDoisDias}
        perTresDias={perTresDias}
        perQuatroDias={perQuatroDias}
      />
      <Chart
        voos={heliHoje}
        prevHoje={prevHoje}
        prevAmanha={prevAmanha}
        prevTresDias={prevTresDias}
        prevQuatroDias={prevQuatroDias}
        prevDoisDias={prevDoisDias}
        perHoje={perHoje}
        perAmanha={perAmanha}
        perDoisDias={perDoisDias}
        perTresDias={perTresDias}
        perQuatroDias={perQuatroDias}
      />
      <Praticagem rjpilots={rjpilots} />
    </div>
  );
};

export default Home;
