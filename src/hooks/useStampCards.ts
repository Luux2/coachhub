import { useEffect, useState } from "react";
import {StampCardInterface} from "../utils/interfaces";
import StampCardService from "../services/StampCardService.tsx";

const useClients = () => {
    const [stampCards, setStampCards] = useState<StampCardInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStampCards = async () => {
            try {
                const data = await StampCardService.getStampCards();
                const sortedStampCards = data.sort((a, b) => b.name.localeCompare(a.name));
                setStampCards(sortedStampCards);
            } catch (err) {
                setError("Failed to fetch clients");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchStampCards().then();
    }, []);

    return { stampCards, loading, error };
};

export default useClients;
