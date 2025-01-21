import {StampCardInterface} from "../../utils/interfaces.ts";
import {FormEvent, useEffect, useState} from "react";
import StampCardService from "../../services/StampCardService.tsx";

export const EditStampCardDialog = ({onClose, stampCard, clientId, stampCardId}: {
    onClose: () => void;
    stampCard?: StampCardInterface;
    clientId: string;
    stampCardId: string;
}) => {

    const [name, setName] = useState(stampCard?.name || "");
    const [stampValue, setStampValue] = useState(stampCard?.stampValue || 1);
    const [stampUnit, setStampUnit] = useState(stampCard?.stampUnit || "minutter");
    const [initialStampCount, setInitialStampCount] = useState(stampCard?.initialStampCount || 1);
    const [price, setPrice] = useState(stampCard?.price || 1);
    const [notes, setNotes] = useState(stampCard?.notes || "");
    const [lastStamp, setLastStamp] = useState(stampCard?.lastStamp || "");
    const [currentStampCount, setCurrentStampCount] = useState(stampCard?.currentStampCount || 0);
    const [created, setCreated] = useState(stampCard?.created || "");

    useEffect(() => {
        if (stampCard) {
            setName(stampCard.name);
            setStampValue(stampCard.stampValue);
            setStampUnit(stampCard.stampUnit);
            setInitialStampCount(stampCard.initialStampCount);
            setPrice(stampCard.price);
            setNotes(stampCard.notes);
            setLastStamp(stampCard.lastStamp);
            setCurrentStampCount(stampCard.currentStampCount);
            setCreated(stampCard.created);
        }
    }, [stampCard]);

    const handleUpdateCard = async (e: FormEvent) => {
        e.preventDefault();

        if (!stampCard) {
            return (
                alert("Klippekortet kunne ikke findes. Prøv at genindlæse siden.")
            );
        }

        const updatedStampCard: StampCardInterface = {
            name,
            stampValue,
            stampUnit,
            initialStampCount,
            price,
            notes,
            lastStamp,
            currentStampCount,
            created,
        };
        await StampCardService.updateStampCard(updatedStampCard, stampCardId, clientId);
        onClose();
    }


    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4">
            <p className="font-bold text-black text-4xl text-center">
                Rediger klippekort - {stampCard?.name}
            </p>
            <div className="flex justify-center items-center rounded-lg bg-white p-12">
                <form className="space-y-4 w-full" onSubmit={handleUpdateCard}>
                    <div>
                        <label className="text-sm ml-1" htmlFor="name">
                            Navn
                        </label>
                        <input
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Klippekortsnavn"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm ml-1" htmlFor="stampvalue">
                                Klipværdi
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Klipværdi"
                                type="number"
                                id="stampvalue"
                                min={1}
                                value={stampValue}
                                onChange={(e) => setStampValue(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm ml-1" htmlFor="stampunit">
                                Klipenhed
                            </label>
                            <select
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                id="stampunit"
                                value={stampUnit}
                                onChange={(e) => setStampUnit(e.target.value)}
                                required
                            >
                                <option value="minutter">minutter</option>
                                <option value="styk/enheder">styk/enheder</option>
                            </select>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm ml-1" htmlFor="stampamount">
                                Antal klip
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Antal klip"
                                type="number"
                                id="stampamount"
                                min={1}
                                value={initialStampCount}
                                onChange={(e) => setInitialStampCount(Number(e.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label className="text-sm ml-1" htmlFor="price">
                                Pris
                            </label>
                            <input
                                className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                placeholder="Pris"
                                type="number"
                                id="price"
                                min={1}
                                value={price}
                                onChange={(e) => setPrice(Number(e.target.value))}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="text-sm ml-1" htmlFor="notes">
                            Noter
                        </label>
                        <textarea
                            className="w-full rounded-lg border-gray-200 p-3 text-sm"
                            placeholder="Noter"
                            rows={5}
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mt-4 flex gap-2 justify-center">
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

export default EditStampCardDialog;
