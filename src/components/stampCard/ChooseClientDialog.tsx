import {ClientInterface} from "../../utils/interfaces.ts";
import {useState} from "react";

export const ChooseClientDialog = ({onClose, onSubmit, clients}: {
    onClose: () => void;
    onSubmit: (selectedClientId: string) => void;
    clients: ClientInterface[];
}) => {

    const [selectedClientId, setSelectedClientId] = useState<string>("");

    const sortedClients = [...clients].sort((a, b) => a.companyName.localeCompare(b.companyName));

    const handleCancel = () => {
        setSelectedClientId("");
        onClose();
    }


    return (
        <>
            <div className="rounded-lg shadow-2xl bg-white p-8 w-1/4 h-1/4">
                <p className="font-bold text-black text-4xl text-center">Vælg kunde</p>
                <select
                    className="mt-4 w-full p-2 border rounded"
                    value={selectedClientId}
                    onChange={(e) => setSelectedClientId(e.target.value)}
                >
                    <option disabled value="">Vælg en kunde</option>
                    {window.location.pathname.includes("kontaktpersoner") && (
                    <option value="Privat">Ingen virksomhed (privat)</option>
                    )}
                {sortedClients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.companyName}
                    </option>
                ))}
            </select>
            <div className="mt-4 flex gap-2 justify-center">
                <button onClick={handleCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl">Annuller
                </button>
                <button onClick={() => selectedClientId && onSubmit(selectedClientId)}
                        className={`bg-teal-600 hover:bg-teal-700  text-white px-4 py-2 rounded text-xl`}
                >
                    Fortsæt
                </button>
            </div>
        </div>
        </>
    );
};

export default ChooseClientDialog;