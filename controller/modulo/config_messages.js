/********************************************************************
 * Objetivo : arquivo responsavel pela padronização de todas as mensagens da api de filmes
 * data: 01/10/2025
 * autor: Pedr
 * Versão: 1.0
 * ******************************************************************/
const { response } = require("express");

const dataAtual = new Date()
//header do projeto
const HEADER = {
                            developer : 'Pedro Henrique Oliveira da Silva',
                            api_description: 'API to manipulate data from a Movie Rental Store',
                            version: '1.0.10.25',
                            request_date:  dataAtual.toLocaleString(),
                            status:  Boolean,
                            status_code: Number,
                            response:{}
                        }




//mensagem de sucesso do projeto

const SUCCESS_REQUEST = {
                                    status: true, status_code: 200, message: 'Success'
                                }


const SUCCESS_CREATED_ITEM = {
    status: true, status_code: 201, message: 'Created'
}
/////////////////////////////


////////ERROS

const ERROR_NOT_FOUND = {
                            status: false,
                            status_code: 404, 
                            message: 'The server cannot find the requested resource.'
}

const ERROR_INTERNAL_SERVER_MODEl = {
                            status: false,
                            status_code: 500, 
                            message: 'The server has encountered a situation it does not know how to handle. Problems in data modeling'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    message: 'The server has encountered a situation it does not know how to handle. Problems in data control'
}

const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    message: 'Fail! Type Content needs to be a JSON'
}


const ERROR_REQUIRED_FIEDS = {
                    status: false,
                    status_code: 400,
                    message: 'The server cannot or will not process the request because some required field are not bad).'
}


//////
module.exports={
    HEADER,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEl,
    ERROR_REQUIRED_FIEDS,
    SUCCESS_REQUEST,
    SUCCESS_CREATED_ITEM,
    ERROR_CONTENT_TYPE
}