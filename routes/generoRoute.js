const express = require('express')
const router = express.Router()
const controllerGenero = require('./controller/genero/controller_genero.js')


//ENDPOINTS PARA CRUD DE GENERO

router.get('/v1/locadora/genero', cors(), async(request, response) => {
    let genero = await controllerGenero.listarGeneros()

    response.status(genero.status_code)
    response.json(genero)
})



router.get('/v1/locadora/genero/:id', cors(), async(request, response) => {
    let idGenero = request.params.id

    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

router.post('/v1/locadora/genero', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})


router.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    let idGenero = request.params.id

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})



router.delete('/v1/locadora/genero/:id', cors(), async(request, response) => {
    let idGenero = request.params.id

    let genero = await controllerGenero.deletarGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

module.exports = router