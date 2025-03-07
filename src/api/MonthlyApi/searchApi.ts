import axios, { AxiosResponse } from "axios";

export const searchApi = async <T>(api: string, param: object): Promise<T | undefined> => {
    try {
        const result: AxiosResponse<T> = await axios.post(api, param);

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error("api 호출 오류 발생", error);
    }
};
