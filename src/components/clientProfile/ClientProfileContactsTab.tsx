import {useNavigate, useParams} from "react-router-dom";
import useSingleClient from "../../hooks/useSingleClient.ts";
import {useEffect, useState} from "react";
import {ContactInterface} from "../../utils/interfaces.ts";
import ClientService from "../../services/ClientService.tsx";
import StampCardService from "../../services/StampCardService.tsx";
import LoadingBar from "../misc/LoadingBar.tsx";
import DeleteWarning from "../stampCard/DeleteWarning.tsx";
import {XMarkIcon} from "@heroicons/react/24/outline";
import useContactsByClient from "../../hooks/useContactsByClient.ts";

export const ClientProfileContactsTab = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const {contacts, loading: contactsLoading, error: contactsError} = useContactsByClient(clientId);
    const {setClient, loading: clientLoading, error: clientError} = useSingleClient(clientId);

    const isLoading = clientLoading || contactsLoading;
    const error = clientError || contactsError;

    const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactInterface | null>(null);



    useEffect(() => {
        if (deleteWarningVisible) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }

        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, [deleteWarningVisible]);


    const fetchClient = async () => {
        const updatedClient = await ClientService.getClientById(clientId!);
        setClient(updatedClient);
    };

    const handleDelete = async () => {
        await StampCardService.deleteStampCard(selectedContact!.id!);
        setDeleteWarningVisible(false);
        fetchClient().then();
    }

    if (isLoading) {
        return <LoadingBar />;
    }

    if (error) {
        return <p className="text-red-500 text-center">{error}</p>;
    }


    return (
        <div>
            <div className={`${!deleteWarningVisible ? "hidden" : ""} fixed inset-0 z-10 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <DeleteWarning onClose={() => setDeleteWarningVisible(false)} onDelete={handleDelete} type={"kontakt"}/>
            </div>

            {contacts && (
                <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 shadow-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
                        <thead className="text-left">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Navn</th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Titel</th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Mail</th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Telefonnummer</th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-center">Handlinger</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {Object.entries(contacts).map(([key, contact]) => (
                            <tr
                                onClick={() => navigate(`/kontaktpersoner/${contact.id}`)}
                                key={key} className="hover:bg-teal-600 transition duration-300 cursor-pointer">
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.name}
                                </td>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.title}
                                </td>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    <a
                                        className="text-teal-700 hover:underline"
                                        href={`mailto:${contact.mail}`}
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        {contact.mail}
                                    </a>
                                </td>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.phone}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedContact(contact);
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
            )}
        </div>
    );
};

export default ClientProfileContactsTab;