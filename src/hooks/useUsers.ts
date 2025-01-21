import {useEffect, useState} from "react";
import {UserInterface} from "../utils/interfaces.ts";
import UserService from "../services/UserService.tsx";

const useUsers = () => {
    const [users, setUsers] = useState<UserInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await UserService.getUsers();
                setUsers(data);
            } catch (err) {
                setError("Failed to fetch users");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers().then();
    }, []);

    return { users, loading, error };
};

export default useUsers;