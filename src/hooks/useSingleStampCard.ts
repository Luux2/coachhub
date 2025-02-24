import {useCallback, useEffect, useState} from "react";
import { StampCardInterface } from "../utils/interfaces.ts";
import StampCardService from "../services/StampCardService.tsx";

const useSingleStampCard = (stampCardId: string | undefined) => {
    const [stampCard, setStampCard] = useState<StampCardInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStampCards = useCallback(async () => {
        if (!stampCardId) return;

        setLoading(true);
        try {
            const data = await StampCardService.getStampCardById(stampCardId);
            setStampCard(data);
        } catch (err) {
            setError("Failed to fetch stamp card");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [stampCardId]);

    useEffect(() => {
        fetchStampCards().then();
    }, [fetchStampCards]);

    return { stampCard, loading, error, fetchStampCards, setStampCard };
};

export default useSingleStampCard;
