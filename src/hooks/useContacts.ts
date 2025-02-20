import {ContactInterface} from "../utils/interfaces.ts";
import {useEffect, useState} from "react";
import ContactService from "../services/ContactService.tsx";

export const UseContacts = () => {
    const [contacts, setContacts] = useState<ContactInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await ContactService.getContacts();
                const sortedContacts = response.sort((a, b) => b.name.localeCompare(a.name));
                setContacts(sortedContacts);
            } catch (err) {
                setError("Failed to fetch contacts");
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchContacts().then();
    }, []);

    return { contacts, loading, error };
};

export default UseContacts;