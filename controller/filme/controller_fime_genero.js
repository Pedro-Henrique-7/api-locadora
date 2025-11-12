/*
 * Objetivo : arquivo responsavel pela manipulação de dados entre APP e MODEL(validações, tratamento de dados, tratamento de erros etc...)
 * data: 22/10/2025
 * autor: Pedro
 * Versão: 1.0
 */

//import do arquivo DAO par amnipular o crud no banco de dados
const filmeGeneroDAO = require('../../model/DAO/filme_genero.js')

const MESSAGE_DEFAULT = require('../modulo/config_messages.js') // import do arquivo de padronizção de mensagens

//ok
async function listarFilmesGenero() {

    //copia do objeto msessage default para que alterações nesse bloco não interfiram na variavel global
    const MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        let result = await filmeGeneroDAO.getSelectAllFilmsGenre()

        if (result) {
            if (result.length > 0) {

                //resposta caso o banco tenha mais que 0 filmes
                MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                MESSAGE.HEADER.response.filmesGenero = result
                return MESSAGE.HEADER

                //200
            } else {
                return MESSAGE.ERROR_NOT_FOUND
            }
        } else {
            return MESSAGE.ERROR_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLER
    }

}

//ok
async function buscarFilmeGeneroId(id) {

    //copia da message para não afetar na global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //validação do id
        if (id != '' && id != null && id != undefined && id > 0) {

            let result = await filmeGeneroDAO.getSelectFilmGenresById(parseInt(id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesGenero = result

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
        return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLER
    }

}




async function listarFilmesIdGenero(genero_id) {

    //copia da message para não afetar na global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //validação do id
        if (genero_id != '' && genero_id != null && genero_id != undefined && genero_id > 0) {

            let result = await filmeGeneroDAO.getSelectFilmGenresById(parseInt(genero_id))

            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesGenero = result

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
        return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLER
    }

}

//retorna os generos filtrando pelo id do filme
async function listarGenerosIdFilme(filme_id) {

    //copia da message para não afetar na global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        //validação do id
        if (filme_id != '' && filme_id != null && filme_id != undefined && filme_id > 0) {

            let result = await filmeGeneroDAO.getSelectGenresFilmById(parseInt(filme_id))
            console.log(result)
            if (result) {
                if (result.length > 0) {
                    MESSAGE.HEADER.status = MESSAGE.SUCCESS_REQUEST.status
                    MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_REQUEST.status_code
                    MESSAGE.HEADER.response.filmesGenero = result
                    console.log(MESSAGE.HEADER)

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
        console.log(error)
        return MESSAGE.ERRO_INTERNAL_SERVER_CONTROLER
    }

}


//ok
async function inserirFilmeGenero(filmeGenero, contentType) {

    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validarDados = await validarDadosFilmesGenero(filmeGenero)

            if (!validarDados) {

                let result = await filmeGeneroDAO.setInsertGenders(filmeGenero)

                if (result) {
                    let lastIdGenero = await filmeGeneroDAO.getSelectLastID()
                    if (lastIdGenero) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_CREATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_CREATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_CREATED_ITEM.message
                        MESSAGE.HEADER.response = filmeGenero


                        return MESSAGE.HEADER

                    } else {
                        return MESSAGE.ERROR_INTERNAL_SERVER_MODEl
                    }

                } else {
                    return MESSAGE.ERROR_INTERNAL_SERVER_MODEl
                }
            } else {
                return validarDados
            }

        } else {
            return MESSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MESSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

// ok
async function atualizarFilmeGenero(filmeGenero, id, contentType) {

    //copia da menssagem para não alterar a global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))


    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            filmeGenero.id = parseInt(id)
            let validarDados = await validarDadosFilmesGenero(genero)

            if (!validarDados) {
                let validarId = await buscarGeneroId(id)
                if (validarId.status_code == 200) {
                    let result = await filmeGenero.setUpdateFilmsGenre(genero, id, contentType)
                    if (result) {
                        MESSAGE.HEADER.status = MESSAGE.SUCCESS_UPDATED_ITEM.status
                        MESSAGE.HEADER.status_code = MESSAGE.SUCCESS_UPDATED_ITEM.status_code
                        MESSAGE.HEADER.message = MESSAGE.SUCCESS_UPDATED_ITEM.message
                        MESSAGE.HEADER.response = filmeGenero

                        return MESSAGE.HEADER //201
                    } else {
                        MESSAGE.ERROR_INTERNAL_SERVER_MODEL
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

// ok
async function deletarFilmeGenero(id) {
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    try {
        let validarId = await buscarGeneroId(id)

        console.log(validarId)

        if (validarId.status_code == 200) {

            let result = await filmeGeneroDAO.setDeleteFilmsGenres(id)
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

//ok
async function validarDadosFilmesGenero(filmeGenero) {
    //copia da message para não afetar na global
    let MESSAGE = JSON.parse(JSON.stringify(MESSAGE_DEFAULT))

    if (filmeGenero.filme_id == '' || filmeGenero.filme_id == null || filmeGenero.filme_id == undefined || filmeGenero.filme_id <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [filme_id] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else if (filmeGenero.genero_id == '' || filmeGenero.genero_id == null || filmeGenero.genero_id == undefined || filmeGenero.genero_id <= 0) {
        MESSAGE.ERROR_REQUIRED_FIELDS.invalid_field = 'ATRIUBUTO -> [genero_id] <- INVÁLIDO'
        return MESSAGE.ERROR_REQUIRED_FIELDS
    } else {
        return false
    }

}


module.exports = {
    listarFilmesGenero,
    buscarFilmeGeneroId,
    inserirFilmeGenero,
    atualizarFilmeGenero,
    deletarFilmeGenero,
    listarGenerosIdFilme,
    listarFilmesIdGenero
}