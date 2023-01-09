import { BaseDatabase } from "./BaseDatabase";

export class ClassDataBase extends BaseDatabase {

    TABLE_NAME = "TURMA";

    public async create (newClass: any) {
        await super.create(newClass);
    }

    public async searchItem (item: string, like: string, value: string){
        await super.search(item,like,value)
    }

    public async updateClassModule (id: string, column: string, newData: string) {
        await super.updateData(id, column, newData)
    }
}
