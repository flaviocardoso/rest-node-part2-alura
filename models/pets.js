const repositorios = require('../repositorios/pets')
const uploadDeArquivo = require('../infraestrutura/arquivos/upload_de_arquivos')

class Pet {
    constructor() {
        this.uploadDeArquivo = (imagem, nome) => {
            return new Promise((resolve, reject)=> {
                if (nome && imagem) {
                    uploadDeArquivo(imagem, nome, (erro, caminhoEscrita) => {
                        if (erro) {
                            reject({ erro })
                        } else {
                            resolve({ caminho: caminhoEscrita })
                        }
                    })
                } else {
                    reject({ erro: 'Precisa do nome e arquivo!'})
                }
            })
        }
    }
    
    async adiciona(pet) {
        const saida = await this.uploadDeArquivo(pet.imagem, pet.nome)
        
        const novoPet = { nome: pet.nome, imagem: saida.caminho }
        const results = await repositorios.adiciona(novoPet)
        const id = results.insertId
        return { ...novoPet, id }
    }

    lista() {
        return repositorios.lista()
    }

    async buscaPorId(id) {
        const result = await repositorios.buscaPorId(id)
        return result[0]
    }

    async altera(id, valores) {
        const saida = await this.uploadDeArquivo(valores.imagem, valores.nome)

        valores.imagem = saida.caminho
        await repositorios.altera(id, valores)
        return { ...valores, id }
    }

    async deleta(id) {
        await repositorios.deleta(id)
        return { id }
    }
}

module.exports = new Pet()