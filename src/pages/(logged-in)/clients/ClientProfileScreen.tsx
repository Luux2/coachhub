import {Outlet, useNavigate, useParams} from "react-router-dom";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import useUsers from "../../../hooks/useUsers.ts";
import useSingleClient from "../../../hooks/useSingleClient.ts";
import {Helmet} from "react-helmet-async";
import ContactsStampCardsTabs from "../../../components/clientProfile/ContactsStampCardsTabs.tsx";
import Header from "../../../components/misc/Header.tsx";

export const ClientProfileScreen = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const {client, loading: clientLoading, error: clientError} = useSingleClient(clientId);
    const {users} = useUsers();

    const isLoading = clientLoading;
    const error = clientError;



    const getUserName = (userId?: string) => users.find(user => user.id === userId)?.name ?? "Ingen ansvarlig";




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


            <Animation>
                <Header />

                <div className="mx-40 mt-10">

                    <h1 className="text-3xl font-extrabold">{client?.companyName}</h1>
                        <div className="flow-root my-20 border-2 rounded-xl shadow-lg bg-white">
                            <div className="flex">
                                <InformationCircleIcon className="h-8 w-8"/>
                                <h1 className="font-bold px-2 text-xl">Kundedetaljer</h1>
                            </div>
                            <dl className="divide-y divide-gray-100 text-sm px-2">
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Virksomhed</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.companyName}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Adresse</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.address}, {client?.zipCode} {client?.city}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">CVR-nummer</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.cvr}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Status</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.status}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Aktivitetsstatus</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client?.activityStatus}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Ansvarlig konsulent</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{getUserName(client?.responsible)}</dd>
                                </div>
                            </dl>
                        </div>


                    <div className="grid grid-cols-3 items-center mb-10">
                        {window.location.pathname.includes("klippekort") ? (
                            <button onClick={() => navigate(`/${clientId}/opretklippekort`)}
                                    className="bg-green-500 text-white px-4 rounded-md w-40 py-2">Opret klippekort
                            </button> ) : (
                            <button onClick={() => navigate(`/${clientId}/klippekort`)}
                                    className="bg-green-500 text-white px-4 rounded-md w-40 py-2">Opret kontakt
                            </button>
                        )}

                        <div className="justify-self-center">
                        <ContactsStampCardsTabs />
                        </div>
                        <span></span>
                    </div>

                    <Outlet />

                </div>
            </Animation>
        </>
    );
}

export default ClientProfileScreen;