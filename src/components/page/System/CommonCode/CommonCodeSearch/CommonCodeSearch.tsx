import { useRef } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeSearchStyled } from "./styled";

export const CommonCodeSearch = () => {
    const title = useRef<HTMLInputElement>();

    return (
        <CommonCodeSearchStyled>
            {/* <StyledSelectBox>
            </StyledSelectBox> */}
            <StyledInput ref={title} />
            <StyledButton>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </CommonCodeSearchStyled>
    );
};
