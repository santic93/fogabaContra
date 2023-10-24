import Context from './Context';
import { useReducer } from 'react';
import UseReducer from './UseReducer.jsx';
export default function UseContext({ children }) {
  const initialState = {
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
  };
  const [state, dispatch] = useReducer(UseReducer, initialState);
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
    // if (fogaba.length) {
    // Inicializa la variable fechaMinima con la primera fecha
    // let fechaMinima = new Date(fogaba[0][2]);
    // fogaba.forEach((item) => {
    //   const fechaActual = new Date(item[2]);
    //   fecha.push(fechaActual.toLocaleDateString());
    // Compara con la fecha mínima actual y actualiza si es menor
    // if (fechaActual < fechaMinima) {
    //   fechaMinima = fechaActual;
    // }
    // });

    // Convierte la fecha mínima a formato de cadena y guárdala en fecha
    fogaba.length ? fecha = Math.ceil(fogaba[0][10]) : fecha = ""
    if (fogaba.length) { for (let i = 0; i < fogaba.length; i++) { saldoVivo += fogaba[i][6] } } else { saldoVivo = 0 };




    // }
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
        posicion: state.posicion,
        fecha: state.fecha,
        saldoVivo: state.saldoVivo,
        cendeuUltimoRegistro: state.cendeuUltimoRegistro,
        nombreEntidad: state.nombreEntidad,
        situacion: state.situacion,
        montoAdeudado: state.montoAdeudado,
        indicadores: state.indicadores,
        precalificador,
        buscando,
        completeAfip,
        completeDeudaBancos,
        completeFogaba,
        completeUsuarios,
        completeIndicadores
      }}
    >
      {children}
    </Context.Provider>
  );
}
