const fs = require('fs')
const path = require('path')

const { buffer, stream } = { buffer: false, stream: false }

// Feito por buffer. O buffer geralmente é sincrono, isso atrapalha para execução de outros recursos no sistema, pois ele interrompe outros para executar.
// Sabemos que o motor do js executa primeiro as partes sincronas para executas as assincronas.
// pode levar três paramentros, é para ler o buffer


if (buffer) {
    // le o buffer do arquivo, ele posso tres parametros, o primeiro é o caminho que está o arquivo, o segundo é o numero e o terceiro é o callback
    fs.readFile('./asserts/salsicha.jpeg', (erro, buffer) => {
        console.log('A imagem foi bufferizada!')
        
        // vamos salvar a imagem
        fs.writeFile('./asserts/salsicha2.jpeg', buffer, (erro) => {
            console.log('A imagem foi escrita!')
        })
    })
}

// Feito por Stream. O Stream é assincromo, e quebra em pequenas partes, executando em segundo pano em paralelo. E isso deixa a leitura mais rápida.

if (stream) {
    // le o stream do arquivo, ele quebra o arquivo em pequenas partes. A leitura fica mais rápida. Aqui tem o parametro de caminho do arquivo.
    fs.createReadStream('./asserts/salsicha.jpeg')
        .pipe(fs.createWriteStream('./asserts/salsicha_stream.jpeg')) // do pipe tem o processmo que escreve o arquivo. Ele fica em loop até terminar a leitura do arquivo, entregando as parte do arquivo.
        .on('finish', () => console.log('A imagem foi salva com sucesso!')) // Aqui é um evento de verificação, podemos ter outros tipos além do 'finish' para verificar o andamento. Pelo evento, vemos que quando terminar de salvar o arquivo, ele executará o aviso.
}

module.exports = (caminho, nomeDoArquivo, callback) => {
    const extValidas = ['jpg', 'png', 'jpeg']
    const ext = path.extname(caminho)
    // console.log(caminho)
    const extEhInvalida = extValidas.indexOf(ext.substring(1)) === -1
    if (extEhInvalida) {
        const erro = `Extensão '${ext.substring(1)}' é inválida!`
        callback(erro)
        return
    }
    const caminhoEscrita = `./asserts/imagens/${nomeDoArquivo}${ext}`
    fs.createReadStream(caminho)
        .pipe(fs.createWriteStream(caminhoEscrita))
        .on('finish', () => callback(false, caminhoEscrita))
}