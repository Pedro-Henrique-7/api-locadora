/********************************************************************
 * Objetivo : arquivo responsavel pela realização do crud de nacionalidade no banco Mysql
 * data: 22/10/2025
 * autor: Pedro
 * Versão: 1.0
 * ******************************************************************/


// import da biblioteca prismaclient
const { PrismaClientRustPanicError } = require('@prisma/client/runtime/library')
const { PrismaClient } = require('../../generated/prisma')

// cria um objeto do prisma client para manipular os scripts sql
const prisma = new PrismaClient()

const getSelectedAllNationalities = async function() {
    try {
        let sql = `select * from tbl_nacionalidade order by nacionalidade_id desc;`

        let result = await prisma.$queryRawUnsafe(sql)
        console.log(result)
            //VALIFAÇÃO PARA IDENTIFICAR SE O RETORNO DO BNACO É UM ARRAY VAZIO OU COM DADOS
        if (Array.isArray(result))

            return result
        else
            return false

    } catch (error) {
        return false
    }
}


const getSelectedByIdNacionality = async function(id) {

    try {
        let sql = `select * from tbl_nacionalidade where nacionalidade_id = ${id}`
        let result = await prisma.$queryRawUnsafe(sql)

        //VALIFAÇÃO PARA IDENTIFICAR SE O RETORNO DO BNACO É UM ARRAY VAZIO OU COM DADOS
        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}




const setInsertNacionality = async function(nacionalidade) {

    try {
        let sql = `insert into tbl_nacionalidade (pais, gentilico, sigla)
                values('${nacionalidade.nome}', 
                        '${nacionalidade.gentilico}', 
                        '${nacionalidade.sigla}');`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


const setUpdateNacionality = async function(nacionalidade) {

    try {
        let sql = `update tbl_nacionalidade set 
                          pais          =   '${nacionalidade.nome}',
                          gentilico     =   '${nacionalidade.gentilico}',
                          sigla         =   '${nacionalidade.sigla}'
                          where nacionalidade_id = ${nacionalidade.id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


const setDeleteNacionality = async function(id) {
    try {
        let sql = `delete from tbl_nacionalidade where nacionalidade_id = ${id}`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


const getSelectLastIdNacionality = async function() {
    try {
        let sql = `select nacionalidade_id from tbl_nacionalidade order by nacionalidade_id desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)
            //VALIFAÇÃO PARA IDENTIFICAR SE O RETORNO DO BNACO É UM ARRAY VAZIO OU COM DADOS
        if (Array.isArray(result))
            return Number(result[0].nacionalidade_id)
        else
            return false

    } catch (error) {
        return false
    }
}

module.exports = {
    getSelectLastIdNacionality,
    getSelectedAllNationalities,
    getSelectedByIdNacionality,
    setDeleteNacionality,
    setInsertNacionality,
    setUpdateNacionality
}