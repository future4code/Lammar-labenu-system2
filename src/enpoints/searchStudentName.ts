import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"
import { StudentDataBase } from "../database/StudentDataBase"


export const searchStudentName = async (req: Request, res:Response) => {
    let errorCode = 400
    
    try {
        const studentDataBase = new StudentDataBase()

        let search = req.query.search as string

        if (!search) {
            search ="%"
        }
        
        let students = await studentDataBase.search("nome", "like", `%${search}%`)

        if (students.length < 1) {
            res.status(404).send("Não foi encontrado um estudante com o nome informado.") 
        }

        res.status(200).send(students)

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
