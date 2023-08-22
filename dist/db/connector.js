"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manager = exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
require('dotenv').config();
exports.dataSource = new typeorm_1.DataSource({
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
exports.Manager = exports.dataSource.manager;
exports.dataSource
    .initialize()
    .then(() => {
    console.log('INFO :: Data Source has been initialized');
})
    .catch((err) => {
    console.error('ERROR :: Data Source initialization error', err);
});
