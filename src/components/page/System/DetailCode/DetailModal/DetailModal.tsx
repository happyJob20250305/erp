import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { DetailModalStyled } from "./styled";

export const DetailModal = () => {
    return (
        <DetailModalStyled>
            <div className='container'>
                <label>
                    그룹코드*
                    <StyledInput type='text' readOnly></StyledInput>
                </label>
                <label>
                    상세코드*
                    <StyledInput type='text'></StyledInput>
                </label>
                <label>
                    상세코드명*
                    <StyledInput type='text'></StyledInput>
                </label>
                <label>
                    상세코드설명*
                    <StyledInput type='text'></StyledInput>
                </label>
                <label>
                    사용여부*
                    <div className='radio-group'>
                        <label>Yes</label>
                        <StyledInput type='radio' name='useYn' value={"Y"} />

                        <label>No</label>
                        <StyledInput type='radio' name='useYn' value={"N"} />
                    </div>
                </label>
                <div className={"button-container"}>
                    <StyledButton type='button'>저장</StyledButton>
                    <StyledButton type='button'>나가기</StyledButton>
                </div>
            </div>
        </DetailModalStyled>
    );
};
