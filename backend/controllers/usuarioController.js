import Usuario from "../models/Usuario.js";

const registrar = async (req, res) => {

    //Evitar registro duplicados
    const {email} = req.body;
    const exiteUsuario = await Usuario.findOne({email})

    console
    try {
        const usuario = new Usuario(req.body)
        const usuarioAlacenado = await usuario.save()
        res.json(usuarioAlacenado)
    } catch (error) {
        console.log(error)
    }
    
}

export {registrar};