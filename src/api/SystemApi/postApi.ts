import axios, { AxiosResponse } from "axios";

export const postApi = async <T>(api: string, param: object, options?: object) => {
    try {
        const result: AxiosResponse<T> = await axios.post(api, param, options);

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error(`api 호출 도중 오류 발생`, error);
    }
};
