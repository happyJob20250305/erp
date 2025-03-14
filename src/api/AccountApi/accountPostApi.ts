import axios, { AxiosResponse } from "axios";

export const accountPostApi = async <T>(api: string, param?: object, options?: object) => {
    try {
        const result: AxiosResponse<T> = await axios.post(api, param, options);

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.log("api 호출 오류 발생", error);
    }
};
