import { useEffect, useState } from "react";
import { ClientInterface } from "../utils/interfaces";
import ClientService from "../services/ClientService";

const useClients = () => {
    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await ClientService.getClients();
                const sortedClients = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
                setClients(sortedClients);
            } catch (err) {
                setError("Failed to fetch clients");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients().then();
    }, []);

    return { clients, loading, error };
};

export default useClients;
