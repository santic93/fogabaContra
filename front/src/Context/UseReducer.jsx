const COMPLETE_DEUDA = 'COMPLETE_DEUDA';
const COMPLETE_FOGABA = 'COMPLETE_FOGABA';
const COMPLETE_AFIP = 'COMPLETE_AFIP';
const ESTOY_BUSCANDO = 'ESTOY_BUSCANDO';
const COMPLETE_USUARIOS = 'COMPLETE_USUARIOS';
const COMPLETE_INDICADORES = 'COMPLETE_INDICADORES';
export default function UseReducer(state, action) {
  const { payload, type } = action;
  switch (type) {
    case COMPLETE_DEUDA:
      return { ...state, deuda: payload.orden, sumaTotal: payload.sumaTotal, cendeuUltimoRegistro: payload.cendeuUltimoRegistro, nombreEntidad: payload.nombreEntidad, situacion: payload.situacion, montoAdeudado: payload.montoAdeudado };
    case COMPLETE_FOGABA:
      return { ...state, fogaba: payload.fogaba, posicion: payload.posicion, fecha: payload.fecha, saldoVivo: payload.saldoVivo };
    case COMPLETE_AFIP:
      return { ...state, afip: payload };
    case ESTOY_BUSCANDO:
      return { ...state, buscar: payload };
    case COMPLETE_USUARIOS:
      return { ...state, usuarios: payload };
    case COMPLETE_INDICADORES:
      return { ...state, indicadores: payload };
  }
}
