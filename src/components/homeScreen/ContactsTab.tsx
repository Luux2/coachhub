import {useNavigate} from "react-router-dom";
import useContacts from "../../hooks/useContacts.ts";
import useClients from "../../hooks/useClients.ts";
import {useState} from "react";
import LoadingBar from "../misc/LoadingBar.tsx";
import {Helmet} from "react-helmet-async";
import ChooseClientDialog from "../stampCard/ChooseClientDialog.tsx";

export const ContactsTab = () => {
    const navigate = useNavigate();
    const { contacts, loading: contactsLoading, error: contactsError } = useContacts();
    const { clients, loading: clientsLoading, error: clientsError } = useClients();

    const isLoading = contactsLoading || clientsLoading;
    const error = contactsError || clientsError;

    const [isClientDialogVisible, setIsClientDialogVisible] = useState(false);


    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<keyof typeof contacts[0] | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || contact.clientId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSort = (field: keyof typeof contacts[0]) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedContacts = [...filteredContacts].sort((a, b) => {
        if (!sortField) return 0;
        const valueA = a[sortField] as string;
        const valueB = b[sortField] as string;

        return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
    });

    const getCompanyName = (clientId: string) => {
        const client = clients.find((client) => client.id === clientId);
        return client ? client.companyName : "Ingen virksomhed";
    }

    if (isLoading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <>
            <Helmet>
                <title>CoachHub - Kontaktpersoner</title>
            </Helmet>

            <div
                className={`${!isClientDialogVisible ? "hidden" : ""} min-h-screen -mt-2 fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <ChooseClientDialog clients={clients} onClose={() => setIsClientDialogVisible(false)} onSubmit={(selectedClientId) => {
                    setIsClientDialogVisible(false);
                    navigate(`/${selectedClientId}/opretkontaktperson`);
                }}/>
            </div>

                <div className="w-full mx-16">

                        <div className="flex items-center gap-10 mb-10">
                            <button
                                onClick={() => setIsClientDialogVisible(true)}
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                            >
                                Opret kontaktperson
                            </button>

                            <input
                                type="text"
                                placeholder="Søg efter kontaktperson..."
                                className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                    <div className="max-h-[550px] overflow-auto rounded-lg border border-gray-200 shadow-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left bg-gray-300 font-bold">
                                <tr>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none" onClick={() => handleSort("name")}>
                                        Navn {sortField === "name" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none" onClick={() => handleSort("mail")}>
                                        Mail {sortField === "mail" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none" onClick={() => handleSort("phone")}>
                                        Telefonnummer {sortField === "phone" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none" onClick={() => handleSort("clientId")}>
                                        Virksomhed {sortField === "clientId" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none" onClick={() => handleSort("title")}>
                                        Titel {sortField === "title" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>

                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                {sortedContacts.length > 0 ? (
                                    sortedContacts.map((contact) => (
                                        <tr key={contact.id} className="hover:bg-teal-600 transition-colors duration-500">
                                            <td
                                                className="cursor-pointer whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                            >
                                                {contact.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {contact.mail}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{contact.phone}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{getCompanyName(contact.clientId)}</td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {contact.title}
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

export default ContactsTab;