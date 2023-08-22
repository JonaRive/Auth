import { Request, Response } from "express"
import { Manager } from "../../db/connector"
import { User } from "../../entities/user.entity"
import { registerValidation } from "../../validation/register.validation"
import bcryptjs from "bcryptjs"

const Register =async (req:Request, res:Response) => {

    const body = req.body
    const repository = Manager.getRepository(User)

    
// comprobar si se enviaron todas las informaciones
    const { error } = registerValidation.validate(body)

// romper si falta algo
    if(error){
        return res.status(400).send(error.details)
    }

// verify that password is confirmed
    if(body.password !== body.passwordConfirm){
        return res.status(400).send({
            message:'ERROR :: Passwords do not match!'
        })
    }   
//guarda la contraseña en la base de datos
    const {password, ...user} = await repository.save({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10)
    }) 
    
    res.send(user)
} 
export default Register