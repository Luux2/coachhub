import {ClientInterface} from "../../utils/interfaces.ts";
import {useState} from "react";

export const ChooseClientDialog = ({onClose, onSubmit, clients}: {
    onClose: () => void;
    onSubmit: (selectedClientId: string) => void;
    clients: ClientInterface[];
}) => {

    const [selectedClientId, setSelectedClientId] = useState<string>("");

    const handleCancel = () => {
        setSelectedClientId("");
        onClose();
    }


    return (
        <div className="rounded-lg shadow-2xl bg-white p-8 w-1/4 h-1/4">
            <p className="font-bold text-black text-4xl text-center">Vælg kunde</p>
            <select
                className="mt-4 w-full p-2 border rounded"
                value={selectedClientId}
                onChange={(e) => setSelectedClientId(e.target.value)}
            >
                <option disabled value="">Vælg en kunde</option>
                {clients.map((client) => (
                    <option key={client.id} value={client.id}>
                        {client.companyName}
                    </option>
                ))}
            </select>
            <div className="mt-4 flex gap-2 justify-center">
                <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl">Annuller</button>
                <button onClick={() => selectedClientId && onSubmit(selectedClientId)}
                        className={`${!selectedClientId || selectedClientId === "" ? "bg-gray-600 hover:bg-gray-700" : "bg-teal-600 hover:bg-teal-700"}  text-white px-4 py-2 rounded text-xl`}
                        disabled={!selectedClientId || selectedClientId === ""}
                >
                    Fortsæt
                </button>
            </div>
        </div>
    );
};

export default ChooseClientDialog;