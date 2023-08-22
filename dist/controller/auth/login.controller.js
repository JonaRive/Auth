"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = require("../../db/connector");
const user_entity_1 = require("../../entities/user.entity");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const repository = connector_1.Manager.getRepository(user_entity_1.User);
    const secret = 'secretkey';
    // comprobar si el usuario existe en db
    const user = yield repository.findOneBy({
        email: req.body.email
    });
    //  si no existe romper
    if (!user) {
        return res.status(404).send({
            message: 'ERROR :: User does not exists'
        });
    }
    // si existe pero la contraseña es incorrecta
    if (!(yield bcryptjs_1.default.compare(req.body.password, user.password))) {
        return res.status(404).send({
            message: 'ERROR :: Invalid credentials'
        });
    }
    //Devuelve el nusuario JWT autenticada
    const payload = { id: user.id, };
    const token = jsonwebtoken_1.default.sign({
        payload
    }, secret);
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
    });
    res.send({
        message: 'INFO :: Successfully logged in.'
    });
});
exports.default = Login;
