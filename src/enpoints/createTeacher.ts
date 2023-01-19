import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"
import connection from "../database/connection"
import { TeacherDataBase } from "../database/TeacherDataBase"
import { Usuario } from "../models/Usuario"

export const createTeacher = async (req: Request, res:Response) => {
    let errorCode = 400
    try {
        let {nome, email, data_nasc, turma_id} = req.body
        let especialidades: string[] = req.body.especialidades
        
        if (!nome) {
            errorCode = 422
            throw new Error ("Necessário inserir o nome.")
        }

        if (typeof nome !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro nome deve ser do tipo string.")
        }

        if (!email) {
            errorCode = 422
            throw new Error ("Necessário inserir o e-mail.")
        }

        if (typeof email !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro e-mail deve ser do tipo string.")
        }

        if (!data_nasc) {
            errorCode = 422
            throw new Error ("Necessário inserir a data de nascimento.")
        }

        if (!turma_id) {
            errorCode = 422
            throw new Error ("Necessário inserir o id da turma.")
        }

        if (typeof turma_id !== "string") {
            errorCode = 422
            throw new Error ("O parâmetro turma_id deve ser do tipo string.")
        }

        if (!especialidades) {
            errorCode = 422
            throw new Error ("Necessário inserir uma especialidade")
        }

        for (let x = 0; x < especialidades.length; x++) { 
            if (especialidades[x].toString().toLowerCase() !== "js" && especialidades[x].toString().toLowerCase() !== "css" && especialidades[x].toString().toLowerCase() !== "react" && especialidades[x].toString().toLowerCase() !== "typescript" && especialidades[x].toString().toLowerCase() !== "poo")  {
                errorCode = 422
                throw new Error ("A especialidade inserida deve ser: JS, CSS, React, Typescript ou POO.")
            }
        }
        
        const teacherDataBase = new TeacherDataBase

        let emailExists = await teacherDataBase.search("email", "like", email)

        if (emailExists.length > 0) {
            errorCode = 422
            throw new Error ("E-mail já existente na base de dados.")
        }

        const classDataBase = new ClassDataBase()
        
        let className = await classDataBase.search("id", "like", turma_id)

        if(className.length < 1){
            errorCode = 400 
            throw new Error("Necessário inserir um id de turma existente.")
        }

        let teacherId = await connection ("DOCENTE")

        let id: string = (teacherId.length + 1).toString()

        const docente = new Usuario (id, nome, email, data_nasc, turma_id)

        await teacherDataBase.create(docente)

        let allSpecialties = await connection ("ESPECIALIDADE")

        for (let i = 0; i < especialidades.length; i++) {
            const specialtyExists = allSpecialties.find((item) => especialidades[i].toString().toLowerCase() === item.nome.toLowerCase())

            const teacherSpecialty = {
                "id": Date.now().toString(),
                "docente_id": id,
                "especialidade_id": specialtyExists.id
            }
                await connection ("DOCENTE_ESPECIALIDADE").insert(teacherSpecialty)
        }
        
        res.status(201).send("Docente criado com sucesso!")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
