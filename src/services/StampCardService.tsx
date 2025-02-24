import apiClient from "../utils/axiosBase";
import {StampCardInterface} from "../utils/interfaces.ts";

class StampCardService {

    static async getStampCards(): Promise<StampCardInterface[]> {
        const response = await apiClient.get(`/stampcards`);
        return response.data as StampCardInterface[];
    }

    static async getStampCardById(stampCardId: string): Promise<StampCardInterface> {
        const response = await apiClient.get(`/stampcards/${stampCardId}`);
        return response.data as StampCardInterface;
    }

    static async createStampCard(stampCard: StampCardInterface): Promise<void> {
        await apiClient.post(`/stampcards`, stampCard);
    }

    static async updateStampCard(stampCard: StampCardInterface, stampCardId: string, id: string): Promise<void> {
        await apiClient.patch(`/clients/${id}/stampCards/${stampCardId}`, stampCard);
    }

    static async deleteStampCard(stampCardId: string, id: string): Promise<void> {
        await apiClient.delete(`/clients/${id}/stampCards/${stampCardId}`);
    }

    static async registerStamps(
        stampCardId: string,
        newStamp: {
            stampTitle: string;
            stampDate: string;
            stampDescription: string;
            stampResponsible: string;
            stampsUsed: number;
        },
        currentStampCount: number
    ): Promise<void> {
        await apiClient.patch(`/stampcards/${stampCardId}/stamps`, {
            newStamp,
            currentStampCount
        });
    }




}

export default StampCardService;