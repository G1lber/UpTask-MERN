// const express = require("express");
import express from 'express'
import conectarDB from './config/db.js';
import dotenv from "dotenv";
import usuarioRoutes from "./routes/usuarioRoutes.js"
import proyectoRoutes from "./routes/proyectoRoultes.js"

const app = express();
//Procesar la informacion tipo Json
app.use(express.json())

dotenv.config();
conectarDB();

//Routing
app.use('/api/usuarios', usuarioRoutes )
app.use('/api/proyectos', proyectoRoutes )

const PORT = process.env.PORT || 4000;
app.listen(4000,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})