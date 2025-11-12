/********************************************************************
 * Objetivo : arquivo responsável pela realização do CRUD de diretor no banco MySQL
 * data: 04/11/2025
 * autor: Pedro
 * Versão: 1.0
 ********************************************************************/

// import da biblioteca prisma client
const { PrismaClient } = require('../../generated/prisma')

// cria um objeto do prisma client para manipular os scripts SQL
const prisma = new PrismaClient()

// listar todos os diretores
const getSelectAllActor = async function() {
    try {
        let sql = `SELECT * FROM tbl_ator ORDER BY ator_id DESC;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            console.log(result)
        else
            return false

    } catch (error) {
        return false
    }
}

// listar diretor por ID
const getSelectByIdActor = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_ator WHERE ator_id = ${id};`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            console.log(result)
            // return result
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// buscar o último ID inserido
const getSelectLastIdActor = async function() {
    try {
        let sql = `SELECT * FROM tbl_ator ORDER BY ator_id DESC LIMIT 1;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            console.log(Number(result[0].ator_id))
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// inserir diretor
const setInsertActor = async function(ator) {
    try {
        let sql = `insert into tbl_ator (nome, data_nascimento, data_falecimento, altura, conjuge, filhos, biografia) 
                values
                    (
                        "${ator.nome}",
                        "${ator.data_nascimento}",
                        ${ator.data_falecimento},
                        ${ator.altura},
                        "${ator.conjuge}",
                        "${ator.filhos}",
                        "${ator.biografia}"
                    );`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// atualizar diretor
const setUpdateActor = async function(ator, id) {
    try {
        let sql = `UPDATE tbl_ator SET
                         nome = "${ator.nome}",
                         data_nascimento = "${ator.data_nascimento}",
                         data_falecimento = ${ator.data_falecimento},
                         altura = ${ator.altura},
                         conjuge = "${ator.conjuge}",
                         filhos = "${ator.filhos}",
                         biografia = "${ator.biografia}"
                   WHERE ator_id = ${id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// deletar diretor
const setDeleteActor = async function(id) {
    try {
        let sql = `DELETE FROM tbl_ator WHERE ator_id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}



module.exports = {
    getSelectAllActor,
    getSelectByIdActor,
    getSelectLastIdActor,
    setInsertActor,
    setUpdateActor,
    setDeleteActor
}