import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-sky-600 font-black text-center'>
                UpTask
            </h2>
            <input
                type='search'
                placeholder='Buscar Proyectos'
                className='rounded-lg lg:w-96 block p-2 border'
            />
            <div className="flex items-center gap-4">
                <Link
                    to='/proyectos'
                    className='font-bold uppercase'
                >
                    Proyectos
                </Link>

                <button
                    type='button'
                    className='text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold'
                >Cerrar Sesión</button>
            </div>
        </div>
    </header>
  )
}

export default Header