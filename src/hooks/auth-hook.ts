import { useContext } from 'react';
import AuthContext from '../contexts/auth-context';

/**Creamos un hook para usar el context (según documentación, no es recomendable usar el context directamente) */
const useAuth = () => {
    return useContext(AuthContext);
}  

export default useAuth;