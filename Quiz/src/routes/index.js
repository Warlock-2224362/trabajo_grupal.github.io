const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const Mail = require("nodemailer/lib/mailer");
const router = express.Router();
router.post("/send-mail",(req,res) => {
    const {name,email,celular,message}=req.body;
    const mysql = require('mysql');
        const con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "quiz_db"
        });
        con.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        const sql = "INSERT INTO  usuarios (Nombre,Correo,Celular) VALUES ('"+ name +"','"+ email +"','"+ celular +"');";
        con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        const contentHTML =`
        <h1>Formulario de nodemailer</h1>     
        <h2>Estos son tus datos:</h2>
    <h3>
        <li>Nombre: ${name}</li>
        <li>Correo: ${email}</li>
        <li>Celular: ${celular}</li>   
    </h3>
        <h3>Gracias por registrarte.</h3>
        <img src="https://blogs.encamina.com/piensa-en-software-desarrolla-en-colores/wp-content/uploads/sites/21/2018/02/desarrollo-web-medida.png">
    `;
    const CLIENT_ID="559919260225-ue2147lhisi4gngekh3e0vhdokuqso9f.apps.googleusercontent.com";
    const CLIENT_SECRET="xInyukvgqfINB9JnBpuBM647";
    const REDIRECT_URI="https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN="1//04eRPj4uq3HdXCgYIARAAGAQSNwF-L9IrnKqvzjZ8lFPNc7WmJDYis50q4A4shM57XBU9iUZ-gTXPBykqp0cwj61r5jmIQgfU-mA";

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
        );
        oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});
        async function sendMail(){
            try{
                const accessToken = await oAuth2Client.getAccessToken();
                const transporter = nodemailer.createTransport({
                    service:"gmail",
                    auth:   {
                        type:"OAuth2",
                        user:"ariasmiguel0316@gmail.com",
                        clientId:CLIENT_ID,
                        clientSecret:CLIENT_SECRET,
                        refreshToken:REFRESH_TOKEN,
                        accessToken:"ya29.a0AfH6SMArmNs8SluzuXcM2Q23br09uvob6cazz5tUWW7L4pZlxViDON2TKYGjdwuLa9gXtYngkgIEAc3meY_KnaioKJ-hqb9XXFMi-rqfQkkS4G4c9233Zyl6QGoXUTDsLYMFeab1E_cbjGawZUdiArxaSpF7",
                    },                  
                });
                const mailOptions={
                    from:"Pagina web nodemailer <ariasmiguel0316@gmail.com>",
                    to: email,
                    subject:"THE WARLOCKS FICHA 2224362",
                    html:contentHTML,
                };
                const result =await transporter.sendMail(mailOptions)
                return result;
            } catch(err){
                console.log(err);
            }
        }
        const contentHTML2 = `
      <!DOCTYPE html>
<html>
<head>
	<title>Datos Personales</title>
	<meta charset="utf-8">
	<style type="text/css">
	
		
		body{
    		background-color: black;
    		background-size: 100vw 100vh;
    		background-attachment: fixed;
    		margin: 0;
    		font-family: Arial;
    	}
    	
    
    	
    	h2{
    		text-align: center;
    		margin: 0;
        color: white;
    		font-size: 30px;
    		margin-bottom: 10px;
    	}

      img.center {

        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    	
	</style>

</head>
<body>

   <br>

	<h2>REGISTRO EXITOSO</h2>
	<br>
  <br>
  <br>
  <center>
  <img  margin-left: auto margin-right: auto  src="https://media2.giphy.com/media/GCLlQnV7wzKLu/200.gif">
  </center>


 
</body>
</html>
      `;
        sendMail()
        .then((result) =>res.status(200).send(contentHTML2),console.log("correo enviado"))
        .catch((error) => console.log(error.message)); 
        });            
    });     
});   
module.exports =router; 