import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"
import { StudentDataBase } from "../database/StudentDataBase"


export const updateStudentClass = async (req: Request, res:Response) => {
    let errorCode = 400
    
    try {
        let id = req.body.id
        let turma_id = req.body.turma_id

        if (!id) {
            errorCode = 422
            throw new Error ("Necessário inserir o id do estudante.")
        }

        if (typeof id !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro id deve ser do tipo string.")
        }

        if (!turma_id) {
            errorCode = 422
            throw new Error ("Necessário inserir o id da turma.")
        }

        if (typeof turma_id !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro turma_id deve ser do tipo string.")
        }

        const classDataBase = new ClassDataBase()
            
        let idExists = await classDataBase.search("id", "like", turma_id)

        if (idExists.length < 1) {
            errorCode = 422
            throw new Error ("Não existe uma turma com o id inserido.")
        }

        const studentDataBase = new StudentDataBase()

        let studentIdExists = await studentDataBase.search("id", "like", id)

        if (studentIdExists.length < 1) {
            errorCode = 422
            throw new Error ("Não existe um estudante com o id inserido.")
        }

        studentDataBase.updateStudentClass(id, "turma_id", turma_id)

        res.status(201).send("Turma atualizada com sucesso!")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
