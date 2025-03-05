import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { DetailCodeMainStyled } from "./styled";

export const DetailCodeMain = () => {
    return (
        <DetailCodeMainStyled>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>그룹코드</th>
                        <th>상세코드</th>
                        <th>상세코드명</th>
                        <th>상세코드설명</th>
                        <th>사용여부</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={7}>조회 내역이 없습니다.</td>
                    </tr>
                </tbody>
            </table>
            <StyledButton>뒤로가기</StyledButton>
        </DetailCodeMainStyled>
    );
};
