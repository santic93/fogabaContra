import { useContext, useState } from 'react';
import Context from '../../Context/Context';
import { Link } from 'react-router-dom';
import Espere from '../Espere/Espere';
import Precalificador from '../Precalificador/Precalificador';
import './Formulario.css';
export default function Formulario() {
  const { deuda, fogaba, afip, buscar, sumaTotal, posicion } = useContext(Context);
  const { actividad, rzs, scoreElementValor, localidad, cp } = afip;
  console.log(posicion, fogaba)
  return (
    <>
      {buscar ? (
        <Espere />
      ) : (
        <>
          <div className='p-5'>
            <h3>Estado de la pyme</h3>
            <>
              <div
                className='table-container'
              >
                {' '}
                {rzs && localidad && scoreElementValor ? (
                  <>
                    <div className='text-danger text-start w-25 mb-2 mt-2'>
                      <b>
                        <mark>Consulta nosis</mark>
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
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th>{rzs}</th>
                          <td>{localidad}</td>
                          <td>{cp}</td>
                          <td>{actividad}</td>
                          <td>{scoreElementValor}</td>
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
                          <mark>NOSIS</mark>
                        </b>{' '}
                        con el CUIT ingresado
                      </h4>
                    </div>
                  </>
                )}
                <hr className='border border-primary border-2 opacity-50' />
                {Array.isArray(deuda) && deuda.length ? (
                  <>
                    <div className='text-danger text-start w-50 mb-2 mt-2'>
                      <b>
                        <mark>Consulta Cendeu</mark>
                      </b>
                      {' '} <b className='text-danger'>Deuda Total: $ {sumaTotal}</b>
                    </div>

                    <table className='table text-center table-bordered small'>
                      <thead>
                        <tr>
                          <th scope='col' className='bg-primary text-light'>
                            CUIT
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Nombre Entidad
                          </th>
                          <th scope='col' className='bg-primary text-light'>
                            Codigo Entidad
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
                            <th
                              scope='row'
                              className={`${item[4] > 2
                                ? 'fw-bold text-light bg-danger'
                                : ''
                                }`}
                            >
                              {item[0]}
                            </th>
                            <td
                              className={`${item[4] > 2
                                ? 'fw-bold text-light bg-danger'
                                : ''
                                }`}
                            >
                              {item[3]}
                            </td>
                            <td
                              className={`${item[4] > 2
                                ? 'fw-bold text-light bg-danger'
                                : ''
                                }`}
                            >
                              {item[2]}
                            </td>
                            <td
                              className={`${item[4] > 2
                                ? 'fw-bold text-light bg-danger'
                                : ''
                                }`}
                            >
                              {item[4]}
                            </td>
                            <td
                              className={`${item[4] > 2
                                ? 'fw-bold text-light bg-danger'
                                : ''
                                }`}
                            >
                              $ {item[5]}
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
                          <mark>CENDEU</mark>
                        </b>{' '}
                        con el CUIT ingresado
                      </h4>
                    </div>
                  </>
                )}


                <hr className='border border-primary border-2 opacity-50' />
                {Array.isArray(fogaba) && fogaba.length ? (
                  <>
                    <div className='text-start w-50 mb-2 mt-2'>
                      <b>
                        {' '}
                        <mark>Historia Fogaba</mark>
                        {' '} <b className='text-danger'>{posicion === "S" && "PYME INHABILITADA"}</b>
                        <p className='fs-6 fst-italic'>{posicion === "S" && "Preguntar a legales para obtener detalles"}</p>
                      </b>
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
                          <mark>FoGABA</mark>{' '}
                        </b>
                        con el CUIT ingresado
                      </h4>
                    </div>
                  </>
                )}
              </div>
            </>
          </div>
          <hr class='border border-primary border-3 opacity-75'></hr>
          <div>
            <Precalificador />
          </div>
          <hr class='border border-primary border-3 opacity-75'></hr>
          <div className='mb-3'>
            <h1>
              <button type="button" className='btn btn-primary btn-lg'>
                <a
                  href='https://consultas.arba.gov.ar/ConsultasGenerales/inicioEstadoDeudaCategoria.do'
                  target='_blank'
                  className='consultaArba'
                >
                  Consulta ARBA
                </a>
              </button>
            </h1>
            <span>Sera redirigido a su Pagina</span>
          </div>
          {/* <div class='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
            <Link to='/precalificador'>
              <button class='btn btn-danger me-md-2 btn-lg' type='button'>
                Precalifique
              </button>
            </Link>
          </div> */}
        </>
      )}
    </>
  );
}
