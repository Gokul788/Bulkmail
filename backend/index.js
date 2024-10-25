const express = require("express")
const cors = require("cors")
const nodemailer = require("nodemailer");
const mongoose = require("mongoose")
const app = express();
app.use(cors())
app.use(express.json())



const { promises } = require("nodemailer/lib/xoauth2");

mongoose.connect("mongodb+srv://gokul698512:Zhy8gFybbPgxTrXQ@cluster0.yw243.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0").then(function(){
    console.log("Connected to DB")
}).catch(function(){
    console.log("Failed to Connect")
})


const credential = mongoose.model("credential",{},"bulkmail")




app.post("/sendemail",function(req,res){
    var msg = req.body.message
    var email = req.body.emailList
    
    credential.find().then(function(data){

     
        const transporter = nodemailer.createTransport({
            service:"gmail",
            auth: {
              user: data[0].toJSON().user,
              pass:  data[0].toJSON().pass,
            },
          });
    
        
          new Promise( async function(resolve,reject){
            try{
               
                for(let i = 0 ; i<email.length;i++){
            
                    await transporter.sendMail(
                        {
                          
                            from:"gokul698512@gmail.com",
                            to:email[0],
                            subject:"Email from Bulkmail app",
                            text:msg
                        }    
                    )
                   console.log("Email send to "+ email[i])
                }
    
                resolve("sucessful")
    
    
            }
            catch{
                reject("Failed")
            }
          }).then(function(){
            res.send(true)
          }).catch(function(){
            res.send(false)
          })
          
         
    
        
    }).catch(function(){
        console.log("error")
    })
      



})



app.listen(5000,function(){
    console.log("Server started >>> ")
})