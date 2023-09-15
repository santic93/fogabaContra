import Context from './Context';
import { useReducer } from 'react';
import UseReducer from './UseReducer.jsx';
export default function UseContext({ children }) {
  const initialState = {
    afip: [],
    deuda: [],
    fogaba: [],
    buscar: false,
    sumaTotal: 0,
    posicion: null,
    fecha: []
  };
  const [state, dispatch] = useReducer(UseReducer, initialState);
  const completeDeudaBancos = (deuda) => {
console.log(deuda)
    const orden = deuda.sort((a, b) => b[6] - a[6]);
    const sumaTotal = orden.reduce((total, item) => total + item[6], 0);
    dispatch({
      type: 'COMPLETE_DEUDA',
      payload: { orden, sumaTotal },
    });
  };

  const completeFogaba = (fogaba) => {
    let posicion = null
    let fecha = []
    console.log(fogaba)
    fogaba.length ? posicion = fogaba[0][9] : posicion = null;
    if (fogaba.length) {
      // Inicializa la variable fechaMinima con la primera fecha
      let fechaMinima = new Date(fogaba[0][2]);
      fogaba.forEach((item) => {
        const fechaActual = new Date(item[2]);
        fecha.push(fechaActual.toLocaleDateString());
        // Compara con la fecha mínima actual y actualiza si es menor
        if (fechaActual < fechaMinima) {
          fechaMinima = fechaActual;
        }
      });
      // Convierte la fecha mínima a formato de cadena y guárdala en fecha
      fecha = fechaMinima.toLocaleDateString();
    }
    dispatch({
      type: 'COMPLETE_FOGABA',
      payload: { fogaba, posicion, fecha },
    });
  };
  const completeAfip = (afip) => {
    console.log(afip)
    dispatch({
      type: 'COMPLETE_AFIP',
      payload: afip,
    });
  };
  const buscando = (buscar) => {
    dispatch({
      type: 'ESTOY_BUSCANDO',
      payload: buscar,
    });
  };
  return (
    <Context.Provider
      value={{
        deuda: state.deuda,
        fogaba: state.fogaba,
        afip: state.afip,
        buscar: state.buscar,
        sumaTotal: state.sumaTotal,
        posicion: state.posicion,
        fecha: state.fecha,
        buscando,
        completeAfip,
        completeDeudaBancos,
        completeFogaba,
      }}
    >
      {children}
    </Context.Provider>
  );
}
