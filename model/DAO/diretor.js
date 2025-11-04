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
const getSelectAllDirectors = async function() {
    try {
        let sql = `SELECT * FROM tbl_diretor ORDER BY diretor_id DESC;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// listar diretor por ID
const getSelectByIDDirector = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_diretor WHERE diretor_id = ${id};`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// buscar o último ID inserido
const getSelectLastIDDirector = async function() {
    try {
        let sql = `SELECT * FROM tbl_diretor ORDER BY diretor_id DESC LIMIT 1;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].diretor_id)
        else
            return false

    } catch (error) {
        console.error(error)
        return false
    }
}

// inserir diretor
const setInsertDirector = async function(diretor) {
    try {
        let sql = `INSERT INTO tbl_diretor (nome, data_nascimento, biografia)
                   VALUES ("${diretor.nome}", 
                           "${diretor.data_nascimento}",
                           "${diretor.biografia}");`

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
const setUpdateDirector = async function(diretor, id) {
    try {
        let sql = `UPDATE tbl_diretor SET
                        nome = "${diretor.nome}",
                        data_nascimento = "${diretor.data_nascimento}",
                        biografia = "${diretor.biografia}"
                   WHERE diretor_id = ${id};`

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
const setDeleteDirector = async function(id) {
    try {
        let sql = `DELETE FROM tbl_diretor WHERE diretor_id = ${id};`
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
    getSelectAllDirectors,
    getSelectByIDDirector,
    getSelectLastIDDirector,
    setInsertDirector,
    setUpdateDirector,
    setDeleteDirector
}
