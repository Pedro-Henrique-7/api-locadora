/********************************************************************
 * Objetivo : arquivo responsavel pela manipulação de dados entre APP e MODEL(validações, tratamento de dados, tratamento de erros etc...)
 * data: 07/10/2025
 * autor: Pedro
 * Versão: 1.0
 * ******************************************************************/
//import do arquivo DAO par amnipular o crud no banco de dados
const estudioDAO = require('../../model/DAO/estudio.js')

const MESSAGE_DEFAULT = require('../modulo/config_messages.js') // import do arquivo de padronizção de mensagens

// retorna lista de estudios
async function listarEstudios() {

    //realizando copia do objeto message default, permitindo que as alterações desta função não interfiram em outras funções
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {


        let result = await estudioDAO.getSelectAllStudios()

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

// retorna um estudio filtrando pelo id 
async function buscarEstudioId(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        //validação de campo obrigatorio
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {

            // chama a função que filtra por id
            let result = await estudioDAO.getSelectByIDStudio(parseInt(id))

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
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [ID] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
}

// insere um novo estudio
async function inserirEstudio(estudio, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosEstudios(estudio)
            if (!validarDados) {
                // chama função do DAO para inserir novo estudio
                let result = await estudioDAO.setInsertStudio(estudio)
<<<<<<< HEAD
                console.log(result)
=======
>>>>>>> 3c4e623d52d351a2cd2d803019cc800e37103641

                if (result) {

                    //chama a funçaõ para receber o ultimo id gerado no banco de dados
                    let lastIdEstudio = await estudioDAO.getSelectLastIDStudio()

                    if (lastIdEstudio) {

                        // adiciona no json de estudio o id que foi gerado pelo banco de dados
                        estudio.id = lastIdEstudio
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = estudio


                        return MESSAGE.HEADER //201   
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }


                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
            // return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}
















//atuliza um estudio filtrando pelo id
async function ataualizarEstudio(estudio, idEstudio, contentType) {


    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            
            //adicionando o ID no json
            estudio.id = parseInt(idEstudio)

            //chama a função de validação dos dados de cadastro
            let validarDados = await validarDadosEstudios(estudio)

            if (!validarDados) {

                let validarId = await buscarEstudioId(idEstudio)

                //Verifica se o Id exite do BD, caso exista teremos o status 200
                if (validarId.status_code == 200) {

                    // chama função do DAO para atualizar estudio
                    let result = await estudioDAO.setUpdateStudio(estudio, idEstudio, contentType)
                    console.log(result)
                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = estudio

                        return MESSAGE.HEADER //201
                    } else {
                       return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarId //retorno da função de buscar estudio por id 400 ou 404 ou 500
                }

            } else {
                return validarDados //retorno da função de validad dados 400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }



}
//apaga um estudio filtrando pelo id
async function excluirEstudio(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await buscarEstudioId(id)
        if (validarId.status_code == 200) {

            let result = await estudioDAO.setDeleteStudio(id)
            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message
                delete MESSAGE.HEADER.response

                return MESSAGE.HEADER
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        } else {
            return validarId
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }

}

//Validação dos dados de cadastro do estudio
async function validarDadosEstudios(estudio) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (estudio.nome == '' || estudio.nome == null || estudio.nome == undefined || estudio.nome.length > 100) {
<<<<<<< HEAD
=======
        // erro
>>>>>>> 3c4e623d52d351a2cd2d803019cc800e37103641
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [NOME] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (estudio.sede == '' || estudio.sede == null || estudio.sede == undefined || estudio.sede.length > 150) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [SEDE] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
<<<<<<< HEAD
    } else if (!estudio.data_fundacao === undefined || estudio.data_fundacao == '' || estudio.data_fundacao.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [DATA_FUNDACAO] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (estudio.fundador == '' || estudio.fundador == null || estudio.fundador == undefined || estudio.fundador.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [FUNDADOR] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (estudio.descricao === undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [DESCRIÇÃO] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
=======
    } else if (estudio.data_fundacao == undefined || estudio.data_fundacao.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [DATA_FUNDACAO] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (estudio.fundador == '' || estudio.fundador == null || estudio.fundador == undefined || estudio.fundador.length > 8) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [FUNDADOR] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (estudio.descricao == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [DESCRIÇÃO] <- INVÁLIDO'

>>>>>>> 3c4e623d52d351a2cd2d803019cc800e37103641
    } else {
        return false
    }
}

module.exports = {
    listarEstudios,
    buscarEstudioId,
    inserirEstudio,
    ataualizarEstudio,
    excluirEstudio
}