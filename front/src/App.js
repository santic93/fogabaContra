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

function App() {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('user');
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
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
// import './App.css';
// import Layout from './Components/Layout/Layout';
// import Consulta from './Components/Consulta/Consulta';
// import UseContext from './Context/UseContext';
// import Formulario from './Components/Formulario/Formulario';
// import {
//   BrowserRouter,
//   Routes,
//   Route,
//   useNavigate,
// } from 'react-router-dom';
// import Espere from './Components/Espere/Espere';
// import Precalificador from './Components/Precalificador/Precalificador';
// import Popup from './Components/Popup/Popup';
// import { useEffect, useState } from 'react';
// import Totales from './Components/Totales/Totales';
// import Indicadores from './Components/Indicadores/Indicadores';
// import PrivateRoute from './PrivateRoute';

// function App() {
//   const navigate = useNavigate();
//   const isAuthenticated = localStorage.getItem('user');

//   useEffect(() => {
//     if (!isAuthenticated) {
//       navigate('/');
//     }
//   }, [isAuthenticated, navigate]);

//   return (
//     <div className='App'>
//       <UseContext>
//         <Layout>

//             <PrivateRoute
//               path='/consulta'
//               element={<Consulta />}
//               isAuthenticated={isAuthenticated}
//             />
//             <PrivateRoute
//               path='/formulario'
//               element={<Formulario />}
//               isAuthenticated={isAuthenticated}
//             />
//             <PrivateRoute
//               path='/precalificador'
//               element={<Precalificador />}
//               isAuthenticated={isAuthenticated}
//             />
//             <PrivateRoute
//               path='/totales'
//               element={<Totales />}
//               isAuthenticated={isAuthenticated}
//             />
//             <PrivateRoute
//               path='/indicadores'
//               element={<Indicadores />}
//               isAuthenticated={isAuthenticated}
//             />
//               <Routes>
//             <Route path='/' element={<Popup />} />
//           </Routes>
//         </Layout>
//       </UseContext>
//     </div>
//   );
// }

// export default App;
