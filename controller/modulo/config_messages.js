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

/////////////////////////////


////////ERROS

const ERROR_NOT_FOUND = {
                            status: false, status_code: 404, message: 'The server cannot find the requested resource.'
}

const ERROR_INTERNAL_SERVER_MODEl = {
                                status: false, status_code: 500, message: 'The server has encountered a situation it does not know how to handle. Problems in data modeling'
}

const ERROR_INTERNAL_SERVER_CONTROLLER = {
                                status: false, status_code: 500, message: 'The server has encountered a situation it does not know how to handle. Problems in data control'
}


//////
module.exports={
    HEADER,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_INTERNAL_SERVER_MODEl,
    SUCCESS_REQUEST
}