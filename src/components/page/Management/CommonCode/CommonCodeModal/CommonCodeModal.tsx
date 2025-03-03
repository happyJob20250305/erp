import { useRecoilState } from "recoil";
import { CommonCodeModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { CommonCode } from "../../../../../api/api";
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { postApi } from "../../../../../api/CommonCodeApi/postApi";

interface ICommonCodeModalProps {
    groupIdx: number;
    setGroupIdx: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

interface ICommonCode {
    author: string;
    createdDate: string;
    groupCode: string;
    groupIdx: number;
    groupName: string;
    note: string;
    useYn: string;
}

const initialCommonCode: ICommonCode = {
    author: "",
    createdDate: "",
    groupCode: "",
    groupIdx: 0,
    groupName: "",
    note: "",
    useYn: "N",
};

export const CommonCodeModal: FC<ICommonCodeModalProps> = ({ groupIdx, setGroupIdx, postSuccess }) => {
    const [modal, setModal] = useRecoilState(modalState);

    // useRef로 사용하지 않은 이유 -> api 결과값으로 화면을 다시 그려야하는데, ref는 리렌더링을 해주지 않기 때문
    const [commonCode, setCommonCode] = useState<ICommonCode>(initialCommonCode);

    useEffect(() => {
        groupIdx && commonCodeDetail();

        return () => {
            setGroupIdx(0);
        };
    }, []);

    const commonCodeDetail = async () => {
        const result = await searchApi<{ detailValue: ICommonCode }>(CommonCode.detail, { groupIdx });
        if (result) {
            setCommonCode(result.detailValue);
        }

        // axios
        //     .post("/management/commonCodeDetailJson.do", { groupIdx })
        //     .then((res: AxiosResponse<{ detailValue: ICommonCode }>) => {
        //         setCommonCode(res.data.detailValue);
        //     });
    };

    const saveCommonCode = async () => {
        // axios.post("/management/commonCodeSaveBody.do", commonCode).then((res: AxiosResponse<{ result: string }>) => {
        //     if (res.data.result === "success") {
        //         postSuccess();
        //     } else if (res.data.result.includes("Duplicate")) {
        //         alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복됩니다.`);
        //         return;
        //     }
        // });

        const result = await postApi(CommonCode.save, commonCode);
        if (result.result === "success") {
            postSuccess();
        } else if (result.result.startsWith("Duplicate")) {
            console.log(result.result);
            alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복됩니다.`);
            return;
        }
    };

    const deleteCommonCode = () => {
        axios
            .post("/management/commonCodeDeleteBody.do", { groupIdx })
            .then((res: AxiosResponse<{ result: string }>) => {
                if (res.data.result === "success") {
                    postSuccess();
                }
            });
    };

    const updateCommonCode = async () => {
        const result = await postApi(CommonCode.update, commonCode);
        if (result.result === "success") {
            postSuccess();
        } else if (result.result.startsWith("Duplicate")) {
            console.log(result.result);
            alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복됩니다.`);
            return;
        }
        // axios.post("/management/commonCodeUpdateBody.do", commonCode).then((res: AxiosResponse<{ result: string }>) => {
        //     if (res.data.result === "success") {
        //         postSuccess();
        //     } else if (res.data.result.includes("Duplicate")) {
        //         alert(`입력하신 그룹코드(${commonCode.groupCode})는 중복됩니다.`);
        //         return;
        //     }
        // });
    };

    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <label>
                    그룹코드*
                    <input
                        // setCommonCode({ ...commonCode, groupCode: "test" });일 경우 { ...undefined, groupCode: e.target.value } 이렇게 발생할 수 있다.
                        // 이전 상태의 값을 유지하고 새로운 값을 추가하기 위한 방법이다.
                        // 근데 이러면 최초에 변경할 때 { ...undefined, groupCode: e.target.value }과 같은 문제가 발생할 수 있으니까, 그냥 초기값 만들자
                        // setCommonCode((prev) => ({ ...(prev || {}), groupCode: e.target.value })) 이렇게 하고 싶은데 타입 에러 발생함
                        onChange={(e) => setCommonCode((prev) => ({ ...prev, groupCode: e.target.value }))}
                        type='text'
                        defaultValue={commonCode?.groupCode}
                    ></input>
                </label>
                <label>
                    그룹코드명*
                    <input
                        type='text'
                        defaultValue={commonCode?.groupName}
                        onChange={(e) => setCommonCode((prev) => ({ ...prev, groupName: e.target.value }))}
                    ></input>
                </label>
                <label>
                    그룹코드설명*
                    <input
                        type='text'
                        defaultValue={commonCode?.note}
                        onChange={(e) => setCommonCode((prev) => ({ ...prev, note: e.target.value }))}
                    ></input>
                </label>
                <label>
                    사용여부*
                    <div className='radio-group'>
                        <label>Yes</label>
                        <input
                            type='radio'
                            name='useYn'
                            value={"Y"}
                            checked={commonCode?.useYn === "Y"}
                            onChange={(e) => setCommonCode((prev) => ({ ...prev, useYn: e.target.value }))}
                        />

                        <label>No</label>
                        <input
                            type='radio'
                            name='useYn'
                            value={"N"}
                            checked={!commonCode?.useYn || commonCode?.useYn === "N"} // 값이 없거나 "N"일 때
                            onChange={(e) => setCommonCode((prev) => ({ ...prev, useYn: e.target.value }))}
                        />
                    </div>
                </label>
                <div className={"button-container"}>
                    <button type='button' onClick={groupIdx ? updateCommonCode : saveCommonCode}>
                        {groupIdx ? "수정" : "저장"}
                    </button>
                    {!!groupIdx && (
                        <button type='button' onClick={deleteCommonCode}>
                            삭제
                        </button>
                    )}
                    <button type='button' onClick={() => setModal(!modal)}>
                        나가기
                    </button>
                </div>
            </div>
        </CommonCodeModalStyle>
    );
};
