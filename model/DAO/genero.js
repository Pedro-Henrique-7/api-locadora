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
const getSelectAllGenders = async function(){

    try {
        
        let sql = `select * from tbl_genero order by genero_id desc;`

        let result = await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false


    } catch (error) {
        return false
    }

}

//listar por id
const getSelectByIDGenders = async function(id) {

    try {
        let sql = `select * from tbl_genero where genero_id = ${id};`
        let result =  await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
    
}

//buscar o ultimo id ok
const getSelectLastIDGenders = async function() {

    try {
        let sql = `select * from tbl_genero order by genero_id desc limit 1;`
        let result =  await prisma.$queryRawUnsafe(sql)

        if(Array.isArray(result))
            return Number(result[0].genero_id)
        else
            return false

    } catch (error) {
        return false
    }
    
}

//inserir generos ok
const setInsertGenders = async function (genero) {
    
    try {
        let sql = `insert into tbl_genero(nome, descricao)
                    values("${genero.nome}", 
                            "${genero.descricao}");`

        let result = await prisma.$executeRawUnsafe(sql)
         
        if(result)
            return true
        else
            return false

    } catch (error) {
        return false
    }
    
}

// atualizar generos ok
const setUpdateGenders = async function (genero) {

    try {
        let sql = `update tbl_genero set
                        nome        = '${genero.nome}',
                        descricao   = '${genero.descricao}'
                        where genero_id = ${genero.genero_id};`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false        
    } catch (error) {
        return false
    }
    
}

const setDeleteGenders = async function (id){
    try {
        let sql = `delete from tbl_genero where genero_id = ${id};`
        let result = await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
    } catch (error) {
        return false
    }


}







module.exports = {
    getSelectAllGenders,
    getSelectByIDGenders,
    getSelectLastIDGenders,
    setInsertGenders,
    setUpdateGenders,
    setDeleteGenders

}