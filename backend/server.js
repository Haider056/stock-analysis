const express = require('express')
const cors = require('cors')
const mysql = require('mysql')

const app = express()
const port = process.env.port || 5000


app.use(cors())
app.use(express.json())



  const insertPost = require('./Controllers/insertData')

  app.use('/opers', insertPost)

  app.listen(
    port,
    ()=>{
console.log(`Server started ata port:${port}`)
})





  /*
  //DATABASE NAME: users
  CREATE DATABASE users
  //TABLE QUERY
create table auth(id int primary key 
auto_increment, email varchar(150) unique,
password_ varchar(50))
//WatchList Query


Create table watchList(
ide int primary key auto_increment,
company varchar(10),
timeDetail varchar(100)
// foreign key
ALTER TABLE watchList
ADD COLUMN email varchar(50),
ADD CONSTRAINT mail
FOREIGN KEY (email)
REFERENCES auth(email);


)

  */