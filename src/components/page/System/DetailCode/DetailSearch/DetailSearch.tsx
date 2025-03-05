import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { DetailSearchStyled } from "./styled";

export const DetailSearch = () => {
    return (
        <DetailSearchStyled>
            <div>
                <div className='flex space-x-4'>
                    <div>
                        <select>
                            <option>상세코드명</option>
                            <option>상세코드</option>
                        </select>
                        <input />
                        <StyledButton>검색</StyledButton>
                        <StyledButton>등록</StyledButton>
                    </div>
                </div>
            </div>
        </DetailSearchStyled>
    );
};
