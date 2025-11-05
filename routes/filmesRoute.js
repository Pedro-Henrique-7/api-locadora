const express = require('express')
const router = express.Router()
const controllerFilme = require('../controller/filme/controller_filme.js')

// ENDPOINT PARA CRUD DE FILMES-------------------------------------------
router.get('/v1/locadora/filmes', async(request, response) => {
    //chama a função da controller par aretornar os movies

    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})




//retorna um filme por i 
router.get('/v1/locadora/filme/:id', async(request, response) => {
    //chama a função da controller para retornar o movie

    //recebe o id enviado na requisição via parametro
    let idFilme = request.params.id

    let filme = await controllerFilme.buscarFilmeId(idFilme)
    console.log(filme)
    response.status(filme.status_code)
    response.json(filme)
})




//insere um novo firme no banco dedados
router.post('/v1/locadora/filme', async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    // chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})


router.put('/v1/locadora/filme/:id', async(request, response) => {

    //recebe os dados do body
    let dadosBody = request.body

    // recebe o id do filme encaminhado da url
    let idFilme = request.params.id

    // recebe o content type da requisição
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.ataualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
})


router.delete('/v1/locadora/filme/:id', async(request, response) => {
        let idFilme = request.params.id

        let filme = await controllerFilme.excluirFilme(idFilme)

        response.status(filme.status_code)
        response.json(filme)
    })


    
module.exports = router