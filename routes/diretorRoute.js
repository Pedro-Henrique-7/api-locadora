const express = require('express')
const router = express.Router()
const controllerDiretor = require('../controller/genero/controller_genero.js')


//crud para diretor


//listar todos diretores
router.get('/v1/locadora/diretores',  async (request, response) => {
    let dados = await controllerDiretor.listarDiretores()

    response.status(dados.status_code)
    response.json(dados)
})

//buscar diretor por id
router.get('/v1/locadora/diretor/:id', async (request, response) => {
    let id = request.params.id
    let dados = await controllerDiretor.buscarDiretorId(id)

    response.status(dados.status_code)
    response.json(dados)
})

//inserir diretor
router.post('/v1/locadora/diretor', async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dados = await controllerDiretor.inserirDiretor(dadosBody, contentType)

    response.status(dados.status_code)
    response.json(dados)
})

//atualizar dados
router.put('/v1/locadora/diretor/:id', async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let dados = await controllerDiretor.atualizarDiretor(dadosBody, id, contentType)

    response.status(dados.status_code)
    response.json(dados)
})


//excluir diretor
router.delete('/v1/locadora/diretor/:id', async (request, response) => {
    let id = request.params.id
    let dados = await controllerDiretor.excluirDiretor(id)

    response.status(dados.status_code)
    response.json(dados)
})

module.exports = router