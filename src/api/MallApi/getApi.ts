import axios, { AxiosResponse } from "axios";

export const getApi = async <T>(api: string, params?: object): Promise<T | undefined> => {
    try {
        const result: AxiosResponse<T> = await axios.get(api, { params });

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error("API 호출 오류 발생", error);
    }
};
