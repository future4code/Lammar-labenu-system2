import { Request, Response } from "express"
import { ClassDataBase } from "../database/ClassDataBase"
import connection from "../database/connection"
import { StudentDataBase } from "../database/StudentDataBase"
import { Usuario } from "../models/Usuario"

export const createStudent = async (req: Request, res:Response) => {
    let errorCode = 400
    try {
        let {nome, email, data_nasc, turma_id} = req.body
        let hobbies: string[] = req.body.hobbies
        
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

        if (!hobbies) {
            errorCode = 422
            throw new Error ("Necessário inserir um hobby.")
        }
        
        const studentDataBase = new StudentDataBase

        let emailExists = await studentDataBase.search("email", "like", email)

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

        let estudanteId = await connection ("ESTUDANTE")

        let id: string = (estudanteId.length + 1).toString()

        const estudante = new Usuario (id, nome, email, data_nasc, turma_id)

        await studentDataBase.create(estudante)

        let allHobbies = await connection ("HOBBY")

        for (let i = 0; i < hobbies.length; i++) {
            const hobbyExists = allHobbies.find((item) => hobbies[i].toString().toLowerCase() === item.nome.toLowerCase())

            if (!hobbyExists) {
                const newHobby = {
                    "id": Date.now().toString(),
                    "nome": hobbies[i]                
                }

                await connection("HOBBY").insert(newHobby)

                const studentHobby = {
                    "id": Date.now().toString(),
                    "estudante_id": id,
                    "hobby_id": newHobby.id
                }

                await connection ("ESTUDANTE_HOBBY").insert(studentHobby)
            } else {
                const studentHobby = {
                    "id": Date.now().toString(),
                    "estudante_id": id,
                    "hobby_id": hobbyExists.id
                }

                await connection ("ESTUDANTE_HOBBY").insert(studentHobby)
            }
        }

        
        res.status(201).send("Estudante criado com sucesso!")

    } catch (error) {
        res.status(errorCode).send({ message: error.message })
    }
}
