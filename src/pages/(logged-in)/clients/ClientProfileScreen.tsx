import {Outlet, useNavigate, useParams} from "react-router-dom";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import useSingleClient from "../../../hooks/useSingleClient.ts";
import {Helmet} from "react-helmet-async";
import ClientProfileTabMenu from "../../../components/clientProfile/ClientProfileTabMenu.tsx";
import Header from "../../../components/misc/Header.tsx";
import EditClientDialog from "../../../components/clientProfile/EditClientDialog.tsx";
import {useState} from "react";
import ClientService from "../../../services/ClientService.tsx";

export const ClientProfileScreen = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const {client, setClient, loading: clientLoading, error: clientError} = useSingleClient(clientId);

    const isLoading = clientLoading;
    const error = clientError;

    const [editClientDialogVisible, setEditClientDialogVisible] = useState(false);

    const fetchClient = async () => {
        const updatedClient = await ClientService.getClientById(clientId!);
        setClient(updatedClient);
    };







    if (isLoading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <>

            <Helmet>
                <title>{client?.companyName}</title>
            </Helmet>

            <div className={`${!editClientDialogVisible ? "hidden" : ""} fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-90 w-full h-full`}>

                <EditClientDialog client={client!}
                                   onClose={() => {
                                       setEditClientDialogVisible(false);
                                       fetchClient().then();
                                   }} clientId={clientId!}/>
            </div>


            <Animation>
                <Header />

                <div className="mx-40">
                        <div className="flow-root my-20 border-2 rounded-xl shadow-lg bg-white">
                            <div className="flex justify-between px-2 p-2 border-b-2 border-gray-500">
                                <h1 className="font-bold text-3xl">{client?.companyName}</h1>
                                <div className="flex items-center">
                                    <button onClick={() => setEditClientDialogVisible(true)}
                                            className="bg-teal-600 hover:bg-teal-700 transition-colors duration-300 text-white px-4 rounded-md w-40 py-2">Rediger
                                    </button>
                                </div>
                            </div>
                            <dl className="divide-y divide-gray-100 text-md px-2">

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">Adresse</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.address}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">Postnummer og by</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.zipCode !== 0 ? client?.zipCode : ""} {client?.city}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">CVR-nummer</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.cvr !== 0 ? client?.cvr : ""}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">Telefonnummer (hovednummer)</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.phone}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">Status</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.status}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">Aktivitetsstatus</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.activityStatus}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-bold text-gray-900">Ansvarlig konsulent</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.responsible}</dd>
                                </div>
                            </dl>
                        </div>


                    <div className="grid grid-cols-3 items-center mb-10">
                        {window.location.pathname.includes("klippekort") ? (
                            <button
                                onClick={() => navigate(`/${clientId}/opretklippekort`)}
                                className="bg-teal-600 hover:bg-teal-700 transition-colors duration-300 text-white px-4 rounded-md w-40 py-2">
                                Opret klippekort
                            </button>
                        ) : window.location.pathname.includes("kontaktpersoner") ? (
                            <button
                                onClick={() => navigate(`/${clientId}/opretkontakt`)}
                                className="bg-teal-600 hover:bg-teal-700 transition-colors duration-300 text-white px-4 rounded-md w-40 py-2">
                                Opret kontakt
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate(`/${clientId}/opretnote`)}
                                className="bg-teal-600 hover:bg-teal-700 transition-colors duration-300 text-white px-4 rounded-md w-40 py-2">
                                Opret note
                            </button>
                        )}

                        <div className="justify-self-center">
                        <ClientProfileTabMenu />
                        </div>
                        <span></span>
                    </div>

                    <div className="pb-10">
                    <Outlet />
                    </div>

                </div>
            </Animation>
        </>
    );
}

export default ClientProfileScreen;