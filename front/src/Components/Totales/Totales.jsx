import React from 'react'
import "./Totales.css"
import { Link, useNavigate } from 'react-router-dom';
export default function Totales() {
  const navigate = useNavigate();

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center vh-50'>
        <div className='p-5'>
          <h3 className='text-capitalize fst-italic fw-bold text-decoration-underline'>Totales Precalificación</h3>
          <div className='table-container'>
            <div className='text-start w-50 mb-2 mt-2'>
              <b className='titulo fst-italic fw-bold'>Resultados</b>
            </div>
            <div className='table-scrollable'>
              <table className='table text-center table-bordered small'>

                <thead>
                  <tr>
                    <th scope="col " className='bg-primary text-light'> ACTIVO TOTAL</th>
                    <th scope="col " className='bg-primary text-light'> PASIVO TOTAL</th>
                    <th scope="col " className='bg-primary text-light'>  TOTAL PATRIMONIO NETO</th>
                    <th scope="col " className='bg-primary text-light'> TOTAL PASIVO + PATRIMONIO NETO</th>
                    <th scope="col " className='bg-primary text-light'> COMPROBACION</th>
                    <th scope="col " className='bg-primary text-light'>    RESULTADO/MARGEN BRUTO</th>
                    <th scope="col " className='bg-primary text-light'> RESULTADO/MARGEN OPERATIVO</th>
                    <th scope="col " className='bg-primary text-light'>  OTROS INGRESOS/EGRESOS + RECPAM</th>
                    <th scope="col " className='bg-primary text-light'>     RESULTADOS ANTES DE IMPUESTOS</th>
                    <th scope="col " className='bg-primary text-light'>    RESULTADO NETO/FINAL</th>
                    <th scope="col " className='bg-primary text-light'> CAPACIDAD DE GENERACION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <hr className='border border-primary border-2 opacity-50 mt-5 mb-5' />
          </div>
        </div>
        <div>
        </div>

      </div>
      <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
        <button className='btn btn-primary btn-lg me-md-2 btn-lg' type='button' onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>



  )
}
