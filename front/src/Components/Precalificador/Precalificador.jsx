import { useContext, useEffect, useState } from 'react';
import './Precalificador.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Context from '../../Context/Context';
export default function Precalificador() {
  const { afip, completeIndicadores } = useContext(Context)
  const { rzs, razonSocial } = afip
  const [activoCorriente, setActivoCorriente] = useState("");
  const [activoNoCorriente, setActivoNoCorriente] = useState("");
  const [activoTotal, setActivoTotal] = useState("");
  const [pasivoCorriente, setPasivoCorriente] = useState("");
  const [pasivoNoCorriente, setPasivoNoCorriente] = useState("");
  const [pasivoTotal, setPasivoTotal] = useState("");
  const [totalPatrimonioNeto, setTotalPatrimonioNeto] = useState("");
  const [totalPasivoPatrimonioNeto, setTotalPasivoPatrimonioNeto] = useState("");
  const [comprobacion, setComprobacion] = useState("");

  const [ventas, setVentas] = useState("");
  const [cmv, setCmv] = useState("");
  const [gastosAdministrativos, setGastosAdministrativos] = useState("");
  const [otrosIngresosEgresos, setOtrosIngresosEgresos] = useState("");
  const [otrosIngresos, setOtrosIngresos] = useState("");
  const [recpam, setRecpam] = useState("");
  const [impuestoGanancias, setImpuestoGanancias] = useState("");
  const [resultadoMargenBruto, setResultadoMargenBruto] = useState("");
  const [resultadoMargenOperativo, setResultadoMargenOperativo] = useState("");
  const [resultadosAntesImpuestos, setResultadosAntesImpuestos] = useState("");
  const [resultadoNetoFinal, setResultadoNetoFinal] = useState("");
  const [amortizaciones, setAmortizaciones] = useState("");
  const [capacidadDeGeneracion, setCapacidadDeGeneracion] = useState("");
  const [otrosIngresosEgresosRecpam, setOtrosIngresosEgresosRecpam] =
    useState("");

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
    const sumaTotal = resultadoMargenOperativo + otrosIngresos;
    const final = sumaTotal + recpam
    setResultadosAntesImpuestos(final);
  }, [recpam, otrosIngresosEgresos, otrosIngresos, resultadoMargenOperativo]);
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

  // const handleSubmit = async (e) => {
  //   if (
  //     !datos.activoCorriente ||
  //     !datos.activoNoCorriente ||
  //     !datos.pasivoCorriente ||
  //     !datos.pasivoNoCorriente
  //   ) {
  //     alert('Todos los campos son obligatorios');
  //   }

  //   e.preventDefault();

  //   try {
  //     const response = await fetch('/insertarDatos', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(datos),
  //     });

  //     if (response.ok) {
  //       // Datos insertados correctamente
  //       // Puedes realizar acciones adicionales aquí, como limpiar el formulario o mostrar un mensaje de éxito.
  //     } else {
  //       // Manejar errores de inserción
  //       console.error('Error al insertar datos');
  //     }
  //   } catch (error) {
  //     console.error('Error en la solicitud:', error);
  //   }
  // };
  const navigate = useNavigate();

  const handleClickEnviar = () => {
    // Verificar si los campos están vacíos o no son números válidos
    if (activoTotal <= pasivoTotal) {
      alert("No puede ser menor el Activo Total o Igual, al Pasivo Total")
      return
    }
    if (
      // fechaIngresada === '' ||
      activoCorriente === '' ||
      activoNoCorriente === '' ||
      pasivoCorriente === '' ||
      pasivoNoCorriente === '' ||
      ventas === '' ||
      cmv === '' ||
      gastosAdministrativos === '' ||
      otrosIngresos === '' ||
      recpam === '' ||
      impuestoGanancias === '' ||
      amortizaciones === ''
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    // Verificar si los valores son números válidos
    if (
      isNaN(activoCorriente) ||
      isNaN(activoNoCorriente) ||
      isNaN(pasivoCorriente) ||
      isNaN(pasivoNoCorriente) ||
      isNaN(ventas) ||
      isNaN(cmv) ||
      isNaN(gastosAdministrativos) ||
      isNaN(otrosIngresos) ||
      isNaN(recpam) ||
      isNaN(impuestoGanancias) ||
      isNaN(amortizaciones)
    ) {
      alert('Ingresa números válidos en todos los campos.');
      return;
    } else {
      // Dividir la cadena en función de la coma
      var partes = localStorage.getItem('user').split(',');

      // Obtener la parte delante de la coma
      var user = partes[0];
      // Combina los datos en un solo objeto
      const requestData = {
        rzs,
        razonSocial,
        activoCorriente,
        activoNoCorriente,
        pasivoCorriente,
        pasivoNoCorriente,
        ventas,
        cmv,
        gastosAdministrativos,
        otrosIngresos,
        recpam,
        impuestoGanancias,
        amortizaciones,
        user,
        fechaIngresada
      };
      const encodedData = encodeURIComponent(JSON.stringify(requestData));
      axios.get('/insertarDatos', {
        params: {
          searchQuery: requestData,
        },
      }).then((res) => completeIndicadores(res.data.dataIndicadores), alert("Sus datos fueron enviadas correctamente"), navigate("/indicadores")).catch((error) => console.log(error))

    }
  }
  // const handleClickEnviar = () => {
  //   if (isNaN(activoCorriente) ||
  //     isNaN(activoNoCorriente) ||
  //     isNaN(pasivoCorriente) ||
  //     isNaN(pasivoNoCorriente) ||
  //     isNaN(ventas) ||
  //     isNaN(cmv) ||
  //     isNaN(gastosAdministrativos) ||
  //     isNaN(otrosIngresos) ||
  //     isNaN(recpam) ||
  //     isNaN(impuestoGanancias) ||
  //     isNaN(amortizaciones)) {
  //     alert("TODOS LOS CAMPOS SON OBLIGATORIOS");
  //     return
  //   } else {
  //     navigate("/totales")
  //   }
  // }

  const [fechaIngresada, setFechaIngresada] = useState(null)


  return (
    <div className='container text-center'>
      <div className='probando'>
        <div className='probandoDos'>
          {/* <input type='date' name='' id='' required value={fechaIngresada} onChange={(event) =>
            setFechaIngresada((event.target.value))} /> */}
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
                    // min={-1}
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
                    // min={-1}
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
                <td className='fw-bold text-uppercase'>
                  ACTIVO TOTAL
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {activoTotal ? activoTotal.toLocaleString() : 0}
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td>Pasivo Corriente</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    // min={-1}
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
                    // min={-1}
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
                <td className='fw-bold text-uppercase'>
                  PASIVO TOTAL
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {pasivoTotal ? pasivoTotal.toLocaleString() : 0}
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='fw-bold'>Total patrimonio neto</td>
                <td className='fw-bold text-end'>$ {totalPatrimonioNeto ? totalPatrimonioNeto.toLocaleString() : 0}</td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='border-bottom border-black fw-bold'>
                  Total pasivo + p.neto
                </td>
                <td className='border-bottom border-black fw-bold text-end'>
                  $ {totalPasivoPatrimonioNeto ? totalPasivoPatrimonioNeto?.toLocaleString() : 0}
                </td>
              </tr>
              <tr>
                <th scope='row'></th>
                <td className='fw-bold text-uppercase'>
                  Comprobacion
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {comprobacion ? comprobacion.toLocaleString() : 0}
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
                    // min={-1}
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
                    // min={-1}
                    value={cmv}
                    onChange={(event) => setCmv(Number(event.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-uppercase'>
                  Resultado / margen bruto
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {resultadoMargenBruto ? resultadoMargenBruto.toLocaleString() : 0}
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
                    // min={-1}
                    value={gastosAdministrativos}
                    onChange={(event) =>
                      setGastosAdministrativos(Number(event.target.value))
                    }
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold text-uppercase'>
                  Resultado / margen operativo
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {resultadoMargenOperativo ? resultadoMargenOperativo.toLocaleString() : 0}
                </td>
              </tr>
              <tr>
                <td>Otros Ingresos / egresos</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    type='text'
                    placeholder='Otros Ing'
                    // min={-1}
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
                    // min={-1}
                    value={recpam}
                    onChange={(event) => setRecpam(Number(event.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className='fw-bold'>Otros Ing/Egresos + RECPAM</td>
                <td className='fw-bold text-end'>$ {otrosIngresosEgresosRecpam ? otrosIngresosEgresosRecpam.toLocaleString() : 0}</td>
              </tr>
              <tr>
                <td className='fw-bold text-uppercase text-end'>
                  Resultado antes de impuestos
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {resultadosAntesImpuestos ? resultadosAntesImpuestos.toLocaleString() : 0}
                </td>
              </tr>
              <tr className='border-bottom border-black'>
                <td>Impuesto Ganancias</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    // min={-1}
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
                <td className='fw-bold text-uppercase text-end'>
                  Resultado neto / final
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {resultadoNetoFinal ? resultadoNetoFinal.toLocaleString() : 0}
                </td>
              </tr>
              <tr className='border-bottom border-black'>
                <td>Amortizaciones</td>
                <td>
                  <input
                    className='text-end'
                    maxLength={15}
                    // min={-1}
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
                <td className='fw-bold text-uppercase '>
                  Capacidad de Generacion
                </td>
                <td className='fw-bold text-uppercase text-end'>
                  $ {capacidadDeGeneracion ? capacidadDeGeneracion.toLocaleString() : 0}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
        {/* <Link to='/precalificador'> */}
        <button class="btn btn-primary me-md-2" type="button" onClick={() => navigate(-1)}>Volver</button>

        <button class="btn btn-primary" type="button" onClick={(handleClickEnviar)}>Enviar</button>

        {/* </Link> */}
      </div>
    </div>
  );
}




















////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import { useContext, useEffect, useState } from 'react';
// import './Precalificador.css';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Context from '../../Context/Context';
// export default function Precalificador() {
//   const { afip } = useContext(Context)
//   const { rzs, razonSocial } = afip
//   const [activoCorriente, setActivoCorriente] = useState("");
//   const [activoNoCorriente, setActivoNoCorriente] = useState("");
//   const [activoTotal, setActivoTotal] = useState("");
//   const [pasivoCorriente, setPasivoCorriente] = useState("");
//   const [pasivoNoCorriente, setPasivoNoCorriente] = useState("");
//   const [pasivoTotal, setPasivoTotal] = useState("");
//   const [totalPatrimonioNeto, setTotalPatrimonioNeto] = useState("");
//   const [totalPasivoPatrimonioNeto, setTotalPasivoPatrimonioNeto] = useState("");
//   const [comprobacion, setComprobacion] = useState("");

//   const [ventas, setVentas] = useState("");
//   const [cmv, setCmv] = useState("");
//   const [gastosAdministrativos, setGastosAdministrativos] = useState("");
//   const [otrosIngresosEgresos, setOtrosIngresosEgresos] = useState("");
//   const [otrosIngresos, setOtrosIngresos] = useState("");
//   const [recpam, setRecpam] = useState("");
//   const [impuestoGanancias, setImpuestoGanancias] = useState("");
//   const [resultadoMargenBruto, setResultadoMargenBruto] = useState("");
//   const [resultadoMargenOperativo, setResultadoMargenOperativo] = useState("");
//   const [resultadosAntesImpuestos, setResultadosAntesImpuestos] = useState("");
//   const [resultadoNetoFinal, setResultadoNetoFinal] = useState("");
//   const [amortizaciones, setAmortizaciones] = useState("");
//   const [capacidadDeGeneracion, setCapacidadDeGeneracion] = useState("");
//   const [otrosIngresosEgresosRecpam, setOtrosIngresosEgresosRecpam] =
//     useState("");

//   ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   ///OTROS INGRESOS EGRESOS RECPAM
//   useEffect(() => {
//     const sumaTotal = otrosIngresos + recpam;
//     setOtrosIngresosEgresosRecpam(sumaTotal);
//   }, [otrosIngresos, recpam]);
//   ///CAPACIDAD DE GENERACION
//   useEffect(() => {
//     const sumaTotal = amortizaciones + resultadoMargenOperativo;
//     setCapacidadDeGeneracion(sumaTotal);
//   }, [amortizaciones, resultadoMargenOperativo]);
//   /////RESULTADO NETO FINAL
//   useEffect(() => {
//     const sumaTotal = resultadosAntesImpuestos - impuestoGanancias;
//     setResultadoNetoFinal(sumaTotal);
//   }, [resultadosAntesImpuestos, impuestoGanancias]);
//   //RESULTADO TOTAL PATRIMONIO NETO
//   useEffect(() => {
//     const sumaTotal = activoTotal - pasivoTotal;
//     setTotalPatrimonioNeto(sumaTotal);
//   }, [activoTotal, pasivoTotal]);
//   //RESULTADO TOTAL PASIVO NETO
//   useEffect(() => {
//     const sumaTotal = totalPatrimonioNeto + pasivoTotal;
//     setTotalPasivoPatrimonioNeto(sumaTotal);
//   }, [totalPatrimonioNeto, pasivoTotal]);
//   //RESULTADO MARGEN BRUTO
//   useEffect(() => {
//     const sumaTotal = ventas - cmv;
//     setResultadoMargenBruto(sumaTotal);
//   }, [ventas, cmv]);
//   //COMPROBACION
//   useEffect(() => {
//     const sumaTotal = activoTotal - totalPasivoPatrimonioNeto;
//     setComprobacion(sumaTotal);
//   }, [activoTotal, totalPasivoPatrimonioNeto]);
//   //RESULTADO MARGEN OPERATIVO
//   useEffect(() => {
//     const sumaTotal = resultadoMargenBruto - gastosAdministrativos;
//     setResultadoMargenOperativo(sumaTotal);
//   }, [resultadoMargenBruto, gastosAdministrativos]);
//   //RESULTADO ANTES IMPUESTOS
//   useEffect(() => {
//     const sumaTotal = resultadoMargenOperativo - otrosIngresosEgresos;
//     setResultadosAntesImpuestos(sumaTotal);
//   }, [recpam, otrosIngresosEgresos, otrosIngresos]);
//   //ACTIVO TOTAL
//   useEffect(() => {
//     const sumaTotal = activoCorriente + activoNoCorriente;
//     setActivoTotal(sumaTotal);
//   }, [activoCorriente, activoNoCorriente]);
//   //PASIVO TOTAL
//   useEffect(() => {
//     const sumaTotal = pasivoCorriente + pasivoNoCorriente;
//     setPasivoTotal(sumaTotal);
//   }, [pasivoCorriente, pasivoNoCorriente]);
//   //RESULTADO MARGEN BRUTO
//   useEffect(() => {
//     const sumaTotal = ventas - cmv;
//     setResultadoMargenBruto(sumaTotal);
//   }, [ventas, cmv]);
//   //RESULTADO MARGEN OPERATIVO
//   useEffect(() => {
//     const sumaTotal = resultadoMargenBruto - gastosAdministrativos;
//     setResultadoMargenOperativo(sumaTotal);
//   }, [resultadoMargenBruto, gastosAdministrativos]);



//   const navigate = useNavigate();

//   const handleClickEnviar = () => {
//     // Verificar si los campos están vacíos o no son números válidos
//     // if (activoTotal <= pasivoTotal) {
//     //   alert("No puede ser menor el Activo Total o Igual, al Pasivo Total")
//     //   return
//     // }
//     if (
//       activoCorriente === '' ||
//       activoNoCorriente === '' ||
//       pasivoCorriente === '' ||
//       pasivoNoCorriente === '' ||
//       ventas === '' ||
//       cmv === '' ||
//       gastosAdministrativos === '' ||
//       otrosIngresos === '' ||
//       recpam === '' ||
//       impuestoGanancias === '' ||
//       amortizaciones === ''
//     ) {
//       alert('Todos los campos son obligatorios');
//       return;
//     }
//     // Verificar si los valores son números válidos
//     if (
//       isNaN(activoCorriente) ||
//       isNaN(activoNoCorriente) ||
//       isNaN(pasivoCorriente) ||
//       isNaN(pasivoNoCorriente) ||
//       isNaN(ventas) ||
//       isNaN(cmv) ||
//       isNaN(gastosAdministrativos) ||
//       isNaN(otrosIngresos) ||
//       isNaN(recpam) ||
//       isNaN(impuestoGanancias) ||
//       isNaN(amortizaciones)
//     ) {
//       alert('Ingresa números válidos en todos los campos.');
//       return;
//     } else {
//       // Dividir la cadena en función de la coma
//       var partes = localStorage.getItem('user').split(',');

//       // Obtener la parte delante de la coma
//       var user = partes[0];
//       // Combina los datos en un solo objeto
//       const requestData = {
//         rzs,
//         razonSocial,
//         activoCorriente,
//         activoNoCorriente,
//         pasivoCorriente,
//         pasivoNoCorriente,
//         ventas,
//         cmv,
//         gastosAdministrativos,
//         otrosIngresos,
//         recpam,
//         impuestoGanancias,
//         amortizaciones,
//         user,
//         fechaIngresada
//       };
//       axios.get('/insertarDatos', {
//         params: {
//           searchQuery: requestData,
//         },
//       }).then((res) => res).catch((error) => console.log(error))

//     }
//   }
//   const [fechaIngresada, setFechaIngresada] = useState(null)

//   return (
//     <div className='container text-center'>
//       <div className='probando'>
//         <div className='probandoDos'>
//           <h1>Ejercicios</h1>
//         </div>
//       </div>
//       <div className='row align-items-start'>
//         <div className='col'>
//           <h3 className='bg-secondary text-light'>Activo + Pasivo</h3>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th scope='col'>Rubro</th>
//                 <th scope='col'>Subrubro</th>
//                 <th scope='col'></th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <th scope='row'></th>
//                 <td>Activo Corriente</td>
//                 <td>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     required
//                     type='text'
//                     placeholder='corriente'
//                     value={activoCorriente}
//                     onChange={(event) =>
//                       setActivoCorriente(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='border-bottom border-black'>
//                   Activo No Corriente
//                 </td>
//                 <td className='border-bottom border-black'>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     required
//                     type='text'
//                     placeholder='no corriente'
//                     value={activoNoCorriente}
//                     onChange={(event) =>
//                       setActivoNoCorriente(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='fw-bold text-uppercase'>
//                   ACTIVO TOTAL
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {activoTotal ? activoTotal.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td>Pasivo Corriente</td>
//                 <td>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     required
//                     type='text'
//                     placeholder='pasivo corriente'
//                     value={pasivoCorriente}
//                     onChange={(event) =>
//                       setPasivoCorriente(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='border-bottom border-black'>
//                   Pasivo no Corriente
//                 </td>
//                 <td className='border-bottom border-black'>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     required
//                     type='text'
//                     placeholder='pasivo no corriente'
//                     value={pasivoNoCorriente}
//                     onChange={(event) =>
//                       setPasivoNoCorriente(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='fw-bold text-uppercase'>
//                   PASIVO TOTAL
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {pasivoTotal ? pasivoTotal.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='fw-bold'>Total patrimonio neto</td>
//                 <td className='fw-bold text-end'>$ {totalPatrimonioNeto ? totalPatrimonioNeto.toLocaleString() : 0}</td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='border-bottom border-black fw-bold'>
//                   Total pasivo + p.neto
//                 </td>
//                 <td className='border-bottom border-black fw-bold text-end'>
//                   $ {totalPasivoPatrimonioNeto ? totalPasivoPatrimonioNeto?.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr>
//                 <th scope='row'></th>
//                 <td className='fw-bold text-uppercase'>
//                   Comprobacion
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {comprobacion ? comprobacion.toLocaleString() : 0}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <div className='col'>
//           <h3 className='bg-secondary text-light'>Cuadro de resultados</h3>
//           <table className='table'>
//             <thead>
//               <tr>
//                 <th scope='col'>Categoria</th>
//                 <th scope='col'>Original</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>Ventas</td>
//                 <td>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder='ventas'
//                     required
//                     value={ventas}
//                     onChange={(event) => setVentas(Number(event.target.value))}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='border-bottom border-black'>C.M.V</td>
//                 <td className='border-bottom border-black'>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder='c.m.v'
//                     required
//                     value={cmv}
//                     onChange={(event) => setCmv(Number(event.target.value))}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='fw-bold text-uppercase'>
//                   Resultado / margen bruto
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {resultadoMargenBruto ? resultadoMargenBruto.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr>
//                 <td className='border-bottom border-black'>
//                   Gastos Administrativos + Co
//                 </td>
//                 <td className='border-bottom border-black'>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder=' Gastos Administrativos + Co'
//                     value={gastosAdministrativos}
//                     onChange={(event) =>
//                       setGastosAdministrativos(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='fw-bold text-uppercase'>
//                   Resultado / margen operativo
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {resultadoMargenOperativo ? resultadoMargenOperativo.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr>
//                 <td>Otros Ing</td>
//                 <td>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder='Otros Ing'
//                     value={otrosIngresos}
//                     onChange={(event) =>
//                       setOtrosIngresos(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='border-bottom border-black'>RECPAM</td>
//                 <td className='border-bottom border-black'>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder='RECPAM'
//                     required
//                     value={recpam}
//                     onChange={(event) => setRecpam(Number(event.target.value))}
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='fw-bold'>Otros Ing/Egresos + RECPAM</td>
//                 <td className='fw-bold text-end'>$ {otrosIngresosEgresosRecpam ? otrosIngresosEgresosRecpam.toLocaleString() : 0}</td>
//               </tr>
//               <tr>
//                 <td className='fw-bold text-uppercase text-end'>
//                   Resultado antes de impuestos
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {resultadosAntesImpuestos ? resultadosAntesImpuestos.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr className='border-bottom border-black'>
//                 <td>Impuesto Ganancias</td>
//                 <td>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder='Impuesto Ganancias'
//                     required
//                     value={impuestoGanancias}
//                     onChange={(event) =>
//                       setImpuestoGanancias(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='fw-bold text-uppercase text-end'>
//                   Resultado neto / final
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {resultadoNetoFinal ? resultadoNetoFinal.toLocaleString() : 0}
//                 </td>
//               </tr>
//               <tr className='border-bottom border-black'>
//                 <td>Amortizaciones</td>
//                 <td>
//                   <input
//                     className='text-end'
//                     maxLength={15}
//                     type='text'
//                     placeholder='Amortizaciones'
//                     required
//                     value={amortizaciones}
//                     onChange={(event) =>
//                       setAmortizaciones(Number(event.target.value))
//                     }
//                   />
//                 </td>
//               </tr>
//               <tr>
//                 <td className='fw-bold text-uppercase '>
//                   Capacidad de Generacion
//                 </td>
//                 <td className='fw-bold text-uppercase text-end'>
//                   $ {capacidadDeGeneracion ? capacidadDeGeneracion.toLocaleString() : 0}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//       <div className='d-grid gap-2 d-md-flex justify-content-md-end mb-3'>
//         <button className="btn btn-primary me-md-2" type="button" onClick={() => navigate(-1)}>Volver</button>
//         <button className="btn btn-primary" type="button" onClick={(handleClickEnviar)}>Enviar</button>

//       </div>
//     </div>
//   );
// }
