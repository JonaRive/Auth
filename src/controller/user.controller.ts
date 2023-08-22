import "reflect-metadata"
import { Request, Response } from "express";
import { Manager } from "../db/connector";
import { User } from "../entities/user.entity";
import bcryptjs from "bcryptjs"


const repositoryUser = Manager.getRepository(User)


//Get

export const getUsers =  async(req:Request, res:Response) => {

    const users = await repositoryUser.find({
        relations: ['role']
    })

    res.send(
        users.map(user => {
            const {password, ...data} = user
            return data
        })
    )
}

//Show 

export const getUser = async(req:Request, res:Response )=> {

      
        const  {password,...data} = await repositoryUser.findOneOrFail({
           relations : ['role'] ,where: { id: parseInt (req.params.id),}
           
        })
    
         res.send(data) 
} 

//Post

export const postUser = async( req:Request, res:Response) => {

    const { role_id ,... body } = req.body
    
    const {password, ...user} = await repositoryUser.save({
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: await bcryptjs.hash(body.password, 10),
        role: { id:role_id }
    }) 
    
    res.send(user)
}

//Update

export const updateUser = async (req:Request, res:Response ) => {

   const {role_id, ...body} = req.body 

        await repositoryUser.update(req.params.id, {
        firstName:body.firstName,
        lastName:body.lastName,
        email:body.email,
        password: await bcryptjs.hash(body.password, 10),
        role:{ id: role_id}
    })

    const {password, ...data} = await repositoryUser.findOneOrFail({
        relations: ['role'], where: {id:parseInt (req.params.id)}  
    });

    
    res.status(202).send(data)
}

//Delete

export const deleteUser = async ( req:Request, res:Response) => {

    const deleteUser = await repositoryUser.delete(req.params.id)
    res.status(204).send(deleteUser) 
}

