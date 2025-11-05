/********************************************************************
 * Objetivo : arquivo responsavel pela realização do crud de relacionamento entre filme e genero no banco Mysql
 * data: 05/10/2025
 * autor: Pedro
 * Versão: 1.0
 * ******************************************************************/


// import da biblioteca prismaclient
const { PrismaClient } = require('../../generated/prisma')

// cria um objeto do prisma client para manipular os scripts sql
const prisma = new PrismaClient()

// Retornar todos os generos e filmes do banco de dados

//listar todos ok
const getSelectAllFilmsGenre = async function() {

    try {

        let sql = `select * from tbl_filme_genero order by id desc;`

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
const getSelectByIDFilmGenre = async function(id) {

    try {
        let sql = `select * from tbl_filme_genero where id = ${id};`
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
const getSelectLastID = async function() {

    try {
        let sql = `select * from tbl_filme_genero order by id desc limit 1;`
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false

    } catch (error) {
        return false
    }

}

const getSelectGenresFilmById = async function(idFilme) {

    try {
        let sql = `select tbl_filme.id, tbl_filme.nome 
                    from tbl_filme 
                        inner join tbl_filme_genero
                            on tbl_filme.id = tbl_filme_genero.filme_id
                        inner join tbl_genero
                            on tbl_genero.genero_id = tbl_filme_genero_id
                    where tbl_genero.genero_id = ${idFilme}`;
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].filme_id)
        else
            return false

    } catch (error) {
        return false
    }

}


const getSelectFilmGenresById = async function($idGenero) {

    try {
        let sql = `select tbl_genero.id, tbl_genero.nome 
                    from tbl_genero 
                        inner join tbl_filme_genero
                            on tbl_genero.genero_id = tbl_filme_genero.filme_id
                        inner join tbl_genero
                            on tbl_genero.genero_id = tbl_filme_genero_id
                    where tbl_genero.genero_id = ${$idGenero}`;
        let result = await prisma.$queryRawUnsafe(sql)

        if (Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false

    } catch (error) {
        return false
    }

}





//inserir generos ok
const setInsertGenders = async function(genero) {

    try {
        let sql = `insert into tbl_filme_genero(filme_id, genero_id)
                    values(${genero.filme_id}, 
                            ${genero.genero_id});`
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

// atualizar generos ok
const setUpdateFilmsGenre = async function(filmeGenero) {

    try {
        let sql = `update tbl_filme_genero set
                        filme_id       = ${filmeGenero.filme_id},
                        genero_id   = ${filmeGenero.genero_id},
                        where id = ${filmeGenero.id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        return false
    }

}

const setDeleteFilmsGenres = async function(id) {
    try {
        let sql = `delete from tbl_filme_genero where id = ${id};`
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
    getSelectAllFilmsGenre,
    getSelectFilmGenresById,
    getSelectGenresFilmById,
    getSelectLastID,
    setInsertGenders,
    setUpdateFilmsGenre,
    setDeleteFilmsGenres,
    getSelectByIDFilmGenre

}