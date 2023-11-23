import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { useContext } from 'react';
import Context from '../../Context/Context';
import Espere from '../Espere/Espere';
import { format } from "date-fns";
import PopupOperaciones from '../Popup/PopupOperaciones';
export default function Operaciones() {
  const navigate = useNavigate();
  const user = localStorage.getItem("user")
  const parts = user.split(",");
  const primeraPalabra = parts[0];
  const { completeOperacionesDeCheques,
    completeTradicionalesYTradicionalesExpress,
    tradicionalesYTradicionalesExpress,
    operacionesDeCheques,
    buscando,
    buscar,
    sumaTradicionales,
    promedioDias,
    sumaCheques,
    sumaGarantias,
    cantidadChequesConFecha
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

        if (res.status === 200) {
          if (Array.isArray(res.data.data) && res.data.data.length) {
            completeTradicionalesYTradicionalesExpress(res.data.data);
            buscando(false)
          }
          if (Array.isArray(res.data.data2) && res.data.data2.length) {
            completeOperacionesDeCheques(res.data.data2);
            buscando(false)
          }
        }
      } catch (error) {
        console.warn(error)
        buscando(false)
      }
    }
    fetchData()
  }, [])

  const ordentradicionalesYTradicionalesExpress = tradicionalesYTradicionalesExpress.sort((a, b) => b[13] - a[13])
 

  return (
    <div>
      {buscar ? (<Espere />) : (<><div className='p-5'>
        <h3 className="text-capitalize fst-italic fw-bold text-decoration-underline">Operaciones en Analisis</h3>
        <>
          <div
            className='table-container'
          >
            <br />
            {' '}
            {Array.isArray(tradicionalesYTradicionalesExpress) && tradicionalesYTradicionalesExpress.length ? (
              <>
                <div className="d-flex mb-2 mt-2">
                  <div className='text-start'>
                    <b> Monto Total: $ {sumaTradicionales?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} |</b>{" "}
                    <b>Cantidad de garantias: {tradicionalesYTradicionalesExpress?.length} |</b>{" "}
                    <b>Promedio Dias: {Math.round(promedioDias / tradicionalesYTradicionalesExpress?.length)} </b>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className='table text-center table-bordered small '>
                    <thead>
                      <tr>
                        <th scope='col' className='bg-primary text-light '>
                          Fecha
                        </th>
                        <th scope='col' className='bg-primary text-light'>
                          Operación/Solicitud
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
                          Oficial
                        </th>
                        <th scope='col' className='bg-primary text-light'>
                          Origen
                        </th>
                        <th scope='col' className='bg-primary text-light'>
                          Operador
                        </th>
                        <th scope='col' className='bg-primary text-light'>
                          Tipo
                        </th>
                        <th scope='col' className='bg-primary text-light'>
                          Dif Dias
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ordentradicionalesYTradicionalesExpress?.map((item, index) => (
                        <tr key={index}>
                          <th >{format(new Date(item[0].match(/^.*?(?=T)/)[0]), "dd/MM/yyyy")}</th><td >
                            <Link to={`/comentarios/${item[1]}`} title='Ver Comentarios' style={{ "textDecoration": "none", "color": "black", "fontWeight": "bold" }}> {item[1]}</Link></td>

                          <td>{item[2].replace("-", "").replace("/", "")}</td>
                          <td>{item[3]}</td>
                          <td>{item[4]}</td>
                          <td >{item[5]}</td>
                          <td>{item[6]}</td>
                          <td className='text-end'>${item[7]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                          <td >{item[8]}</td>
                          <td>{item[9]}</td>
                          <td >{item[10]}</td>
                          <td >{item[12]}</td>
                          <td>{item[13] >= 30 && item[13] < 60 && <td className='p-2 text-center bg-warning fw-bold rounded-circle' >{item[13]}</td>} {item[13] >= 60 && <td className='p-2 text-center  bg-danger fw-bold rounded-circle text-white'>{item[13]}</td>}  {item[13] < 30 && <td className='p-2 text-center  fw-bold'>{item[13]}</td>}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
                <h3 className="text-capitalize fst-italic fw-bold text-decoration-underline p-2">Operaciones de Cheques de Pago Diferido</h3>
                <div className="d-flex mb-2 mt-2">
                  <div className='text-start'>
                    <b> Cantidad total de Cheques:  {sumaCheques} |</b>{" "}
                    <b>Valor Total de Garantias: ${sumaGarantias?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} |</b>{" "}
                    <b>Porcentaje Activas: {cantidadChequesConFecha / operacionesDeCheques?.length * 100} %</b>
                  </div>
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
                        CUIT
                      </th>
                      <th scope='col' className='bg-primary text-light'>
                        Razon Social
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
                      <th scope='col' className='bg-primary text-light'>
                        Utilizado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {operacionesDeCheques?.map((item, index) => (

                      <tr key={index}>
                        <th >{item[0]}</th>
                        <td>{item[1]}</td>
                        <td >{item[3].replace("/", "").replace("-", "")}</td>
                        <td >{item[2]}</td>
                        <td>{item[4]}</td>
                        <td className='text-end'>${item[5]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                        <td>{format(new Date(item[6]?.match(/^.*?(?=T)/)[0]), "dd/MM/yyyy")}</td>
                        <td className='fw-bold'>{item[7]}</td>
                        <td className='fw-bold'>{item[8] ? format(new Date(item[8]?.match(/^.*?(?=T)/)[0]), "dd/MM/yyyy") : "No Registra"}</td>
                        <td >${item[9]?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
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
          </div>
        </>
      </div>
        <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
          <button className="btn btn-primary me-md-2" type="button" onClick={() => navigate(-1)}>Volver</button>
        </div></>)}
    </div>
  )
}
