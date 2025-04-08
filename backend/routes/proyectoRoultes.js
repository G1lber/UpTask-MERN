import express from 'express'
import {
    obtenerProyecto,
    nuevoProyecto,
    obtenerProyectos,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
} from '../controllers/proyectoController.js'
import checkAuth from '../middleware/checkAuth.js'

const router = express.Router()

router.get('/', checkAuth, obtenerProyecto)

export default router