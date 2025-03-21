import apiClient from "../utils/axiosBase";
import {ContactInterface} from "../utils/interfaces.ts";

class ContactService {

    static async getContacts(): Promise<ContactInterface[]> {
        const response = await apiClient.get('/contacts');
        return response.data as ContactInterface[];
    }

    static async getContactById(id: string): Promise<ContactInterface> {
        const response = await apiClient.get(`/contacts/${id}`);
        return response.data as ContactInterface;
    }

    static async getContactsByClient(clientId: string): Promise<ContactInterface[]> {
        const response = await apiClient.get(`/clients/${clientId}/contacts`);
        return response.data as ContactInterface[];
    }

    static async createContact(contact: ContactInterface): Promise<void> {
        await apiClient.post('/contacts', contact);
    }

    static async updateContact(contact: ContactInterface, id: string): Promise<void> {
        await apiClient.patch(`/contacts/${id}`, contact);
    }

}

export default ContactService;