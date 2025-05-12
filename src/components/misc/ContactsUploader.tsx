import React, { FC, useEffect, useState } from "react";
import { read, utils } from "xlsx";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ContactInterface } from "../../utils/interfaces.ts";
import ClientService from "../../services/ClientService.tsx";

export interface ContactRow {
    companyName: string;
    name: string;
    title: string;
    mail: string;
    phone: string;
}

const ContactsUploader: FC<{ onContactsAdded: (contacts: ContactInterface[]) => void }> = ({ onContactsAdded }) => {
    const [fileName, setFileName] = useState<string>("");
    const [parsedContacts, setParsedContacts] = useState<ContactInterface[]>([]);
    const [clientsMap, setClientsMap] = useState<Record<string, string>>({});
    const [unmatchedRows, setUnmatchedRows] = useState<ContactRow[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    useEffect(() => {
        // Fetch clients to build name-to-ID map
        const fetchClients = async () => {
            try {
                const clients = await ClientService.getClients();
                const clientMap = clients.reduce((acc: Record<string, string>, client) => {
                    if (client.id != null) {
                        acc[client.companyName.toLowerCase()] = client.id;
                    }
                    return acc;
                }, {});
                setClientsMap(clientMap);
            } catch (error) {
                console.error("Failed to fetch clients:", error);
            }
        };
        fetchClients().then();
    }, []);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target?.result;
            if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) return;
            const data = new Uint8Array(arrayBuffer);
            const workbook = read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData: any[][] = utils.sheet_to_json(sheet, { header: 1, raw: false });

            if (jsonData.length > 1) {
                const contacts: ContactInterface[] = [];
                const unmatched: ContactRow[] = [];

                jsonData.slice(1).forEach((row) => {
                    const companyName = row[0] ? String(row[0]).trim().toLowerCase() : "";
                    let clientId = clientsMap[companyName] || "";
                    if (!clientId && companyName !== "") {
                        for (const [clientName, id] of Object.entries(clientsMap)) {
                            if (clientName.includes(companyName)) {
                                clientId = id;
                                break;
                            }
                        }
                    }
                    const contact: ContactInterface = {
                        clientId,
                        name: row[1] ? String(row[1]).trim() : "",
                        title: row[2] ? String(row[2]).trim() : "",
                        mail: row[3] ? String(row[3]).trim() : "",
                        phone: row[4] ? String(row[4]).trim() : ""
                    };

                    if (clientId) {
                        contacts.push(contact);
                    } else {
                        unmatched.push({
                            companyName,
                            name: contact.name,
                            title: contact.title,
                            mail: contact.mail,
                            phone: contact.phone
                        });
                    }
                });

                setParsedContacts(contacts);
                setUnmatchedRows(unmatched);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleConfirmUpload = () => {
        onContactsAdded(parsedContacts);
        setShowPreview(false);
    };

    return (
        <div className="mt-5 flex items-center border border-black rounded-xl p-2">
            <input
                id="file-upload-contact"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
            />
            <label
                htmlFor="file-upload-contact"
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
                {fileName ? `Valgt fil: ${fileName}` : "Vælg en Excel-fil"}
            </label>

            <h1 className="font-semibold ml-5">Importer kontaktpersoner</h1>

            {parsedContacts.length > 0 && (
                <button
                    onClick={() => setShowPreview(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded ml-10"
                >
                    Åbn fil
                </button>
            )}

            {showPreview && (
                <div className="h-screen -mt-2 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 h-5/6 overflow-auto">
                        <h2 className="text-xl font-semibold mb-4">Bekræft kontaktpersoner</h2>
                        <ul className="border p-2 rounded">
                            {parsedContacts.map((contact, index) => (
                                <li key={index} className="border-b py-2 flex items-center">
                                    <div className="w-full grid grid-cols-5 gap-4">
                                        <span>{contact.clientId}</span>
                                        <span>{contact.name}</span>
                                        <span>{contact.title}</span>
                                        <span>{contact.mail}</span>
                                        <span>{contact.phone}</span>
                                    </div>
                                    <XMarkIcon
                                        onClick={() => setParsedContacts(prev => prev.filter((_, i) => i !== index))}
                                        className="h-6 w-6 text-red-500 cursor-pointer ml-4"
                                    />
                                </li>
                            ))}
                        </ul>
                        {unmatchedRows.length > 0 && (
                            <div className="mt-4 bg-red-100 p-4 rounded">
                                <h3 className="text-lg font-semibold mb-2">Virksomheder uden match:</h3>
                                <ul>
                                    {unmatchedRows.map((row, index) => (
                                        <li key={index} className="text-red-600 mb-1">
                                            {row.companyName} (Person: {row.name})
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => setShowPreview(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded"
                            >
                                Luk
                            </button>
                            <button
                                onClick={handleConfirmUpload}
                                className="bg-green-500 text-white px-4 py-2 rounded"
                            >
                                Bekræft
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactsUploader;
