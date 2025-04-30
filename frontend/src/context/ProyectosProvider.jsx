import { useState, useEffect, createContext, Children } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import EditarProyecto from "../paginas/EditarProyecto";

const ProyectosContext = createContext()

const ProyectosProvider = ({children}) => {
    
    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])
    const [proyecto, setProyecto] = useState({})
    const [cargando, setCargando] = useState(false)
    const [modalFormularioTarea, setModalFormularioTarea ] = useState(false)
    const [tarea, setTarea] = useState({})
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false)
    const [colaborador, setColaborador] = useState({})

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
            await editarProyecto(proyecto)
        } else {
            await nuevoProyecto(proyecto)
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
            //Sincronizar el state
            const proyectosActulizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data: proyectoState)
            setProyectos(proyectosActulizados)
            //Mostrar la alerta proyecto actualizado
            setAlerta({
                msg: 'Proyecto Actulizado correctamente',
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
        setCargando(true)
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
            setCargando(false)
        }
    }

    const eliminarProyecto = async id=>{
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", Authorization:`Bearer ${token}`
                }
            }
            const {data} =await clienteAxios.delete(`/proyectos/${id}`, config)
            //Sincronizar el State
            const proyectosActulizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActulizados)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setTimeout(() =>{
                setAlerta({})
                navigate('/proyectos')
            },3000)
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalTarea = () =>{
        setModalFormularioTarea(!modalFormularioTarea)
        setTarea({})
    }

    const submitTarea = async tarea =>{
            
        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await  crearTarea(tarea)
        }     
    }
    const crearTarea = async tarea=>{
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", 
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/tareas', tarea, config)

            //Agregar la tarea al state
            const proyectoActulizado = {...proyecto}
            proyectoActulizado.tareas = [...proyecto.tareas, data]
            setProyecto(proyectoActulizado)
            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }

    const editarTarea = async tarea =>{
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", 
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

            const proyectoActulizado = {...proyecto}
            proyectoActulizado.tareas = proyectoActulizado.tareas.map(tareaState => 
                tareaState._id === data._id ? data: tareaState)
                setProyecto(proyectoActulizado)

            setAlerta({})
            setModalFormularioTarea(false)
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarTarea = tarea =>{
        setTarea(tarea)
        setModalFormularioTarea(true)
    }
    const  handleModalEliminarTarea = tarea =>{
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }
    const eliminarTarea = async() =>{
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", 
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.delete(`/tareas/${tarea._id}`, config)

            setAlerta({
                msg:data.msg,
                error: false
            })

            const proyectoActulizado = {...proyecto}
                proyectoActulizado.tareas = proyectoActulizado.tareas.filter(tareaState => 
                tareaState._id !== tarea._id)
                
                setProyecto(proyectoActulizado)
                setModalEliminarTarea(false)
                setTarea({})
                setTimeout(() => {
                    setAlerta({})
                }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const submitColaborador = async email =>{
        setCargando(true)
        try {
            const token = localStorage.getItem('token')
            if (!token) return

            const config = {
                headers:{
                    "Content-Type":"application/json", 
                    Authorization:`Bearer ${token}`
                }
            }
            const {data} = await clienteAxios.post('/proyectos/colaboradores',{email}, config)
            
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg:error.response.data.msg,
                error:true
            })
        }finally{
            setCargando(false)
        }
    }
    const agragarColaborador = async email =>{
        console.log(email)
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
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                modalEliminarTarea,
                handleModalEliminarTarea,
                eliminarTarea,
                submitColaborador,
                colaborador,
                agragarColaborador
            }}
        >{children}
        </ProyectosContext.Provider>
    )
}
export{
    ProyectosProvider
}

export default ProyectosContext
