import axios, { AxiosResponse } from "axios";

export const searchApi = async <T, D>(api: string, param?: D) => {
    try {
        const result: AxiosResponse<T> = await axios.post(api, param);

        if (result.status == 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error("API 호출 오류 발생:", error);
        alert(`API 호출 오류: ${error.message || "알 수 없는 오류"}`);
    }
};
