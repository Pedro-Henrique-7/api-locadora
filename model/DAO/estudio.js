/********************************************************************
 * Objetivo : arquivo responsavel pela realização do crud de genero no banco Mysql
 * data: 22/10/2025
 * autor: Pedro
 * Versão: 1.0
 * ******************************************************************/


// import da biblioteca prismaclient
const { PrismaClient } = require('../../generated/prisma')

// cria um objeto do prisma client para manipular os scripts sql
const prisma = new PrismaClient()

// Retornar todos os generos do banco de dados

//listar todos ok
const getSelectAllStudios = async function() {

    try {

        let sql = `select * from tbl_estudio order by estudio_id desc;`

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false


    } catch (error) {
        return false
    }

}

//listar por id
const getSelectByIDStudio = async function(id) {

    try {
        let sql = `select * from tbl_estudio where estudio_id = ${id};`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }

}

//buscar o ultimo id ok
const getSelectLastIDStudio = async function() {

    try {
        let sql = `select * from tbl_estudio order by estudio_id desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].estudio_id)
        else
            return false

    } catch (error) {
        return false
    }

}

//inserir estudios ok
const setInsertStudio = async function(estudio) {

    try {
        let sql = `insert into tbl_estudio (nome, sede, data_fundacao, fundador, descricao)
                    values("${estudio.nome}", 
                            "${estudio.sede}",
                            "${estudio.data_funcadacao}",
                            "${estudio.fundador}",
                            "${estudio.descricao}");`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

// atualizar estudios ok
const setUpdateStudio = async function(estudio) {

    try {
        let sql = `update tbl_estudio set
                                    "${estudio.nome}", 
                                    "${estudio.sede}",
                                    "${estudio.data_funcadacao}",
                                    "${estudio.fundador}",
                                    "${estudio.descricao}"
                    where estudio_id = ${estudio.estudio_id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

const setDeleteStudio = async function(id) {
    try {
        let sql = `delete from tbl_estudio where estudio_id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)
        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }


}







module.exports = {
    getSelectAllStudios,
    getSelectByIDStudio,
    getSelectLastIDStudio,
    setInsertStudio,
    setUpdateStudio,
    setDeleteStudio

}