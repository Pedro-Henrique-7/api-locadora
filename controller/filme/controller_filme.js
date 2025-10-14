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
async function inserirFilme(filme, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if(String(contentType).toUpperCase == 'APPLICATION/JSON '){

            if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length >100){
                // erro
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [NOME] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else if(filme.sinopse == undefined){
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [SINOPSE] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else if(filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [DATA_LANCAMENTO] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else if(filme.duracao == ''|| filme.duracao == null || filme.duracao == undefined || filme.duracao.length > 8){
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [DURACAO] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else if(filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || typeof(filme.orcamento) != Number){
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [ORCAMENTO] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else if(filme.trailer == undefined || filme.trailer.length > 200){
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [TRAILER] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else if(filme.capa == ''|| filme.capa == null || filme.capa == undefined || filme.capa.length > 200){
                MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [CAPA] <- INVÁLIDO'
                return MESSAGE.ERROR_REQUIRED_FIEDS
            }else{
                // chama função do DAO para inserir novo filme
                let result = await filmeDAO.setInsertMovies(filme)
                if(result){
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                    MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message

                    return MESSAGE.HEADER //201
                }else{
                    MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//atuliza um filme filtrando pelo id
async function ataualizarFilme(filme, id) {

}
//apaga um filme filtrando pelo id
async function excluirFilme(id) {

}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme
}