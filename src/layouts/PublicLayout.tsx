import { Navigate, Outlet } from 'react-router-dom'
import useAuth from '../hooks/auth-hook'

/**Componente contenedor de rutas públicas, como lo es toda la autenticación (Login, recuperar, etc) */
const PublicLayout = () => {
  /**Uso del hook también */
  const {auth, cargando} = useAuth()

  if (cargando) return <div className='bg-black text-white font-bold min-h-screen'>Cargando...</div>

  if (auth.data) return <Navigate to={'/'} replace/>

  return (
    <Outlet />
  )
}

export default PublicLayout