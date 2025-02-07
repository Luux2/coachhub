import './App.css'
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";
import ViewClientsScreen from "./pages/(logged-in)/clients/ViewClientsScreen.tsx";
import ClientProfileScreen from "./pages/(logged-in)/clients/ClientProfileScreen.tsx";
import CreateStampCardScreen from "./pages/(logged-in)/clients/stampCard/CreateStampCardScreen.tsx";
import CreateClientScreen from "./pages/(logged-in)/clients/CreateClientScreen.tsx";

function App() {
    return (
                <HelmetProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route index path="/" element={<LoginPage/>}/>
                                <Route path="/kunder" element={<ProtectedRoute> <ViewClientsScreen/> </ProtectedRoute>}/>
                                <Route path="/opretkunde" element={<ProtectedRoute> <CreateClientScreen/> </ProtectedRoute>}/>
                                <Route path="/kunder/:clientId" element={<ProtectedRoute> <ClientProfileScreen/> </ProtectedRoute>}/>
                                <Route path="/:clientId/opretklippekort" element={<ProtectedRoute> <CreateStampCardScreen/> </ProtectedRoute>}/>
                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </HelmetProvider>
    );
}

export default App;
