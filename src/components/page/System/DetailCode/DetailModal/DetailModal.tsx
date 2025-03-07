import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { DetailModalStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { IDetailCode } from "../DetailCodeMain/DetailCodeMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";


interface IDetailCodeProps {
    detailCode: string,
    setDetailCode: React.Dispatch<React.SetStateAction<string>>,
    postSuccess: () => void;
}

interface IDetailCodeDetail extends IDetailCode {
    useYn: string,
    higherCode: string
}
interface IDetailCodeDetailResponse {
    detail: IDetailCodeDetail
}

export const DetailModal: FC<IDetailCodeProps> = ({ detailCode, setDetailCode, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detailCodeDetail, setDetailCodeDetail] = useState<IDetailCodeDetail>();

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

    return (
        <DetailModalStyled>
            <div className='container'>
                <label>
                    상세코드
                    <StyledInput type='text' defaultValue={detailCodeDetail?.detailCode} readOnly></StyledInput>
                </label>
                <label>
                    상세코드명*
                    <StyledInput type='text' defaultValue={detailCodeDetail?.detailName}></StyledInput>
                </label>
                <label>
                    상위코드
                    <StyledInput type='text' defaultValue={detailCodeDetail?.higherCode}></StyledInput>
                </label>
                <label>
                    사용여부
                    <StyledSelectBox
                        options={options}
                        name="useYn"
                        defaultValue={detailCodeDetail?.useYn}
                    />
                </label>
                <label>
                    비고
                    <StyledInput type='text' defaultValue={detailCodeDetail?.note}></StyledInput>
                </label>
                <div className={"button-container"}>
                    <StyledButton type='button'>저장</StyledButton>
                    <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                </div>
            </div>
        </DetailModalStyled>
    );
};
