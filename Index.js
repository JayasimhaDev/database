const express = require("express");
const bodyParser=require('body-parser');
const mongoose = require("mongoose");
const cors=require('cors')
const app = express();
app.use(express.json())
app.use(cors());
const port=process.env.PORT || 1890
//hello
mongoose.connect(
    "mongodb+srv://jayasimha:jaya18jaya@cluster0.j1q0dzg.mongodb.net/Movieapp", 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(()=>{
    console.log("connection successfull");

})
const userschema = new mongoose.Schema({
  email:String,
  password:String,
  name:String
});
const User = mongoose.model('User', userschema);
app.post('/register', async (req,res) => {
  console.log(await req.body)
  let user= await new  User(req.body);
  user.save((err,response)=>{
if(err){
  res.send({message:'error while adding item'})
}else{
  res.send({message:"User added successfully"})
}
  });

})
app.post('/login', async (req,res) => {
  console.log(await req.body)
  let {email,password}= req.body;
  
  User.find({email:email},(err,response)=>{
if(err){
  res.send({message:'error while adding item'})
}else{
  if(response.length>0){
    if(response[0].password===password){
      res.send(response)
    }else{
      res.send({message:'password didt match'})
    }
  }else{
    res.send({message:'user not registered'})
  }

}
  });

})
app.listen(port, () => console.log("Server is running"))