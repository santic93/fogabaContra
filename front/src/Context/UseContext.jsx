import Context from './Context';
import { useReducer } from 'react';
import UseReducer from './UseReducer.jsx';
export default function UseContext({ children }) {
  const initialState = {
    tradicionalesYTradicionalesExpress: [],
    operacionesDeCheques: [],
    operacionesWag: [],
    usuarios: [],
    afip: [],
    deuda: [],
    fogaba: [],
    buscar: false,
    precalificar: true,
    sumaTotal: 0,
    posicion: null,
    fecha: [],
    cendeuUltimoRegistro: "",
    nombreEntidad: [],
    situacion: [],
    montoAdeudado: [],
    indicadores: [],
    sumaTradicionales: 0,
  };
  const [state, dispatch] = useReducer(UseReducer, initialState);
  const completeOperacionesDeCheques = (operacionesDeCheques) => {
    //     const fechaOriginal = '2024-10-23T03:00:00.000Z';
    // const partes = fechaOriginal.split('T')[0].split('-');
    // const dia = partes[2];
    // const mes = partes[1];
    // const año = partes[0];
    // const fechaFormateada = `${dia}-${mes}-${año}`;

    // console.log(fechaFormateada); // Esto mostrará '23-10-2024'

    dispatch({
      type: 'COMPLETE_OPERACIONES_CHEQUES',
      payload: operacionesDeCheques,
    });
  };
  const completeOperacionesWag = (operacionesWag) => {

    // const partes = fechaOriginal.split('T')[0].split('-');
    // const dia = partes[2];
    // const mes = partes[1];
    // const año = partes[0];
    // const fechaFormateada = `${dia}-${mes}-${año}`;

    // console.log(fechaFormateada); // Esto mostrará '23-10-2024'

    dispatch({
      type: 'COMPLETE_OPERACIONES_WAG',
      payload: operacionesWag,
    });
  };
  const completeTradicionalesYTradicionalesExpress = (tradicionalesYTradicionalesExpress) => {
    const orden = tradicionalesYTradicionalesExpress.sort((a, b) => b[7] - a[7]);
    const sumaTradicionales = orden.reduce((total, item) => total + item[7], 0);
    
    // const partes = fechaOriginal.split('T')[0].split('-');
    // const dia = partes[2];
    // const mes = partes[1];
    // const año = partes[0];
    // const fechaFormateada = `${dia}-${mes}-${año}`;

    // console.log(fechaFormateada); // Esto mostrará '23-10-2024'

    dispatch({
      type: 'COMPLETE_TRADICIONALES_EXPRESS',
      payload: { tradicionalesYTradicionalesExpress, sumaTradicionales },
    });
  };
  const completeDeudaBancos = (deuda) => {
    const nombreEntidad = []
    const situacion = []
    const montoAdeudado = []
    {
      deuda.forEach((item) => (
        nombreEntidad.push(item[3]),
        situacion.push(item[5]),
        montoAdeudado.push(item[6])
      ))
    }
    const orden = deuda.sort((a, b) => b[6] - a[6]);
    const sumaTotal = orden.reduce((total, item) => total + item[6], 0);
    const cendeuUltimoRegistro = deuda.map((item) => (item[4]))
    dispatch({
      type: 'COMPLETE_DEUDA',
      payload: { orden, sumaTotal, cendeuUltimoRegistro, nombreEntidad, situacion, montoAdeudado },
    });
  };

  const completeFogaba = (fogaba) => {
    let posicion = null
    let fecha = ''
    let saldoVivo = 0
    fogaba.length ? posicion = fogaba[0][9] : posicion = null;
    // Convierte la fecha mínima a formato de cadena y guárdala en fecha
    fogaba.length ? fecha = Math.ceil(fogaba[0][10]) : fecha = ""
    if (fogaba.length) { for (let i = 0; i < fogaba.length; i++) { saldoVivo += fogaba[i][6] } } else { saldoVivo = 0 };
    dispatch({
      type: 'COMPLETE_FOGABA',
      payload: { fogaba, posicion, fecha, saldoVivo },
    });
  };
  const completeAfip = (afip) => {
    dispatch({
      type: 'COMPLETE_AFIP',
      payload: afip,
    });
  };
  const completeUsuarios = (usuarios) => {
    dispatch({
      type: 'COMPLETE_USUARIOS',
      payload: usuarios,
    });
  };
  const buscando = (buscar) => {
    dispatch({
      type: 'ESTOY_BUSCANDO',
      payload: buscar,
    });
  };
  const precalificador = (precalificar) => {
    dispatch({
      type: 'IR_PRECALIFICADOR',
      payload: precalificar,
    });
  };
  const completeIndicadores = (indicadores) => {
    dispatch({
      type: 'COMPLETE_INDICADORES',
      payload: indicadores,
    });
  };
  return (
    <Context.Provider
      value={{
        precalificar: state.precalificar,
        usuarios: state.usuarios,
        deuda: state.deuda,
        fogaba: state.fogaba,
        afip: state.afip,
        buscar: state.buscar,
        sumaTotal: state.sumaTotal,
        sumaTradicionales: state.sumaTradicionales,
        posicion: state.posicion,
        fecha: state.fecha,
        saldoVivo: state.saldoVivo,
        cendeuUltimoRegistro: state.cendeuUltimoRegistro,
        nombreEntidad: state.nombreEntidad,
        situacion: state.situacion,
        montoAdeudado: state.montoAdeudado,
        indicadores: state.indicadores,
        tradicionalesYTradicionalesExpress: state.tradicionalesYTradicionalesExpress,
        operacionesDeCheques: state.operacionesDeCheques,
        operacionesWag: state.operacionesWag,
        precalificador,
        buscando,
        completeAfip,
        completeDeudaBancos,
        completeFogaba,
        completeUsuarios,
        completeIndicadores,
        completeTradicionalesYTradicionalesExpress,
        completeOperacionesDeCheques,
        completeOperacionesWag
      }}
    >
      {children}
    </Context.Provider>
  );
}
