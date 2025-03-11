import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { DetailModalStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IDetailCode } from "../DetailCodeMain/DetailCodeMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { useLocation } from "react-router-dom";
import { nullCheck } from "../../../../../common/nullCheck";

interface IDetailCodeProps {
    detailCode: string,
    setDetailCode: React.Dispatch<React.SetStateAction<string>>,
    postSuccess: () => void;
}

interface IDetailCodeDetail extends IDetailCode {
    useYn: "Y" | "N",
    higherCode: string
}
interface IDetailCodeDetailResponse {
    detail: IDetailCodeDetail
}

interface IPostResponse {
    result: string
    message?: string
}

export const DetailModal: FC<IDetailCodeProps> = ({ detailCode, setDetailCode, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detailCodeDetail, setDetailCodeDetail] = useState<IDetailCodeDetail>();
    const formRef = useRef<HTMLFormElement>(null);
    const { state } = useLocation();

    const options = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ]

    useEffect(() => {
        detailCode && searchDetail();

        return () => {
            setDetailCode("");
        }
    }, [])

    const searchDetail = () => {
        axios.post("/system/detailDetailBody", { detailCode })
            .then((res: AxiosResponse<IDetailCodeDetailResponse>) => {
                setDetailCodeDetail(res.data.detail)
            })
    }

    const saveDetailCode = () => {
        const formData = new FormData(formRef.current);
        formData.append("groupCode", state.groupCode);

        if (nullCheck([
            { inval: formData.get("detailCode").toString(), msg: "상세코드를 입력해주세요." },
            { inval: formData.get("detailName").toString(), msg: "상세코드명을 입력해주세요." }
        ]))

            axios.post("/system/detailSave", formData)
                .then((res: AxiosResponse<IPostResponse>) => {
                    if (res.data.result === "success") {
                        alert("저장되었습니다.");
                        postSuccess();
                    } else {
                        alert(res.data.message);
                    }
                })
    }

    const updateDetailCode = () => {
        const formData = new FormData(formRef.current);
        formData.append("oldDetailCode", detailCode);
        formData.append("newDetailCode", formData.get("detailCode"));

        if (nullCheck([
            { inval: formData.get("detailCode").toString(), msg: "상세코드를 입력해주세요." },
            { inval: formData.get("detailName").toString(), msg: "상세코드명을 입력해주세요." }
        ]))

            axios.post("/system/detailUpdate", formData)
                .then((res: AxiosResponse<IPostResponse>) => {
                    if (res.data.result === "success") {
                        alert("수정되었습니다.");
                        postSuccess();
                    } else {
                        alert(res.data.message);
                    }
                })
    }

    return (
        <DetailModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        상세코드*
                        <StyledInput type='text' name="detailCode" defaultValue={detailCodeDetail?.detailCode} />
                    </label>
                    <label>
                        상세코드명*
                        <StyledInput type='text' name="detailName" defaultValue={detailCodeDetail?.detailName} />
                    </label>
                    <label>
                        상위코드
                        <StyledInput type='text' name="higher_code" defaultValue={detailCodeDetail?.higherCode} />
                    </label>
                    {
                        detailCode ?
                            (
                                <label>
                                    사용여부
                                    <StyledSelectBox
                                        options={options}
                                        name="detailUseYn"
                                        defaultValue={detailCodeDetail?.useYn}
                                    />
                                </label>
                            )
                            : (<></>)
                    }
                    <label>
                        비고
                        <StyledInput type='text' name="detailNote" defaultValue={detailCodeDetail?.note} />
                    </label>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={detailCode ? updateDetailCode : saveDetailCode}>
                            {detailCode ? "수정" : "저장"}
                        </StyledButton>
                        <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </DetailModalStyled>
    );
};
