/********************************************************************
 * Objetivo : arquivo responsavel pela realização do CRUD de relacionamento
 *            entre filme e ator no banco MySQL
 * data: 16/12/2025
 * autor: Pedro
 * Versão: 1.0
 ********************************************************************/

const { PrismaClient } = require('../../generated/prisma')


const prisma = new PrismaClient()


const getSelectAllFilmsActors = async function () {
    try {
        let sql = `select * from tbl_filme_ator order by id desc;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}


const getSelectByIDFilmActor = async function (id) {
    try {
        let sql = `select * from tbl_filme_ator where id = ${id};`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return result
        else
            return false
    } catch (error) {
        return false
    }
}


const getSelectLastID = async function () {
    try {
        let sql = `select * from tbl_filme_ator order by id desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].id)
        else
            return false
    } catch (error) {
        return false
    }
}


const getSelectActorsByFilmId = async function (idFilme) {
    try {
        let sql = `
            select 
                tbl_ator.ator_id,
                tbl_ator.nome
            from tbl_filme
            inner join tbl_filme_ator 
                on tbl_filme.id = tbl_filme_ator.filme_id
            inner join tbl_ator 
                on tbl_ator.ator_id = tbl_filme_ator.ator_id
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


const getSelectFilmsByActorId = async function (idAtor) {
    try {
        let sql = `
            select 
                tbl_filme.id,
                tbl_filme.nome
            from tbl_filme
            inner join tbl_filme_ator 
                on tbl_filme.id = tbl_filme_ator.filme_id
            inner join tbl_ator 
                on tbl_ator.ator_id = tbl_filme_ator.ator_id
            where tbl_ator.ator_id = ${idAtor};
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


const setInsertFilmsActors = async function (filmeAtor) {
    try {
        let sql = `
            insert into tbl_filme_ator (filme_id, ator_id)
            values (${filmeAtor.filme_id}, ${filmeAtor.ator_id});
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


const setUpdateFilmsActors = async function (filmeAtor) {
    try {
        let sql = `
            update tbl_filme_ator
            set filme_id = ${filmeAtor.filme_id},
                ator_id = ${filmeAtor.ator_id}
            where id = ${filmeAtor.id};
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


const setDeleteFilmsActors = async function (id) {
    try {
        let sql = `delete from tbl_filme_ator where id = ${id};`
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
    getSelectAllFilmsActors,
    getSelectByIDFilmActor,
    getSelectLastID,
    getSelectActorsByFilmId,
    getSelectFilmsByActorId,
    setInsertFilmsActors,
    setUpdateFilmsActors,
    setDeleteFilmsActors
}
