import './App.css';
import Layout from './Components/Layout/Layout';
import Consulta from './Components/Consulta/Consulta';
import UseContext from './Context/UseContext';
import Formulario from './Components/Formulario/Formulario';
import { Routes, Route, useNavigate, redirect } from 'react-router-dom';
import Precalificador from './Components/Precalificador/Precalificador';
import Popup from './Components/Popup/Popup';
import { useEffect, useState } from 'react';
import Totales from './Components/Totales/Totales';
import Indicadores from './Components/Indicadores/Indicadores';
import Portal from './Components/Portal/Portal';
import Operaciones from './Components/Operaciones/Operaciones';
import PopupOperaciones from './Components/Popup/PopupOperaciones';

function App() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      navigate('/portal');
    }
  }, [isAuthenticated]);

  return (
    <div className='App'>
      <UseContext>
        <Layout>
          <Routes>
            {isAuthenticated ? (
              <>
                <Route path='/consulta' element={<Consulta />} />
                <Route path='/formulario' element={<Formulario />} />
                <Route path='/precalificador' element={<Precalificador />} />
                <Route path='/indicadores' element={<Indicadores />} />
                <Route path='/portal' element={<Portal />} />
                <Route path='/operaciones' element={<Operaciones />} />
                <Route
                  path='/comentarios/:idComentario'
                  element={<PopupOperaciones />}
                />
              </>
            ) : (
              <Route index path='/' element={<Popup />} />
            )}
          </Routes>
        </Layout>
      </UseContext>
    </div>
  );
}

export default App;
