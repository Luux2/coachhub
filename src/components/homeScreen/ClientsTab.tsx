import { useNavigate } from "react-router-dom";
import useClients from "../../hooks/useClients";
import { useState } from "react";
import LoadingBar from "../misc/LoadingBar";
import { Helmet } from "react-helmet-async";
import { ClientInterface } from "../../utils/interfaces";

export const ClientsTab = () => {
    const navigate = useNavigate();
    const { clients, loading: clientsLoading, error: clientsError } = useClients();
    const [searchQuery, setSearchQuery] = useState("");

    const [sortField, setSortField] = useState<keyof ClientInterface>("companyName");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const isLoading = clientsLoading;
    const error = clientsError;


    const filteredClients = clients.filter((client) =>
        client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.status.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSort = (field: keyof typeof clients[0]) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedClients = [...filteredClients].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField] as string;
        const valueB = b[sortField] as string;

        return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
    });

    if (isLoading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            <Helmet>
                <title>CoachHub - Kunder</title>
            </Helmet>

            <div className="w-full mx-16">
                <div className="flex items-center gap-10 mb-10">
                    <button
                        onClick={() => navigate(`/opretkunde`)}
                        className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                    >
                        Opret kunde
                    </button>

                    <input
                        type="text"
                        placeholder="Søg efter virksomhed..."
                        className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="max-h-[550px] overflow-auto rounded-lg border border-gray-200 shadow-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left bg-gray-300 font-bold">
                        <tr>
                            <th
                                className="px-4 py-2 text-gray-900 cursor-pointer select-none"
                                onClick={() => handleSort("companyName")}
                            >
                                Virksomhed {sortField === "companyName" && (sortDirection === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th
                                className="px-4 py-2 text-gray-900 cursor-pointer select-none"
                                onClick={() => handleSort("city")}
                            >
                                By {sortField === "city" && (sortDirection === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th
                                className="px-4 py-2 text-gray-900 cursor-pointer select-none"
                                onClick={() => handleSort("status")}
                            >
                                Status {sortField === "status" && (sortDirection === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th
                                className="px-4 py-2 text-gray-900 cursor-pointer select-none"
                                onClick={() => handleSort("activityStatus")}
                            >
                                Aktivitetsstatus {sortField === "activityStatus" && (sortDirection === "asc" ? "🔼" : "🔽")}
                            </th>
                            <th
                                className="px-4 py-2 text-gray-900 cursor-pointer select-none"
                                onClick={() => handleSort("responsible")}
                            >
                                Konsulent {sortField === "responsible" && (sortDirection === "asc" ? "🔼" : "🔽")}
                            </th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {sortedClients.length > 0 ? (
                            sortedClients.map((client) => (
                                <tr
                                    onClick={() => navigate(`/kunder/${client.id}/klippekort`)}
                                    key={client.id}
                                    className="hover:bg-teal-600 transition-colors duration-500 cursor-pointer"
                                >
                                    <td className="cursor-pointer whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                        {client.companyName}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {client.zipCode !== 0 ? client.zipCode : ""} {client.city}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {client.status}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {client.activityStatus}
                                    </td>
                                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                        {client.responsible}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                    Ingen resultater fundet
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default ClientsTab;
