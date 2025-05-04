import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required:true,
        trim: true //Quita los espacios del inicio y del final
    },
    password: {
        type: String,
        required:true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        trim: true,
        unique: true
    },
    token:{
        type: String
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
},
{
    timestamps: true,
}    
);

//Encriptar la contraseña 
usuarioSchema.pre('save', async function (next) {

    //Mira si ya esta Hash no lo hace, es decir cuando se editan datos 
    if (!this.isModified("password")) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
usuarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema)
export default Usuario;

