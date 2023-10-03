import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect } from 'react'
import Context from '../../Context/Context';
export default function Indicadores() {
  const { indicadores } = useContext(Context)
  console.log(indicadores)
  const navigate = useNavigate();

  return (
    <div>
      <div className='container d-flex justify-content-center align-items-center '>
        <div className='table-container'>
          <table className='table text-center table-bordered small'>
            <thead>
              <tr>
                <th scope='col' className='bg-primary text-light '>
                  Indicadores
                </th>
                <th scope='col' className='bg-primary text-light'>
                  Periodo   </th>
                {/* <th scope='col' className='bg-primary text-light'>
                  Observaciones
                </th> */}
                {/* <th scope='col' className='bg-light p-5'>
                </th> */}
                <th scope='col' className='bg-primary text-light text-center'>
                  Resultado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-end ">
                <th className='text-decoration-underline '>Patrimoniales</th>

                {/* <td></td> */}
              </tr>
              <tr>
                <td >Endeudamiento</td>
                <td>{indicadores.length ? indicadores[0][0] : ""}</td>
                <td>{indicadores.length ? indicadores[0][1] : ""}</td>
                {/* <td></td> */}
                {/* <td>{indicadores.length ? indicadores[0][1] : ""}</td> */}
                {/* <td></td> */}
              </tr>
              <tr>
                <td>Meses de deuda</td>

                <td>{indicadores.length ? Math.round(indicadores[0][2]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][3]) : ""}</td>
                {/* <td></td> */}
                {/* <td></td> */}
              </tr>

              <tr>
                <td>Meses de deuda bancaria (CENDEU)</td>
                <td>{indicadores.length ? Math.round(indicadores[0][4]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][5]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr>
                <td>Liquidez</td>
                <td>{indicadores.length ? Math.round(indicadores[0][6]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][7]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr className="border-end">
                <th className='text-decoration-underline'>Economicos</th>
              </tr>
              <tr>
                <td>RV/Vtas mensuales</td>
                <td>{indicadores.length ? Math.round(indicadores[0][8]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][9]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr>
                <td>Rdo Bruto/Vent</td>
                <td>{indicadores.length ? Math.round(indicadores[0][12]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][12]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr>
                <td>Rdo Oper/Vent</td>
                <td>{indicadores.length ? Math.round(indicadores[0][14]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][15]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr>
                <td>Req anual/Generacion</td>
                <td>{indicadores.length ? Math.round(indicadores[0][16]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][17]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr>
                <td>Solicitud/Generacion</td>
                <td>{indicadores.length ? Math.round(indicadores[0][18]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][19]) : ""}</td>
                {/* <td></td> */}
              </tr>
              <tr>
                <td>RV/Generacion</td>
                <td>{indicadores.length ? Math.round(indicadores[0][20]) : ""}</td>
                <td>{indicadores.length ? (indicadores[0][21]) : ""}</td>
                {/* <td></td> */}
              </tr>

            </tbody>
          </table>
        </div>
      </div>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
        <button className="btn btn-primary me-md-2" type="button" onClick={() => navigate(-1)}>Volver</button>
      </div>
    </div>
  )
}
