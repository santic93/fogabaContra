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
  };
  const [state, dispatch] = useReducer(UseReducer, initialState);
  const completeDeudaBancos = (deuda) => {
    const orden = deuda.sort((a, b) => b[5] - a[5]);
    const sumaTotal = orden.reduce((total, item) => total + item[5], 0);
    dispatch({
      type: 'COMPLETE_DEUDA',
      payload: { orden, sumaTotal },
    });
  };

  const completeFogaba = (fogaba) => {
    dispatch({
      type: 'COMPLETE_FOGABA',
      payload: fogaba,
    });
  };
  const completeAfip = (afip) => {
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
