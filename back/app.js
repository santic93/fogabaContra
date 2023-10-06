const express = require('express');
const cors = require('cors');
const oracledb = require('oracledb');
const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de conexión a la base de datos
const dbConfig = {
  user: 'condor',
  password: 'fogabacondor',
  connectString: '192.168.60.8/condor',
};

app.get('/comerciales', async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT CODIGO, OFICIAL FROM FOGABASIS.VOFICIALES`;
    const result = await connection.execute(query);
    const data = result.rows;
    res.json(data);
    connection.close();
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
app.get('/deuda', async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT * FROM FOGABASIS.VCONSULTA_CENDEU WHERE NRO_ID='${searchQuery}'`;
    const result = await connection.execute(query);
    const data = result.rows;
    res.json(data);
    connection.close();
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
app.get('/carteras', async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT OPERACION, LINEA, FECHAFORM, MONEDA, CREDITO, GARANTIA, SALDOVIVO, ESTADO, ESTADOFORM, INHABILITADO, ANTIGUEDADANIOS FROM FOGABASIS.VOPERACIONESPORCUIT WHERE CUIT='${searchQuery}'`;
    const result = await connection.execute(query);
    const data = result.rows;
    res.json(data);
    connection.close();
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.get('/insertarDatos', async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud POST
    const searchQuery = req.query.searchQuery;
    const {
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
      fechaIngresada,
      impSolicitado,
    } = searchQuery;
    console.log(searchQuery, '-----------------------------');
    const connection = await oracledb.getConnection(dbConfig);
    const data = '';
    // Consulta SQL para insertar datos en la base de datos
    const query = `BEGIN FOGABASIS.INSERTA_PRECALIFICACION(:rzs,
      :razonSocial,
      :activoCorriente,
      :activoNoCorriente,
      :pasivoCorriente,
      :pasivoNoCorriente,
      :ventas,
      :cmv,
      :gastosAdministrativos,
      :otrosIngresos,
      :recpam,
      :impuestoGanancias,
      :amortizaciones,
      :user,
      :fechaIngresada,
      :impSolicitado,
      :data); END;`;
    console.log(query, 'query');
    // Ejecutar el procedimiento almacenado
    const result = await connection.execute(query, {
      rzs: rzs,
      razonSocial: razonSocial,
      activoCorriente: activoCorriente,
      activoNoCorriente: activoNoCorriente,
      pasivoCorriente: pasivoCorriente,
      pasivoNoCorriente: pasivoNoCorriente,
      ventas: ventas,
      cmv: cmv,
      gastosAdministrativos: gastosAdministrativos,
      otrosIngresos: otrosIngresos,
      recpam: recpam,
      impuestoGanancias: impuestoGanancias,
      amortizaciones: amortizaciones,
      user: user,
      fechaIngresada: fechaIngresada,
      impSolicitado: impSolicitado,
      data: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
    });
    console.log('result', result);
    const outputValue = result.outBinds;
    const dataNumber = outputValue.data;
    console.log(outputValue, dataNumber);
    const queryIndicadores = `SELECT ENDEUDAMIENTO, ENDEUDAMIENTO_DESEABLE, ENDEUDAMIENTO_CRITICO, MESES_DE_DEUDA,MESES_DE_DEUDA_DESEABLE,
    MESES_DE_DEUDA_CRITICO, MESES_DEUDA_BANCARIA, MESES_DEUDA_BANCARIA_DESEABLE, MESES_DEUDA_BANCARIA_CRITICO, LIQUIDEZ, LIQUIDEZ_DESEABLE,
    LIQUIDEZ_CRITICO, SOLICITUD_VENTASMENSUALES, INDIC_SOLICITUD_VENTASMENS, RV_VENTASMENSUALES, INDIC_RV_VENTASMENSUALES, RDOBRUTO_VENT, INDIC_RDOBRUTO_VENT, RDOOPER_VENT, INDIC_RDOOPER_VENT, REQANUAL_GENERACION, INDIC_REQANUAL_GENERACION, SOLICITUD_GENERACION, INDIC_SOLICITUD_GENERACION, RV_GENERACION, INDIC_RV_GENERACION FROM FOGABASIS.VINDICADORES WHERE IDPRECAL='${dataNumber}'`;
    const resultIndicadores = await connection.execute(queryIndicadores);
    const dataIndicadores = resultIndicadores.rows;
    // res.json(dataIndicadores);
    // console.log(outputValue, '***********************');
    // console.log(dataNumber, '{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{{');
    console.log(dataIndicadores, resultIndicadores);
    res.json({ dataIndicadores, message: 'Datos insertados correctamente' });
    connection.close();
  } catch (error) {
    console.error('Error en la inserción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Nuevo endpoint para la inserción de datos
////insertarDatos
// app.get('/insertarDatos', async (req, res) => {
//   try {
//     // Obtener los datos del cuerpo de la solicitud POST
//     const searchQuery = req.query.searchQuery;
//     console.log('search', searchQuery);
//     const {
//       rzs,
//       razonSocial,
//       activoCorriente,
//       activoNoCorriente,
//       pasivoCorriente,
//       pasivoNoCorriente,
//       ventas,
//       cmv,
//       gastosAdministrativos,
//       otrosIngresos,
//       recpam,
//       impuestoGanancias,
//       amortizaciones,
//       user,
//       fechaIngresada,
//     } = searchQuery;
//     const connection = await oracledb.getConnection(dbConfig);
//     const data = '';
//     // Consulta SQL para insertar datos en la base de datos
//     const query = `BEGIN FOGABASIS.INSERTA_PRECALIFICACION(:rzs,
//       :razonSocial,
//       :activoCorriente,
//       :activoNoCorriente,
//       :pasivoCorriente,
//       :pasivoNoCorriente,
//       :ventas,
//       :cmv,
//       :gastosAdministrativos,
//       :otrosIngresos,
//       :recpam,
//       :impuestoGanancias,
//       :amortizaciones,
//       :user,
//       :fechaIngresada,
//       :data); END;`;
//     // Ejecutar el procedimiento almacenado
//     const result = await connection.execute(query, {
//       rzs: rzs,
//       razonSocial: razonSocial,
//       activoCorriente: activoCorriente,
//       activoNoCorriente: activoNoCorriente,
//       pasivoCorriente: pasivoCorriente,
//       pasivoNoCorriente: pasivoNoCorriente,
//       ventas: ventas,
//       cmv: cmv,
//       gastosAdministrativos: gastosAdministrativos,
//       otrosIngresos: otrosIngresos,
//       recpam: recpam,
//       impuestoGanancias: impuestoGanancias,
//       amortizaciones: amortizaciones,
//       user: user,
//       fechaIngresada: fechaIngresada,
//       data: { dir: oracledb.BIND_OUT, type: oracledb.NUMBER },
//     });
//     const outputValue = result.outBinds.resultado;
//     // res.send(data);
//     res.json({ message: 'Datos insertados correctamente' });
//     console.log(
//       '------------------------------------------------------OUTPUT',
//       outputValue,
//       '***************************************DATA',
//       data
//     );
//     connection.close();
//   } catch (error) {
//     console.error('Error en la inserción:', error);
//     res.status(500).json({ error: 'Error en el servidor' });
//   }
// });
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/indicadores', async (req, res) => {
  try {
    const searchQuery = req.query.searchQuery;
    const connection = await oracledb.getConnection(dbConfig);
    const query = `SELECT ENDEUDAMIENTO, INDIC_ENDEUDAMIENTO, MESES_DE_DEUDA,INDIC_MESES_DE_DEUDA,MESES_DEUDA_BANCARIA, INDIC_MESES_DEUDA_BANCARIA, LIQUIDEZ, INDIC_LIQUIDEZ FROM FOGABASIS.VINDICADORES WHERE IDPRECAL='${searchQuery}'`;
    const result = await connection.execute(query);
    const data = result.rows;
    res.json(data);
    connection.close();
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
