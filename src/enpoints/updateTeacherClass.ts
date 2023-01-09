import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"
import { StudentDataBase } from "../database/StudentDataBase"
import { TeacherDataBase } from "../database/TeacherDataBase"


export const updateTeacherClass = async (req: Request, res:Response) => {
    let errorCode = 400
    
    try {
        let id = req.body.id
        let turma_id = req.body.turma_id

        if (!id) {
            errorCode = 422
            throw new Error ("Necessário inserir o id do docente.")
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

        const teacherDataBase = new TeacherDataBase()

        let teacherIdExists = await teacherDataBase.search("id", "like", id)

        if (teacherIdExists.length < 1) {
            errorCode = 422
            throw new Error ("Não existe um docente com o id inserido.")
        }

        teacherDataBase.updateTeacherClass(id, "turma_id", turma_id)

        res.status(201).send("Turma atualizada com sucesso!")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
