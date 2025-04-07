import Animation from "../../../components/misc/Animation.tsx";
import {useNavigate, useParams} from "react-router-dom";
import {FormEvent, useState} from "react";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";
import StampCardService from "../../../services/StampCardService.tsx";
import useSingleClient from "../../../hooks/useSingleClient.ts";
import {Helmet} from "react-helmet-async";

export const CreateStampCardScreen = () => {
    const {clientId} = useParams();
    const navigate = useNavigate();
    const now = new Date();
    const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .replace("Z", "");
    const [stampCardName, setStampCardName] = useState("");
    const [stampValue, setStampValue] = useState(0);
    const [stampUnit, setStampUnit] = useState("");
    const [stampAmount, setStampAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [notes, setNotes] = useState("");

    const {client, loading} = useSingleClient(clientId);


    const handleCreateStampCard = async (e: FormEvent) => {
        e.preventDefault();
        const stampCard = {
            clientId: clientId ?? "",
            name: stampCardName,
            created: localISO,
            stampValue: stampValue,
            stampUnit: stampUnit,
            price: price,
            initialStampCount: stampAmount,
            currentStampCount: 0,
            lastStamp: "",
            notes: notes
        }

        if (!stampCardName) {
            return (
                alert("Angiv navn på klippekort.")
            );
        }

        try {
        await StampCardService.createStampCard(stampCard);
        } catch (error) {
            console.error(error);
        } finally {
            navigate(`/kunder/${clientId}`);
        }

    }

    if (loading) {
        return <LoadingBar />;
    }


    return (
        <>
            <Helmet>
                <title>Opret klippekort - {client?.companyName}</title>
            </Helmet>

        <Animation>
            <div className="mt-10">
                <h1 className="text-3xl font-extrabold mx-60 p-12">Opret klippekort for {client?.companyName}</h1>
            <div className="flex justify-center items-center mx-60 rounded-lg bg-white shadow-lg p-12">
                <form className="space-y-4 w-full">
                    <div>
                        <label className="sr-only" htmlFor="name">Name</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Klippekortsnavn"
                            type="text"
                            id="name"
                            onChange={(e) => setStampCardName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="sr-only" htmlFor="stampvalue">Stamp value</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Klipværdi"
                            type="number"
                            id="stampvalue"
                            min={1}
                            onChange={(e) => setStampValue(parseInt(e.target.value))}
                        />
                        <label className="sr-only" htmlFor="stampunit">Stamp unit</label>
                        <select className="w-full rounded-lg border-gray-200 p-3 text-sm" id="stampunit"
                                name="stampunit"
                                onChange={(e) => setStampUnit(e.target.value)}
                        >
                            <option value="minutter">minutter</option>
                            <option value="styk/enheder">styk/enheder</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="sr-only" htmlFor="stampamount">Stamp amount</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Antal klip"
                            type="number"
                            id="stampamount"
                            min={1}
                            onChange={(e) => setStampAmount(parseInt(e.target.value))}
                        />

                        <label className="sr-only" htmlFor="price">Price</label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Pris"
                            type="number"
                            id="price"
                            min={1}
                            onChange={(e) => setPrice(parseInt(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="sr-only" htmlFor="notes">Noter</label>

                        <textarea
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Noter"
                            rows={5}
                            id="message"
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            onClick={handleCreateStampCard}
                            className="inline-block w-full rounded-lg bg-teal-600 hover:bg-teal-500 px-5 py-3 font-medium text-white sm:w-auto"
                        >
                            Opret klippekort
                        </button>
                    </div>
                </form>
            </div>
            </div>
        </Animation>
        </>
    );
};

export default CreateStampCardScreen;