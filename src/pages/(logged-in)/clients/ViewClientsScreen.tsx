import useClients from "../../../hooks/useClients";
import useUsers from "../../../hooks/useUsers.ts";
import LoadingBar from "../../../components/misc/LoadingBar";
import Animation from "../../../components/misc/Animation";
import { useNavigate } from "react-router-dom";
import {useUserData} from "../../../context/AuthContext.tsx";

export const ViewClientsScreen = () => {
    const { user } = useUserData();
    const navigate = useNavigate();
    const { clients, loading: clientsLoading, error: clientsError } = useClients();
    const { users, loading: usersLoading, error: usersError } = useUsers();

    const isLoading = clientsLoading || usersLoading;
    const error = clientsError || usersError;

    const getUserName = (userId: string) => {
        const user = users.find((user) => user.id === userId);
        return user ? user.name : "Ingen ansvarlig";
    };

    if (isLoading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <Animation>

            <div className="mx-40 mt-10">

                <header>
                    <h1 className="text-7xl font-bold text-gray-900 text-center mb-10">Hej {user?.name}!</h1>
                </header>

                <div className="flex gap-x-4">
                    <button onClick={() => navigate(`/opretkunde`)}
                            className="mb-10 bg-green-500 text-white px-4 py-2 rounded-md">Opret kunde
                    </button>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
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
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td
                                    onClick={() => navigate(`/kunder/${client.id}`)}
                                    className="cursor-pointer whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                >
                                    {client.companyName}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {client.zipCode} {client.city}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">{client.status}</td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {getUserName(client.responsible)}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Animation>
    );
};

export default ViewClientsScreen;
