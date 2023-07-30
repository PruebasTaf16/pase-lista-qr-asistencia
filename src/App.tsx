import { HashRouter, Route, Routes } from "react-router-dom"

import Home from "./pages/private/Home"
import Login from "./pages/Login"

import { AuthProvider } from "./contexts/auth-context"

import AppLayout from "./layouts/AppLayout"
import PublicLayout from "./layouts/PublicLayout"
/**Aquí manejamos todas las rutas públicas y privadas con su respectivo contenedor */
function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route index path="/iniciar-sesion" Component={Login}/>
          </Route>

          <Route path="/" element={<AppLayout />}>
            <Route index Component={Home}/>
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  )
}

export default App
