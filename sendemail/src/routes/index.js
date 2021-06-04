
const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const gmail = google.gmail('v1');
const router = express.Router();



 
router.post('/send-email',(req, res)=>{

    
    
    const {name,email,phone,message}= req.body;
    const contentHtml = `
    <h1>Formulario de NodeMailer</h1>
    <ul>
        <li>Nombre:${name}</li>
        <li>Correo:${email}</li>
        <li>Telefono:${phone}</li>
        <li>Mensaje:${message}</li>
    </ul>
    <p>${message}</p>
    `;
 

    const CLIENTD_ID = "775309731367-714ib8hnsvhj837rnt0n4gldv3p4o0v0.apps.googleusercontent.com";
    const CLIENT_SECRET = "y2Wm5mdhVKpZgUDI7qDLy0G9";
    const REDIRECT_URI = "https://developers.google.com/oauthplayground";
    const REFRESH_TOKEN = "1//04W9WI0LJUEMbCgYIARAAGAQSNwF-L9IrJ5ym5z1ideVYHKF95Hp4vBnNWDLjzFSmDTpBxirQd6vb1ZUpIZUP9AL-hB-9CXId01I"; 

    const oAuth2Client = new google.auth.OAuth2(
        CLIENTD_ID,
        CLIENT_SECRET,
        REDIRECT_URI);

    oAuth2Client.setCredentials({ refresh_token : REFRESH_TOKEN });

    async function sendMail(){
        try{
            const accessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service:"gmail",
                auth:{
                    type:"OAuth2",
                    user:"darwinmeneses13@gmail.com",
                    cliendId : CLIENTD_ID,
                    clientSecret : CLIENT_SECRET,
                    refreshToken : REFRESH_TOKEN,
                    accessToken : "ya29.a0AfH6SMCm7AunaUaRGs3Vz8Uvc-1trMrklQLJ_2x2u_ft_QNhpWp2DPPCBqyhzsZaYmTTyMCdKopcx7jbo36lXm6-INf4WKDKXpE-dPxFGAB-zxG6ikf0J715V6-8z88Rq9rKJDr6Mu1d9py6yWkCMnrkf_BL",
                },
               
                
            
            });
             const mailoptions={
              from:"Página web de envio de correo 2224362 <darwinmeneses13@gmail.com>",
              to: email,
              subject: "NodemailssserExamen",
              html: contentHtml,       
             };

             const result = await transporter.sendMail(mailoptions);
             return  result;

           } catch(err){
            console.log(err);
           }
    }
    sendMail()
    .then((result) => res.status(200).send('enviados'), console.log("enviado"))
    .catch((error) => console.log(error.message));
});

module.exports = router;

