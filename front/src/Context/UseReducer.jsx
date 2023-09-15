const COMPLETE_DEUDA = 'COMPLETE_DEUDA';
const COMPLETE_FOGABA = 'COMPLETE_FOGABA';
const COMPLETE_AFIP = 'COMPLETE_AFIP';
const ESTOY_BUSCANDO = 'ESTOY_BUSCANDO';
export default function UseReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case COMPLETE_DEUDA:
      return { ...state, deuda: payload.orden, sumaTotal: payload.sumaTotal };
    case COMPLETE_FOGABA:
      return { ...state, fogaba: payload.fogaba, posicion: payload.posicion, fecha: payload.fecha };
    case COMPLETE_AFIP:
      return { ...state, afip: payload };
    case ESTOY_BUSCANDO:
      return { ...state, buscar: payload };
  }
}
