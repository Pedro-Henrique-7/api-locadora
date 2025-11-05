const express = require('express')
const router = express.Router()

//endpoint padrão
router.get('/v1/locadora/', async(request, response) => {

    let menssagem = `   <h1>Bem Vindo a Locadora de Filmes Senai</h1>
                        <h2> Faça uma requisição </h2>`

    response.send(`${menssagem}`)
})


module.exports = router