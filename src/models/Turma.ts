export class Turma {
    constructor (
        private id: string,
        private nome: string,
        private modulo: string
    ) {
        this.id = id
        this.nome = nome
        this.modulo = modulo
    }

    
    public getId () {
        return this.id
    }

    public getName () {
        return this.nome
    }

    public getModule () {
        return this.modulo
    }
}