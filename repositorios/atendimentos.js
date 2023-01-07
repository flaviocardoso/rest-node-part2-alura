const query = require('../infraestrutura/database/queries')

class Atendimento {
    constructor() {
        this.queryAdiciona = 'INSERT INTO atendimentos SET ?'
        this.queryLista = 'SELECT * FROM atendimentos'
        this.queryBuscaPorId = (id) => `SELECT * FROM atendimentos WHERE id=${id}`
        this.queryAltera = 'UPDATE atendimentos SET ? WHERE id=?'
        this.queryDeleta = 'DELETE FROM atendimentos WHERE id=?'
    }

    adiciona(atendimento) {
        return query(this.queryAdiciona, atendimento)
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

module.exports = new Atendimento