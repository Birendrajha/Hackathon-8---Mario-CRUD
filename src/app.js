const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const marioModel = require('./models/marioChar');

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// your code goes here
app.post('/mario',async(req,res)=>{
        const data = new marioModel({
              name:req.body.name,
              weight:req.body.weight
        })
        try{
                  await data.save();
                    res.status(201).send(data);
        }catch(e){
                 res.status(400).send({message: 'either name or weight is missing'})
        }
})


app.get('/mario/:id',async(req,res)=>{
       const id = req.params.id;
        try{
            const data =  await marioModel.findById(id);
            res.status(200).send(data);
        }catch(e){
            res.status(400).send({message:e.message});
        }
})


app.get('/mario',async(req,res)=>{
   
     try{
         const data =  await marioModel.find();
         res.status(200).send(data);
     }catch(e){
         res.status(400).send({message:e.message});
     }
})

app.patch('/mario/:id',async(req,res)=>{
      const id  = req.params.id;
      const body = req.body;
      try{
          if(body.name){
       const result   =await marioModel.updateOne({_id:id},{ $set:{
                  name:req.body.name,
               //   weight:req.body.weight
                 }
                })
                res.status(200).send({name:req.body.name}) 
            }
    //const result = await marioModel.updateOne({_id:id},body);
            else if(body.weight){
                const result   =await marioModel.updateOne({_id:id},{ $set:{
                    weight:req.body.weight,
                 //   weight:req.body.weight
                   }
                  })
                  res.status(200).send({weight:req.body.weight}) 
            }  
      
        // res.status(200).send(req.body);
      }catch(err){
                 res.status(400).send({message:err.message});
      }
})

app.delete('/mario/:id',async(req,res)=>{
     const id =  req.params.id;
    try{
          await marioModel.deleteOne({_id:id});
          res.status(200).send({message:'character deleted'})
     }catch(err){
         res.status(400).send({message:err.message})
     }
})

module.exports = app;