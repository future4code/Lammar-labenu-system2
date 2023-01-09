import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"


export const updateClassModule = async (req: Request, res:Response) => {
    let errorCode = 400
    
    try {
        let id = req.body.id
        let modulo = req.body.modulo

        if (!id) {
            errorCode = 422
            throw new Error ("Necessário inserir o id da turma.")
        }

        if (typeof id !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro id deve ser do tipo string.")
        }

        if (!modulo) {
            errorCode = 422
            throw new Error ("Necessário inserir o módulo da turma.")
        }

        if (typeof modulo !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro módulo deve ser do tipo string.")
        }

        if (modulo < "0" || modulo > "6") {
            errorCode = 422
            throw new Error ("O parâmetro módulo deve um número entre 0 e 6.")
        }

        const classDataBase = new ClassDataBase()

        let idExists = await classDataBase.search("id", "like", id)

        if (idExists.length < 1) {
            errorCode = 422
            throw new Error ("Não existe uma turma com o id inserido.")
        }

        classDataBase.updateClassModule(id, "modulo", modulo)

        res.status(201).send("Módulo atualizado com sucesso!")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
