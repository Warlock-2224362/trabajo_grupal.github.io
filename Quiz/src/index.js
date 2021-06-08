const express = require("express");
const path = require("path");
const app = express();
const mysql = require('mysql'); 
app.use (express.urlencoded({extended:false}));
app.use(express.json());

//LA RUTA DONDE SE RECIBEN TODOS LOS DATOS DEL FORMULARIO
app.use(require("./routes/index"));

//DEFINIMOS DONDE ESTAN NUESTROS ARCHIVOS ESTATICOS
app.use(express.static(path.join(__dirname, "public")));

//ES POR DONDE ESCUCHA NUESTRO SERVIDOR
app.listen(3500, () => {
    console.log("Server on port 3500");

});