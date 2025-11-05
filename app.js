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
<<<<<<< HEAD
const controllerFilme = require('./controller/filme/controller_filme.js')
const controllerGenero = require('./controller/genero/controller_genero.js')
const controllerNacionalidade = require('./controller/nacionalidade/controller_nacionalidade.js')
const controllerEstudio = require('./controller/estudio/controller_estudio')

=======
const app = express()
>>>>>>> 3c4e623d52d351a2cd2d803019cc800e37103641
const itsWorking = require('./itsWorking.js')

const itsWorkingMessage = itsWorking.showMessage()

// cria um objeto especialista em JSON para receber os dados do body (post e put)
const bodyParserJSON = bodyParser.json()



//EM EXECUÇÃO LOCAL PODEMOS DEFINIR A PORTA
const PORT = process.env.PORT || 8080



<<<<<<< HEAD
//-------------------------------------------------------------------------------------------------------------------------------------
// ENDPOINTS ESTUDIO

app.get('/v1/locadora/estudio', cors(), async(request, response) => {
    let estudio = await controllerEstudio.listarEstudios()

    response.status(estudio.status_code)
    response.json(estudio)
})
=======
app.use(cors())
app.use(bodyParserJSON)
>>>>>>> 3c4e623d52d351a2cd2d803019cc800e37103641

const filmeRota = require('./routes/filmesRoute.js')
const estudioRota = require('./routes/estudioRouter.js')
const nacionalidadeRota = require('./routes/nacionalidadeRoute.js')
const diretorRota = require('./routes/diretorRoute.js')
const generoRota = require('./routes/generoRoute.js')
const defaultRota = require('./routes/defaultRoute.js')


<<<<<<< HEAD
app.get('/v1/locadora/estudio/:id', cors(), async(request, response) => {
    let estudioId = request.params.id

    let estudio = await controllerEstudio.buscarEstudioId(estudioId)

    response.status(estudio.status_code)
    response.json(estudio)
})

app.post('/v1/locadora/estudio', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    console.log(dadosBody)
        //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let estudio = await controllerEstudio.inserirEstudio(dadosBody, contentType)
    response.status(estudio.status_code)
    response.json(estudio)
})


app.put('/v1/locadora/estudio/:id', cors(), bodyParserJSON, async(request, response) => {

    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    let estudioId = request.params.id

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    let estudio = await controllerEstudio.ataualizarEstudio(dadosBody, estudioId, contentType)

    response.status(estudio.status_code)
    response.json(estudio)
})



app.delete('/v1/locadora/estudio/:id', cors(), async(request, response) => {
    let estudioId = request.params.id

    let estudio = await controllerEstudio.excluirEstudio(estudioId)

    response.status(estudio.status_code)
    response.json(estudio)
})

=======
// Usa as rotas
app.use(filmeRota)
app.use(generoRota)
app.use(estudioRota)
app.use(diretorRota)
app.use(nacionalidadeRota)
app.use(defaultRota)
>>>>>>> 3c4e623d52d351a2cd2d803019cc800e37103641


app.listen(PORT, function() {
    console.log(`${itsWorkingMessage}`)
})