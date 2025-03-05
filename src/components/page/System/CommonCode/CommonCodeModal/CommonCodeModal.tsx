import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeModalStyle } from "./styled";

export const CommonCodeModal = () => {
    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <label>
                    그룹코드*
                    <StyledInput type='text'></StyledInput>
                </label>
                <label>
                    그룹코드명*
                    <StyledInput type='text'></StyledInput>
                </label>
                <label>
                    그룹코드설명*
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
                    <button type='button'>저장</button>
                    <button type='button'>나가기</button>
                </div>
            </div>
        </CommonCodeModalStyle>
    );
};
