import { useContext, useEffect, useState } from 'react';
import Context from '../../Context/Context';
import { Link } from 'react-router-dom';
import Espere from '../Espere/Espere';
import './Formulario.css';

export default function Formulario() {
  const { deuda, fogaba, afip, buscar, sumaTotal, posicion, fecha, cendeuUltimoRegistro } = useContext(Context);
  const { actividad, rzs, scoreElementValor, localidad, cp } = afip;
  const [mesDeuda, setMesDeuda] = useState()
  const [añoDeuda, setAñoDeuda] = useState()
  useEffect(() => {
    if (cendeuUltimoRegistro.length) {
      const numeroMes = cendeuUltimoRegistro[0].toString(); // Puedes reemplazar esto con el número de mes que desees
      const mes = numeroMes.slice(4, 6);
      const añoDeuda = numeroMes.slice(0, 4)
      const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ];
      // Asegurémonos de que el número de mes sea válido
      const mesIndex = parseInt(mes, 10) - 1; // Restamos 1 porque los arrays comienzan en 0
      if (mesIndex >= 0 && mesIndex < meses.length) {
        const nombreMes = meses[mesIndex];
        setMesDeuda(nombreMes);
        setAñoDeuda(añoDeuda)
      }
    }
  }, [deuda])
  const handleButtonClick = () => {
    // Desplaza la página hacia la parte superior
    window.scrollTo(0, 0);
  };
  return (
    <div>
      {buscar ? (
        <Espere />
      ) : (
        <>
          <div className='p-5'>
            <h3 className="text-capitalize fst-italic fw-bold text-decoration-underline">Estado de la pyme</h3>
            <>
              <div className='mt-5 mb-5'>
                <h1>
                  <button type="button" className='btn btn-primary btn-lg consultaArbaBTN'>
                    <a
                      href={`http://consultas.arba.gov.ar/ConsultasGenerales/recuperarEstadoDeuda.do?action=recuperarEstadoDeuda&cuit=${rzs}`}
                      target='_blank'
                      className='consultaArba '
                    >
                      Consulta ARBA
                    </a>
                  </button>
                </h1>
                <span>Sera redirigido a la Pagina de <b>ARBA</b></span>
                <hr className='border border-primary border-2 opacity-50 mt-5 mb-5' />
              </div>
              <div
                className='table-container'
              >
                {' '}
                {rzs && localidad && scoreElementValor ? (
                  <>
                    <div className=' text-start w-50 mb-2 mt-2'>
                      <b className='titulo fst-italic fw-bold'>
                        Consulta nosis
                      </b>
                    </div>
                    <table className='table text-center table-bordered small '>
                      <thead>
                        <tr>
                          <th scope='col' className='bg-primary text-light '>
                            CUIT
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Localidad
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Codigo postal
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Actividad
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Score
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Riesgo Score
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{rzs}</th>
                          <td>{localidad}</td>
                          <td>{cp}</td>
                          <td>{actividad}</td>
                          <td>{scoreElementValor}</td>
                          <td className='fw-bold'>{scoreElementValor < 400 && "Muy Alto" || scoreElementValor >= 400 && scoreElementValor < 500 && "Alto" || scoreElementValor >= 500 && scoreElementValor < 600 && "Medio" || scoreElementValor >= 600 && scoreElementValor < 700 && "Bajo" || scoreElementValor >= 700 && "Muy Bajo"}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div>
                      <h4>
                        No existen registros en{' '}
                        <b>
                          NOSIS
                        </b>{' '}
                        con el CUIT ingresado
                      </h4>
                    </div>
                  </>
                )}
                <hr className='border border-primary border-2 opacity-50 mt-5 mb-5' />
                {Array.isArray(deuda) && deuda.length ? (
                  <>
                    <div className="d-flex mb-2 mt-2">
                      <div className='text-start'>
                        <b className='titulo fst-italic fw-bold'>
                          Consulta Cendeu
                        </b>
                        <b> Deuda Total: $ {sumaTotal} </b>
                      </div>
                      <div className="ms-auto">
                        <b className="fst-italic text-end"> Actualizada a: {mesDeuda}/{añoDeuda}</b>
                        {' '}
                      </div>
                    </div>

                    <table className='table text-center table-bordered small'>
                      <thead>
                        <tr>
                          <th scope='col' className='bg-primary text-light'>
                            Nombre Entidad
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Situacion
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            <br />
                            Monto Adeudado <br />
                            <small>*Expresado en miles*</small>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {deuda.map((item, index) => (
                          <tr key={index}>
                            <td
                              className={`${item[5] > 2
                                ? 'fw-bold text-light bg-danger opacity-100'
                                : ''
                                }`}
                            >
                              {item[3]}
                            </td>
                            <td
                              className={`${item[5] > 2
                                ? 'fw-bold text-light bg-danger opacity-100'
                                : ''
                                }`}
                            >
                              {item[5]}
                            </td>
                            <td
                              className={`${item[5] > 2
                                ? 'fw-bold text-light bg-danger opacity-100'
                                : ''
                                }`}
                            >
                              $ {item[6]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div>
                      <h4>
                        No existen registros en{' '}
                        <b>
                          CENDEU
                        </b>{' '}
                        con el CUIT ingresado
                      </h4>
                    </div>
                  </>
                )}


                <hr className='border border-primary border-2 opacity-50 mt-5 mb-5' />
                {Array.isArray(fogaba) && fogaba.length ? (

                  <>
                    <div className="d-flex mb-2 mt-2">
                      <div className='text-start'>
                        <b className='titulo fst-italic fw-bold'>Consulta Fogaba</b>{" "}
                        <b className='text-danger opacity-100'>{posicion === "S" && "PYME INHABILITADA"}</b>{" "}
                        <p className='fs-6 fst-italic'>{posicion === "S" && "Consultar a SubGerencia de Recupero para obtener detalles"}</p>

                      </div>
                      <div className="ms-auto">

                        {(posicion !== "S" && fecha < 2 && <b className='text-danger'> {fecha <= 1 ? `Antiguedad: ${fecha} año` : `Antiguedad: ${fecha} años`} - Riesgo Muy alto </b>) || (posicion !== "S" && fecha >= 2 && fecha < 4 && <b className='text-danger'>  {fecha <= 1 ? `Antiguedad: ${fecha} año` : `Antiguedad: ${fecha} años`} - Riesgo Alto </b>) || (posicion !== "S" && fecha >= 4 && fecha < 6 && <b className='text-warning'>  {fecha <= 1 ? `Antiguedad: ${fecha} año` : `Antiguedad: ${fecha} años`} - Riesgo Medio </b>) || (posicion !== "S" && fecha >= 6 && fecha < 10 && <b className='text-success'> {fecha <= 1 ? `Antiguedad: ${fecha} año` : `Antiguedad: ${fecha} años`} -Riesgo Bajo </b>) || (posicion !== "S" && fecha >= 10 && <b className='text-success' > {fecha <= 1 ? `Antiguedad: ${fecha} año` : `Antiguedad: ${fecha} años`} - Riesgo Muy Bajo </b>)}
                      </div>
                    </div>
                    <table className='table text-center table-bordered small'>
                      <thead>
                        <tr>
                          <th scope='col ' className='bg-primary text-light'>
                            Operacion
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Linea
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Fecha
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Moneda
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Credito
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Garantia
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Saldo Vivo
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Estado
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Estado Formal
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fogaba.map((item, index) => (
                          <tr key={index}>
                            <th scope='row'>{item[0]}</th>
                            <td>{item[1]}</td>
                            <td>{new Date(item[2]).toLocaleDateString()}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                            <td>{item[5]}</td>
                            <td>{item[6]}</td>
                            <td>{item[7]}</td>
                            <td>{item[8]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <>
                    <div>
                      <h4>
                        No existen registros en{' '}
                        <b>
                          FOGABA{' '}
                        </b>
                        con el CUIT ingresado
                      </h4>
                    </div>
                  </>
                )}
              </div>
            </>
            <hr className='border border-primary border-2 opacity-50 mt-5 mb-5'></hr>
          </div>
          <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
            <Link to='/precalificador'>
              <button className='btn btn-primary btn-lg me-md-2 btn-lg' type='button' onClick={handleButtonClick} >
                Cargar ultimo ejercicio
              </button>
            </Link>
          </div>
        </>
      )
      }
    </div>
  );
}
