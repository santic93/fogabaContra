import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useContext } from 'react';
import Context from '../../Context/Context';
import Espere from '../Espere/Espere';

export default function Operaciones() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
  const parts = user.split(",");
  const primeraPalabra = parts[0];
  const { completeOperacionesDeCheques,
    completeOperacionesWag, completeTradicionalesYTradicionalesExpress,
    tradicionalesYTradicionalesExpress,
    operacionesDeCheques,
    operacionesWag,
    buscando,
    buscar,
  } = useContext(Context)
  useEffect(() => {
    buscando(true)
    const fetchData = async () => {
      try {
        const res = await axios.get('/operaciones', {
          params: {
            primeraPalabra: encodeURIComponent(primeraPalabra),
          }
        })
        console.log(res.data)
        if (res.status === 200) {
          if (Array.isArray(res.data.data) && res.data.data.length) {
            completeTradicionalesYTradicionalesExpress(res.data.data);
            buscando(false)
          }
          if (Array.isArray(res.data.data2) && res.data.data2.length) {
            completeOperacionesDeCheques(res.data.data2);
            buscando(false)
          }
          if (Array.isArray(res.data.data3) && res.data.data3.length) {
            completeOperacionesWag(res.data.data3);
            buscando(false)
          }
        }
      } catch (error) {
        console.log(error)
        buscando(false)
      }
    }
    fetchData()
  }, [])

  console.log("wag", operacionesWag)
  return (
    <div>
      {buscar ? (<Espere />) : (<><div className='p-5'>
        <h3 className="text-capitalize fst-italic fw-bold text-decoration-underline">Operaciones en Analisis</h3>
        <>
          <div
            className='table-container'
          >

            {' '}
            {Array.isArray(tradicionalesYTradicionalesExpress) && tradicionalesYTradicionalesExpress.length ? (
              <>
                <div className=' text-start w-50 mb-2 mt-2'>
                  <b className='titulo fst-italic fw-bold'>
                    Tradicionales y tradicionales Express
                  </b>
                </div>
                <table className='table text-center table-bordered small '>
                  <thead>
                    <tr>
                      <th scope='col' className='bg-primary text-light '>
                        Operación
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Fecha
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Cuit
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Razón Social
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Banco
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Sucursal
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Estado
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Garantía
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Origen
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Operador
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {tradicionalesYTradicionalesExpress?.map((item, index) => (
                      <tr key={index}>
                        <th >{item[0]}</th>
                        <td>{item[1]?.match(/^.*?(?=T)/)[0]}</td>

                        <td >{item[2].replace("/", "").replace("-", "")}</td>
                        <td >{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{item[5]}</td>
                        <td>{item[6]}</td>
                        <td className='text-end'>${item[7]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{item[8]}</td>
                        <td >{item[9]}</td>
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
                      Tradicionales y Tradicionales Express
                    </b>{' '}
                    con el Comercial seleccionado                   </h4>
                </div>
              </>
            )}
            <hr className='border border-primary border-2 opacity-50 mt-5 mb-5' />
            {Array.isArray(operacionesDeCheques) && operacionesDeCheques.length ? (
              <>
                <div className=' text-start w-50 mb-2 mt-2'>
                  <b className='titulo fst-italic fw-bold'>
                    Operaciones de Cheques de Pago Diferido
                  </b>
                </div>
                <table className='table text-center table-bordered small '>
                  <thead>
                    <tr>
                      <th scope='col' className='bg-primary text-light '>
                        Operación
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Codigo
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Razon Social
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        CUIT
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Linea
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Garantia
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Vencimiento
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Cantidad CPD's
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Fecha Ult.Op
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {operacionesDeCheques?.map((item, index) => (
                      <tr key={index}>
                        <th >{item[0]}</th>
                        <td>{item[1]}</td>

                        <td >{item[2]}</td>
                        <td >{item[3].replace("/", "").replace("-", "")}</td>
                        <td>{item[4]}</td>
                        <td className='text-end'>${item[5]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{item[6]?.match(/^.*?(?=T)/)[0]}</td>
                        <td className='fw-bold'>{item[7]}</td>
                        <td className='fw-bold'>{item[8] ? item[8]?.match(/^.*?(?=T)/)[0] : "No Registra"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div>
                  <h4>
                    No existen operaciones de{' '}
                    <b>
                      Cheques de Pago Diferido
                    </b>{' '}
                    con el Comercial seleccionado                   </h4>
                </div>
              </>
            )}
            <hr className='border border-primary border-2 opacity-50 mt-5 mb-5' />
            {Array.isArray(operacionesWag) && operacionesWag.length ? (
              <>
                <div className=' text-start w-50 mb-2 mt-2'>
                  <b className='titulo fst-italic fw-bold'>
                    Operaciones WAG
                  </b>
                </div>
                <table className='table text-center table-bordered small '>
                  <thead>
                    <tr>
                      <th scope='col' className='bg-primary text-light '>
                        Solicitud
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Fecha
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        CUIT
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Razon Social
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Banco
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Sucursal
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Etapa
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Garantia
                      </th>

                    </tr>
                  </thead>
                  <tbody>
                    {operacionesWag?.map((item, index) => (
                      <tr key={index}>
                        <th >{item[0]}</th>
                        <td>{item[1]?.match(/^.*?(?=T)/)[0]}</td>

                        <td >{item[2]}</td>
                        <td >{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{item[5]}</td>
                        <td>{item[6]}</td>
                        <td className='text-end'>${item[7]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <>
                <div>
                  <h4>
                    No existen operaciones{' '}
                    <b>
                      WAG
                    </b>{' '}
                    con el Comercial seleccionado                   </h4>
                </div>
              </>
            )}
          </div>
        </>
      </div>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
          <button className="btn btn-primary me-md-2" type="button" onClick={() => navigate(-1)}>Volver</button>
        </div></>)}

    </div>
  )
}
