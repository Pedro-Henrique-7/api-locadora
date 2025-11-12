const express = require('express')
const router = express.Router()
const controllerAtor = require('../controller/ator/controller_ator.js')


//crud para diretor


//listar todos diretores
router.get('/v1/locadora/atores',  async (request, response) => {
    let dados = await controllerAtor.listarAtores()

    response.status(dados.status_code)
    response.json(dados)
})

//buscar diretor por id
router.get('/v1/locadora/ator/:id', async (request, response) => {
    let id = request.params.id
    let dados = await controllerAtor.buscarAtorId(id)

    response.status(dados.status_code)
    response.json(dados)
})

//inserir diretor
router.post('/v1/locadora/ator', async (request, response) => {
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let dados = await controllerAtor.inserirAtor(dadosBody, contentType)

    response.status(dados.status_code)
    response.json(dados)
})

//atualizar dados
router.put('/v1/locadora/ator/:id', async (request, response) => {
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dadosBody = request.body

    let dados = await controllerAtor.atualizarAtor(dadosBody, id, contentType)

    response.status(dados.status_code)
    response.json(dados)
})


//excluir diretor
router.delete('/v1/locadora/ator/:id', async (request, response) => {
    let id = request.params.id
    let dados = await controllerAtor.excluirAtor(id)

    response.status(dados.status_code)
    response.json(dados)
})

module.exports = router