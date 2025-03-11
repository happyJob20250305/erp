import { FC, useRef, useState } from "react";
import { SalesModalStyle } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";

interface ISalesModalProps {
    planNum: number;
    setPlanNum: React.Dispatch<React.SetStateAction<number>>;
    postSucces: () => void;
}

export const SalesModal: FC<ISalesModalProps> = ({ planNum, setPlanNum, postSucces }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

    return (
        <SalesModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        직원아이디
                        <StyledInput type='text' defaultValue={userInfo.loginId}></StyledInput>
                    </label>
                    <label>
                        직원이름
                        <StyledInput type='text' defaultValue={userInfo.userNm}></StyledInput>
                    </label>
                    <label>
                        거래처
                        <StyledInput type='text'></StyledInput>
                    </label>
                    <label>
                        목표날짜
                        <StyledInput type='date'></StyledInput>
                    </label>
                    <label>
                        제조업체
                        <StyledSelectBox
                    options={mainCategoryOptions}
                    value={selectMaincategory}
                    onChange={(value: string) => {
                        setSelectMaincategory(value);
                        setSelectSubcategory("");
                        setSelectProduct("");
                    }}
                    </label>
                    <label>
                        대분류
                        <StyledInput type='text'></StyledInput>
                    </label>
                    <label>
                        소분류
                        <StyledInput type='text'></StyledInput>
                    </label>
                    <label>
                        제품명
                        <StyledInput type='text'></StyledInput>
                    </label>
                    <label>
                        목표수량
                        <StyledInput type='text'></StyledInput>
                    </label>
                    <label>
                        비고
                        <StyledInput type='text'></StyledInput>
                    </label>
                    <div className={"button-container"}>
                        <StyledButton type='button'>등록</StyledButton>
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </SalesModalStyle>
    );
};
