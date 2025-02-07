import {useNavigate} from "react-router-dom";
import {addHours} from "date-fns";
import {ChangeEvent, FormEvent, useState} from "react";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import Animation from "../../../components/misc/Animation.tsx";
import ClientService from "../../../services/ClientService.tsx";
import {ClientInterface} from "../../../utils/interfaces.ts";
import {useUserData} from "../../../context/AuthContext.tsx";

export const CreateClientScreen = () => {
    const {user} = useUserData();
    const navigate = useNavigate();
    const now = addHours(new Date(), 1).toISOString().split("Z")[0];
    const [contactCount, setContactCount] = useState(0);

    const [client, setClient] = useState<ClientInterface>({
        companyName: "",
        address: "",
        city: "",
        zipCode: 0,
        cvr: 0,
        contacts: [],
        status: "Emne",
        notes: [{note: "", dateTime: now}],
        responsible: user!.id!,
        stampCards: {},
    });


    const loading = false;


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value, type, checked } = e.target as HTMLInputElement;

        setClient(prevClient => ({
            ...prevClient,
            [id]: type === "checkbox" ? checked : (type === "number" ? Number(value) : value),
        }));
    };

    const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const noteValue = e.target.value;

        setClient(prevClient => ({
            ...prevClient,
            notes: [{ note: noteValue, dateTime: now }],
        }));
    };

    const handleContactChange = (e: ChangeEvent<HTMLInputElement>, index: number, field: "name" | "mail" | "phone") => {
        const { value } = e.target;

        setClient(prevClient => {
            // Hvis contacts er tomt, opretter vi et array med tomme kontakter baseret på contactCount
            const updatedContacts = prevClient.contacts!.length > 0
                ? [...prevClient.contacts!]
                : Array(contactCount).fill({ name: "", mail: "", phone: 0 });

            // Opdater kun det specifikke felt i den kontaktperson
            updatedContacts[index] = {
                ...updatedContacts[index],
                [field]: field === "phone" ? parseInt(value) || 0 : value, // Konverter telefon til number
            };

            return { ...prevClient, contacts: updatedContacts };
        });
    };


    const handleContactCount = (e: ChangeEvent<HTMLSelectElement>) => {
        setContactCount(Number(e.target.value));
    };


    const handleCreateStampCard = async (e: FormEvent) => {
        e.preventDefault();

        if (!client.companyName.trim()) {
            alert("Virksomhedsnavn skal udfyldes");
            return;
        }

        try {
            await ClientService.createClient(client);
        } catch (error) {
            console.error(error);
        } finally {
            navigate(`/kunder`);
        }

    }

    if (loading) {
        return <LoadingBar />;
    }
    

    return (
        <Animation>
            <div className="mt-10">
                <h1 className="text-3xl font-extrabold mx-60 p-12">Opret ny kunde</h1>
                <div className="flex justify-center items-center mx-60 rounded-lg bg-white shadow-lg p-12">
                    <form className="space-y-4 w-full">

                        <div>
                            <label className="sr-only" htmlFor="companyName">Virksomhedsnavn</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Virksomhedsnavn"
                                type="text"
                                id="companyName"
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 border-2 rounded">
                            <label className="sr-only" htmlFor="Postnummer">Postnummer</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Postnummer"
                                type="number"
                                id="zipCode"
                                onChange={handleChange}
                            />
                            <label className="sr-only" htmlFor="By">By</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="By"
                                type="text"
                                id="city"
                                onChange={handleChange}
                            />
                            <label className="sr-only" htmlFor="Adresse">Adressee</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Adresse"
                                type="text"
                                id="address"
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label className="sr-only" htmlFor="CVR-nummer">CVR-nummer</label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="CVR-nummer"
                                type="number"
                                id="cvr"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="sr-only" htmlFor="status">Status</label>
                            <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="status"
                                    onChange={handleChange}
                            >
                            <option value="Emne">Emne</option>
                            <option value="Kunde">Kunde</option>
                            <option value="Tidligere kunde">Tidligere</option>
                        </select>

                            <label className="sr-only" htmlFor="contactamount">Antal kontaktpersoner</label>
                            <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="contactamount"
                                    onChange={handleContactCount}
                            >
                                <option value="0">Ingen kontaktpersoner</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>

                        {[...Array(contactCount)].map((_, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 border-2 rounded">
                                <label className="sr-only" htmlFor={`name-${index}`}>Navn på kontaktperson</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder={`Navn på kontaktperson ${index + 1}`}
                                    type="text"
                                    id={`name-${index}`}
                                    onChange={(e) => handleContactChange(e, index, "name")}
                                />

                                <label className="sr-only" htmlFor={`mail-${index}`}>Mail på kontaktperson</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder={`Mail på kontaktperson ${index + 1}`}
                                    type="email"
                                    id={`mail-${index}`}
                                    onChange={(e) => handleContactChange(e, index, "mail")}
                                />

                                <label className="sr-only" htmlFor={`phone-${index}`}>Telefonnummer på kontaktperson</label>
                                <input
                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                    placeholder={`Telefonnummer på kontaktperson ${index + 1}`}
                                    type="tel"
                                    id={`phone-${index}`}
                                    onChange={(e) => handleContactChange(e, index, "phone")}
                                />
                            </div>
                        ))}


                        <div>
                            <label className="sr-only" htmlFor="notes">Noter</label>

                            <textarea
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Noter"
                                rows={5}
                                id="notes"
                                onChange={handleNoteChange}
                            ></textarea>
                        </div>

                        <div className="mt-4">
                            <button
                                type="submit"
                                onClick={handleCreateStampCard}
                                className="inline-block w-full rounded-lg bg-black px-5 py-3 font-medium text-white sm:w-auto"
                            >
                                Opret kunde
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Animation>
    );
};

export default CreateClientScreen;