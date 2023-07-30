import { Navigate, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAuth from '../hooks/auth-hook'

/**Es un componente contenedor para las rutas privadas (cuando el usuario está autenticado) */
const AppLayout = () => {

  /**Aquí llamamos al hook creado para que haga las validaciones */
  const {auth, cargando, cerrarSesion} = useAuth()

  if (cargando) return <div className='bg-black text-white font-bold min-h-screen text-6xl flex items-center justify-center'>Cargando...</div>

  if (!auth.data) return <Navigate to={'/iniciar-sesion'} replace/>

  const logout = () => {
    Swal.fire({
      title: '¿Está seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro',
      cancelButtonText: 'No, no estoy seguro',
    }).then((result: any) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Sesión Cerrada',
          'La sesión se ha cerrado',
          'warning'
        )
        cerrarSesion();
      }
    })
  }

  return (
    <div className='bg-white min-h-screen flex flex-col flex-wrap'>

      <main className='mt-8 w-3/4 mx-auto flex flex-col flex-grow'>
        <Outlet />
      </main>

      <footer className='fixed p-4 bottom-0 left-0 right-0 bg-gray-white text-gray-500 font-bold'>
        <div className='container mx-auto flex justify-between items-center'>
          <div>
            <p>ID: <span className='text-green-400'>{auth.data._id}</span></p>
          </div>

          <button onClick={() => logout()} className='p-2 rounded-lg border-2 border-transparent hover:text-white hover:border-white hover:bg-blue-600 hover:shadow-lg text-lg font-medium w-38 text-center'>Cerrar Sesión</button>
        </div>
      </footer>
    </div>
  )
}

export default AppLayout