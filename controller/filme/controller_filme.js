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
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [ID] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// insere um novo filme
async function inserirFilme(filme, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmes(filme)

            if(!validarDados){


                // chama função do DAO para inserir novo filme
                let result = await filmeDAO.setInsertMovies(filme)
                if(result){

                    //chama a funçaõ para receber o ultimo id gerado no banco de dados
                    let lastIdFilme = await filmeDAO.getSelectLastIdFilm()

                    if(lastIdFilme){
                        
                        // adiciona no json de filme o id que foi gerado pelo banco de dados
                        filme.id                   =  lastIdFilme
                        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message     = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response    = filme


                        return MESSAGE.HEADER //201   
                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                  
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }else{
                return validarDados //400
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//atuliza um filme filtrando pelo id
async function ataualizarFilme(filme, id, contentType) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            //adicionando o ID no json
            filme.id = parseInt(id)
            
            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosFilmes(filme)
            
            if(!validarDados){

                let validarId = await buscarFilmeId(id)
                
                //Verifica se o Id exite do BD, caso exista teremos o status 200
                if(validarId.status_code == 200){

                // chama função do DAO para atualizar filme
                    let result = await filmeDAO.setUpdateMovie(filme, id, contentType)
                    if(result){
                        MESSAGE.HEADER.status       = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message      = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response     = filme

                        return MESSAGE.HEADER //201
                    }else{
                        MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return validarId     //retorno da função de buscar filme por id 400 ou 404 ou 500
                }

            }else{
                return validarDados     //retorno da função de validad dados 400
            }
        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }



}
//apaga um filme filtrando pelo id
async function excluirFilme(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await buscarFilmeId(id)
        if(validarId.status_code == 200){

            let result = await filmeDAO.setDeleteMovies(id)
            if(result){
                MESSAGE.HEADER.status       = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message      = MESSAGE.SUCCESS_DELETED_ITEM.message
                delete MESSAGE.HEADER.response
                
                return MESSAGE.HEADER
            }else{
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return validarId
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Validação dos dados de cadastro do filme
async function validarDadosFilmes (filme) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))
 
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
    }else if(filme.orcamento == '' || filme.orcamento == null || filme.orcamento == undefined || typeof(filme.orcamento) != "number"){
        MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [ORCAMENTO] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIEDS
    }else if(filme.trailer == undefined || filme.trailer.length > 200){
        MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [TRAILER] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIEDS
    }else if(filme.capa == ''|| filme.capa == null || filme.capa == undefined || filme.capa.length > 200){
        MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [CAPA] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIEDS
    }else{
        return false
    }
}

module.exports = {
    listarFilmes,
    buscarFilmeId,
    inserirFilme,
    ataualizarFilme,
    excluirFilme
}