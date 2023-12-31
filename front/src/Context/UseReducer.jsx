const COMPLETE_DEUDA = 'COMPLETE_DEUDA';
const COMPLETE_FOGABA = 'COMPLETE_FOGABA';
const COMPLETE_AFIP = 'COMPLETE_AFIP';
const ESTOY_BUSCANDO = 'ESTOY_BUSCANDO';
const COMPLETE_USUARIOS = 'COMPLETE_USUARIOS';
const IR_PRECALIFICADOR = 'IR_PRECALIFICADOR';
const COMPLETE_INDICADORES = 'COMPLETE_INDICADORES';
const COMPLETE_TRADICIONALES_EXPRESS = "COMPLETE_TRADICIONALES_EXPRESS";
const COMPLETE_OPERACIONES_CHEQUES = "COMPLETE_OPERACIONES_CHEQUES";
const COMPLETE_COMENTARIOS = "COMPLETE_COMENTARIOS"

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
    case IR_PRECALIFICADOR:
      return { ...state, precalificar: payload };
    case COMPLETE_USUARIOS:
      return { ...state, usuarios: payload };
    case COMPLETE_INDICADORES:
      return { ...state, indicadores: payload };
    case COMPLETE_TRADICIONALES_EXPRESS:
      return { ...state, tradicionalesYTradicionalesExpress: payload.tradicionalesYTradicionalesExpress, sumaTradicionales: payload.sumaTradicionales, promedioDias: payload.promedioDias };
    case COMPLETE_OPERACIONES_CHEQUES:
      return { ...state, operacionesDeCheques: payload.operacionesDeCheques, sumaCheques: payload.sumaCheques, sumaGarantias: payload.sumaGarantias, cantidadChequesConFecha: payload.cantidadChequesConFecha };
    case COMPLETE_COMENTARIOS:
      return { ...state, comentariosComercial: payload }

  }
}
