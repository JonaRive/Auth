import "reflect-metadata"
import { Request, Response } from "express"
import { Manager } from "../db/connector"
import { Role } from "../entities/role.entity"

const repositoryRole = Manager.getRepository(Role)


//Get
export const  getRoles = async (req:Request, res:Response)  => {
      
    const roles = await repositoryRole.find()

    res.send(roles)
}

//Show
export const getRole = async (req:Request, res:Response ) => {
    
    const role = await repositoryRole.findOneByOrFail({
        id:parseInt(req.params.id)
    })

    res.send(role)
}

//Post
export const postRole = async (req:Request, res:Response) => {
    
    const body = req.body
    const role = await repositoryRole.save(body)

    res.send(role)
}

//Update
export const updateRole = async (req:Request, res:Response) => {
    
    const body = req.body
    const update= await repositoryRole.update(req.params.id, body)

    res.send(update)
}

//Delete
export const deleteRole = async (req:Request, res:Response) => {
    
    const deleteRole = await repositoryRole.delete(req.params.id)

    res.send(deleteRole)
}