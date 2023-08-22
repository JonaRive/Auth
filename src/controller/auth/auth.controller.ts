import { Request, Response } from "express"

const Auth = async (req:Request, res:Response) => {

    
  // Devolver datos del usuario por JWT id
   const {password, ...user} = req.body.user
   res.send(user)
   
}

export default Auth