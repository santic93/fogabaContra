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
app.get('/operaciones', async (req, res) => {
  try {
    const primeraPalabra = req.query.primeraPalabra;
    const connection = await oracledb.getConnection(dbConfig);
    //CONSULTA 1
    if (primeraPalabra === 'PALMA') {
      //tradicionales express
      const query = `SELECT FECHA, OPERACION_SOLICITUD, CUIT, RAZONSOCIAL, BANCO, SUCURSAL, ESTADO, GARANTIA,
      OFICIAL, ORIGEN, OPERADOR, COMERCIAL, TIPO, TIEMPO_DIAS from FOGABASIS.VOPTRTREX_PORTAL`;
      const result = await connection.execute(query);
      const data = result.rows;
      // operaciones de cheques
      const query2 = `SELECT IDOPERACION, ENT, NOMBRE, NROCUIT, DESCRIPCION, IMPGARANTUM, VENCLINEA, CANTCPD, ULTOP FROM FOGABASIS.VOPVIGCPD_PORTAL `;
      const result2 = await connection.execute(query2);
      const data2 = result2.rows;
      res.json({ data, data2 });
    } else if (primeraPalabra === 'MAXFER') {
      const query = `SELECT FECHA, OPERACION_SOLICITUD, CUIT, RAZONSOCIAL, BANCO, SUCURSAL, ESTADO, GARANTIA,
      OFICIAL, ORIGEN, OPERADOR, TIPO, TIEMPO_DIAS from FOGABASIS.VOPTRTREX_PORTAL WHERE (COMERCIAL='${primeraPalabra}' OR
      UPPER(OFICIAL) LIKE 'FERNANDEZ%')`;
      const result = await connection.execute(query);
      const data = result.rows;
      // operaciones de cheques
      const query2 = `SELECT IDOPERACION, ENT, NOMBRE, NROCUIT, DESCRIPCION, IMPGARANTUM, VENCLINEA, CANTCPD, ULTOP FROM FOGABASIS.VOPVIGCPD_PORTAL `;
      const result2 = await connection.execute(query2);
      const data2 = result2.rows;
      res.json({ data, data2 });
    } else if (primeraPalabra === 'GUIPAL') {
      const query = `SELECT FECHA, OPERACION_SOLICITUD, CUIT, RAZONSOCIAL, BANCO, SUCURSAL, ESTADO, GARANTIA,
      OFICIAL, ORIGEN, OPERADOR, TIPO, TIEMPO_DIAS from FOGABASIS.VOPTRTREX_PORTAL WHERE (COMERCIAL='${primeraPalabra}' OR
      UPPER(OFICIAL) LIKE 'PALMUCCI%')`;
      const result = await connection.execute(query);
      const data = result.rows;
      // operaciones de cheques
      const query2 = `SELECT IDOPERACION, ENT, NOMBRE, NROCUIT, DESCRIPCION, IMPGARANTUM, VENCLINEA, CANTCPD, ULTOP FROM FOGABASIS.VOPVIGCPD_PORTAL `;
      const result2 = await connection.execute(query2);
      const data2 = result2.rows;
      res.json({ data, data2 });
    } else {
      //tradicionales express
      const query = `SELECT FECHA, OPERACION_SOLICITUD, CUIT, RAZONSOCIAL, BANCO, SUCURSAL, ESTADO, GARANTIA,
      OFICIAL, ORIGEN, OPERADOR, TIPO, TIEMPO_DIAS from FOGABASIS.VOPTRTREX_PORTAL WHERE COMERCIAL='${primeraPalabra}'`;
      const result = await connection.execute(query);
      const data = result.rows;
      // operaciones de cheques
      const query2 = `SELECT IDOPERACION, ENT, NOMBRE, NROCUIT, DESCRIPCION, IMPGARANTUM, VENCLINEA, CANTCPD, ULTOP FROM FOGABASIS.VOPVIGCPD_PORTAL WHERE COMERCIAL='${primeraPalabra}'`;
      const result2 = await connection.execute(query2);
      const data2 = result2.rows;
      res.json({ data, data2 });
    }
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
    const outputValue = result.outBinds;
    const dataNumber = outputValue.data;
    const queryIndicadores = `SELECT ENDEUDAMIENTO,
    ENDEUDAMIENTO_DESEABLE,
    ENDEUDAMIENTO_CRITICO,
    MESES_DE_DEUDA,
    MESES_DE_DEUDA_DESEABLE,
    MESES_DE_DEUDA_CRITICO,
    MESES_DEUDA_BANCARIA,
    MESES_DEUDA_BANCARIA_DESEABLE,
    MESES_DEUDA_BANCARIA_CRITICO,
    LIQUIDEZ,
    LIQUIDEZ_DESEABLE,
    LIQUIDEZ_CRITICO,
    SOLICITUD_VENTASMENSUALES,
    SOLICITUD_VENTASMENS_DESEABLE,
    SOLICITUD_VENTASMENS_CRITICO,
    RV_VENTASMENSUALES,
    RV_VENTASMENSUALES_DESEABLE,
    RV_VENTASMENSUALES_CRITICO,
    RDOBRUTO_VENT,
    RDOBRUTO_VENT_DESEABLE,
    RDOBRUTO_VENT_CRITICO,
    RDOOPER_VENT,
    RDOOPER_VENT_DESEABLE,
    RDOOPER_VENT_CRITICO,
    REQANUAL_GENERACION,
    REQANUAL_GENERACION_DESEABLE,
    REQANUAL_GENERACION_CRITICO,
    SOLICITUD_GENERACION,
    SOLICITUD_GENERACION_DESEABLE,
    SOLICITUD_GENERACION_CRITICO,
    RV_GENERACION,
    RV_GENERACION_DESEABLE,
    RV_GENERACION_CRITICO FROM FOGABASIS.VINDICADORES WHERE IDPRECAL='${dataNumber}'`;
    const resultIndicadores = await connection.execute(queryIndicadores);
    const dataIndicadores = resultIndicadores.rows;
    res.json({ dataIndicadores, message: 'Datos insertados correctamente' });
    connection.close();
  } catch (error) {
    console.error('Error en la inserción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
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
