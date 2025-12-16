const express = require('express')
const router = express.Router()
const controllerFilmeDiretor = require('../controller/filme/controller_filme_diretor')

// listar todos os filmesDiretor
router.get('/v1/locadora/filme-diretor', async (request, response) => {
    let filmeDiretor = await controllerFilmeDiretor.listarFilmesDiretor()
    response.status(filmeDiretor.status_code)
    response.json(filmeDiretor)
})

// listar filmeDiretor por id
router.get('/v1/locadora/filme-diretor/:id', async (request, response) => {
    let filmeDiretorId = request.params.id
    let filmeDiretor = await controllerFilmeDiretor.buscarFilmeDiretorById(filmeDiretorId)

    response.status(filmeDiretor.status_code)
    response.json(filmeDiretor)
})

// listar filmes por id do diretor
router.get('/v1/locadora/:id/filmes-diretor', async (request, response) => {
    let idDiretor = request.params.id
    let filmes = await controllerFilmeDiretor.listarFilmesIdDiretor(idDiretor)

    response.status(filmes.status_code)
    response.json(filmes)
})

// listar diretores por id do filme
router.get('/v1/locadora/:id/diretores', async (request, response) => {
    let idFilme = request.params.id
    let diretores = await controllerFilmeDiretor.listarDiretoresIdFilme(idFilme)

    response.status(diretores.status_code)
    response.json(diretores)
})

// inserir filmeDiretor
router.post('/v1/locadora/filme-diretor', async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let filmeDiretor = await controllerFilmeDiretor.inserirFilmeDiretor(dadosBody, contentType)

    response.status(filmeDiretor.status_code)
    response.json(filmeDiretor)
})

// atualizar filmeDiretor
router.put('/v1/locadora/filme-diretor/:id', async (request, response) => {
    let dadosBody = request.body
    let idFilmeDiretor = request.params.id
    let contentType = request.headers['content-type']
    let filmeDiretor = await controllerFilmeDiretor.atualizarFilmeDiretor(
        dadosBody,
        idFilmeDiretor,
        contentType
    )

    response.status(filmeDiretor.status_code)
    response.json(filmeDiretor)
})

// deletar filmeDiretor
router.delete('/v1/locadora/filme-diretor/:id', async (request, response) => {
    let filmeDiretorId = request.params.id
    let filmeDiretor = await controllerFilmeDiretor.deletarFilmeDiretor(filmeDiretorId)

    response.status(filmeDiretor.status_code)
    response.json(filmeDiretor)
})

module.exports = router
