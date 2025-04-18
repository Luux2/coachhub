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

    static async deleteStampCard(stampCardId: string): Promise<void> {

        await apiClient.delete(`/stampcards/${stampCardId}`);
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
        await apiClient.post(`/stampcards/${stampCardId}/stamps`, {
            newStamp,
            currentStampCount
        });
    }


    static async patchStamp(stampCardId: string, stampId: string, updatedStamp: any, currentStampCount: number) {
        return apiClient.patch(`/stampcards/${stampCardId}/stamps/${stampId}`, {
            newStamp: updatedStamp,
            currentStampCount
        }).then(response => {
            console.log("✅ PATCH Response:", response.data);
        }).catch(error => {
            console.error("🔥 PATCH Error:", error.response?.data || error.message);
            throw error;
        });
    }

    static async getStampCardsByClient(clientId: string): Promise<StampCardInterface[]> {
        const response = await apiClient.get(`/clients/${clientId}/stampCards`);
        return response.data as StampCardInterface[];
    }







}

export default StampCardService;