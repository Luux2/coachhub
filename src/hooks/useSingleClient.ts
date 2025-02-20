import { useEffect, useState } from "react";
import { ClientInterface } from "../utils/interfaces";
import ClientService from "../services/ClientService";

const useSingleClient = (clientId: string | undefined) => {
    const [client, setClient] = useState<ClientInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!clientId) {
            setError("Klient-ID mangler.");
            setLoading(false);
            return;
        }

        const fetchClient = async () => {
            try {
                const data = await ClientService.getClientById(clientId);
                setClient(data);
            } catch (err) {
                console.error(err);
                setError("Kunne ikke hente klientdata.");
            } finally {
                setLoading(false);
            }
        };

        fetchClient().then();
    }, [clientId]);

    return { client, loading, error, setClient};
};

export default useSingleClient;
