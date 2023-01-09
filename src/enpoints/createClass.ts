import { Request, Response } from "express"
import connection from "../database/connection"
import { ClassDataBase } from "../database/ClassDataBase"
import { Turma } from "../models/Turma"

export const createClass = async (req: Request, res:Response) => {
    let errorCode = 400
    try {
        let nome = req.body.nome
        let modulo = "0"

        if (!nome) {
            errorCode = 422
            throw new Error ("Necessário inserir o nome da turma.")
        }

        if (typeof nome !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro nome deve ser do tipo string.")
        }

        let turma = await connection ("TURMA")

        let id: string = (turma.length + 1).toString()

        const classDataBase = new ClassDataBase()
        
        let className = await classDataBase.search("nome", "like", nome)

        if(className.length > 0){
            errorCode = 400 
            throw new Error("Esse nome de turma já existe.")
        }

        let newClass = new Turma (id, nome, modulo)

        await classDataBase.create(newClass)
        
        res.status(201).send("Turma criada com sucesso!")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
