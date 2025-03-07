import { FC, useEffect, useRef, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeModalStyle } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { IGroupCode } from "../CommonCodeMain/CommonCodeMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";


interface IGroupCodeProps {
    groupCode: string,
    setGroupCode: React.Dispatch<React.SetStateAction<string>>;
    postSuccess: () => void;
}

interface IGroupCodeListResponse {
    detail: IGroupCode
}

interface IPostResponse {
    result: string
    message?: string
}

export const CommonCodeModal: FC<IGroupCodeProps> = ({ groupCode, setGroupCode, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [groupCodeDetail, setGroupCodeDetail] = useState<IGroupCode>();
    const formRef = useRef<HTMLFormElement>(null);
    const [selectValue, setSelectValue] = useState<string>("");
    const options = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ]

    useEffect(() => {
        groupCode && searchDetail();

        return () => {
            setGroupCode("");
        }
    }, [])

    const searchDetail = () => {
        axios.post("/system/groupDetailBody", { groupCode })
            .then((res: AxiosResponse<IGroupCodeListResponse>) => {
                setGroupCodeDetail(res.data.detail);
                // setSelectValue(res.data.detail.useYn);
            })
    }

    const saveGroupCode = () => {
        axios.post("/system/groupSave", formRef.current)
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    postSuccess();
                } else {
                    alert(res.data.message);
                }
            })
    }

    const updateGroupCode = () => {
        const formData = new FormData(formRef.current);
        formData.append("oldGroupCode", groupCode);
        formData.append("newGroupCode", groupCode);

        axios.post("/system/groupUpdate", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("수정되었습니다.");
                postSuccess();
            } else {
                alert(res.data.message);
            }
        })
    }

    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        공통코드*
                        <StyledInput type='text' name="groupCode" defaultValue={groupCodeDetail?.groupCode}></StyledInput>
                    </label>
                    <label>
                        공통코드명*
                        <StyledInput type='text' name="groupName" defaultValue={groupCodeDetail?.groupName}></StyledInput>
                    </label>
                    <label>
                        비고*
                        <StyledInput type='text' name="groupNote" defaultValue={groupCodeDetail?.note}></StyledInput>
                    </label>
                    {
                        groupCode?.length > 0 ?
                            (
                                <label>
                                    사용여부*
                                    <StyledSelectBox
                                        options={options}
                                        name="groupUseYn"
                                        defaultValue={groupCodeDetail?.useYn}
                                    />
                                </label>
                            )
                            : (<> </>)
                    }
                    <div className={"button-container"}>
                        <button type='button' onClick={groupCode ? updateGroupCode : saveGroupCode}>
                            {groupCode ? "수정" : "저장"}
                        </button>

                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </CommonCodeModalStyle>
    );
};
