import {ClientInterface} from "../../utils/interfaces.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ClientService from "../../services/ClientService.tsx";

export const EditClientDialog = ({onClose, client, clientId}: {
    onClose: () => void;
    client?: ClientInterface;
    clientId: string;
}) => {


    const [clientData, setClientData] = useState<ClientInterface>({
        companyName: "",
        address: "",
        city: "",
        zipCode: "",
        cvr: "",
        status: "",
        responsible: "",
        activityStatus: "",
        phone: "",
        stampCardIds: [],
        contactIds: [],
        notes: [],
    });

    useEffect(() => {
        if (client) {
            setClientData({
                ...client,
                stampCardIds: client.stampCardIds ?? [],
                contactIds: client.contactIds ?? [],
                notes: client.notes ?? [],
                phone: client.phone === 0 ? "" : client.phone,
                zipCode: client.zipCode === 0 ? "" : client.zipCode,
                cvr: client.cvr === 0 ? "" : client.cvr,
            });

        }
    }, [client]);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type, checked } = e.target as HTMLInputElement;

        setClientData(prevClient => ({
            ...prevClient,
            [id]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
        }));
    };

    const handleUpdateClient = async (e: FormEvent) => {
        e.preventDefault();

        if (!client) {
            return (
                alert("Kontakten kunne ikke findes. Prøv at genindlæse siden.")
            );
        }

        const updatedClient: ClientInterface = {
            ...clientData,
        };
        await ClientService.updateClient(updatedClient, clientId);
        onClose();
    }

    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4 w-2/3">
            <p className="font-bold text-black text-4xl">
                Rediger kontaktperson
            </p>
            <div className="flex justify-center items-center rounded-lg bg-white shadow-lg p-12">
                <form className="space-y-4 w-full h-full" onSubmit={handleUpdateClient}>

                    <div className="grid grid-cols-3 gap-4">
                        <label className="sr-only" htmlFor="companyName">Virksomhedsnavn</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Virksomhedsnavn"
                            type="text"
                            id="companyName"
                            value={clientData.companyName ?? ""}
                            onChange={handleChange}
                            required
                        />

                        <label className="sr-only" htmlFor="cvr">CVR-nummer</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="CVR-nummer"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={8}
                            value={clientData.cvr}
                            id="cvr"
                            onChange={handleChange}
                        />

                        <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="activityStatus"
                                onChange={handleChange} defaultValue={clientData.activityStatus}
                        >
                            <option value="Aktiv">Aktiv</option>
                            <option value="Tilbudsfase">Tilbudsfase</option>
                            <option value="Passiv">Passiv</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <label className="sr-only" htmlFor="Adresse">Adresse</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Adresse"
                            type="text"
                            value={clientData.address ?? ""}
                            id="address"
                            onChange={handleChange}
                        />

                        <label className="sr-only" htmlFor="By">By</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="By"
                            type="text"
                            value={clientData.city ?? ""}
                            id="city"
                            onChange={handleChange}
                        />

                        <label className="sr-only" htmlFor="postnummer">Postnummer</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Postnummer"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            maxLength={4}
                            value={clientData.zipCode ?? ""}
                            id="zipCode"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <label className="sr-only" htmlFor="status">Status</label>
                        <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="status"
                                onChange={handleChange} defaultValue={clientData.status}
                        >
                            <option value="Emne">Emne</option>
                            <option value="Kunde">Kunde</option>
                            <option value="Tidligere kunde">Tidligere kunde</option>
                            <option value="Samarbejdspartner">Samarbejdspartner</option>
                            <option value="Leverandør">Leverandør</option>
                            <option value="Kampagne">Kampagne</option>
                            <option value="Cold Lead">Cold Lead</option>
                        </select>

                        <div className="relative">
                            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">+45</span>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 pl-12 text-sm"
                                placeholder="Telefonnummer"
                                type="tel"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={8}
                                value={clientData.phone ?? ""}
                                id="phone"
                                onChange={handleChange}
                            />
                        </div>

                    </div>


                    <div className="flex gap-6 pt-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl"
                        >
                            Fortryd
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-xl"
                        >
                            Gem ændringer
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditClientDialog;