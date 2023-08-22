import { Request, Response } from "express"
import { Manager } from "../../db/connector"
import { User } from "../../entities/user.entity"
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"


const Login = async (req:Request, res:Response) => {

    const repository = Manager.getRepository(User)
    const secret = 'secretkey'
 
 // comprobar si el usuario existe en db
    const user = await repository.findOneBy({
        email: req.body.email
    })


 //  si no existe romper
     if(!user){
        return res.status(404).send({
            message: 'ERROR :: User does not exists'
        })
     }

// si existe pero la contraseña es incorrecta
     if(!await bcryptjs.compare(req.body.password , user.password)) {
        return res.status(404).send({
            message: 'ERROR :: Invalid credentials'
        })
     }

    //Devuelve el nusuario JWT autenticada

    const payload = { id: user.id, }

    const token = jwt.sign({ 
        payload
    }, secret)

    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 24*60*60*1000
    })


    res.send({
  
        message:'INFO :: Successfully logged in.'
    })
    

}

export default Login