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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connector_1 = require("../../db/connector");
const user_entity_1 = require("../../entities/user.entity");
const register_validation_1 = require("../../validation/register.validation");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const repository = connector_1.Manager.getRepository(user_entity_1.User);
    // comprobar si se enviaron todas las informaciones
    const { error } = register_validation_1.registerValidation.validate(body);
    // romper si falta algo
    if (error) {
        return res.status(400).send(error.details);
    }
    // verify that password is confirmed
    if (body.password !== body.passwordConfirm) {
        return res.status(400).send({
            message: 'ERROR :: Passwords do not match!'
        });
    }
    //guarda la contraseña en la base de datos
    const _a = yield repository.save({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: yield bcryptjs_1.default.hash(body.password, 10)
    }), { password } = _a, user = __rest(_a, ["password"]);
    res.send(user);
});
exports.default = Register;
