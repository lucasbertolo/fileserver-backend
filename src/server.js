const express = require("express");
const mongoose = require('mongoose'); //mongo db
const path = require('path');
const cors = require('cors');

const app = express();

app.use(cors());

const server = require('http').Server(app); 
const io = require('socket.io')(server); //permite conexao com websockets

//separar as salas de socket por user
io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
}); 

// conexao com o bd 
mongoose.connect('mongodb+srv://lucasbertolo:cocgun-jigve7-doPqys@cluster0-atyku.mongodb.net/fileserver?retryWrites=true', 
    {
        useNewUrlParser: true, //
    }
);

app.use((req, res, next)=>{
    req.io = io; 
    return next();
})


//middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true})) //conseguir baixar arquivos do usuario
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp'))); //pegar documentos estaticos e apresentar

app.use(require('./routes')); //pega as rotas 

server.listen(3000); //ouve tanto websockets quanto http