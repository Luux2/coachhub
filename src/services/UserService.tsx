import apiClient from "../utils/axiosBase";

class UserService {

    static async getUsers() {
        const response = await apiClient.get('/users');
        return response.data;
    }

}

export default UserService;