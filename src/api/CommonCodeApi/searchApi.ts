import axios, { AxiosResponse } from "axios";

// 요청이 성공하면 T 타입의 데이터를 반환하고,
// 실패하면 undefined를 반환함.
export const searchApi = async <T>(api: string, param?: object): Promise<T | undefined> => {
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
