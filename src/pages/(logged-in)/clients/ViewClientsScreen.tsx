import {useEffect, useState} from "react";
import {ClientInterface, UserInterface} from "../../../utils/interfaces.ts";
import ClientService from "../../../services/ClientService.tsx";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import UserService from "../../../services/UserService.tsx";
import {useNavigate} from "react-router-dom";
import Animation from "../../../components/misc/Animation.tsx";

export const ViewClientsScreen = () => {

    const navigate = useNavigate();
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            const data = await ClientService.getClients();
            const sortedClients = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
            setClients(sortedClients);
        }

        const fetchUsers = async () => {
            const data = await UserService.getUsers();
            setUsers(data);
        }

        Promise.all([fetchClients(), fetchUsers()]).then(() => setLoading(false));
    }, []);

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

                {clients.map((client: ClientInterface) => (
            <div key={client.id} className="overflow-x-auto rounded-lg border border-gray-200 mx-20">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
            <tr>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Virksomhedsnavn</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">By</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Kundestatus</th>
            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Ansvarlig konsulent</th>
            </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">

            <tr>
            <td onClick={() => navigate(`/kunder/${client.id}`)} className="cursor-pointer whitespace-nowrap px-4 py-2 font-medium text-gray-900">{client.companyName}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.zipCode} {client.city}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.status}</td>
            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{getUserName(client.responsible)}</td>
            </tr>

            </tbody>
            </table>
            </div>
        ))
        }
            </Animation>
        </>
    );
};

export default ViewClientsScreen;