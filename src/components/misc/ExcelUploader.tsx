import React, { FC, useState } from "react";
import { read, utils } from "xlsx";
import { XMarkIcon } from "@heroicons/react/24/outline";

export interface ClientRow {
    col1: string;
    col2: string;
    col3: string;
    col4: string;
}

const ExcelUploader: FC<{ onClientsAdded: (clients: ClientRow[]) => void }> = ({ onClientsAdded }) => {
    const [fileName, setFileName] = useState<string>("");
    const [parsedClients, setParsedClients] = useState<ClientRow[]>([]);
    const [showPreview, setShowPreview] = useState(false);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();

        reader.onload = (e) => {
            const arrayBuffer = e.target?.result;
            if (!arrayBuffer || !(arrayBuffer instanceof ArrayBuffer)) return;
            const data = new Uint8Array(arrayBuffer);
            // Læs Excel-filen (xlsx eller xls) som array
            const workbook = read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            // Brug raw: false, så biblioteket formaterer cellerne
            const jsonData: any[][] = utils.sheet_to_json(sheet, { header: 1, raw: false }) as any[][];

            if (jsonData.length > 1) {
                // Spring header (første række) over, og læs de fire første kolonner
                const clients: ClientRow[] = jsonData.slice(1)
                    .map((row) => ({
                        col1: row[0] ? String(row[0]) : "",
                        col2: row[1] ? String(row[1]) : "",
                        col3: row[2] ? String(row[2]) : "",
                        col4: row[3] ? String(row[3]) : ""
                    }))
                    .filter(row =>
                        row.col1.trim() !== "" ||
                        row.col2.trim() !== "" ||
                        row.col3.trim() !== "" ||
                        row.col4.trim() !== ""
                    );
                setParsedClients(clients);
            }
        };

        reader.readAsArrayBuffer(file);
    };

    const handleConfirmUpload = () => {
        onClientsAdded(parsedClients);
        setShowPreview(false);
    };

    return (
        <div className="mt-5 flex items-center border border-black rounded-xl p-2">
            <input
                id="file-upload"
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
            />
            <label
                htmlFor="file-upload"
                className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded inline-block"
            >
                {fileName ? `Valgt fil: ${fileName}` : "Vælg en Excel-fil"}
            </label>

            <h1 className="font-semibold ml-5">Importer kundedatabaser</h1>

            {parsedClients.length > 0 && (
                <button
                    onClick={() => setShowPreview(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded ml-10"
                >
                    Åbn fil
                </button>
            )}

            {showPreview && (
                <div className="h-screen -mt-2 fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 h-5/6 overflow-auto">
                        <h2 className="text-xl font-semibold mb-4">Bekræft rækker</h2>
                        <ul className="border p-2 rounded">
                            {parsedClients.map((client, index) => (
                                <li key={index} className="border-b py-2 flex items-center">
                                    <div className="w-full grid grid-cols-4 gap-4">
                                        <span>{client.col1}</span>
                                        <span>{client.col2}</span>
                                        <span>{client.col3}</span>
                                        <span>{client.col4}</span>
                                    </div>
                                    <XMarkIcon
                                        onClick={() => setParsedClients(prev => prev.filter((_, i) => i !== index))}
                                        className="h-6 w-6 text-red-500 cursor-pointer ml-4"
                                    />
                                </li>
                            ))}
                        </ul>
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

export default ExcelUploader;
