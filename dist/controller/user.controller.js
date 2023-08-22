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
exports.deleteUser = exports.updateUser = exports.postUser = exports.getUser = exports.getUsers = void 0;
require("reflect-metadata");
const connector_1 = require("../db/connector");
const user_entity_1 = require("../entities/user.entity");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const repository = connector_1.Manager.getRepository(user_entity_1.User);
//Get
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield repository.find({
        relations: ['role']
    });
    res.send(users.map(user => {
        const { password } = user, data = __rest(user, ["password"]);
        return data;
    }));
});
exports.getUsers = getUsers;
//Show 
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _a = yield repository.findOneByOrFail({
        id: parseInt(req.params.id),
        relations: ['role']
    }), { password } = _a, user = __rest(_a, ["password"]);
    res.send(user);
});
exports.getUser = getUser;
//Post
const postUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _b = req.body, { role_id } = _b, body = __rest(_b, ["role_id"]);
    const _c = yield repository.save({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: yield bcryptjs_1.default.hash(body.password, 10),
        role: { id: role_id }
    }), { password } = _c, user = __rest(_c, ["password"]);
    res.send(user);
});
exports.postUser = postUser;
//Update
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const _d = req.body, { password } = _d, data = __rest(_d, ["password"]);
    const update = yield repository.update(req.params.id, {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: yield bcryptjs_1.default.hash(body.password, 10)
    });
    console.log(update);
    res.status(202).send(data);
});
exports.updateUser = updateUser;
//Delete
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteUser = yield repository.delete(req.params.id);
    res.status(204).send(deleteUser);
});
exports.deleteUser = deleteUser;
