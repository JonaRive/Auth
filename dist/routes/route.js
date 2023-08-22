"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const register_controller_1 = __importDefault(require("../controller/auth/register.controller"));
const login_controller_1 = __importDefault(require("../controller/auth/login.controller"));
const logout_controller_1 = __importDefault(require("../controller/auth/logout.controller"));
const auth_middleware_1 = __importDefault(require("../controller/middleware/auth.middleware"));
const auth_controller_1 = __importDefault(require("../controller/auth/auth.controller"));
const user_controller_1 = require("../controller/user.controller");
const routes = (route) => {
    //Authentication
    route.post('/api/register', register_controller_1.default);
    route.post('/api/login', login_controller_1.default);
    route.get('/api/user', auth_controller_1.default);
    route.post('/api/logout', auth_middleware_1.default, logout_controller_1.default);
    //User
    route.get('/api/users', auth_middleware_1.default, user_controller_1.getUsers);
    route.get('/api/users/:id', auth_middleware_1.default, user_controller_1.getUser);
    route.post('/api/users', auth_middleware_1.default, user_controller_1.postUser);
    route.put('/api/users/:id', auth_middleware_1.default, user_controller_1.updateUser);
    route.delete('/api/users/:id', auth_middleware_1.default, user_controller_1.deleteUser);
};
exports.routes = routes;
