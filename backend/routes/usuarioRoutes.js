import express from 'express'
const router = express.Router();

import {
    registrar, 
    autenticar, 
    confirmar, 
    olvidePassword,
} from "../controllers/usuarioController.js"

// Autentificación, Registro y Confirmación de Usuarios
router.post('/', registrar); //Creacion de usuarios 
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);

export default router;