import {useNavigate} from "react-router-dom";
import {useState} from "react";
import useClients from "../../hooks/useClients.ts";
import useStampCards from "../../hooks/useStampCards.ts";
import LoadingBar from "../misc/LoadingBar.tsx";
import {Helmet} from "react-helmet-async";
import {format} from "date-fns";
import {da} from "date-fns/locale";
import ChooseClientDialog from "../stampCard/ChooseClientDialog.tsx";


export const StampCardsTab = () => {
    const navigate = useNavigate();
    const { stampCards, loading: stampCardsLoading, error: stampCardsError } = useStampCards();
    const { clients, loading: clientsLoading, error: clientsError } = useClients();

    const isLoading = stampCardsLoading || clientsLoading;
    const error = stampCardsError || clientsError;

    const [isClientDialogVisible, setIsClientDialogVisible] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [sortField, setSortField] = useState<keyof typeof stampCards[0] | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const filteredStampCards = stampCards.filter(stampCard =>
        stampCard.name.toLowerCase().includes(searchQuery.toLowerCase()) || stampCard.clientId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSort = (field: keyof typeof stampCards[0]) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    const sortedStampCards = [...filteredStampCards].sort((a, b) => {
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
                <title>CoachHub - Klippekort</title>
            </Helmet>

            <div
                className={`${!isClientDialogVisible ? "hidden" : ""} min-h-screen -mt-2 fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <ChooseClientDialog clients={clients} onClose={() => setIsClientDialogVisible(false)} onSubmit={(selectedClientId) => {
                    setIsClientDialogVisible(false);
                    navigate(`/${selectedClientId}/opretklippekort`);
                }}/>
            </div>


                <div className="w-full mx-16">

                        <div className="flex items-center gap-10 mb-10">
                            <button
                                onClick={() => setIsClientDialogVisible(true)}
                                className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300"
                            >
                                Opret klippekort
                            </button>

                            <input
                                type="text"
                                placeholder="Søg efter klippekort..."
                                className="w-96 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-600"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                    <div className="max-h-[550px] overflow-auto rounded-lg border border-gray-200 shadow-lg">
                        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                                <thead className="text-left bg-gray-300 font-bold">
                                <tr>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none w-[20%]" onClick={() => handleSort("name")}>
                                        Klippekortsnavn {sortField === "name" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none w-[15%]" onClick={() => handleSort("clientId")}>
                                        Virksomhed {sortField === "clientId" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none w-[35%]" onClick={() => handleSort("currentStampCount")}>
                                        Antal klip {sortField === "currentStampCount" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none w-[15%]" onClick={() => handleSort("price")}>
                                        Pris {sortField === "price" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>
                                    <th className="px-4 py-2 text-gray-900 cursor-pointer select-none w-[15%]" onClick={() => handleSort("created")}>
                                        Oprettet {sortField === "created" && (sortDirection === "asc" ? "🔼" : "🔽")}
                                    </th>

                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                {sortedStampCards.length > 0 ? (
                                    sortedStampCards.map((stampCard) => (
                                        <tr key={stampCard.id} onClick={() => navigate(`/klippekort/${stampCard.id}`)} className="cursor-pointer hover:bg-teal-600 transition-colors duration-500">
                                            <td
                                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                            >
                                                {stampCard.name}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                                {getCompanyName(stampCard.clientId)}
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-2">
                                                <div
                                                    className="bg-gray-300 rounded h-7 w-full p-1"
                                                    style={{
                                                        background: `linear-gradient(to right, #10B981 ${stampCard.currentStampCount / stampCard.initialStampCount * 100}%, #D1D5DB 0%)`,
                                                    }}
                                                >
                                                    <p className="h-6 text-center font-bold">{stampCard.currentStampCount}/{stampCard.initialStampCount} klip benyttet</p>
                                                </div>
                                            </td>
                                            <td className="%Swhitespace-nowrap px-4 py-2 text-gray-700">{stampCard.price} kr.</td>
                                            <td
                                                className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"
                                            >
                                                {format(stampCard.created, "dd. MMMM yyyy", { locale: da })}
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

export default StampCardsTab;