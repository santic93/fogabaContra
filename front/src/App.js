import './App.css';
import Layout from './Components/Layout/Layout';
import Consulta from './Components/Consulta/Consulta';
import UseContext from './Context/UseContext';
import Formulario from './Components/Formulario/Formulario';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Espere from './Components/Espere/Espere';
import Precalificador from './Components/Precalificador/Precalificador';
import Popup from './Components/Popup/Popup';
import { useState } from 'react';
function App() {
  const [datos,setDatos] = useState(0)
  return (
    <div className='App'>
      {/* <Popup datos={datos} setDatos={setDatos}/> */}
      <BrowserRouter>
        <UseContext>
          <Layout>
            <Routes>
              <Route path='/' element={<Consulta />} />
              <Route path='/consulta' element={<Formulario />} />
              <Route path='/precalificador' element={<Precalificador />} />
            </Routes>
          </Layout>
        </UseContext>
      </BrowserRouter>
    </div>
  );
}

export default App;
