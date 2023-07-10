const db = require('../dbCon')
const routerInst = require('express').Router()

  const insertQuery ="Insert into auth (email , password_) VALUES (?,?)"
  const selectQuery =  "Select * from auth where email = ? "
  const loginQuery = "Select * from auth where email = ? && password_ = ?"
  const addWatch = "Insert into watchList (company , timeDetail,email) VALUES (?,?,?)"
  const findAll ="Select * from watchlist where email =?"








  routerInst.route('/').post((req , res ) =>{
    const values = [ req.body.email , req.body.password ]
    db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error executing INSERT query:', err);
      res.status(400).json('Error:'+err)
      return;
    }

    console.log('Data inserted successfully');
    res.json('Data inserted successfully')
    console.log('Inserted row ID:', result.insertId);
  })


  })


  
  routerInst.route('/fetch/:email').get((req ,res)=>{

    const email = req.params.email

    db.query(selectQuery, email, (err, result) => {
      if (err) {
        console.error('Error executing INSERT query:', err);
        res.status(400).json('Error:'+err)
        return;
      }
  
      console.log('Data retrieved successfully');
      if(result.length ==0  )
           res.status(400).json('no record found')
       
      
      else
        res.json(result)
     
    })

  })




  routerInst.route('/insertW').post((req,res)=>{

    const email = req.body.email
    const company = req.body.company
    const timeDetail = req.body.timeDetail


    
    db.query(addWatch, [company,timeDetail,email] ,(err, result) => {
      if (err) {
        console.error('Error executing INSERT query:', err);
        res.status(400).json('Error:'+rr)
        return;
      }
  
      console.log('Data retrieved successfully');
      if(result.length ==0  )
           res.status(400).json('no record found')
       
      
      else
        res.json(result)
     
    })





  
  })


routerInst.route('/login').post((req ,res)=>{
const email = req.body.email
const password = req.body.password
db.query(loginQuery, [email,password], (err, result) => {
  if (err) {
    console.error('Error executing INSERT query:', err);
    res.status(400).json('Error:'+rr)
    return;
  }

  console.log('Data retrieved successfully');
  if(result.length ==0  )
       res.status(400).json('no record found')
   
  
  else
    res.json(result)
 
})

})
routerInst.route('/findall/:email').get((req,res)=>{

  const email = req.params.email

  db.query(findAll, email, (err, result) => {
    if (err) {
      console.error('Error executing INSERT query:', err);
      res.status(400).json('Error:'+err)
      return;
    }

    console.log('Data retrieved successfully');
    if(result.length ==0  )
         res.status(400).json('no record found')
     
    
    else
      res.json(result)
   
  })


})






  module.exports = routerInst