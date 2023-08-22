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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connector_1 = require("../../db/connector");
const user_entity_1 = require("../../entities/user.entity");
const repository = connector_1.Manager.getRepository(user_entity_1.User);
const secret = 'secretkey';
const CheckSAuthState = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // obtener la cookie del usuario autenticado
        const token = req.cookies.token;
        if (!token) {
            res.status(401).send({
                message: 'ERROR :: Token invalid'
            });
        }
        const payload = jsonwebtoken_1.default.verify(token, secret);
        if (!payload) {
            res.status(401).send({
                message: 'ERROR :: User unauthentication'
            });
        }
        req.body.user = payload;
        next();
    }
    catch (e) {
        return res.status(401).send({
            message: 'ERROR :: User unauthentication '
        });
    }
});
exports.default = CheckSAuthState;
