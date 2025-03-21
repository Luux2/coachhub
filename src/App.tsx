import './App.css'
import {HelmetProvider} from "react-helmet-async";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./utils/ProtectedRoutes.tsx";
import ClientProfileScreen from "./pages/(logged-in)/clients/ClientProfileScreen.tsx";
import CreateStampCardScreen from "./pages/(logged-in)/stampCard/CreateStampCardScreen.tsx";
import CreateClientScreen from "./pages/(logged-in)/clients/CreateClientScreen.tsx";
import ClientProfileContactsTab from "./components/clientProfile/ClientProfileContactsTab.tsx";
import ClientProfileStampTab from "./components/clientProfile/ClientProfileStampTab.tsx";
import HomeScreen from "./pages/(logged-in)/HomeScreen.tsx";
import ClientsTab from "./components/homeScreen/ClientsTab.tsx";
import StampCardsTab from "./components/homeScreen/StampCardsTab.tsx";
import ContactsTab from "./components/homeScreen/ContactsTab.tsx";
import ViewStampCardScreen from "./pages/(logged-in)/stampCard/ViewStampCardScreen.tsx";
import CreateContactScreen from "./pages/(logged-in)/contacts/CreateContactScreen.tsx";
import ImportTab from "./components/homeScreen/ImportTab.tsx";
import Test from "./pages/(logged-in)/Test.tsx";
import ClientProfileNotesTab from "./components/clientProfile/ClientProfileNotesTab.tsx";
import ViewContactScreen from "./pages/(logged-in)/contacts/ViewContactScreen.tsx";


function App() {
    return (
                <HelmetProvider>
                    <AuthProvider>
                        <BrowserRouter>
                            <Routes>
                                <Route index path="/" element={<LoginPage/>}/>

                                <Route path="/" element={<ProtectedRoute> <HomeScreen/> </ProtectedRoute>}>
                                    <Route index element={<Navigate to="kunder" replace/>}/>
                                    <Route path="kunder" element={<ClientsTab/>}/>
                                    <Route path="klippekort" element={<StampCardsTab/>}/>
                                    <Route path="kontaktpersoner" element={<ContactsTab/>}/>
                                    <Route path="import" element={<ImportTab/>}/>
                                </Route>

                                <Route path="/test" element={<Test/>}/>


                                <Route path="/opretkunde" element={<ProtectedRoute> <CreateClientScreen/> </ProtectedRoute>}/>
                                <Route path="/:clientId/opretklippekort" element={<ProtectedRoute> <CreateStampCardScreen/> </ProtectedRoute>}/>
                                <Route path="/:clientId/opretkontaktperson" element={<ProtectedRoute> <CreateContactScreen/> </ProtectedRoute>}/>


                                <Route path="/kunder/:clientId" element={<ProtectedRoute> <ClientProfileScreen/> </ProtectedRoute>}>
                                    <Route index element={<Navigate to="/klippekort" replace/>}/>
                                    <Route path="klippekort" element={<ClientProfileStampTab/>}/>
                                    <Route path="kontaktpersoner" element={<ClientProfileContactsTab/>}/>
                                    <Route path="noter" element={<ClientProfileNotesTab/>}/>
                                </Route>

                                <Route path="klippekort/:stampCardId" element={<ProtectedRoute> <ViewStampCardScreen/> </ProtectedRoute>}/>
                                <Route path="kontaktpersoner/:contactId" element={<ProtectedRoute> <ViewContactScreen/> </ProtectedRoute>}/>

                            </Routes>
                        </BrowserRouter>
                    </AuthProvider>
                </HelmetProvider>
    );
}

export default App;
