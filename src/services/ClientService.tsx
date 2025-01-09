import apiClient from "../utils/axiosBase";
import {ClientInterface} from "../utils/interfaces.ts";

class ClientService {

    static async getClients(): Promise<ClientInterface[]> {
        const response = await apiClient.get('/clients');
        return response.data as ClientInterface[];
    }

    static async createClient(client: ClientInterface): Promise<void> {
        await apiClient.post('/clients', client);
    }

}

export default ClientService;