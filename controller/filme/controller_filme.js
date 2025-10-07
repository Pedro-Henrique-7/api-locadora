/********************************************************************
 * Objetivo : arquivo responsavel pela manipulação de dados entre APP e MODEL(validações, tratamento de dados, tratamento de erros etc...)
 * data: 07/10/2025
 * autor: Pedro
 * Versão: 1.0
 * ******************************************************************/
//import do arquivo DAO par amnipular o crud no banco de dados
const filmeDAO = require('../../model/DAO/filme.js') 

const MESSAGE_DEFAULT = require('../modulo/config_messages.js') // import do arquivo de padronizção de mensagens
// retorna lista de filmes
async function listarFilmes() {
    let result = await filmeDAO.getSelectAllMovies()

    if(result.length > 0){
        MESSAGE_DEFAULT.MESSAGE_HEADER.status = MESSAGE_DEFAULT.MESSAGE_SUCCESS_REQUEST.status
        MESSAGE_DEFAULT.MESSAGE_HEADER.status_code = MESSAGE_DEFAULT.MESSAGE_SUCCESS_REQUEST.status_code
        MESSAGE_DEFAULT.MESSAGE_HEADER.response.films = result
        return MESSAGE_DEFAULT.MESSAGE_HEADER
    }
}


// retorna um filme filtrando pelo id 
async function buscarFilmeId(id) {
    
}

// insere um novo filme
async function inserirFilme (filme) {
    
}

//atuliza um filme filtrando pelo id
async function ataualizarFilme(filme, id) {
    
}
//apaga um filme filtrando pelo id
async function excluirFilme(id) {
    
}

module.exports = {
    listarFilmes
}