import { BaseDatabase } from "./BaseDatabase";

export class StudentDataBase extends BaseDatabase {

    TABLE_NAME = "ESTUDANTE";

    public async create (newStudent: any) {
        await super.create(newStudent);
    }

    public async searchItem (item: string, like: string, value: string){
        await super.search(item,like,value)
    }

    public async updateStudentClass (id: string, column: string, newData: string) {
        await super.updateData(id, column, newData)
    }
}
