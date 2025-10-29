/*
 * Objetivo : arquivo responsavel pela manipulação de dados entre APP e MODEL(validações, tratamento de dados, tratamento de erros etc...)
 * data: 22/10/2025
 * autor: Pedro
 * Versão: 1.0
*/

//import do arquivo DAO par amnipular o crud no banco de dados
const generoDAO = require('../../model/DAO/genero.js')

const MESSAGE_DEFAULT = require('../modulo/config_messages.js') // import do arquivo de padronizção de mensagens

//ok
async function  listarGeneros(){
    
    //copia do objeto msessage default para que alterações nesse bloco não interfiram na variavel global
    const MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        
        let result = await generoDAO.getSelectAllGenders()

        if(result){
            if(result.length > 0){

                //resposta caso o banco tenha mais que 0 filmes
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.genders = result
                return MESSAGE.HEADER
                
                //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL 
        }

    } catch (error) {
        return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLER
    }

}

//ok
async function buscarGeneroId(id){
    
    //copia da message para não afetar na global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //validação do id
        if (id != '' && id != null && id != undefined && id > 0){

            let result = await generoDAO.getSelectByIDGenders(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.genders = result

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
        return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLER
    }

}

//ok
async function inserirGenero (genero, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){

            let validarDados = await validarDadosGenero(genero)
    
            if(!validarDados){

                let result = await generoDAO.setInsertGenders(genero)

                if(result){
                    let lastIdGenero = await generoDAO.getSelectLastIDGenders() 
                    if(lastIdGenero){
                        genero.id                  = lastIdGenero
                        MESSAGE.HEADER.status      = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message     = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response    = genero


                        return MESSAGE.HEADER

                    }else{
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEl 
                    }

                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEl
                }
            }else{
                return validarDados
            }

        }else{
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// ok
async function atualizarGenero(genero, id, contentType) {

    //copia da menssagem para não alterar a global
        let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

        
        try {
            if(String(contentType).toUpperCase() == 'APPLICATION/JSON'){
                
                genero.genero_id = parseInt(id)
                let validarDados = await validarDadosGenero(genero)
            
                if(!validarDados){
                    let validarId = await buscarGeneroId(id)
                    console.log(validarId)
                    if(validarId.status_code == 200){
                        let result = await generoDAO.setUpdateGenders(genero, id, contentType)
                        if(result){
                            MESSAGE.HEADER.status       = MESSAGE.SUCCESS_UPDATED_ITEM.status
                            MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                            MESSAGE.HEADER.message      = MESSAGE.SUCCESS_UPDATED_ITEM.message
                            MESSAGE.HEADER.response     = genero

                            return MESSAGE.HEADER //201
                        }else{
                            MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return validarId
                    }
                }else{
                    return validarDados
                }
            }else{
                return MESSAGE.ERROR_CONTENT_TYPE
            }
        } catch (error) {
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        }    
}

// ok
async function deletarGenero(id) {
        let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

        try {
            let validarId = await buscarGeneroId(id)

            console.log(validarId)

            if(validarId.status_code == 200){
                
                let result = await generoDAO.setDeleteGenders(id)
                if(result){
                    MESSAGE.HEADER.status       = MESSAGE.SUCCESS_DELETED_ITEM.status
                    MESSAGE.HEADER.status_code  = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                    MESSAGE.HEADER.message      = MESSAGE.SUCCESS_DELETED_ITEM.message
                    delete MESSAGE.HEADER.response

                    return MESSAGE.HEADER
                }else{
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            } else{
                return validarId
            } 
        } catch (error) {
            console.log(error)
            return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
        }
}

//ok
async function validarDadosGenero(genero) {
    //copia da message para não afetar na global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if(genero.nome == '' || genero.nome == null || genero.nome == undefined || genero.nome.length > 20){
        MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [NOME] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIEDS
    }else if(genero.descricao == '' || genero.descricao == null || genero.descricao == undefined ){
        MESSAGE.ERROR_REQUIRED_FIEDS.invalid_field = 'ATRIUBUTO -> [DESCRICAO] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIEDS
    }else{
        return false
    }

}


module.exports = {
    listarGeneros,
    buscarGeneroId,
    inserirGenero,
    atualizarGenero,
    deletarGenero
}