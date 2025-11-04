const express = require('express')
const router = express.Router()
const controllerNacionalidade = require('./controller/genero/controller_genero.js')

// ENDPOINTS PARA NACIONALIDADES

router.get('/v1/locadora/nacionalidade', cors(), async(request, response) => {
    let nacionalidade = await controllerNacionalidade.listarNacionalidades()

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})



router.get('/v1/locadora/nacionalidade/:id', cors(), async(request, response) => {
    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeId(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

router.post('/v1/locadora/nacionalidade', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})


router.put('/v1/locadora/nacionalidade/:id', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    let idNacionalidade = request.params.id

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody, idNacionalidade, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})



router.delete('/v1/locadora/nacionalidade/:id', cors(), async(request, response) => {
    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

module.exports = router