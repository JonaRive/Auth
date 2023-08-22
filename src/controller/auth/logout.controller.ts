import { Request, Response } from "express"

const Logout = async (req:Request, res:Response) => {

    res.cookie('token', '', {maxAge: 0})

    res.send({
        message: 'INFO :: Successfully logged out.'
    })
}

export default Logout