/********************************************************************
 * Objetivo : arquivo responsável pela manipulação de dados entre APP e MODEL
 * (validações, tratamento de dados, tratamento de erros etc...)
 * data: 07/10/2025
 * autor: Pedro
 * Versão: 1.0
 ********************************************************************/

// Import do arquivo DAO para manipular o CRUD no banco de dados
const diretorDAO = require('../../model/DAO/diretor.js')

const MESSAGE_DEFAULT = require('../modulo/config_messages.js') // import do arquivo de padronização de mensagens

// Retorna lista de diretores
async function listarDiretores() {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let result = await diretorDAO.getSelectAllDirectors()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.directors = result
                return MESSAGE.HEADER //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND //404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500 da model
        }
    } catch (error) {
        console.error(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500 da controller
    }
}

// Retorna um diretor filtrando pelo id 
async function buscarDiretorId(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (id != '' && id != null && id != undefined && !isNaN(id) && id > 0) {
            let result = await diretorDAO.getSelectByIDDirector(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.director = result
                    return MESSAGE.HEADER //200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND //404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
            }
        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIBUTO -> [ID] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }
    } catch (error) {
        console.error(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Insere um novo diretor
async function inserirDiretor(diretor, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            let validarDados = await validarDadosDiretor(diretor)

            if (!validarDados) {
                let result = await diretorDAO.setInsertDirector(diretor)

                if (result) {
                    let lastIdDiretor = await diretorDAO.getSelectLastIDDirector()

                    if (lastIdDiretor) {
                        diretor.id = lastIdDiretor
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = diretor

                        return MESSAGE.HEADER //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Atualiza um diretor filtrando pelo id
async function atualizarDiretor(diretor, idDiretor, contentType) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
            diretor.id = parseInt(idDiretor)

            let validarDados = await validarDadosDiretor(diretor)

            if (!validarDados) {
                let validarId = await buscarDiretorId(idDiretor)

                if (validarId.status_code == 200) {
                    let result = await diretorDAO.setUpdateDirector(diretor, idDiretor, contentType)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = diretor

                        return MESSAGE.HEADER //201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                } else {
                    return validarId // 400 / 404 / 500
                }
            } else {
                return validarDados //400
            }
        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.error(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// Apaga um diretor filtrando pelo id
async function excluirDiretor(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await buscarDiretorId(id)
        if (validarId.status_code == 200) {
            let result = await diretorDAO.setDeleteDirector(id)
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
        console.error(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// Validação dos dados de cadastro do diretor
async function validarDadosDiretor(diretor) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (diretor.nome == '' || diretor.nome == null || diretor.nome == undefined || diretor.nome.length > 100) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIBUTO -> [NOME] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (diretor.data_nascimento == undefined || diretor.data_nascimento.length != 10) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIBUTO -> [DATA_NASCIMENTO] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (diretor.biografia == '' || diretor.biografia == null || diretor.biografia == undefined) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIBUTO -> [BIOGRAFIA] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }
}

module.exports = {
    listarDiretores,
    buscarDiretorId,
    inserirDiretor,
    atualizarDiretor,
    excluirDiretor
}
