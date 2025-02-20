import {useEffect, useState} from "react";
import {StampCardInterface} from "../utils/interfaces.ts";
import StampCardService from "../services/StampCardService.tsx";

const UseSingleStampCard = (stampCardId: string | undefined) => {
    const [stampCard, setStampCard] = useState<StampCardInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (!stampCardId) return;

        const fetchStampCard = async () => {
            try {
                const data = await StampCardService.getStampCardById(stampCardId);
                setStampCard(data);
            } catch (err) {
                setError("Failed to fetch stamp card");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchStampCard().then();
    }, [stampCardId]);

    return { stampCard, loading, error, setStampCard };
};

export default UseSingleStampCard;