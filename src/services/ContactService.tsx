import apiClient from "../utils/axiosBase";
import {ContactInterface, NoteInterface} from "../utils/interfaces.ts";

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

    static async deleteContact(id: string): Promise<void> {
        await apiClient.delete(`/contacts/${id}`);
    }

    static async createNote(contactId: string, note: NoteInterface): Promise<void> {
        await apiClient.post(`/contacts/${contactId}/notes`, note);
    }

    static async deleteNote(contactId: string, noteId: string): Promise<void> {
        await apiClient.delete(`/contacts/${contactId}/notes/${noteId}`);
    }

}

export default ContactService;