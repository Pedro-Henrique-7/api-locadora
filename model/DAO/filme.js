/********************************************************************
 * Objetivo : arquivo responsavel pela realização do crud de filme no banco Mysql
 * data: 01/10/2025
 * autor: Pedr
 * Versão: 1.0
 * ******************************************************************/ 
// todas as funções do DAO devem possuir a palavra do respectivo script
//  Dependencias do node para bancos relacionais
//  sequelize => blib para acesso ao banco
//  prisma => biblioteca atual para acesso e manipulação de dados , usando SQL ou ORM  (Mysql, Postgree, SQLServer, Oracle)
//  Knex  => É uma biblioteca atual para acesso e manipulação de dados, utilizando  SQL (MySQL)
//  Dependencias do node para bancos não relacionais
// moongose  +=> É uma biblioteca atual para acesso e manipulação de dados não relacionais (MongoDB)
/* 
* Instalação do Prisma
* npm install prisma --save -> realiza a conexão com o DB 
* npm install @prisma/client -> Permite executar os scripts SQL
* npx prisma init  -> Inicializa o prisma no projeto
*
*/
//  $queryRawunsafe() -> permite executar apenas scripts sql que retornam dados do bd(SELECT), 
//                       permite tambem executar um script SQL atarvés de uma variavel
//  $executeRawUnsafe() -> Permite executar apenas scripts sql que nao retornam dados do bd (UPDATE, DELETE, INSERT)
//  $queryRaw() -> permite executar apenas scripts sql que retornam dados do bd(SELECT), 
//                       permite tambem executar um script SQL e proteje contra sql injection
//  $executeRaw() -> Permite executar apenas scripts sql que nao retornam dados do bd (UPDATE, DELETE, INSERT) porteje contra sql injection nn
// import da biblioteca primaclient

const { PrismaClient } = require('../../generated/prisma')

// cria um objeto do prisma client para manipular os scripts sql
const prisma = new PrismaClient()

//Retorna todos os filmes do banco de dados
const getSelectAllMovies = async function() {

    try {
        let sql = `select * from tbl_filme order by id desc;`

    
        let result =  await prisma.$queryRawUnsafe(sql)

        //VALIFAÇÃO PARA IDENTIFICAR SE O RETORNO DO BNACO É UM ARRAY VAZIO OU COM DADOS
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}


// Retorna um filme filtrando por ID
const getSelectByIdMovies = async function(id) {

    try {
        let sql = `select * from tbl_filme where id = ${id};`
        let result =  await prisma.$queryRawUnsafe(sql)

        //VALIFAÇÃO PARA IDENTIFICAR SE O RETORNO DO BNACO É UM ARRAY VAZIO OU COM DADOS
        if(Array.isArray(result))
            return result
        else
            return false

    } catch (error) {
        return false
    }
}




// insere um filme no banco de dados
const setInsertMovies = async function (filme) {
    try {
        let sql = `insert into tbl_filme (nome, sinopse, data_lancamento, duracao, orcamento, trailer, capa) 
                    values('${filme.nome}',
                            '${filme.sinopse}', 
                            '${filme.data_lancamento}', 
                            '${filme.duracao}', 
                            '${filme.orcamento}', 
                            '${filme.trailer}', 
                            '${filme.capa}')`
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

// atualiza um filme no banco de dados filtrando pelo id
const setUpdateMovie = async function (filme) {
    
}

// deleta um filme no banco filtrando pelo id
const setDeleteMovies = async function (id) {
    
}

module.exports={
    getSelectAllMovies,
    getSelectByIdMovies,
    setInsertMovies
}