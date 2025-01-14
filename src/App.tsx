import './App.css'
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage";
import HomeScreen from "./pages/(logged-in)/HomeScreen.tsx";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";
import ViewClientsScreen from "./pages/(logged-in)/clients/ViewClientsScreen.tsx";
import ClientProfileScreen from "./pages/(logged-in)/clients/ClientProfileScreen.tsx";

function App() {

  return (
      <HelmetProvider>
          <AuthProvider>
              <BrowserRouter>
                  <Routes>
                      <Route index path="/" element={<LoginPage/>}/>
                      <Route path="/hjem" element={<ProtectedRoute> <HomeScreen/> </ProtectedRoute>}/>
                      <Route path="/kunder" element={<ProtectedRoute> <ViewClientsScreen/> </ProtectedRoute>}/>
                      <Route path="/kunder/:clientId" element={<ProtectedRoute> <ClientProfileScreen/> </ProtectedRoute>}/>
                  </Routes>
              </BrowserRouter>
          </AuthProvider>
      </HelmetProvider>
  )
}

export default App
