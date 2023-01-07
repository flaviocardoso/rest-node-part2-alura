const repositorios = require('../repositorios/atendimentos')
const moment = require('moment')
const axios = require('axios')

class Atendimento {
    constructor() {
        this.dataEhValida = ({ data, dataCriacao }) => moment(data).isSameOrAfter(dataCriacao)
        this.clienteEhValido = ({ tamanho }) => tamanho >= 5
        this.valida = parametros => this.validacoes.filter(campo => {
            const { nome } = campo
            const parametro = parametros[nome]
            return !campo.valido(parametro)
        })
        this.validacoes = [
            {
                nome: 'data',
                valido: this.dataEhValida,
                mensagem: 'Data deve ser igual ou maior que a data atual!'
            },
            {
                nome: 'cliente',
                valido: this.clienteEhValido,
                mensagem: `Cliente deve ser pelo menos cinco caracteres!`
            }
        ]
    }
    
    async adiciona(at) {
        const dataCriacao = moment().utcOffset(9).format('YYYY-MM-DD hh:mm:ss')
        const data = moment(at.data, 'DD/MM/YYYY').utcOffset("+09:00").format('YYYY-MM-DD hh:mm:ss')
        console.log(at.cliente.length)
        const parametros = {
            data: { data, dataCriacao },
            cliente: { tamanho: at.cliente.length }
        }
        const erros = this.valida(parametros)
        const existemErros = erros.length
        if (existemErros) {
            return new Promise((resolve, reject) => reject(erros))
        }
        const atDatado = { ...at, dataCriacao, data }
        const results = await repositorios.adiciona(atDatado)
        const id = results.insertId
        return { ...at, id }
    }

    lista() {
        return repositorios.lista()
    }

    async buscaPorId(id) {
        const results = await repositorios.buscaPorId(id)   
        const atendimento = results[0]
        const cpf = atendimento.cliente
        const dataFaker = await axios.get('http://' + 'faker_node_start' + ':8082/' + cpf)
        const { data } = dataFaker
        atendimento.cliente = data
        return atendimento
    }

    async altera(id, valores) {
        if (valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD hh:mm:ss')
        }
        await repositorios.altera(id, valores)
        return { ...valores, id }
    }

    async deleta(id) {
        await repositorios.deleta(id)
        return { id }
    }
}

module.exports = new Atendimento
