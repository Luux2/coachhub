import {useNavigate, useParams} from "react-router-dom";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import {BarsArrowDownIcon, InformationCircleIcon} from "@heroicons/react/24/outline";
import useUsers from "../../../hooks/useUsers.ts";
import useClient from "../../../hooks/useClient.ts";
import {useEffect, useState} from "react";
import DeleteWarning from "../../../components/misc/DeleteWarning.tsx";
import RegisterStampsDialog from "../../../components/stampCard/RegisterStampsDialog.tsx";
import {StampCardInterface} from "../../../utils/interfaces.ts";
import EditStampCardDialog from "../../../components/stampCard/EditStampCardDialog.tsx";
import ClientService from "../../../services/ClientService.tsx";

export const ClientProfileScreen = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();

    const {client, setClient, loading, error} = useClient(clientId);
    const {users} = useUsers();

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);
    const [registerStampsDialogVisible, setRegisterStampsDialogVisible] = useState(false);
    const [editStampCardDialogVisible, setEditStampCardDialogVisible] = useState(false);
    const [selectedStampCard, setSelectedStampCard] = useState<StampCardInterface | null>(null);


    useEffect(() => {
        document.addEventListener('click', (e) => {
                if (e.target !== document.querySelector('.cursor-pointer')) {
                    setDropdownVisible(false);
                }
            }
        )
    }, []);


    const getUserName = (userId: string) => users.find(user => user.id === userId)?.name ?? "Ingen ansvarlig";

    const fetchClient = async () => {
        const updatedClient = await ClientService.getClientById(clientId!);
        setClient(updatedClient);
    };



    if (loading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }

    return (
        <>

            <div
                className={`${!deleteWarningVisible ? "hidden" : ""} fixed inset-0 z-10 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <DeleteWarning onClose={() => setDeleteWarningVisible(false)}/>
            </div>

            <div
                className={`${!registerStampsDialogVisible ? "hidden" : ""} fixed inset-0 z-10 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <RegisterStampsDialog stampCard={selectedStampCard!}
                                      onClose={() => setRegisterStampsDialogVisible(false)}/>
            </div>

            <div
                className={`${!editStampCardDialogVisible ? "hidden" : ""} fixed inset-0 z-10 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <EditStampCardDialog stampCard={selectedStampCard!}
                                      onClose={() => {
                                          setEditStampCardDialogVisible(false);
                                            fetchClient().then();
                                      }} clientId={clientId!} stampCardId={selectedStampCard?.id || ""}/>
            </div>

            <Animation>
                <div className="mx-40 mt-20">

                    <h1 className="text-3xl font-extrabold">{client?.companyName}</h1>
                    {client && (
                        <div className="flow-root my-20 border-2 rounded-xl shadow-lg">
                            <div className="flex">
                                <InformationCircleIcon className="h-8 w-8"/>
                                <h1 className="font-bold px-2 text-xl">Kundedetaljer</h1>
                            </div>
                            <dl className="divide-y divide-gray-100 text-sm px-2">
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Virksomhedsnavn</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client.companyName}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Adresse</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client.address}, {client.zipCode} {client.city}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">CVR-nummer</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client.cvr}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Kontaktperson(er)</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client.contacts && (
                                        client.contacts.map(contact => (
                                            <div key={contact.name}>
                                                {contact.name} - {contact.phone} - {contact.mail}
                                            </div>
                                        ))
                                    )}</dd>
                                </div>

                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Kundestatus</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{client.status}</dd>
                                </div>
                                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                                    <dt className="font-medium text-gray-900">Ansvarlig konsulent</dt>
                                    <dd className="text-gray-700 sm:col-span-2">{getUserName(client.responsible)}</dd>
                                </div>
                            </dl>
                        </div>
                    )}


                    <div className="flex gap-x-4">
                        <button onClick={() => navigate(`/${clientId}/opretklippekort`)}
                                className="mb-10 bg-green-500 text-white px-4 py-2 rounded-md">Nyt klippekort
                        </button>
                    </div>


                    {client?.stampCards && (
                        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Klippekortsnavn</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Forbrug</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">Handlinger</th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                {Object.entries(client.stampCards).map(([key, stampCard]) => (
                                    <tr key={key}>
                                        <td className="w-1/3 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                            {stampCard.name}
                                        </td>
                                        <td className="w-1/2 whitespace-nowrap px-4 py-2 text-gray-700">
                                            <div className="bg-gray-300 rounded min-w-full h-6"
                                                 style={{
                                                     background: `linear-gradient(to right, #10B981 ${stampCard.currentStampCount / stampCard.initialStampCount * 100}%, #D1D5DB 0%)`,
                                                 }}
                                            >
                                                <p className="text-center font-bold">{stampCard.currentStampCount}/{stampCard.initialStampCount} klip
                                                    benyttet</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <BarsArrowDownIcon
                                                onClick={() => dropdownVisible ? setDropdownVisible(false) : setDropdownVisible(true)}
                                                className={`${dropdownVisible ? "text-blue-500" : "text-gray-500"} select-none cursor-pointer w-8  mx-auto`}/>
                                            <div
                                                className={`${!dropdownVisible ? 'hidden' : ''} z-50 absolute border border-black bg-white rounded-xl p-1 w-40`}>
                                                <ul className="text-gray-500">
                                                    <li onClick={() => {
                                                        setRegisterStampsDialogVisible(true);
                                                        setSelectedStampCard(stampCard);
                                                    }}
                                                        className="hover:text-black p-2 cursor-pointer font-semibold">Registrer
                                                        klip
                                                    </li>
                                                    <li onClick={() => {
                                                        setEditStampCardDialogVisible(true);
                                                        setSelectedStampCard(stampCard);
                                                    }}
                                                        className="hover:text-black p-2 cursor-pointer font-semibold">Rediger
                                                        klippekort
                                                    </li>
                                                    <li onClick={() => {
                                                        setDeleteWarningVisible(true);
                                                        setSelectedStampCard(stampCard);
                                                    }}
                                                        className="hover:bg-amber-100 hover:rounded-xl p-2 cursor-pointer font-semibold text-red-500">Slet
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}


                </div>
            </Animation>
        </>
    );
}

export default ClientProfileScreen;