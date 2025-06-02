import apiClient from "../utils/axiosBase";
import {ClientInterface, NoteInterface} from "../utils/interfaces.ts";

class ClientService {

    static async getClients(): Promise<ClientInterface[]> {
        const response = await apiClient.get('/clients');
        return response.data as ClientInterface[];
    }

    static async getClientById(id: string): Promise<ClientInterface> {
        const response = await apiClient.get(`/clients/${id}`);
        return response.data as ClientInterface;
    }

    static async createClient(client: ClientInterface): Promise<void> {
        await apiClient.post('/clients', client);
    }

    static async deleteClient(id: string): Promise<void> {
        await apiClient.delete(`/clients/${id}`);
    }

    static async updateClient(client: ClientInterface, id: string): Promise<void> {
        await apiClient.patch(`/clients/${id}`, client);
    }

    static async updateNote(note: NoteInterface, id: string, noteId: string) : Promise<void> {
        await apiClient.patch(`/clients/${id}/notes/${noteId}`, note);
    }

    static async deleteNote(id: string, noteId: string) : Promise<void> {
        await apiClient.delete(`/clients/${id}/notes/${noteId}`);
    }

    static async createNote(id: string, note: NoteInterface): Promise<void> {
        await apiClient.post(`/clients/${id}/notes`, note);
    }

}

export default ClientService;