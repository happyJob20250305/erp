import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { DetailSearchStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";

export const DetailSearch = () => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);

    return (
        <DetailSearchStyled>
            <StyledButton onClick={() => { setModal(!modal) }}>등록</StyledButton>
        </DetailSearchStyled>
    );
};