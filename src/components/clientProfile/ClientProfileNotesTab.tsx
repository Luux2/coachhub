import useSingleClient from "../../hooks/useSingleClient.ts";
import {useParams} from "react-router-dom";
import LoadingBar from "../misc/LoadingBar.tsx";
import {format} from "date-fns";
import {da} from "date-fns/locale";

export const ClientProfileNotesTab = () => {
    const { clientId } = useParams();
    const { client, loading: clientLoading, error: clientError } = useSingleClient(clientId);


    if (clientLoading) {
        return <LoadingBar />;
    }

    if (clientError) {
        return <p className="text-red-500 text-center">{clientError}</p>;
    }

    return (
        <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 shadow-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
                <thead className="text-left">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Note</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Dato</th>
                    <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Handlinger</th>

                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {client?.notes?.map((note, index) => (
                    <tr key={index} className="hover:bg-teal-600 transition duration-300">
                        <td className="w-[70%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {note.note}
                        </td>
                        <td className="w-[30%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {format(note.dateTime, "dd. MMMM yyyy", { locale: da })}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ClientProfileNotesTab;
