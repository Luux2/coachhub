import { useEffect, useState } from "react";
import {ContactInterface} from "../utils/interfaces";
import ContactService from "../services/ContactService.tsx";


const useContactsByClient = (clientId: string | undefined) => {
    const [contacts, setContacts] = useState<ContactInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!clientId) {
            setError("Klient-ID mangler.");
            setLoading(false);
            return;
        }


        const fetchContacts = async () => {
            try {
                const data = await ContactService.getContactsByClient(clientId);
                setContacts(data);
            } catch (err) {
                console.error(err);
                setError("Kunne ikke hente klippekort.");
            } finally {
                setLoading(false);
            }
        };

        fetchContacts().then();
    }, [clientId]);


    return { contacts: contacts, loading, error };
};

export default useContactsByClient;
