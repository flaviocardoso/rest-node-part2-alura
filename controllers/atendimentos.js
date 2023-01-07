const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista()
            .then(lista => res.json(lista))
            .catch(error => res.status(400).json(error))
    })
    app.get('/atendimentos/:id', (req,res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id)
            .then(atendimento => res.json(atendimento))
            .catch(error => res.status(400).json(error)) 
    })
    app.post('/atendimentos', (req, res) => {
        const atendimento = req.body

        Atendimento.adiciona(atendimento)
            .then(atCadastrado => res.status(201).json(atCadastrado))
            .catch(error => res.status(400).json(error))
    })
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores)
            .then(atAtualizado => res.json(atAtualizado))
            .catch(error => res.status(400).json(error))
    })
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id)
            .then(atDeletado => res.json(atDeletado))
            .catch(error => res.status(400).json(error))
    })
}