import axios, { AxiosResponse } from "axios";

export const postApi = async <T>(api: string, param: object) => {
    try {
        const result: AxiosResponse<T> = await axios.post(api, param);

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.log("api 호출 오류 발생", error);
    }
};

export const postApiNoPram = async <T>(api: string) => {
    try {
        const result: AxiosResponse<T> = await axios.post(api);

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.log("api 호출 오류 발생", error);
    }
};
