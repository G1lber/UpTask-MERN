import { useState, useEffect, createContext, Children } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import EditarProyecto from "../paginas/EditarProyecto";

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [cargando, setcargando] = useState(false)
    
    const navigate = useNavigate()

    useEffect(() => {
        const obtenerProyectos = async() =>{
            try {
                const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", 
                    Authorization:`Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/proyectos', config)
            setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])

    const mostrarAlerta = alerta =>{
        setAlerta(alerta)
        setTimeout(() =>{
            setAlerta({})
        },5000)
    }
    const submitProyecto = async proyecto =>{
        if (proyecto.id) {
            editarProyecto(proyecto)
        } else {
            nuevoProyecto(proyecto)
        }
        return
        // if (proyecto.id) {
            
        // }
        
    }
    const editarProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/proyectos/${proyecto.id}`,proyecto,config)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }
    const nuevoProyecto = async proyecto =>{
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", Authorization:`Bearer ${token}`
                }
            }
            const {data} =await clienteAxios.post('/proyectos', proyecto, config)
            
            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto creado correctamente',
                error:false
            })
            setTimeout(() =>{
                setAlerta({})
                    navigate('/proyectos')
            },3000)
        } catch (error) {
            console.log(error)
        }
    }
    const obtenerProyecto = async id => {
        setcargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", 
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios(`/proyectos/${id}`, config)
            setProyecto(data)
        } catch (error) {
            console.log(error)
        }finally{
            setcargando(false)
        }
    }
    return(
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}
export{
    ProyectosProvider
}

export default ProyectosContext
