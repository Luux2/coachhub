import useSingleClient from "../../hooks/useSingleClient.ts";
import {useParams} from "react-router-dom";
import LoadingBar from "../misc/LoadingBar.tsx";
import {format} from "date-fns";
import {da} from "date-fns/locale";
import {PencilSquareIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {NoteInterface} from "../../utils/interfaces.ts";
import {useState} from "react";
import EditNoteDialog from "../note/EditNoteDialog.tsx";
import ClientService from "../../services/ClientService.tsx";
import DeleteWarning from "../stampCard/DeleteWarning.tsx";


export const ClientProfileNotesTab = () => {
    const { clientId } = useParams();
    const { setClient, client, loading: clientLoading, error: clientError } = useSingleClient(clientId);

    const [editNoteDialogVisible, setEditNoteDialogVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState<NoteInterface | null>(null);
    const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);

    const fetchClient = async () => {
        const updatedClient = await ClientService.getClientById(clientId!);
        setClient(updatedClient);
    }

    const handleDelete = async () => {
        await ClientService.deleteNote(clientId!, selectedNote!.id!);
        setDeleteWarningVisible(false);
        fetchClient().then();
    }


    if (clientLoading) {
        return <LoadingBar />;
    }

    if (clientError) {
        return <p className="text-red-500 text-center">{clientError}</p>;
    }

    return (
        <>

            <div className={`${!deleteWarningVisible ? "hidden" : ""} min-h-screen fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <DeleteWarning onClose={() => setDeleteWarningVisible(false)} onDelete={handleDelete} type={"note"}/>
            </div>


        <div
            className={`${!editNoteDialogVisible ? "hidden" : ""} fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
            <EditNoteDialog note={selectedNote!}
                                 onClose={() => {
                                     setEditNoteDialogVisible(false);
                                     fetchClient().then();
                                 }} clientId={clientId!} noteId={selectedNote?.id || ''}/>
        </div>

        <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 shadow-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
                <thead className="text-left">
                <tr>
                    <th className="px-4 py-2 font-bold text-gray-900">Note</th>
                    <th className="px-4 py-2 font-bold text-gray-900">Dato</th>
                    <th className="px-4 py-2 font-bold text-gray-900">Handlinger</th>

                </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                {Object.entries(client?.notes ?? {}).map(([key, note]) => (
                    <tr key={key} className="hover:bg-teal-600 transition duration-300">
                        <td className="break-words px-4 py-2 font-medium text-gray-900">
                            <h1 className="w-[calc(100vh-300px)]">{note.body}</h1>
                        </td>

                        <td className="w-[30%] px-4 py-2 font-medium text-gray-900">
                            {format(note.dateTime, "dd. MMMM yyyy", {locale: da})}
                        </td>

                        <td className="flex gap-3 px-4 py-2 text-gray-700">
                            <button onClick={() => {
                                setSelectedNote({...note, id: key });
                                setEditNoteDialogVisible(true);
                            }} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors duration-300 flex gap-2">
                                <PencilSquareIcon className="h-5" />
                                <p>Rediger</p>
                            </button>

                            <button
                                onClick={() => {
                                    setSelectedNote({...note, id: key});
                                    setDeleteWarningVisible(true);
                                }}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-300 flex gap-2">
                                <XMarkIcon className="h-5" />
                                <p>Slet</p>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
        </>
    );
};

export default ClientProfileNotesTab;
