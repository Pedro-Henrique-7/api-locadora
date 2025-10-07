/********************************************************************
 * Objetivo : arquivo responsavel pela padronização de todas as mensagens da api de filmes
 * data: 01/10/2025
 * autor: Pedr
 * Versão: 1.0
 * ******************************************************************/
const { response } = require("express");

const dataAtual = new Date()
//header do projeto
const MESSAGE_HEADER = {
                            developer : 'Pedro Henrique Oliveira da Silva',
                            api_description: 'API para manipular dados da locadora de Filmes',
                            version: '1.0.10.25',
                            request_date:  dataAtual.toLocaleString(),
                            status:  Boolean,
                            status_code: Number,
                            response:{}
                        }




//mensagem de sucesso do projeto

const MESSAGE_SUCCESS_REQUEST = {
                                    status: true, status_code: 200, message: 'Requisição Bem Succedida!!!'
                                }



module.exports={
    MESSAGE_HEADER,
    MESSAGE_SUCCESS_REQUEST
}