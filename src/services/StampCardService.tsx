import apiClient from "../utils/axiosBase";
import {StampCardInterface} from "../utils/interfaces.ts";

class StampCardService {

    static async getStampCards(id: string): Promise<StampCardInterface[]> {
        const response = await apiClient.get(`/clients/${id}/stampCards`);
        return response.data as StampCardInterface[];
    }

    static async getStampCardById(stampCardId: string, id: string): Promise<StampCardInterface> {
        const response = await apiClient.get(`/clients/${id}/stampCards/${stampCardId}`);
        return response.data as StampCardInterface;
    }

    static async createStampCard(stampCard: StampCardInterface, id: string): Promise<void> {
        await apiClient.post(`/clients/${id}/stampCards`, stampCard);
    }

    static async updateStampCard(stampCard: StampCardInterface, stampCardId: string, id: string): Promise<void> {
        await apiClient.patch(`/clients/${id}/stampCards/${stampCardId}`, stampCard);
    }

    static async deleteStampCard(stampCardId: string, id: string): Promise<void> {
        await apiClient.delete(`/clients/${id}/stampCards/${stampCardId}`);
    }

    static async registerStamps(stampCardId: string, id: string, currentStampCount: number): Promise<void> {
        await apiClient.patch(`/clients/${id}/stampCards/${stampCardId}`, {currentStampCount});
    }

}

export default StampCardService;