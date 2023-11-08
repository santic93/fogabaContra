import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import { Link, Route, Routes, redirect, useLocation, useNavigate } from 'react-router-dom';
import fog from './fogaba-resized.png';
import Context from '../../Context/Context';
export default function Header() {
  let location = useLocation();
  console.log(location.pathname)
  const parser = new DOMParser();
  const history = useNavigate();
  const navigate = useNavigate()
  const {
    completeDeudaBancos,
    completeFogaba,
    completeAfip,
    afip,
    fogaba,
    deuda,
    buscando,
    buscar,
    precalificar,
  } = useContext(Context);
  const { razonSocial, domicilio, localidad, provincia, rzs } = afip;

  const [searchQuery, setSearchQuery] = useState('');
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');
  const handleSearch = (event) => {
    const input = event.target.value;
    const numericInput = input.replace(/\D/g, ''); // Filtra solo caracteres numéricos

    if (input !== numericInput) {
      setError('Ingrese solo números');
    } else {
      setError('');
    }
    setSearchQuery(event.target.value);
  };
  const handleFormSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del formulario
    buscando(true);
    history('/formulario');
    setTimeout(() => {
      fetchData();
    }, 2000);
  };
  const fetchData = async () => {
    try {
      const [deudaResponse, carterasResponse, urlNosis] = await Promise.all([
        axios.get('/deuda', {
          params: {
            searchQuery: encodeURIComponent(searchQuery),
          },
        }),
        axios.get('/carteras', {
          params: {
            searchQuery: encodeURIComponent(searchQuery),
          },
        }),
        axios.get(
          `https://sac.nosis.com/SAC_ServicioSF/Consulta.asp?NroConsulta=1&Usuario=468999&Password=844107&ConsXML_RZ=${searchQuery}&ConsXML_Doc=${searchQuery}&Cons_CDA=99052`
        ),

      ]);

      const deudaBancos = deudaResponse.data;
      const fogabaDeudas = carterasResponse.data;
      const xmlString = urlNosis.data;

      const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
      const urlElement = xmlDoc.querySelector('URL');
      if (urlElement !== null) {
        const urlValue = urlElement.textContent;
        setUrl(urlValue); // Setear el valor de la URL en el estado
      } else {
        console.error('No se encontró el elemento URL en el XML.');
      }
      completeDeudaBancos(deudaBancos);
      completeFogaba(fogabaDeudas);
      setSearchQuery('');
    } catch (error) {
      buscando(false);
      console.log('Error: ', error);
      completeDeudaBancos([]);
      completeFogaba([]);
    }
  };
  useEffect(() => {
    if (url) {
      const busquedaCuit = async () => {
        await axios
          .get(url)
          .then((res) => {
            let xmlString = res.data;
            let xmlDoc = parser.parseFromString(xmlString, 'text/xml');
            let cuitDev = xmlDoc.querySelector('Doc')?.textContent;
            let apellido = xmlDoc.querySelector('Apellido')?.textContent;
            let nombre = xmlDoc.querySelector('Nombre')?.textContent;
            let rz = xmlDoc.querySelector('RZAnt')?.textContent;
            let rzs = xmlDoc.querySelector('RZ')?.textContent;
            let rzss = xmlDoc.querySelector('Clave');
            let actividad = xmlDoc.querySelector('Act01_Descrip')?.textContent;
            let razonSocial = rzss.querySelector('RZ')?.textContent;
            let scoreElementDescrip = xmlDoc.querySelector(
              'Item[Clave="Valor.SCO"] Descrip'
            ).textContent;
            let scoreElementValor = xmlDoc.querySelector(
              'Item[Clave="Valor.SCO"] Valor'
            ).textContent;
            let domicilio = xmlDoc.querySelector('Dom')?.textContent;
            let localidad = xmlDoc.querySelector('Loc')?.textContent;
            let cp = xmlDoc.querySelector('CP')?.textContent;
            let provincia = xmlDoc.querySelector('Prov')?.textContent;
            completeAfip({
              razonSocial,
              actividad,
              rzs,
              cuitDev,
              apellido,
              nombre,
              scoreElementDescrip,
              scoreElementValor,
              domicilio,
              localidad,
              cp,
              rz,
              provincia
            });

            buscando(false);
          })
          .catch((error) => {
            buscando(false);
            console.log('Error al obtener datos en el effect:', error);
          });
      };
      busquedaCuit();
    }
  }, [url]);
  // Dividir la cadena en función de la coma
  let partes;
  let resultado;
  if (localStorage.getItem("user")) {
    partes = localStorage?.getItem('user')?.split(',');
    // Obtener la parte delante de la coma
    resultado = partes[1];
  }
  return (
    <div>
      <div className='container'>
        {localStorage.getItem("user") && <> Comercial: <b>{resultado}</b>
          <p><Link className="link-danger link-opacity-100" to="/" onClick={(event) => {
            event.preventDefault()
            localStorage.removeItem("user");
            completeAfip([]);
            completeDeudaBancos([]);
            completeFogaba([]);
            history("");
          }}>Desconectarte</Link></p></>}

        <div className='header'>
          <Link
            to="/consulta"
            onClick={() => (
              completeAfip([]), completeDeudaBancos([]), completeFogaba([])
            )}
          >
            <img src={fog} alt='' />
          </Link>
          { location.pathname !== "/portal" && location.pathname !== "/operaciones" && localStorage.getItem("user") &&
            <Link to="/operaciones"
              className='text-center'
              onClick={() => (
                completeAfip([]), completeDeudaBancos([]), completeFogaba([])
              )}>Operaciones en Analisis</Link>}
          {location.pathname !== "/precalificador" && location.pathname !== "/formulario" && location.pathname !== "/consulta" && location.pathname !== "/portal" && localStorage.getItem("user") && <Link className='text-center' to="/consulta"
            onClick={() => (
              completeAfip([]), completeDeudaBancos([]), completeFogaba([])
            )}>Precalificador</Link>}

          <div>
            <Routes>
              <Route path="/precalificador" element={(
                <form className='d-flex ' role='search' onSubmit={handleFormSubmit}>
                  <input
                    type='text'
                    placeholder='CUIT a Consultar'
                    value={searchQuery}
                    onChange={handleSearch}
                    minLength={11}
                    maxLength={11}
                    className='inputttt'
                  // disabled={precalificar}
                  />
                </form>
              )} />
              <Route path="/consulta" element={(
                <form className='d-flex ' role='search' onSubmit={handleFormSubmit}>
                  <input
                    type='text'
                    placeholder='CUIT a Consultar'
                    value={searchQuery}
                    onChange={handleSearch}
                    minLength={11}
                    maxLength={11}
                    className='inputttt'
                  // disabled={precalificar}
                  />
                </form>
              )} />
              <Route path="/formulario" element={(
                <form className='d-flex ' role='search' onSubmit={handleFormSubmit}>
                  <input
                    type='text'
                    placeholder='CUIT a Consultar'
                    value={searchQuery}
                    onChange={handleSearch}
                    minLength={11}
                    maxLength={11}
                    className='inputttt'
                  // disabled={precalificar}
                  />
                </form>
              )} />
              {localStorage.getItem("user") &&
                <Route path="/" element={(
                  <form className='d-flex ' role='search' onSubmit={handleFormSubmit}>
                    <input
                      type='text'
                      placeholder='CUIT a Consultar'
                      value={searchQuery}
                      onChange={handleSearch}
                      minLength={11}
                      maxLength={11}
                      className='inputttt'
                    // disabled={precalificar}
                    />
                  </form>
                )} />}
              <Route
                path="/portal"
                element={null}
              />
            </Routes>
            {/* <form className='d-flex ' role='search' onSubmit={handleFormSubmit}>
              <input
                type='text'
                placeholder='CUIT a Consultar'
                value={searchQuery}
                onChange={handleSearch}
                minLength={11}
                maxLength={11}
                className='inputttt'
                // disabled={precalificar}
              />
            </form> */}
            <small>{searchQuery && "Presione Enter para consultar"}</small>
            <small>{error && "Solo caracteres Numéricos"}</small>
          </div>
        </div>
        <div className='personal'>
          <h4 className={`${buscar ? 'placeholder-glow' : 'w-50'}`}>
            {' '}
            <b className={`${buscar ? 'placeholder' : ''}`}>{razonSocial}</b>
            <div >
              <b className={`${buscar ? 'placeholder' : ''}`}>{rzs}</b>
            </div>
          </h4>
          {
            domicilio &&
            <table className={`${buscar ? 'placeholder' : 'dom border border-dark'}`}>
              <thead>
                <tr>
                  <th scope='col' className={`${buscar ? 'placeholder' : 'bg-primary text-light text-center'}`}>
                    Domicilio fiscal
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='domicilioFiscal text-center'>
                    {domicilio}
                    <br />
                    {localidad}
                    <br />
                    {provincia}
                  </td>
                </tr>
              </tbody>
            </table>
          }
        </div>
      </div>
      <hr className='border border-black border-3 opacity-75'></hr>
    </div >
  );
}
