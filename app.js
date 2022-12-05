//Requiring module 
const express = require('express');
const mysql = require('mysql2');
const connect = require('./conexao.js');


//Creating express object 
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//inserir dados
app.post('/clientes/', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
return connect.execSQLQuery("insert into cliente (nome) value('"+req.body.nome+"')", res);
})

//atualizar dados
app.put('/clientes/:id', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
return connect.execSQLQuery("update cliente set nome='"+req.body.nome+"' where id="+req.params.id, res);
})

//excluir dados
app.delete('/clientes/:id', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin", "*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
return connect.execSQLQuery("delete from cliente where id="+ req.params.id, res);
})

//Handling GET request
app.get('/', (req, res) => {
    res.send('A api está rodando' + ' nesse servidor')
    res.end()
})

//Handling GET request
app.get('/retorno', (req, res) => {
    res.send('Feliz por estar entendendo todo o assunto' + ' até agora')
    res.end()
})

app.get('/clientes', (req, res) => {    
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    return connect.execSQLQuery('select * from cliente', res);
})

app.get('/clientes/:id', (req, res) =>{
res.setHeader("Access-Control-Allow-Origin" ,"*");
res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
return connect.execSQLQuery('select * from cliente where id='+ req.params.id, res);
})

//Port Number
const PORT = process.env.PORT || 5000;

//Server Setup
app.listen(PORT, console.log(`Server started on port ${PORT}`));