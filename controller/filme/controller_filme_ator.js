/*
 * Objetivo : arquivo responsavel pela manipulação de dados entre APP e MODEL
 *            (validações, tratamento de dados, tratamento de erros etc...)
 * data: 16/12/2025
 * autor: Pedro
 * Versão: 1.0
 */

// import do arquivo DAO
const filmeAtorDAO = require('../../model/DAO/filmeAtor.js')

// import do arquivo de padronização de mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// listar todos os relacionamentos filme x ator
async function listarFilmesAtor() {

    const MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let result = await filmeAtorDAO.getSelectAllFilmsActors()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmesAtor = result
                return MESSAGE.HEADER // 200
            } else {
                return MESSAGE.ERROR_NOT_FOUND // 404
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// buscar relacionamento por ID
async function buscarFilmeAtorById(id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (id != '' && id != null && id != undefined && id > 0) {

            let result = await filmeAtorDAO.getSelectByIDFilmActor(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesAtor = result
                    return MESSAGE.HEADER // 200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [ID] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// listar atores pelo id do filme
async function listarAtoresIdFilme(filme_id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (filme_id != '' && filme_id != null && filme_id != undefined && filme_id > 0) {

            let result = await filmeAtorDAO.getSelectActorsByFilmId(parseInt(filme_id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesAtor = result
                    return MESSAGE.HEADER // 200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [filme_id] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// listar filmes pelo id do ator
async function listarFilmesIdAtor(ator_id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (ator_id != '' && ator_id != null && ator_id != undefined && ator_id > 0) {

            let result = await filmeAtorDAO.getSelectFilmsByActorId(parseInt(ator_id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesAtor = result
                    return MESSAGE.HEADER // 200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [ator_id] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// inserir relacionamento filme x ator
async function inserirFilmeAtor(filmeAtor, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosFilmesAtor(filmeAtor)

            if (!validarDados) {

                let result = await filmeAtorDAO.setInsertFilmsActors(filmeAtor)

                if (result) {
                    let lastId = await filmeAtorDAO.getSelectLastID()

                    if (lastId) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeAtor
                        return MESSAGE.HEADER // 201
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                }

            } else {
                return validarDados
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// atualizar filmeAtor
async function atualizarFilmeAtor(filmeAtor, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            filmeAtor.id = parseInt(id)
            let validarDados = await validarDadosFilmesAtor(filmeAtor)

            if (!validarDados) {

                let validarId = await buscarFilmeAtorById(id)

                if (validarId.status_code == 200) {

                    let result = await filmeAtorDAO.setUpdateFilmsActors(filmeAtor)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = filmeAtor
                        return MESSAGE.HEADER // 200
                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                } else {
                    return validarId
                }

            } else {
                return validarDados
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// deletar filmeAtor
async function deletarFilmeAtor(id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await buscarFilmeAtorById(id)

        if (validarId.status_code == 200) {

            let result = await filmeAtorDAO.setDeleteFilmsActors(id)

            if (result) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_DELETED_ITEM.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_DELETED_ITEM.status_code
                MESSAGE.HEADER.message = MESSAGE.SUCCESS_DELETED_ITEM.message
                delete MESSAGE.HEADER.response
                return MESSAGE.HEADER // 200
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

// validação dos dados
async function validarDadosFilmesAtor(filmeAtor) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeAtor.filme_id == '' || filmeAtor.filme_id == null ||
        filmeAtor.filme_id == undefined || filmeAtor.filme_id <= 0) {

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [filme_id] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filmeAtor.ator_id == '' || filmeAtor.ator_id == null ||
        filmeAtor.ator_id == undefined || filmeAtor.ator_id <= 0) {

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [ator_id] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmesAtor,
    buscarFilmeAtorById,
    listarAtoresIdFilme,
    listarFilmesIdAtor,
    inserirFilmeAtor,
    atualizarFilmeAtor,
    deletarFilmeAtor
}
