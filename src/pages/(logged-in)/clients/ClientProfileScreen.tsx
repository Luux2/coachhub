import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ClientService from "../../../services/ClientService.tsx";
import {ClientInterface, UserInterface} from "../../../utils/interfaces.ts";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import {InformationCircleIcon} from "@heroicons/react/24/outline";
import UserService from "../../../services/UserService.tsx";

export const ClientProfileScreen = () => {
    const navigate = useNavigate();
    const {clientId} = useParams();
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [client, setClient] = useState<ClientInterface | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClient = async () => {
                const data = await ClientService.getClientById(clientId!)
                setClient(data);
            }

        const fetchUsers = async () => {
            const data = await UserService.getUsers();
            setUsers(data);
        }

        Promise.all([fetchClient(), fetchUsers()]).then(() => setLoading(false));
    }, [clientId]);


    const getUserName = (userId: string) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : "Ingen ansvarlig";
    }

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <>
            <Animation>
                <div className="mx-40 mt-20">
                <h1 className="text-3xl font-extrabold">{client?.companyName}</h1>
            {client && (
                <div className="flow-root my-20 border-2 rounded-xl">
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


                    <div>
                        <button className="mb-10 bg-blue-500 text-white px-4 py-2 rounded-md">Nyt klippekort</button>
                    </div>


                    {client?.stampCards && (
                        <div className="overflow-x-auto rounded-lg border border-gray-200">
                            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left">
                                <tr>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Klippekortsnavn</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Forbrug</th>
                                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Handlinger</th>
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
                                                <p className="text-center font-bold">{stampCard.currentStampCount}/{stampCard.initialStampCount} klip benyttet</p>
                                            </div>
                                        </td>
                                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                            <button className="text-blue-500 hover:underline">Se detaljer</button>
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