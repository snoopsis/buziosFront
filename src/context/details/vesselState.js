import React, { useReducer } from "react";
import moment from "moment";
import axios from "axios";
import vesselContext from "./vesselContext";
import vesselReducer from "./vesselReducer";
import {
  GET_VESSEL_DETAILS,
  GET_BUZIOS_WEATHER,
  GET_PRATICAGEM,
  GET_DECOLAGENS,
  GET_VOOS_BUZIOS,
  GET_ERROR
} from "../types";

const VesselState = props => {
  const initialState = {
    detalhes: [],
    error: null,
    weather: [],
    diaHoje: moment().format("DD/MM/YYYY"),
    praticagem: [],
    decolagens: [],
    voosBuzios: [],
    amanha: moment()
      .add(+1, "Day")
      .format("DD/MM/YYYY"),
    doisDias: moment()
      .add(+2, "Day")
      .format("DD/MM/YYYY"),
    tresDias: moment()
      .add(+3, "Day")
      .format("DD/MM/YYYY"),
    quatroDias: moment()
      .add(+4, "Day")
      .format("DD/MM/YYYY"),
    prevHoje: [],
    prevAmanha: [],
    prevDoisDias: [],
    prevTresDias: [],
    prevQuatroDias: [],
    perHoje: [],
    perAmanha: [],
    perDoisDias: [],
    perTresDias: [],
    perQuatroDias: []
  };

  const [state, dispatch] = useReducer(vesselReducer, initialState);

  // Pega as informacoes do Buzios
  const getVesselDetails = async () => {
    try {
      const res = await axios.get("https://api.migueldias.net/buzios/details");

      dispatch({
        type: GET_VESSEL_DETAILS,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: GET_ERROR });
    }
  };

  // Pega as condicoes metereologicas do Buzios
  const getBuziosWeather = async () => {
    try {
      const res = await axios.get("https://api.migueldias.net/buzios/previsao");

      dispatch({
        type: GET_BUZIOS_WEATHER,
        payload: res.data,
        prevHoje: state.prevHoje,
        diaHoje: state.diaHoje,
        prevAmanha: state.prevAmanha,
        amanha: state.amanha,
        prevDoidsDias: state.prevDoisDias,
        doisDias: state.doisDias,
        prevTresDias: state.prevTresDias,
        tresDias: state.tresDias,
        prevQuatroDias: state.prevQuatroDias,
        quatroDias: state.quatroDias,
        perHoje: state.perHoje,
        perAmanha: state.perAmanha,
        perDoisDias: state.perDoisDias,
        perTresDias: state.perTresDias,
        perQuatroDias: state.perQuatroDias
      });
    } catch (err) {
      dispatch({ type: GET_ERROR });
    }
  };

  // Pega informacoes da praticagem no Rio de Janeiro
  const getPraticagem = async () => {
    try {
      const res = await axios.get(
        "https://api.migueldias.net/buzios/praticagem"
      );

      dispatch({
        type: GET_PRATICAGEM,
        payload: res.data
      });
    } catch (err) {
      dispatch({ type: GET_ERROR });
    }
  };

  // Pega informacoes da praticagem no Rio de Janeiro
  const getDecolagens = async () => {
    try {
      const res = await axios.get(
        "https://api.migueldias.net/buzios/voos/decolagem"
      );

      dispatch({
        type: GET_DECOLAGENS,
        payload: res.data,
        diaHoje: state.diaHoje
      });
    } catch (err) {
      dispatch({ type: GET_ERROR });
    }
  };

  // Pega Voos do Skandi Buzios
  const getVoosBuzios = async () => {
    try {
      const res = await axios.get(
        "https://api.migueldias.net/buzios/voos/decolagem"
      );

      dispatch({
        type: GET_VOOS_BUZIOS,
        payload: res.data,
        diaHoje: state.diaHoje
      });
    } catch (err) {
      dispatch({ type: GET_ERROR });
    }
  };

  return (
    <vesselContext.Provider
      value={{
        detalhes: state.detalhes,
        error: state.error,
        getVesselDetails,
        weather: state.weather,
        getBuziosWeather,
        praticagem: state.praticagem,
        getPraticagem,
        getDecolagens,
        decolagens: state.decolagens,
        getVoosBuzios,
        voosBuzios: state.voosBuzios,
        prevHoje: state.prevHoje,
        prevAmanha: state.prevAmanha,
        prevDoisDias: state.prevDoisDias,
        prevTresDias: state.prevTresDias,
        prevQuatroDias: state.prevQuatroDias,
        perHoje: state.perHoje,
        perAmanha: state.perAmanha,
        perDoisDias: state.perDoisDias,
        perTresDias: state.perTresDias,
        perQuatroDias: state.perQuatroDias
      }}
    >
      {props.children}
    </vesselContext.Provider>
  );
};

export default VesselState;
