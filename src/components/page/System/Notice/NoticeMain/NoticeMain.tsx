import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";

export const NoticeMain = () => {
    return (
        <>
            총 갯수 : 현재 페이지 : 0
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={50}>제목</StyledTh>
                        <StyledTh size={10}>작성자</StyledTh>
                        <StyledTh size={20}>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                    </tr>
                </tbody>
            </StyledTable>
        </>
    );
};
