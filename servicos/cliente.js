const express = require('express')
const faker = require('faker')
const porta = 8082

const app = new express()
// config
app.use(express.urlencoded({ 'extended': true }))
app.use(express.json())
// controller
app.get('/:cpf', (req, res) => {
    const { cpf } = req.params
    res.status(200).json({
        cpf,
        nome: faker.name.findName(),
        dataDeNascimento: faker.date.past()
    })
})

app.listen(porta, () => console.log('API rodando na porta %d!', porta))