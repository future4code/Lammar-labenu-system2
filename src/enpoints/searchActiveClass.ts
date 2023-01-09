import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"


export const searchClass = async (req: Request, res:Response) => {
    let errorCode = 400
    
    try {
        const classDataBase = new ClassDataBase()

        let activeClasses: string[] = []

        let classes = await classDataBase.search("modulo", "not like", "0")

        classes.map ((item)=> {
            activeClasses.push(item.nome)
        })

        if (activeClasses.length < 1) {
            errorCode = 400 
            throw new Error("Não existem turmas ativas.")
        }

        res.status(200).send(activeClasses)

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
