import {useParams} from "react-router-dom";
import useSingleClient from "../../hooks/useSingleClient.ts";
import {useEffect, useRef, useState} from "react";
import {ContactInterface} from "../../utils/interfaces.ts";
import ClientService from "../../services/ClientService.tsx";
import StampCardService from "../../services/StampCardService.tsx";
import LoadingBar from "../misc/LoadingBar.tsx";
import DeleteWarning from "../stampCard/DeleteWarning.tsx";
import {BarsArrowDownIcon} from "@heroicons/react/24/outline";
import useContacts from "../../hooks/useContacts.ts";
import EditContactDialog from "../contacts/EditContactDialog.tsx";

export const ClientProfileContactsTab = () => {
    const { clientId } = useParams();
    const {contacts, loading: contactsLoading, error: contactsError} = useContacts();
    const {setClient, loading: clientLoading, error: clientError} = useSingleClient(clientId);

    const isLoading = clientLoading || contactsLoading;
    const error = clientError || contactsError;

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);
    const [editContactDialogVisible, setEditContactDialogVisible] = useState(false);
    const [selectedContact, setSelectedContact] = useState<ContactInterface | null>(null);

    const dropdownRef = useRef<HTMLTableDataCellElement | null>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const fetchClient = async () => {
        const updatedClient = await ClientService.getClientById(clientId!);
        setClient(updatedClient);
    };

    const handleDelete = async () => {
        await StampCardService.deleteStampCard(selectedContact!.id!, clientId!);
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
            <div
                className={`${!deleteWarningVisible ? "hidden" : ""} min-h-screen -mt-20 fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <DeleteWarning onClose={() => setDeleteWarningVisible(false)} onDelete={handleDelete} type={"kontakt"}/>
            </div>


            <div
                className={`${!editContactDialogVisible ? "hidden" : ""} min-h-screen -mt-20 fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <EditContactDialog contact={selectedContact!}
                                     onClose={() => {
                                         setEditContactDialogVisible(false);
                                         fetchClient().then();
                                     }} clientId={clientId!} contactId={selectedContact?.id || ""}/>
            </div>

            {contacts && (
                <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Navn</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Titel</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Mail</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Telefonnummer</th>
                            <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">Handlinger</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {Object.entries(contacts).map(([key, contact]) => (
                            <tr key={key}>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.name}
                                </td>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.title}
                                </td>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.mail}
                                </td>
                                <td className="w-[23%] whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {contact.phone}
                                </td>
                                <td className="w-[8%] whitespace-nowrap px-4 py-2 text-gray-700"
                                    ref={dropdownRef}>
                                    <BarsArrowDownIcon
                                        onClick={() => setDropdownVisible(prev => !prev)}
                                        className={`${dropdownVisible ? "text-blue-500" : "text-gray-500"} select-none cursor-pointer w-8  mx-auto`}/>
                                    <div
                                        className={`${!dropdownVisible ? 'hidden' : ''} z-10 absolute border border-black bg-white rounded-xl p-1 w-44`}>
                                        <ul className="text-gray-500">
                                            <li onClick={() => {
                                                setEditContactDialogVisible(true);
                                                setSelectedContact(contact);
                                                setDropdownVisible(false);
                                            }}
                                                className="hover:text-black p-2 cursor-pointer font-semibold">Rediger
                                                kontaktperson
                                            </li>
                                            <li onClick={() => {
                                                setDeleteWarningVisible(true);
                                                setSelectedContact(contact);
                                                setDropdownVisible(false);
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
    );
};

export default ClientProfileContactsTab;