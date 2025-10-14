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

    //realizando copia do objeto message default, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {


        let result = await filmeDAO.getSelectAllMovies()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.films = result
                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 da model
        }


    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500 da controller
    }

}


// retorna um filme filtrando pelo id 
async function buscarFilmeId(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //validação de campo obrigatorio
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            // chama a função que filtra por id
            let result = await filmeDAO.getSelectByIdMovies(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.films = result

                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            }
            else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL//500
            }

        }else{
            return MESSAGE.ERROR_REQUIRED_FIEDS
        }

    } catch (error) {
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// insere um novo filme
async function inserirFilme(filme) {

}

//atuliza um filme filtrando pelo id
async function ataualizarFilme(filme, id) {

}
//apaga um filme filtrando pelo id
async function excluirFilme(id) {

}

module.exports = {
    listarFilmes,
    buscarFilmeId
}