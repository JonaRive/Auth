import { Request, Response } from "express"
import jwt from "jsonwebtoken"
import { Manager } from "../../db/connector"
import { User } from "../../entities/user.entity"

const repository = Manager.getRepository(User)
const secret = 'secretkey'

const CheckSAuthState = async (req:Request, res:Response, next:Function) => {

 

     try {

     // obtener la cookie del usuario autenticado
     const token = req.cookies.token;

     if(!token){
        res.status(401).send({
            message: 'ERROR :: Token invalid'
        })
     }

    const payload = jwt.verify(token,secret)

    if(!payload){
       res.status(401).send({
        message: 'ERROR :: User unauthentication'
       })
    }

    req.body.user = payload

    next();
   
   } catch (e) {
       return res.status(401).send({
        message: 'ERROR :: User unauthentication '
    })   
   }

}

export default CheckSAuthState