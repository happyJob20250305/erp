import { FC, useEffect, useRef, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeModalStyle } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { IGroupCode } from "../CommonCodeMain/CommonCodeMain";


interface IGroupCodeProps {
    groupCode: string,
    setGroupCode: React.Dispatch<React.SetStateAction<string>>;
}

interface IGroupCodeListResponse {
    detail: IGroupCode
}

export const CommonCodeModal: FC<IGroupCodeProps> = ({ groupCode, setGroupCode }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [groupCodeDetail, setGroupCodeDetail] = useState<IGroupCode>();
    const formRef = useRef<HTMLFormElement>(null);


    useEffect(() => {
        groupCode && searchDetail();

        return () => {
            setGroupCode("");
        }
    }, [])

    const searchDetail = () => {
        console.log(groupCode);
        axios.post("/system/groupDetailBody", { groupCode })
            .then((res: AxiosResponse<IGroupCodeListResponse>) => {
                setGroupCodeDetail(res.data.detail);
            })
    }

    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        공통코드*
                        <StyledInput type='text' defaultValue={groupCodeDetail?.groupCode}></StyledInput>
                    </label>
                    <label>
                        공통코드명*
                        <StyledInput type='text' defaultValue={groupCodeDetail?.groupName}></StyledInput>
                    </label>
                    <label>
                        비고*
                        <StyledInput type='text' defaultValue={groupCodeDetail?.note}></StyledInput>
                    </label>
                    {
                        groupCode?.length > 0 ?
                            (
                                <label>
                                    사용여부*
                                    <div className='radio-group'>
                                        <label>Yes</label>
                                        <StyledInput type='radio' name='useYn' value={"Y"}
                                            checked={groupCodeDetail?.useYn === "Y"} />
                                        <label>No</label>
                                        <StyledInput type='radio' name='useYn' value={"N"}
                                            checked={groupCodeDetail?.useYn === "N"} />
                                    </div>
                                </label>
                            )
                            : (<> </>)
                    }
                    <div className={"button-container"}>
                        <button type='button'>저장</button>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </CommonCodeModalStyle>
    );
};
