import {StampCardInterface} from "../../utils/interfaces.ts";
import {CheckIcon, MinusIcon, PlusIcon, ScissorsIcon} from "@heroicons/react/24/outline";
import {useEffect, useState} from "react";
import StampCardService from "../../services/StampCardService.tsx";

export const RegisterStampsDialog = ({onClose, onRegister, stampCard, stampCardId}: {
    onClose: () => void;
    onRegister: () => void;
    stampCard?: StampCardInterface;
    stampCardId: string;
}) => {

    const [stampTitle, setStampTitle] = useState("");
    const [stampDescription, setStampDescription] = useState("");
    const [stampCount, setStampCount] = useState(stampCard?.currentStampCount ?? 0);

    const now = new Date();
    const localISO = new Date(now.getTime() - now.getTimezoneOffset() * 60000)
        .toISOString()
        .replace("Z", "");

    useEffect(() => {
        setStampCount(stampCard?.currentStampCount ?? 0);
    }, [stampCard]);

    const handleIncrement = () => {
        if (stampCard?.initialStampCount && stampCount < stampCard?.initialStampCount) {
            setStampCount(prev => prev + 1);
        }
    }

    const handleDecrement = () => {
        if (stampCount > 0) {
            setStampCount(prev => prev - 1);
        }
    }

    const handleCloseDialog = () => {
        setStampCount(stampCard?.currentStampCount ?? 0);
        onClose();
    }

    const handleRegisterStamps = async () => {
        if (!stampCard) return;

        // Beregn KUN de nye klip, der er tilføjet i denne registrering
        const newStampsUsed = stampCount - (stampCard.currentStampCount ?? 0);

        if (newStampsUsed <= 0) {
            alert("Du skal registrere mindst ét nyt klip.");
            return;
        }

        // Ny værdi for currentStampCount (tidligere værdi + nye klip)
        const updatedStampCount = (stampCard.currentStampCount ?? 0) + newStampsUsed;

        // Opret nyt stamp-objekt
        const newStamp = {
            stampTitle: stampTitle,
            stampDescription: stampDescription,
            stampDate: localISO,
            stampResponsible: "pb",
            stampsUsed: newStampsUsed, // Kun nye klip
        };

        try {
            // Opdater både currentStampCount og tilføj den nye klip-registrering til stamps-arrayet
            await StampCardService.registerStamps(stampCardId, newStamp, updatedStampCount);
            alert("Klip registreret");

        } catch (error) {
            console.error(error);
        }

        onRegister();
    };





    return (
        <div className="overflow-hidden rounded-lg shadow-2xl bg-white p-4 text-white">

            {stampCount !== stampCard?.initialStampCount ? (
                <ScissorsIcon className="w-20 text-black mx-auto rotate-90"/>
                ) : (
                    <CheckIcon className="w-20 text-green-500 mx-auto animate-bounce"/>
                )
            }

            <h1 className="font-bold text-black text-4xl text-center">
                Registrer klip for{" "}
                <span className="italic">{stampCard?.name}</span>
            </h1>

            <div>
                <input onChange={(e) => setStampTitle(e.target.value)} type="text" placeholder="Opgavetitel" className="w-full border-2 border-gray-300 rounded p-2 mt-4 text-black"/>
            </div>
            <div>
                <textarea onChange={(e) => setStampDescription(e.target.value)} placeholder="Tilføj beskrivelse" className="h-24 w-full border-2 border-gray-300 rounded mt-4 text-black"/>
            </div>

            <div className="my-10 flex justify-between">
                <MinusIcon onClick={handleDecrement} className="h-6 text-black cursor-pointer select-none"/>
            <div className="bg-gray-300 rounded h-6 min-w-96 text-black"
                 style={{
                     background: `linear-gradient(to right, #10B981 ${stampCard && stampCount / stampCard.initialStampCount * 100}%, #D1D5DB 0%)`,
                 }}
            >
                <p className="text-center font-bold">{stampCount}/{stampCard?.initialStampCount} klip benyttet</p>
            </div>
                <PlusIcon onClick={handleIncrement} className="h-6 text-black cursor-pointer select-none"/>
            </div>



            <div className="mt-4 flex gap-2 justify-center">

                <button onClick={handleCloseDialog} className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded text-xl">Fortryd</button>
                {stampCount !== stampCard?.initialStampCount ? (
                <button onClick={handleRegisterStamps} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded text-xl">Gem klip</button>
                ) : (
                        <button onClick={handleRegisterStamps} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded text-xl">Gem klip</button>
                    )
                }
            </div>
        </div>
    );
};

export default RegisterStampsDialog;