// const express = require("express");
import express from 'express'
import conectarDB from './config/db.js';
import dotenv from "dotenv";

const app = express();

dotenv.config();
conectarDB();

const PORT = process.env.PORT || 4000;
app.listen(4000,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})