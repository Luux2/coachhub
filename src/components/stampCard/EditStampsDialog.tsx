import {StampCardInterface, StampInterface} from "../../utils/interfaces.ts";
import {useEffect, useState} from "react";
import StampCardService from "../../services/StampCardService.tsx";
import {CheckIcon, MinusIcon, PlusIcon, ScissorsIcon} from "@heroicons/react/24/outline";

export const EditStampsDialog = ({ onClose, onEdit, stampCardId, stampCard, stamp, stampId}: {
    onClose: () => void;
    onEdit: () => void;
    stampCardId: string;
    stampCard?: StampCardInterface;
    stamp?: StampInterface;
    stampId: string;
}) => {

    const [stampTitle, setStampTitle] = useState(stamp?.stampTitle || "");
    const [stampDescription, setStampDescription] = useState(stamp?.stampDescription || "");
    const [stampCount, setStampCount] = useState(stamp?.stampsUsed || 0);

    // 🔹 Beregn den samlede værdi af klip (nu + tidligere registrerede)
    const totalStampCount = (stampCard?.currentStampCount || 0) - (stamp?.stampsUsed || 0) + stampCount;

    useEffect(() => {
        if (stamp) {
            setStampTitle(stamp.stampTitle);
            setStampDescription(stamp.stampDescription);
            setStampCount(stamp.stampsUsed);
        }
    }, [stamp]);

    const handleIncrement = () => {
        if (stampCard?.initialStampCount && totalStampCount < stampCard.initialStampCount) {
            setStampCount(prev => prev + 1);
        }
    }

    const handleDecrement = () => {
        if (stampCount > 0) {
            setStampCount(prev => prev - 1);
        }
    }

    const handleCloseDialog = () => {
        setStampCount(stamp?.stampsUsed || 0);
        setStampTitle(stamp?.stampTitle || "");
        setStampDescription(stamp?.stampDescription || "");
        onClose();
    }

    const handleEditStamps = async () => {
        if (!stampCard) return;

        // Beregn hvor mange klip der er ændret (kan være både positiv eller negativ ændring)
        const adjustedStampsUsed = stampCount - (stamp?.stampsUsed || 0);

        // Ny værdi for currentStampCount (tidligere værdi - gamle klip + nye klip)
        const updatedStampCount = (stampCard?.currentStampCount || 0) + adjustedStampsUsed;

        // Opret opdateret stamp-objekt
        const updatedStamp = {
            stampTitle: stampTitle,
            stampDescription: stampDescription,
            stampDate: stamp?.stampDate,
            stampResponsible: "pb",
            stampsUsed: stampCount,
        };

        try {
            await StampCardService.patchStamp(stampCardId, stampId, updatedStamp, updatedStampCount);
            alert("Klip opdateret");
        } catch (err) {
            alert("Der skete en fejl. Prøv igen.");
            console.error(err);
        }

        onEdit();
    }

    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4">

            {stampCount !== stampCard?.initialStampCount ? (
                <ScissorsIcon className="w-20 text-black mx-auto rotate-90"/>
            ) : (
                <CheckIcon className="w-20 text-green-500 mx-auto animate-bounce"/>
            )}

            <h1 className="font-bold text-black text-4xl text-center">
                Rediger klip for{" "}
                <span className="italic">{stampCard?.name}</span>
            </h1>

            <div>
                <input onChange={(e) => setStampTitle(e.target.value)} value={stampTitle} type="text" placeholder="Opgavetitel" className="w-full border-2 border-gray-300 rounded p-2 mt-4 text-black"/>
            </div>
            <div>
                <textarea onChange={(e) => setStampDescription(e.target.value)} value={stampDescription} placeholder="Tilføj beskrivelse" className="h-24 w-full border-2 border-gray-300 rounded mt-4 text-black"/>
            </div>

            <div className="my-5 flex justify-center">
                <p className="text-center font-bold ">{totalStampCount} / {stampCard?.initialStampCount} klip i alt</p>
            </div>

            <div className="mb-10 flex justify-between">
                <MinusIcon onClick={handleDecrement} className="h-6 cursor-pointer select-none"/>
                <div className="bg-gray-300 rounded h-6 min-w-96"
                     style={{
                         background: `linear-gradient(to right, #10B981 ${totalStampCount / (stampCard?.initialStampCount || 1) * 100}%, #D1D5DB 0%)`,
                     }}
                >
                    <p className="text-center font-bold">{stampCount} klip benyttet</p>
                </div>
                <PlusIcon onClick={handleIncrement} className="h-6 cursor-pointer select-none"/>
            </div>

            <div className="mt-4 flex gap-2 justify-center">
                <button onClick={handleCloseDialog} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl">Fortryd</button>
                <button onClick={handleEditStamps} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-xl">Gem ændringer</button>
            </div>
        </div>
    );
};

export default EditStampsDialog;
