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

// cria um objeto especialista em JSON para receber os dados do body (post e put)
const bodyParserJSON = bodyParser.json()


//deifine a porta padrão da api, se for servidor de nuvem nao temos acesso a porta
    //EM EXECUÇÃO LOCAL PODEMOS DEFINIR A PORTA
const PORT  = process.PORT || 8080

//instancia da classe express
const app = express()

//config cors
app.use((request,response,next)=>{
    response.header('Acess-Control-Allow-Origin', '*') // Ip de Origem
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS') //  Metodos Http

    app.use(cors())
    next() //Ler os proximos end points 
})


// ENDPOINT PARA CRUD DE FILMES

app.get('/v1/locadora/filmes', cors(), async (request, response)=> {
//chama a função da controller par aretornar os movies

    let filme = await controllerFilme.listarFilmes()
    response.status(filme.status_code)
    response.json(filme)
})

//retorna um filme por i 
app.get('/v1/locadora/filme/:id', cors(), async (request, response)=> {
    //chama a função da controller para retornar o movie
    
    //recebe o id enviado na requisição via parametro
    let idFilme = request.params.id

    let filme = await controllerFilme.buscarFilmeId(idFilme)
    console.log(filme)
    response.status(filme.status_code)
    response.json(filme)
})




//insere um novo firme no banco dedados
app.post('/v1/locadora/filme', cors(), bodyParserJSON, async (request, response)=>{
    
    // Recebe o JSON pelo body da requisição
    let dadosBody = request.body

    //Recebe o content type da requisição 
    let contentType = request.headers['content-type']

    // chama a função da controller para inserir o filme, enviamos os dados do body e o content-type
    let filme = await controllerFilme.inserirFilme(dadosBody, contentType)
    
    response.status(filme.status_code)
    response.json(filme)
})


app.put('/v1/locadora/filme/:id', cors(), bodyParserJSON , async (request, response) =>{
    
    //recebe os dados do body
    let dadosBody = request.body

    // recebe o id do filme encaminhado da url
    let idFilme = request.params.id

    // recebe o content type da requisição
    let contentType = request.headers['content-type']

    let filme = await controllerFilme.ataualizarFilme(dadosBody, idFilme, contentType)

    response.status(filme.status_code)
    response.json(filme)
} )


app.delete('/v1/locadora/filme/:id', cors(), async (request, response) => {
    let idFilme = request.params.id

    let filme = await controllerFilme.excluirFilme(idFilme)

    response.status(filme.status_code)
    response.json(filme)
})
app.listen(PORT,function(){
    console.log('api aguardando requisições')
})