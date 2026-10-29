
require('dotenv').config();
const { obtenerConexion } = require('./db');

async function probarConexion() {
    let conexion;

    try {
        conexion = await obtenerConexion();
        const resultado = await conexion.execute(
            'SELECT SYS_CONTEXT(\'USERENV\', \'SERVICE_NAME\') AS SERVICIO FROM DUAL'
        );

        console.log('¡Conexión con Oracle exitosa!');
        console.log('Servicio:', resultado.rows[0][0]);
    } catch (error) {
        console.error('Error de conexión:', error.message);
    } finally {
        if (conexion) {
            await conexion.close();
        }
    }
}

probarConexion();
