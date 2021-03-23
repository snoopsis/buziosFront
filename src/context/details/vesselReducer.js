import {
  GET_VESSEL_DETAILS,
  GET_BUZIOS_WEATHER,
  GET_PRATICAGEM,
  GET_DECOLAGENS,
  GET_VOOS_BUZIOS,
  GET_ERROR
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_VESSEL_DETAILS:
      return {
        ...state,
        detalhes: action.payload
      };

    case GET_BUZIOS_WEATHER:
      return {
        ...state,
        prevHoje: action.payload.filter(i => i.data === action.diaHoje),
        prevAmanha: action.payload.filter(i => i.data === action.amanha),
        prevDoisDias: action.payload.filter(i => i.data === action.doisDias),
        prevTresDias: action.payload.filter(i => i.data === action.tresDias),
        prevQuatroDias: action.payload.filter(
          i => i.data === action.quatroDias
        ),
        perHoje: parseFloat(state.prevHoje.map(i => i.ondaPeriodo)),
        perAmanha: parseFloat(state.prevAmanha.map(i => i.ondaPeriodo)),
        perDoisDias: parseFloat(state.prevDoisDias.map(i => i.ondaPeriodo)),
        perTresDias: parseFloat(state.prevTresDias.map(i => i.ondaPeriodo)),
        perQuatroDias: parseFloat(state.prevQuatroDias.map(i => i.ondaPeriodo))
      };

    case GET_PRATICAGEM:
      return {
        ...state,
        praticagem: action.payload
      };

    case GET_DECOLAGENS:
      return {
        ...state,
        decolagens: action.payload.filter(
          i => i.data === action.diaHoje && i.saida_aero !== ""
        )
      };

    case GET_VOOS_BUZIOS:
      return {
        ...state,
        voosBuzios: action.payload.filter(
          i => i.data === action.diaHoje && i.procedencia.match("SKBU")
        )
      };

    case GET_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};
