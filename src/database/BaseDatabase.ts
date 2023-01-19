import knex from "knex";
import dotenv from "dotenv";

dotenv.config()

export abstract class BaseDatabase {
    static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            multipleStatements: true
        }
    });

    abstract TABLE_NAME : string;
    
    public async create(item: any) {
        await BaseDatabase.connection(this.TABLE_NAME).insert(item);
    }

    public async search (item: any, like: any, value: any) {
        const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(item, like, value)
        return result
    }

    public async updateData (id: string, column:string, newData: string) {
        const result = await BaseDatabase.connection(this.TABLE_NAME).update(column, newData).where({id})
    }
    public async getAll() {
        const result = await BaseDatabase.connection(this.TABLE_NAME).select();
        return result;
    }
}
