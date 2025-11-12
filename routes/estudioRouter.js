const express = require('express')
const router = express.Router()
const controllerEstudio = require('../controller/estudio/controller_estudio.js')


// endpoints para estudio


//Retorna todos os estúdios
router.get('/v1/locadora/estudio', async (request, response) => {
    let estudios = await controllerEstudio.listarEstudios()

    response.status(estudios.status_code)
    response.json(estudios)
})

// Retorna um estúdio filtrando pelo ID
router.get('/v1/locadora/estudio/:id', async (request, response) => {
    let idEstudio = request.params.id

    let estudio = await controllerEstudio.buscarEstudioId(idEstudio)

    response.status(estudio.status_code)
    response.json(estudio)
})

//Insere um novo estúdio
router.post('/v1/locadora/estudio', async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let novoEstudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)

    response.status(novoEstudio.status_code)
    response.json(novoEstudio)
})

// Atualiza um estúdio filtrando pelo ID
router.put('/v1/locadora/estudio/:id', async (request, response) => {
    let idEstudio = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let estudioAtualizado = await controllerEstudio.ataualizarEstudio(dadosBody, idEstudio, contentType)

    response.status(estudioAtualizado.status_code)
    response.json(estudioAtualizado)
})

// Exclui um estúdio filtrando pelo ID
router.delete('/v1/locadora/estudio/:id', async (request, response) => {
    let idEstudio = request.params.id

    let estudio = await controllerEstudio.excluirEstudio(idEstudio)

    response.status(estudio.status_code)
    response.json(estudio)
})



module.exports = router