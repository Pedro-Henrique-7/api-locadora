/*
 * Objetivo : arquivo responsavel pela manipulação de dados entre APP e MODEL
 *            (validações, tratamento de dados, tratamento de erros etc...)
 * data: 16/12/2025
 * autor: Pedro
 * Versão: 1.0
 */

// import do arquivo DAO
const filmeDiretorDAO = require('../../model/DAO/filme_diretor.js')

// import do arquivo de padronização de mensagens
const MESSAGE_DEFAULT = require('../modulo/config_messages.js')

// listar todos os relacionamentos filme x diretor
async function listarFilmesDiretor() {

    const MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let result = await filmeDiretorDAO.getSelectAllFilmsDirector()

        if (result) {
            if (result.length > 0) {
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmesDiretor = result
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
async function buscarFilmeDiretorById(id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (id != '' && id != null && id != undefined && id > 0) {

            let result = await filmeDiretorDAO.getSelectByIDFilmDirector(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesDiretor = result
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

// listar diretores pelo id do filme
async function listarDiretoresIdFilme(filme_id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (filme_id != '' && filme_id != null && filme_id != undefined && filme_id > 0) {

            let result = await filmeDiretorDAO.getSelectDirectorsFilmById(parseInt(filme_id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesDiretor = result
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

// listar filmes pelo id do diretor
async function listarFilmesIdDiretor(diretor_id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (diretor_id != '' && diretor_id != null && diretor_id != undefined && diretor_id > 0) {

            let result = await filmeDiretorDAO.getSelectFilmsDirectorById(parseInt(diretor_id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesDiretor = result
                    return MESSAGE.HEADER // 200
                } else {
                    return MESSAGE.ERROR_NOT_FOUND // 404
                }
            } else {
                return MESSAGE.ERROR_INTERNAL_SERVER_MODEL // 500
            }

        } else {
            MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [diretor_id] <- INVÁLIDO'
            return MESSAGE.ERROR_REQUIRED_FIELDS
        }

    } catch (error) {
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// inserir relacionamento filme x diretor
async function inserirFilmeDiretor(filmeDiretor, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosFilmesDiretor(filmeDiretor)

            if (!validarDados) {

                let result = await filmeDiretorDAO.setInsertDirector(filmeDiretor)

                if (result) {
                    let lastId = await filmeDiretorDAO.getSelectLastID()

                    if (lastId) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeDiretor
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

// atualizar relacionamento
async function atualizarFilmeDiretor(filmeDiretor, id, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            filmeDiretor.id = parseInt(id)
            let validarDados = await validarDadosFilmesDiretor(filmeDiretor)

            if (!validarDados) {

                let validarId = await buscarFilmeDiretorById(id)

                if (validarId.status_code == 200) {

                    let result = await filmeDiretorDAO.setUpdateFilmDirector(filmeDiretor)

                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = filmeDiretor
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

// deletar relacionamento
async function deletarFilmeDiretor(id) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await buscarFilmeDiretorById(id)

        if (validarId.status_code == 200) {

            let result = await filmeDiretorDAO.setDeleteFilmDirector(id)

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
async function validarDadosFilmesDiretor(filmeDiretor) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeDiretor.filme_id == '' || filmeDiretor.filme_id == null ||
        filmeDiretor.filme_id == undefined || filmeDiretor.filme_id <= 0) {

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [filme_id] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else if (filmeDiretor.diretor_id == '' || filmeDiretor.diretor_id == null ||
        filmeDiretor.diretor_id == undefined || filmeDiretor.diretor_id <= 0) {

        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [diretor_id] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS

    } else {
        return false
    }
}

module.exports = {
    listarFilmesDiretor,
    buscarFilmeDiretorById,
    listarDiretoresIdFilme,
    listarFilmesIdDiretor,
    inserirFilmeDiretor,
    atualizarFilmeDiretor,
    deletarFilmeDiretor
}
