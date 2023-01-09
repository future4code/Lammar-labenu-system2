import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { createClass } from './enpoints/createClass'
import { searchClass } from './enpoints/searchActiveClass'
import { updateClassModule } from './enpoints/updateClassModule'
import { createStudent } from './enpoints/createStudent'
import { searchStudentName } from './enpoints/searchStudentName'
import { updateStudentClass } from './enpoints/updateStudentClass'
import { createTeacher } from './enpoints/createTeacher'
import { getAllTeachers } from './enpoints/getAllTeachers'
import { updateTeacherClass } from './enpoints/updateTeacherClass'

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT || 3003}`)
})

// Criar turma
app.post("/turma", createClass)

// Buscar turmas ativas
app.get("/turma", searchClass)

// Atualizar módulo da turma
app.put("/turma", updateClassModule )

// Criar estudante
app.post("/estudante", createStudent)

// Buscar estudante pelo nome
app.get("/estudante", searchStudentName)

// Atualizar turma de estudante
app.put("/estudante", updateStudentClass )

// Criar docente
app.post("/docente", createTeacher)

// Buscar todos os docentes
app.get("/docente", getAllTeachers)

// Atualizar turma de docente
app.put("/docente", updateTeacherClass)

