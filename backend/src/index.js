const express = require ('express');

const cors = require ('cors');

const routes = require('./routes');

const app = express();


app.use(cors());
app.use(express.json());
app.use(routes);

/*
** rota / recurso
**
**
** MÉTODOS HTTP
**
** GET: buscar uma informação
** POST: criar uma informação
** PUT: alterar uma informação
** DELETE: deletar uma informação
**
**
** TIPOS DE PARÂMETROS
**
** Query Params: parâmetros nomeados enviados na rota após ? e & (filtros, paginacao, etc.)
** Route Params: identificam recursos (ex: /recurso/id)
** Request Body: corpo da requisição, utilizado para criar ou alterar recursos
**
**
** ESTRATÉGIAS DE BANCOS
** 
** Relacionais SQL: MySQL, SQLite, Oracle, MS SQL Server, PostgreSQL
** Não Relacionais: MongoDB, CouchDB, etc...
**
** Driver: SELECT * FROM tabelas WHERE ....
** Query Builder:  table('tabelas').select('*').where(...)
*/




app.listen(3333);