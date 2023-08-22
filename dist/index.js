"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const route_1 = require("./routes/route");
const connector_1 = require("./db/connector");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
// user cookie 
app.use((0, cookie_parser_1.default)());
// use json for API routes
app.use(express_1.default.json());
// cors for api address/port
app.use((0, cors_1.default)({
    credentials: true,
    origin: ["http://localhost:3001"]
}));
app.get('/', (req, res) => {
    res.send('INFO :: Root route called');
});
app.listen(process.env.PORT, () => {
    console.log(`INFO :: Webserver started on port ${process.env.PORT} `);
});
(0, route_1.routes)(app);
connector_1.dataSource;
