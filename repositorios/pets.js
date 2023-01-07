const query = require('../infraestrutura/database/queries')

class Pets {
    constructor() {
        this.queryAdiciona = 'INSERT INTO pets SET ?'
        this.queryLista = 'SELECT * FROM pets'
        this.queryBuscaPorId = (id) => `SELECT * FROM pets WHERE id=${id}`
        this.queryAltera = 'UPDATE pets SET ? WHERE id=?'
        this.queryDeleta = 'DELETE FROM pets WHERE id=?'
    }

    adiciona(pet) {
        return query(this.queryAdiciona, pet)
    }

    lista() {
        return query(this.queryLista)
    }

    buscaPorId(id) {
        return query(this.queryBuscaPorId(id))
    }

    altera(id, valores) {
        return query(this.queryAltera, [ valores, id ])
    }

    deleta(id) {
        return query(this.queryDeleta, id)
    }
}

module.exports = new Pets()