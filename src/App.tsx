import './App.css'
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";
import ClientProfileScreen from "./pages/(logged-in)/clients/ClientProfileScreen.tsx";
import CreateStampCardScreen from "./pages/(logged-in)/clients/stampCard/CreateStampCardScreen.tsx";
import CreateClientScreen from "./pages/(logged-in)/clients/CreateClientScreen.tsx";
import ClientProfileContactsTab from "./components/clientProfile/ClientProfileContactsTab.tsx";
import ClientProfileStampTab from "./components/clientProfile/ClientProfileStampTab.tsx";
import AllClientsScreen from "./pages/(logged-in)/clients/AllClientsScreen.tsx";
import ClientsTab from "./components/homeScreen/ClientsTab.tsx";
import StampCardsTab from "./components/homeScreen/StampCardsTab.tsx";
import ContactsTab from "./components/homeScreen/ContactsTab.tsx";
import ViewStampCardScreen from "./pages/(logged-in)/clients/stampCard/ViewStampCardScreen.tsx";

function App() {
    return (
                <HelmetProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route index path="/" element={<LoginPage/>}/>

                                <Route path="/" element={<ProtectedRoute> <AllClientsScreen/> </ProtectedRoute>}>
                                    <Route index element={<Navigate to="kunder" replace/>}/>
                                    <Route path="kunder" element={<ClientsTab/>}/>
                                    <Route path="klippekort" element={<StampCardsTab/>}/>
                                    <Route path="kontaktpersoner" element={<ContactsTab/>}/>
                                </Route>


                                <Route path="/opretkunde" element={<ProtectedRoute> <CreateClientScreen/> </ProtectedRoute>}/>


                                <Route path="/kunder/:clientId" element={<ProtectedRoute> <ClientProfileScreen/> </ProtectedRoute>}>
                                    <Route index element={<Navigate to="/klippekort" replace/>}/>
                                    <Route path="klippekort" element={<ClientProfileStampTab/>}/>
                                    <Route path="kontaktpersoner" element={<ClientProfileContactsTab/>}/>
                                </Route>

                                <Route path="klippekort/:stampCardId" element={<ProtectedRoute> <ViewStampCardScreen/> </ProtectedRoute>}/>


                                <Route path="/:clientId/opretklippekort" element={<ProtectedRoute> <CreateStampCardScreen/> </ProtectedRoute>}/>

                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </HelmetProvider>
    );
}

export default App;
