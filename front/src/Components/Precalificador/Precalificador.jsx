import { useEffect, useState } from 'react';
import './Precalificador.css';
export default function Precalificador() {
  const [activoCorriente, setActivoCorriente] = useState(0);
  const [activoNoCorriente, setActivoNoCorriente] = useState(0);
  const [activoTotal, setActivoTotal] = useState(0);
  const [pasivoCorriente, setPasivoCorriente] = useState(0);
  const [pasivoNoCorriente, setPasivoNoCorriente] = useState(0);
  const [pasivoTotal, setPasivoTotal] = useState(0);
  const [totalPatrimonioNeto, setTotalPatrimonioNeto] = useState(0);
  const [totalPasivoPatrimonioNeto, setTotalPasivoPatrimonioNeto] = useState(0);
  const [comprobacion, setComprobacion] = useState(0);

  const [ventas, setVentas] = useState(0);
  const [cmv, setCmv] = useState(0);
  const [gastosAdministrativos, setGastosAdministrativos] = useState(0);
  const [otrosIngresosEgresos, setOtrosIngresosEgresos] = useState(0);
  const [otrosIngresos, setOtrosIngresos] = useState(0);
  const [recpam, setRecpam] = useState(0);
  const [impuestoGanancias, setImpuestoGanancias] = useState(0);
  const [resultadoMargenBruto, setResultadoMargenBruto] = useState(0);
  const [resultadoMargenOperativo, setResultadoMargenOperativo] = useState(0);
  const [resultadosAntesImpuestos, setResultadosAntesImpuestos] = useState(0);
  const [resultadoNetoFinal, setResultadoNetoFinal] = useState(0);
  const [amortizaciones, setAmortizaciones] = useState(0);
  const [capacidadDeGeneracion, setCapacidadDeGeneracion] = useState(0);
  const [otrosIngresosEgresosRecpam, setOtrosIngresosEgresosRecpam] =
    useState(0);
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///OTROS INGRESOS EGRESOS RECPAM
  useEffect(() => {
    const sumaTotal = otrosIngresos + recpam;
    setOtrosIngresosEgresosRecpam(sumaTotal);
  }, [otrosIngresos, recpam]);
  ///CAPACIDAD DE GENERACION
  useEffect(() => {
    const sumaTotal = amortizaciones + resultadoMargenOperativo;
    setCapacidadDeGeneracion(sumaTotal);
  }, [amortizaciones, resultadoMargenOperativo]);
  /////RESULTADO NETO FINAL
  useEffect(() => {
    const sumaTotal = resultadosAntesImpuestos - impuestoGanancias;
    setResultadoNetoFinal(sumaTotal);
  }, [resultadosAntesImpuestos, impuestoGanancias]);
  //RESULTADO TOTAL PATRIMONIO NETO
  useEffect(() => {
    const sumaTotal = activoTotal - pasivoTotal;
    setTotalPatrimonioNeto(sumaTotal);
  }, [activoTotal, pasivoTotal]);
  //RESULTADO TOTAL PASIVO NETO
  useEffect(() => {
    const sumaTotal = totalPatrimonioNeto + pasivoTotal;
    setTotalPasivoPatrimonioNeto(sumaTotal);
  }, [totalPatrimonioNeto, pasivoTotal]);
  //RESULTADO MARGEN BRUTO
  useEffect(() => {
    const sumaTotal = ventas - cmv;
    setResultadoMargenBruto(sumaTotal);
  }, [ventas, cmv]);
  //COMPROBACION
  useEffect(() => {
    const sumaTotal = activoTotal - totalPasivoPatrimonioNeto;
    setComprobacion(sumaTotal);
  }, [activoTotal, totalPasivoPatrimonioNeto]);
  //RESULTADO MARGEN OPERATIVO
  useEffect(() => {
    const sumaTotal = resultadoMargenBruto - gastosAdministrativos;
    setResultadoMargenOperativo(sumaTotal);
  }, [resultadoMargenBruto, gastosAdministrativos]);
  //RESULTADO ANTES IMPUESTOS
  useEffect(() => {
    const sumaTotal = resultadoMargenOperativo - otrosIngresosEgresos;
    setResultadosAntesImpuestos(sumaTotal);
  }, [recpam, otrosIngresosEgresos, otrosIngresos]);
  //ACTIVO TOTAL
  useEffect(() => {
    const sumaTotal = activoCorriente + activoNoCorriente;
    setActivoTotal(sumaTotal);
  }, [activoCorriente, activoNoCorriente]);
  //PASIVO TOTAL
  useEffect(() => {
    const sumaTotal = pasivoCorriente + pasivoNoCorriente;
    setPasivoTotal(sumaTotal);
  }, [pasivoCorriente, pasivoNoCorriente]);
  //RESULTADO MARGEN BRUTO
  useEffect(() => {
    const sumaTotal = ventas - cmv;
    setResultadoMargenBruto(sumaTotal);
  }, [ventas, cmv]);
  //RESULTADO MARGEN OPERATIVO
  useEffect(() => {
    const sumaTotal = resultadoMargenBruto - gastosAdministrativos;
    setResultadoMargenOperativo(sumaTotal);
  }, [resultadoMargenBruto, gastosAdministrativos]);

  const [datos, setDatos] = useState({
    activoCorriente: '',
    activoNoCorriente: '',
    pasivoCorriente: '',
    pasivoNoCorriente: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({
      ...datos,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    if (
      !datos.activoCorriente ||
      !datos.activoNoCorriente ||
      !datos.pasivoCorriente ||
      !datos.pasivoNoCorriente
    ) {
      alert('Todos los campos son obligatorios');
    }

    e.preventDefault();

    try {
      const response = await fetch('/insertarDatos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        // Datos insertados correctamente
        // Puedes realizar acciones adicionales aquí, como limpiar el formulario o mostrar un mensaje de éxito.
      } else {
        // Manejar errores de inserción
        console.error('Error al insertar datos');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
    }
  };
  return (
    <div className='container text-center'>
      <div className='probando'>
        <div className='probandoDos'>
          <input type='date' name='' id='' required />

          <h1>Ejercicios</h1>
        </div>
      </div>
      <div className='row align-items-start'>
        <div className='col'>
          <h3 className='bg-secondary text-light'>Activo + Pasivo</h3>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Rubro</th>
                <th scope='col'>Subrubro</th>
                <th scope='col'></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope='row'></th>
                <td>Activo Corriente</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    required
                    min={-1}
                    type='text'
                    placeholder='corriente'
                    value={activoCorriente}
                    onChange={(event) =>
                      setActivoCorriente(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='border-bottom border-black'>
                  Activo No Corriente
                </td>
                <td className='border-bottom border-black'>
                  <input
                    className='text-end'
                    maxLength={15}
                    required
                    min={-1}
                    type='text'
                    placeholder='no corriente'
                    value={activoNoCorriente}
                    onChange={(event) =>
                      setActivoNoCorriente(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='fw-bold text-danger text-uppercase'>
                  ACTIVO TOTAL
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {activoTotal.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td>Pasivo Corriente</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    min={-1}
                    required
                    type='text'
                    placeholder='pasivo corriente'
                    value={pasivoCorriente}
                    onChange={(event) =>
                      setPasivoCorriente(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='border-bottom border-black'>
                  Pasivo no Corriente
                </td>
                <td className='border-bottom border-black'>
                  <input
                    className='text-end'
                    maxLength={15}
                    min={-1}
                    required
                    type='text'
                    placeholder='pasivo no corriente'
                    value={pasivoNoCorriente}
                    onChange={(event) =>
                      setPasivoNoCorriente(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='fw-bold text-danger text-uppercase'>
                  PASIVO TOTAL
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {pasivoTotal.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='fw-bold'>Total patrimonio neto</td>
                <td className='fw-bold text-end'>$ {totalPatrimonioNeto}</td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='border-bottom border-black fw-bold'>
                  Total pasivo + p.neto
                </td>
                <td className='border-bottom border-black fw-bold text-end'>
                  $ {totalPasivoPatrimonioNeto.toLocaleString()}
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='fw-bold text-danger text-uppercase'>
                  Comprobacion
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {comprobacion.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class='col'>
          <h3 className='bg-secondary text-light'>Cuadro de resultados</h3>
          <table class='table'>
            <thead>
              <tr>
                <th scope='col'>Categoria</th>
                <th scope='col'>Original</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Ventas</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    type='text'
                    placeholder='ventas'
                    required
                    min={-1}
                    value={ventas}
                    onChange={(event) => setVentas(Number(event.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className='border-bottom border-black'>C.M.V</td>
                <td className='border-bottom border-black'>
                  <input
                    className='text-end'
                    maxLength={15}
                    type='text'
                    placeholder='c.m.v'
                    required
                    min={-1}
                    value={cmv}
                    onChange={(event) => setCmv(Number(event.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-danger text-uppercase'>
                  Resultado / margen bruto
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {resultadoMargenBruto.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className='border-bottom border-black'>
                  Gastos Administrativos + Co
                </td>
                <td className='border-bottom border-black'>
                  <input
                    className='text-end'
                    maxLength={15}
                    type='text'
                    placeholder=' Gastos Administrativos + Co'
                    min={-1}
                    value={gastosAdministrativos}
                    onChange={(event) =>
                      setGastosAdministrativos(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-danger text-uppercase'>
                  Resultado / margen operativo
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {resultadoMargenOperativo.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>Otros Ing</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    type='text'
                    placeholder='Otros Ing'
                    min={-1}
                    value={otrosIngresos}
                    onChange={(event) =>
                      setOtrosIngresos(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className='border-bottom border-black'>RECPAM</td>
                <td className='border-bottom border-black'>
                  <input
                    className='text-end'
                    maxLength={15}
                    type='text'
                    placeholder='RECPAM'
                    required
                    min={-1}
                    value={recpam}
                    onChange={(event) => setRecpam(Number(event.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold'>Otros Ing/Egresos + RECPAM</td>
                <td className='fw-bold text-end'>$ {otrosIngresosEgresosRecpam}</td>
              </tr>
              <tr>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  Resultado antes de impuestos
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {resultadosAntesImpuestos.toLocaleString()}
                </td>
              </tr>
              <tr className='border-bottom border-black'>
                <td>Impuesto Ganancias</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    min={-1}
                    type='text'
                    placeholder='Impuesto Ganancias'
                    required
                    value={impuestoGanancias}
                    onChange={(event) =>
                      setImpuestoGanancias(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  Resultado neto / final
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {resultadoNetoFinal.toLocaleString()}
                </td>
              </tr>
              <tr className='border-bottom border-black'>
                <td>Amortizaciones</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    min={-1}
                    type='text'
                    placeholder='Amortizaciones'
                    required
                    value={amortizaciones}
                    onChange={(event) =>
                      setAmortizaciones(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-danger text-uppercase '>
                  Capacidad de Generacion
                </td>
                <td className='fw-bold text-danger text-uppercase text-end'>
                  $ {capacidadDeGeneracion.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
