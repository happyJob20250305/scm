import axios, { AxiosResponse } from "axios";
import { IPostWareHouseResponse } from "../../models/interface/IWarehouse";
import { IUpdateWareHouseRequestDTO } from "../../models/interface/IWarehouse";

export const postwarehouseInfoSaveApi = async <T>(api: string, param: IUpdateWareHouseRequestDTO) => {
    try {
        const result: AxiosResponse<IPostWareHouseResponse> = await axios.post(api, param);
        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error("api 호출 오류 발생", error);
    }
};
