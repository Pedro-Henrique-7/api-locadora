// objetivo: API responsavel em criar endPoints
// data: 07-10-2025
// autor: Pedro Henrique Oliveira da Silva
// versão 1.0
//
// obs: instalar dependencias para criar api
//      express - npm install express          --save isntala dependencias para criar uma api 
//      cors    - npm install cors             --save instala as dependencias para configurar as permissões de api
//      body-parser - npm install  body-parser --save  instala as dependencias para receber os tipos de dados via post ou put


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerEstudio = require('./controller/estudio/controller_estudio.js')


const itsWorking = require('./itsWorking.js')

const itsWorkingMessage = itsWorking.showMessage()

// cria um objeto especialista em JSON para receber os dados do body (post e put)
const bodyParserJSON = bodyParser.json()


//deifine a porta padrão da api, se for servidor de nuvem nao temos acesso a porta
//EM EXECUÇÃO LOCAL PODEMOS DEFINIR A PORTA
const PORT = process.PORT || 8080

//instancia da classe express
const app = express()

//config cors
app.use((request, response, next) => {
    response.header('Acess-Control-Allow-Origin', '*') // Ip de Origem
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //  Metodos Http

    app.use(cors())
    next() //Ler os proximos end points 
})


//endpoint padrão
app.get('/v1/locadora/', cors(), async(request, response) => {

    let menssagem = `   <h1>Bem Vindo a Locadora de Filmes Senai</h1>
                        <h2> Faça uma requisição </h2>`

    response.send(`${menssagem}`)
})



// ENDPOINT PARA CRUD DE FILMES-------------------------------------------
app.get('/v1/locadora/filmes', cors(), async(request, response) => {
    //chama a função da controller par aretornar os movies

    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})




//retorna um filme por i 
app.get('/v1/locadora/filme/:id', cors(), async(request, response) => {
    //chama a função da controller para retornar o movie

    //recebe o id enviado na requisição via parametro
    let idFilme = request.params.id

    let filme = await controllerFilme.buscarFilmeId(idFilme)
    console.log(filme)
    response.status(filme.status_code)
    response.json(filme)
})




//insere um novo firme no banco dedados
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    // chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)

    response.status(filme.status_code)
    response.json(filme)
})


app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON, async(request, response) => {

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


app.delete('/v1/locadora/filme/:id', cors(), async(request, response) => {
        let idFilme = request.params.id

        let filme = await controllerFilme.excluirFilme(idFilme)

        response.status(filme.status_code)
        response.json(filme)
    })
    //--------------------------------------------------------------------------

//ENDPOINTS PARA CRUD DE GENERO

app.get('/v1/locadora/genero', cors(), async(request, response) => {
    let genero = await controllerGenero.listarGeneros()

    response.status(genero.status_code)
    response.json(genero)
})



app.get('/v1/locadora/genero/:id', cors(), async(request, response) => {
    let idGenero = request.params.id

    let genero = await controllerGenero.buscarGeneroId(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

app.post('/v1/locadora/genero', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.inserirGenero(dadosBody, contentType)

    response.status(genero.status_code)
    response.json(genero)
})


app.put('/v1/locadora/genero/:id', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    let idGenero = request.params.id

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let genero = await controllerGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(genero.status_code)
    response.json(genero)
})



app.delete('/v1/locadora/genero/:id', cors(), async(request, response) => {
    let idGenero = request.params.id

    let genero = await controllerGenero.deletarGenero(idGenero)

    response.status(genero.status_code)
    response.json(genero)
})

//-------------------------------------------------------------------------------

// ENDPOINTS PARA NACIONALIDADES

app.get('/v1/locadora/nacionalidade', cors(), async(request, response) => {
    let nacionalidade = await controllerNacionalidade.listarNacionalidades()

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})



app.get('/v1/locadora/nacionalidade/:id', cors(), async(request, response) => {
    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.buscarNacionalidadeId(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

app.post('/v1/locadora/nacionalidade', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.inserirNacionalidade(dadosBody, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})


app.put('/v1/locadora/nacionalidade/:id', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    let idNacionalidade = request.params.id

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let nacionalidade = await controllerNacionalidade.atualizarNacionalidade(dadosBody, idNacionalidade, contentType)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})



app.delete('/v1/locadora/nacionalidade/:id', cors(), async(request, response) => {
    let idNacionalidade = request.params.id

    let nacionalidade = await controllerNacionalidade.excluirNacionalidade(idNacionalidade)

    response.status(nacionalidade.status_code)
    response.json(nacionalidade)
})

// endpoints para estudio


//Retorna todos os estúdios
app.get('/v1/locadora/estudio', cors(), async (request, response) => {
    let estudios = await controllerEstudio.listarEstudios()

    response.status(estudios.status_code)
    response.json(estudios)
})

// Retorna um estúdio filtrando pelo ID
app.get('/v1/locadora/estudio/:id', cors(), async (request, response) => {
    let idEstudio = request.params.id

    let estudio = await controllerEstudio.buscarEstudioId(idEstudio)

    response.status(estudio.status_code)
    response.json(estudio)
})

//Insere um novo estúdio
app.post('/v1/locadora/estudio', cors(), bodyParserJSON, async (request, response) => {
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let novoEstudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)

    response.status(novoEstudio.status_code)
    response.json(novoEstudio)
})

// Atualiza um estúdio filtrando pelo ID
app.put('/v1/locadora/estudio/:id', cors(), bodyParserJSON, async (request, response) => {
    let idEstudio = request.params.id
    let dadosBody = request.body
    let contentType = request.headers['content-type']

    let estudioAtualizado = await controllerEstudio.ataualizarEstudio(dadosBody, idEstudio, contentType)

    response.status(estudioAtualizado.status_code)
    response.json(estudioAtualizado)
})

// Endpoint: Exclui um estúdio filtrando pelo ID
app.delete('/v1/locadora/estudio/:id', cors(), async (request, response) => {
    let idEstudio = request.params.id

    let estudio = await controllerEstudio.excluirEstudio(idEstudio)

    response.status(estudio.status_code)
    response.json(estudio)
})





app.listen(PORT, function() {
    console.log(`${itsWorkingMessage}`)
})