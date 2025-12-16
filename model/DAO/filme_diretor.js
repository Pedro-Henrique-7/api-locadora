/********************************************************************
 * Objetivo : arquivo responsavel pela realização do crud de relacionamento
 *            entre filme e diretor no banco Mysql
 * data: 16/12/2025
 * autor: Pedro
 * Versão: 1.0
 * ******************************************************************/

// import da biblioteca prismaclient
const { PrismaClient } = require('../../generated/prisma')

// cria um objeto do prisma client para manipular os scripts sql
const prisma = new PrismaClient()

// listar todos os relacionamentos filme x diretor
const getSelectAllFilmsDirector = async function () {

    try {
        let sql = `select * from tbl_filme_diretor order by id desc;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// listar relacionamento por ID
const getSelectByIDFilmDirector = async function (id) {

    try {
        let sql = `select * from tbl_filme_diretor where id = ${id};`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// buscar o último ID inserido
const getSelectLastID = async function () {

    try {
        let sql = `select * from tbl_filme_diretor order by id desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false

    } catch (error) {
        return false
    }
}

// buscar diretores de um filme
const getSelectDirectorsFilmById = async function (idFilme) {

    try {
        let sql = `
            select tbl_diretor.diretor_id, tbl_diretor.nome
            from tbl_filme
                join tbl_filme_diretor
                    on tbl_filme.id = tbl_filme_diretor.filme_id
                join tbl_diretor
                    on tbl_diretor.diretor_id = tbl_filme_diretor.diretor_id
            where tbl_filme.id = ${idFilme};
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// buscar filmes de um diretor
const getSelectFilmsDirectorById = async function (idDiretor) {

    try {
        let sql = `
            select tbl_filme.id, tbl_filme.nome
            from tbl_filme
                inner join tbl_filme_diretor
                    on tbl_filme.id = tbl_filme_diretor.filme_id
                inner join tbl_diretor
                    on tbl_diretor.diretor_id = tbl_filme_diretor.diretor_id
            where tbl_diretor.diretor_id = ${idDiretor};
        `

        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}

// inserir relacionamento filme x diretor
const setInsertDirector = async function (filmeDiretor) {

    try {
        let sql = `
            insert into tbl_filme_diretor (filme_id, diretor_id)
            values (
                ${filmeDiretor.filme_id},
                ${filmeDiretor.diretor_id}
            );
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// atualizar relacionamento filme x diretor
const setUpdateFilmDirector = async function (filmeDiretor) {

    try {
        let sql = `
            update tbl_filme_diretor set
                filme_id   = ${filmeDiretor.filme_id},
                diretor_id = ${filmeDiretor.diretor_id}
            where id = ${filmeDiretor.id};
        `

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// deletar relacionamento
const setDeleteFilmDirector = async function (id) {

    try {
        let sql = `delete from tbl_filme_diretor where id = ${id};`
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
    getSelectAllFilmsDirector,
    getSelectByIDFilmDirector,
    getSelectLastID,
    getSelectDirectorsFilmById,
    getSelectFilmsDirectorById,
    setInsertDirector,
    setUpdateFilmDirector,
    setDeleteFilmDirector
}
