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
    const query = `SELECT OPERACION, LINEA, FECHAFORM, MONEDA, CREDITO, GARANTIA, SALDOVIVO, ESTADO, ESTADOFORM, INHABILITADO FROM FOGABASIS.VOPERACIONESPORCUIT WHERE CUIT='${searchQuery}'`;
    const result = await connection.execute(query);
    const data = result.rows;
    res.json(data);
    connection.close();
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
// Nuevo endpoint para la inserción de datos
app.post('/insertarDatos', async (req, res) => {
  try {
    // Obtener los datos del cuerpo de la solicitud POST
    const {
      activoCorriente,
      activoNoCorriente,
      pasivoCorriente,
      pasivoNoCorriente,
    } = req.body;

    const connection = await oracledb.getConnection(dbConfig);

    // Consulta SQL para insertar datos en la base de datos
    const query = `
      INSERT INTO TU_TABLA (ACTIVO_CORRIENTE, ACTIVO_NO_CORRIENTE, PASIVO_CORRIENTE, PASIVO_NO_CORRIENTE)
      VALUES (:activoCorriente, :activoNoCorriente, :pasivoCorriente, :pasivoNoCorriente)
    `;

    const bindParams = {
      activoCorriente,
      activoNoCorriente,
      pasivoCorriente,
      pasivoNoCorriente,
    };

    const result = await connection.execute(query, bindParams, {
      autoCommit: true,
    });

    res.json({ message: 'Datos insertados correctamente' });

    connection.close();
  } catch (error) {
    console.error('Error en la inserción:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
