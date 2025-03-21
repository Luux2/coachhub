import { useEffect, useState } from "react";
import {StampCardInterface} from "../utils/interfaces";
import StampCardService from "../services/StampCardService.tsx";


const useStampCardsByClient = (clientId: string | undefined) => {
    const [stampCards, setStampCards] = useState<StampCardInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!clientId) {
            setError("Klient-ID mangler.");
            setLoading(false);
            return;
        }


        const fetchStampCards = async () => {
            try {
                const data = await StampCardService.getStampCardsByClient(clientId);
                setStampCards(data);
            } catch (err) {
                console.error(err);
                setError("Kunne ikke hente klippekort.");
            } finally {
                setLoading(false);
            }
        };

        fetchStampCards().then();
        }, [clientId]);


    return { stampCards, loading, error };
};

export default useStampCardsByClient;
