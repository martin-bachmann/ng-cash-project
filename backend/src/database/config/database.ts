import 'dotenv/config'
import { Options } from 'sequelize'

const config: Options = {
  dialect: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: 'ng_db',
  port: Number(process.env.DB_PORT) || 5432,
}

export = config;