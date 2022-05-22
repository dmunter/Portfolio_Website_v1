const express = require('express');
const nodemailer = require('nodemailer') ///for node mailer module
//require('dotenv').config()
const app = express();


app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true})) //bioler plate. //without this express does not allow ejs us to use the body

app.get('/', (req, res) => {
    res.render('index')
  })
  
app.get('/mobile',(req, res) =>{
  res.render('mobile')
})

app.use(express.static(__dirname + "/public"));  


app.post('/send',(req,res) =>{
    //console.log(req.body.firstName)
    const isValid = true
    if(isValid){
      var name = req.body.name
      var email = req.body.email
      var message = req.body.message
      mail(name,email,message)
    } else {
      console.log("error")
    }
    res.send("Your message has ben sent")
    console.log(name , email, message)
})  

const port = process.env.PORT || 3000

app.listen(port, () => {
   console.log('connecting to port...' + port)
})
 

function mail(name,email,message){

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
          clientId: process.env.OAUTH_CLIENTID,
          clientSecret: process.env.OAUTH_CLIENT_SECRET,
          refreshToken: process.env.OAUTH_REFRESH_TOKEN
        }
      });
      
      let mailOptions = {
        from: process.env.MAIL_USERNAME,
        to: process.env.MAIL_USERNAME,
        subject: 'name and Email: '+ email + ' ' + name,
        text: 'Message ' + message
      };
      
      transporter.sendMail(mailOptions, function(err, data) {
        if (err) {
          console.log("Error " + err);
        } else {
          console.log("Email sent successfully");
        }
      })
    }
  