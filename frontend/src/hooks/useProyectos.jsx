import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import Proyectos from "../paginas/Proyectos";

const useProyectos= () => {
    return useContext(ProyectosContext)
}

export default useProyectos