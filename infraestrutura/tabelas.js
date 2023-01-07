class Tabelas {
    init (cn) {
        this.cn = cn

        this.criarAtendimentos()
        this.criarPets()
    }

    criarAtendimentos() {
        let sql = 'CREATE TABLE IF NOT EXISTS atendimentos ' 
        sql = sql + '('
        sql = sql + 'id int NOT NULL AUTO_INCREMENT, '
        sql = sql + 'cliente varchar(11) NOT NULL, '
        sql = sql + 'pet varchar(20), '
        sql = sql + 'servico varchar(20) NOT NULL, '
        sql = sql + 'status varchar(20) NOT NULL, '
        sql = sql + 'data datetime NOT NULL, '
        sql = sql + 'dataCriacao datetime NOT NULL, '
        sql = sql + 'observacoes text, '
        sql = sql + 'PRIMARY KEY(id)'
        sql = sql + ')'

        this.cn.query(sql, (erro, res) => {
            if (erro) {
                console.log(erro)
                return
            }
            const jaExiste = res.affectedRows === 1
            if (jaExiste) {
                console.log('Tabela de atendimentos criada com sucesso')
            } 
        })
    }

    criarPets() {
        let sql = 'CREATE TABLE IF NOT EXISTS pets '
        sql = sql + '('
        sql = sql + 'id int NOT NULL AUTO_INCREMENT, '
        sql = sql + 'nome varchar(50), '
        sql = sql + 'imagem varchar(200),'
        sql = sql + 'PRIMARY KEY(id)'
        sql = sql + ')'

        this.cn.query(sql, (erro, res) => {
            if (erro) {
                console.log(erro)
                return
            }
            const jaExiste = res.affectedRows === 1
            if (jaExiste) {
                console.log('Tabela de pets criada com sucesso')
            } 
        })
    }
}

module.exports = new Tabelas
