import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"
import { StudentDataBase } from "../database/StudentDataBase"
import { TeacherDataBase } from "../database/TeacherDataBase"


export const getAllTeachers = async (req: Request, res:Response) => {
    let errorCode = 400
    
    try {
        const teacherDatabase = new TeacherDataBase()

        const result = await teacherDatabase.getAll()
        
        res.status(200).send({ docentes: result })
    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
