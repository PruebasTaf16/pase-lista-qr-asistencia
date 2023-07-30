import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { API_URL } from "../constants/api";

/**Valor del contexto por defecto */
const authContextDefault: any = {
    auth: {
        jwt: null,
        data: null,
    },
    cargando: true,
}

/**Sea un contexto (para manejar estados de manera global) */
const AuthContext = createContext(authContextDefault);

/**Nuestro Provider se encargará de pasar a todos sus hijos el valor de las propiedades para que puedan ser manipuladas más fácilmente */
export const AuthProvider = ({children}: any) => {
    const [auth, setAuth] = useState(authContextDefault.auth);
    const [cargando, setCargando] = useState(authContextDefault.cargando);

    const location = useLocation();

    /**Siempre que se llame al context, se disparará el siguiente evento, para validar si un usuario está autenticado */
    useEffect(() => {
        console.log('Auth provider user effect')
        const autenticar = async () => {
            const jwt = localStorage.getItem('pase-lista-qr-admin')
    
            if (!jwt) {
                return setCargando(false)
            }

            console.log('JWT detectado')
    
            try {
                const response = await axios.get(API_URL+'/admin-auth/obtener-info',{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${jwt}`                   
                    }
                })
    
                console.log(response)
    
                setAuth({jwt, data: response.data.data})
            } catch (error) {
                console.log(error)
                setAuth(authContextDefault.auth)
            } finally {
                setCargando(false)
            }
        }

        autenticar()
    }, [location]);

    /**Borra la sesión del local storage y automáticamente manda a la pantalla del login */
    const cerrarSesion = () => {
        localStorage.removeItem('pase-lista-qr-admin')
        setAuth(authContextDefault.auth);
    }

    return (
        <AuthContext.Provider value={{auth, setAuth, cargando, setCargando, cerrarSesion}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;