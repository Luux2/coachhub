import {useEffect, useState} from "react";
import {ClientInterface} from "../../../utils/interfaces.ts";
import ClientService from "../../../services/ClientService.tsx";
import LoadingBar from "../../../components/misc/LoadingBar.tsx";

export const ViewClientsScreen = () => {

    const [clients, setClients] = useState<ClientInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const data = await ClientService.getClients();
                const sortedClients = data.sort((a, b) => a.companyName.localeCompare(b.companyName));
                setClients(sortedClients);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchClients().then();
    }, []);

    if (loading) {
        return <LoadingBar />;
    }

    return (
        <>
        {clients.map((client: ClientInterface) => (
            <div key={client.id}>
                <h2>{client.companyName}</h2>
                <p>{client.address}</p>
                <p>{client.city}</p>
                <p>{client.zipCode}</p>
            </div>
        ))
        }
        </>
    );
};

export default ViewClientsScreen;