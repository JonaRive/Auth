
import { DataSource } from "typeorm";
require('dotenv').config();

export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.DS_HOST,
    port: 3306,
    username: process.env.DS_USER,
    password: process.env.DS_PASS,
    database: process.env.DS_DB,
    entities: ['src/entities/*.ts'],
    logging: false,
    synchronize: true
  });


  export const Manager = dataSource.manager

  dataSource
    .initialize()
    .then(() => {
        console.log('INFO :: Data Source has been initialized');
    })
    .catch((err) => {
        console.error('ERROR :: Data Source initialization error', err);
    })

