import pkg from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const {Client} = pkg

const cliente = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
});

await cliente.connect()
console.log('Conectado')

export default cliente