import { useEffect, useState } from "react";
import {ContactInterface} from "../utils/interfaces";
import ContactService from "../services/ContactService.tsx";

const useSingleContact = (contactId: string | undefined) => {
    const [contact, setContact] = useState<ContactInterface | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!contactId) {
            setError("Klient-ID mangler.");
            setLoading(false);
            return;
        }

        const fetchClient = async () => {
            try {
                const data = await ContactService.getContactById(contactId);
                setContact(data);
            } catch (err) {
                console.error(err);
                setError("Kunne ikke hente data for kontaktperson.");
            } finally {
                setLoading(false);
            }
        };

        fetchClient().then();
    }, [contactId]);

    return { contact, loading, error, setContact};
};

export default useSingleContact;
