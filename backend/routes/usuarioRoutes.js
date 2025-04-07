import express from 'express'
const router = express.Router();

import {
    registrar, 
    autenticar, 
    confirmar, 
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil,
} from "../controllers/usuarioController.js"
import checkAuth from '../middleware/checkAuth.js';

// Autentificación, Registro y Confirmación de Usuarios
router.post('/', registrar); //Creacion de usuarios 
router.post('/login', autenticar);
router.get('/confirmar/:token', confirmar);
router.post('/olvide-password', olvidePassword);

// router.get('/olvide-password/:token', comprobarToken);
// router.post('/oldive-password/:token', nuevoPassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
//CheckAuth Valida que el token sea valido y si todo esta bien se va perfil
router.get('/perfil', checkAuth, perfil)

export default router;