const express = require('express')
const router = express.Router()
const controllerFilmeGenero = require('../controller/filme/controller_fime_genero')
const { route } = require('./filmesRoute')


//listar todos os filmesGenero

router.get('/v1/locadora/filme-genero', async (request, response) =>{
    let filmeGenero = await controllerFilmeGenero.listarFilmesGenero()
    response.status(filmeGenero.status_code)
    response.json(filmeGenero)
})

//listar filmesGenerp por id

router.get('/v1/locadora/filme-genero/:id', async (request, response)=>{
    let filmeGeneroId = request.params.id
    let filmeGenero = await controllerFilmeGenero.buscarFilmeGeneroById(filmeGeneroId)

    response.status(filmeGenero.status_code)
    response.json(filmeGenero)
})

// listar filme por idGenero

router.get('/v1/locadora/:id/filmes', async(request, response)=>{
    let idGenero = request.params.id
    let filmes = await controllerFilmeGenero.listarFilmesIdGenero(idGenero)

    response.status(filmes.status_code)
    response.json(filmes)
})

// listar genero por id do filme
router.get('/v1/locadora/:id/genero', async(request, response)=>{
    let idFilme = request.params.id
    let generos = await controllerFilmeGenero.listarGenerosIdFilme(idFilme)

    response.status(generos.status_code)
    response.json(generos)
})



//inserir filmeGenero
router.post('/v1/locadora/filme-genero', async(request, response)=>{
    let dadosBody = request.body
    let contentType = request.headers['content-type']
    let filmeGenero = await controllerFilmeGenero.inserirFilmeGenero(dadosBody, contentType)
    response.status(filmeGenero.status_code)
    response.json(filmeGenero)
})

//atualizar filmegenero

router.put('/v1/locadora/filme-genero/:id', async(request, response)=>{
    let dadosBody = request.body
    let idFilmeGenero = request.params.id
    let contentType = request.headers['content-type']
    let filmeGenero = await controllerFilmeGenero.atualizarFilmeGenero(dadosBody, idFilmeGenero, contentType)
    response.status(filmeGenero.status_code)
    response.json(filmeGenero)
})


//deletar filmeGenero
router.delete('/v1/locadora/filme-genero/:id', async (request, response)=>{
    let filmeGeneroId = request.params.id
    let filmeGenero = await controllerFilmeGenero.deletarFilmeGenero(filmeGeneroId)

    response.status(filmeGenero.status_code)
    response.json(filmeGenero)
})


module.exports = router