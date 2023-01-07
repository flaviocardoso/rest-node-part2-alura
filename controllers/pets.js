const Pet = require('../models/pets')

module.exports = app => {
    app.get('/pet', (req, res) => {
        Pet.lista()
            .then(lista => res.json(lista))
            .catch(error => res.status(400).json(error))
    })
    app.get('/pet/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Pet.buscaPorId(id)
            .then(pet => res.json(pet))
            .catch(error => res.status(400).json(error))
    })
    app.post('/pet', (req, res) => {
        const pet = req.body
        Pet.adiciona(pet)
            .then(petCadastrado => res.status(201).json(petCadastrado))
            .catch(error => res.status(400).json(error)) 
    })
    app.patch('/pet/:id', (req, res) => {
        const valores = req.body
        const id = parseInt(req.params.id)
        Pet.altera(id, valores)
            .then(petAtualizado => res.json(petAtualizado))
            .catch(error => res.status(400).json(error))
    })
    app.delete('/pet/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Pet.deleta(id)
            .then(petDeletado => res.json(petDeletado))
            .catch(error => res.status(400).json(error))
    })
}