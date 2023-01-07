const conexao = require('./conexao')

const executaQuery = (query, params = '') => {
    return new Promise((resolve, reject) => {
        conexao.query(query, params, (errors, results, fields) => {
            if (errors) {
                reject(errors)
                return
            }
            resolve(results)
        })
    })
}

module.exports = executaQuery