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
        const existingdoc = await marioModel.findById(id)
           if(isNullOrUndefined(body.name) && isNullOrUndefined(body.weight)){
                     res.status(400).send({message:"both name and weight are missing"})
           }else{
               if(!isNullOrUndefined(body.name)){
                    existingdoc.name = body.name
               }
               if(!isNullOrUndefined(body.weight)){
                existingdoc.weight = body.weight
           }
           }
           await existingdoc.save();
            res.status(200).send(existingdoc);
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