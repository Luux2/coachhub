import {BarsArrowDownIcon} from "@heroicons/react/24/outline";
import useSingleClient from "../../hooks/useSingleClient.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {StampCardInterface} from "../../utils/interfaces.ts";
import StampCardService from "../../services/StampCardService.tsx";
import LoadingBar from "../misc/LoadingBar.tsx";
import ClientService from "../../services/ClientService.tsx";
import DeleteWarning from "../stampCard/DeleteWarning.tsx";
import RegisterStampsDialog from "../stampCard/RegisterStampsDialog.tsx";
import EditStampCardDialog from "../stampCard/EditStampCardDialog.tsx";
import useStampCardsByClient from "../../hooks/useStampCardsByClient.ts";

export const ClientProfileStampTab = () => {
    const navigate = useNavigate();
    const { clientId } = useParams();
    const {stampCards, loading: stampCardsLoading, error: stampCardsError} = useStampCardsByClient(clientId);
    const {setClient, loading: clientLoading, error: clientError} = useSingleClient(clientId);

    const isLoading = clientLoading || stampCardsLoading;
    const error = clientError || stampCardsError;

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [deleteWarningVisible, setDeleteWarningVisible] = useState(false);
    const [registerStampsDialogVisible, setRegisterStampsDialogVisible] = useState(false);
    const [editStampCardDialogVisible, setEditStampCardDialogVisible] = useState(false);
    const [selectedStampCard, setSelectedStampCard] = useState<StampCardInterface | null>(null);

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
        if (!selectedStampCard) return;

        await StampCardService.deleteStampCard(selectedStampCard.id!);
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
        <div className="overflow-y-visible">
            <div
                className={`${!registerStampsDialogVisible ? "hidden" : ""} min-h-screen fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <RegisterStampsDialog stampCard={selectedStampCard!}
                                      onClose={() => {
                                          setRegisterStampsDialogVisible(false);
                                      }} stampCardId={selectedStampCard?.id || ""}
                                      onRegister={() => {
                                          fetchClient().then();
                                          setRegisterStampsDialogVisible(false);
                                      }}
                />
            </div>

            <div
                className={`${!editStampCardDialogVisible ? "hidden" : ""} min-h-screen fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <EditStampCardDialog stampCard={selectedStampCard!}
                                     onClose={() => {
                                         setEditStampCardDialogVisible(false);
                                         fetchClient().then();
                                     }} clientId={clientId!} stampCardId={selectedStampCard?.id || ""}/>
            </div>

            <div
                className={`${!deleteWarningVisible ? "hidden" : ""} min-h-screen fixed inset-0 z-50 bg-gray-500 bg-opacity-90 flex items-center justify-center`}>
                <DeleteWarning onClose={() => setDeleteWarningVisible(false)} onDelete={handleDelete} type="klippekort"/>
            </div>

            {stampCards && (
                <div className="overflow-x-auto overflow-y-hidden rounded-lg border border-gray-200 shadow-lg">
                    <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-md">
                        <thead className="text-left">
                        <tr>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Klippekortsnavn</th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900">Forbrug</th>
                            <th className="whitespace-nowrap px-4 py-2 font-bold text-gray-900 text-center">Handlinger</th>
                        </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                        {Object.entries(stampCards).map(([key, stampCard]) => (
                            <tr key={key} className="hover:bg-teal-600 transition-colors duration-500 cursor-pointer">
                                <td onClick={() => navigate(`/klippekort/${stampCard.id}`)} className="w-1/3 whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                                    {stampCard.name}
                                </td>
                                <td className="w-1/2 whitespace-nowrap px-4 py-2 text-gray-700">
                                    <div onClick={() => navigate(`/klippekort/${stampCard.id}`)} className="bg-gray-300 rounded min-w-full h-6"
                                         style={{
                                             background: `linear-gradient(to right, #10B981 ${stampCard.currentStampCount / stampCard.initialStampCount * 100}%, #D1D5DB 0%)`,
                                         }}
                                    >
                                        <p className="text-center font-bold">{stampCard.currentStampCount}/{stampCard.initialStampCount} klip
                                            benyttet</p>
                                    </div>
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700"
                                    ref={dropdownRef}>
                                    <BarsArrowDownIcon
                                        onClick={() => setDropdownVisible(prev => !prev)}
                                        className={`${dropdownVisible ? "text-blue-500" : "text-gray-500"} select-none cursor-pointer w-8  mx-auto`}/>
                                    <div
                                        className={`${!dropdownVisible ? 'hidden' : ''} z-10 absolute border border-black bg-white rounded-xl p-1 w-40`}>
                                        <ul className="text-gray-500">
                                            <li onClick={() => {
                                                setRegisterStampsDialogVisible(true);
                                                setSelectedStampCard(stampCard);
                                                setDropdownVisible(false);
                                            }}
                                                className="hover:text-black p-2 cursor-pointer font-semibold">Registrer
                                                klip
                                            </li>
                                            <li onClick={() => {
                                                setEditStampCardDialogVisible(true);
                                                setSelectedStampCard(stampCard);
                                                setDropdownVisible(false);
                                            }}
                                                className="hover:text-black p-2 cursor-pointer font-semibold">Rediger
                                                klippekort
                                            </li>
                                            <li onClick={() => {
                                                setDeleteWarningVisible(true);
                                                setSelectedStampCard(stampCard);
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

export default ClientProfileStampTab;