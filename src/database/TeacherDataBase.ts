import { BaseDatabase } from "./BaseDatabase";

export class TeacherDataBase extends BaseDatabase {

    TABLE_NAME = "DOCENTE";

    public async create (newTeacher: any) {
        await super.create(newTeacher);
    }

    public async searchItem (item: string, like: string, value: string){
        await super.search(item,like,value)
    }

    public async updateTeacherClass (id: string, column: string, newData: string) {
        await super.updateData(id, column, newData)
    }

    public async getAllTeachers() {
        await super.getAll()
    }
}
