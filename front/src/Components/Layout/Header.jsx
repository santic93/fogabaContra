import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import fog from './fogaba-resized.png';
import Context from '../../Context/Context';
export default function Header() {
  const parser = new DOMParser();
  const history = useNavigate();
  const {
    completeDeudaBancos,
    completeFogaba,
    completeAfip,
    afip,
    fogaba,
    deuda,
    buscando,
    buscar,
  } = useContext(Context);
  const { razonSocial, domicilio, localidad, provincia } = afip;

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
    history('/consulta');
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
  return (
    <div>
      <div className='container'>
        <div className='header'>
          <Link
            to='/'
            onClick={() => (
              completeAfip([]), completeDeudaBancos([]), completeFogaba([])
            )}
          >
            <img src={fog} alt='' />
          </Link>
          <div>
            <form className='d-flex ' role='search' onSubmit={handleFormSubmit}>
              <input
                type='text'
                placeholder='Ingrese su CUIT'
                value={searchQuery}
                onChange={handleSearch}
                minLength={11}
                maxLength={11}
                className='inputttt'
              />
            </form>
            <small>{error && "Solo caracteres Numéricos"}</small>
          </div>
        </div>
        <div className='personal'>
          <h4 className={`${buscar ? 'placeholder-glow' : 'w-50'}`}>
            {' '}
            <b className={`${buscar ? 'placeholder' : ''}`}>{razonSocial}</b>
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
            // <table className='border border-dark domicilioFiscal'>
            //   <thead>
            //     <tr>
            //       <th scope='col' className='bg-primary text-light '>
            //         Domicilio fiscal
            //       </th>
            //     </tr>
            //   </thead>
            //   <tbody >
            //     <tr >
            //       <th>{domicilio}
            //       <br />
            //         {localidad}
            //         <br />
            //         {provincia}
            //       </th>
            //     </tr>
            //   </tbody>
            // </table>
            // <p className={`${buscar ? 'placeholder-glow' : 'border border-dark p-4'}`}>
            //   {/* <b className={`${buscar ? 'placeholder' : ''}`}>{domicilio}</b> */}
            //   <b className={`${buscar ? 'placeholder' : ''}`}><b className={`${buscar ? 'placeholder' : 'domicilioFiscal p-2 m-5'}`}>Domicilio fiscal</b><br /><br /> {domicilio}<br />{localidad}<br />{provincia}</b>
            // </p>
          }

          {/* <h5 className={`${buscar ? 'placeholder-glow' : ''}`}>
          <b className={`${buscar ? 'placeholder' : ''}`}>{domicilio}</b>
        </h5> */}
        </div>
        {/* <hr class='border border-primary border-3 opacity-75 w-100'></hr> */}
      </div>
      <hr class='border border-black border-3 opacity-75'></hr>
    </div>
  );
}
