const express = require('express')
const router = express.Router()
const controllerFilmeAtor = require('../controller/filme/controller_filme_ator')

// listar todos os filmesAtor
router.get('/v1/locadora/filme-ator', async (request, response) => {
    let filmeAtor = await controllerFilmeAtor.listarFilmesAtor()
    response.status(filmeAtor.status_code)
    response.json(filmeAtor)
})

// listar filmeAtor por id
router.get('/v1/locadora/filme-ator/:id', async (request, response) => {
    let filmeAtorId = request.params.id
    let filmeAtor = await controllerFilmeAtor.buscarFilmeAtorById(filmeAtorId)

    response.status(filmeAtor.status_code)
    response.json(filmeAtor)
})

// listar filmes por id do ator
router.get('/v1/locadora/:id/filmes-ator', async (request, response) => {
    let idAtor = request.params.id
    let filmes = await controllerFilmeAtor.listarFilmesIdAtor(idAtor)

    response.status(filmes.status_code)
    response.json(filmes)
})

// listar atores por id do filme
router.get('/v1/locadora/:id/atores', async (request, response) => {
    let idFilme = request.params.id
    let atores = await controllerFilmeAtor.listarAtoresIdFilme(idFilme)

    response.status(atores.status_code)
    response.json(atores)
})

// inserir filmeAtor
router.post('/v1/locadora/filme-ator', async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let filmeAtor = await controllerFilmeAtor.inserirFilmeAtor(dadosBody, contentType)

    response.status(filmeAtor.status_code)
    response.json(filmeAtor)
})

// atualizar filmeAtor
router.put('/v1/locadora/filme-ator/:id', async (request, response) => {
    let dadosBody = request.body
    let idFilmeAtor = request.params.id
    let contentType = request.headers['content-type']
    let filmeAtor = await controllerFilmeAtor.atualizarFilmeAtor(
        dadosBody,
        idFilmeAtor,
        contentType
    )

    response.status(filmeAtor.status_code)
    response.json(filmeAtor)
})

// deletar filmeAtor
router.delete('/v1/locadora/filme-ator/:id', async (request, response) => {
    let filmeAtorId = request.params.id
    let filmeAtor = await controllerFilmeAtor.deletarFilmeAtor(filmeAtorId)

    response.status(filmeAtor.status_code)
    response.json(filmeAtor)
})

module.exports = router
