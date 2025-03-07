import { useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { DetailCodeMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { useLocation } from "react-router-dom";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";


interface IDetailCode {
    groupCode: string,
    groupName: string,
    note: string,
}

interface IDetailCodeListResponse {
    detailList: IDetailCode[],
    detailCnt: number
}

export const DetailCodeMain = () => {
    const { state } = useLocation();
    const [detailList, setDetailList] = useState<IDetailCode[]>([]);
    const [detailCnt, setDetailCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const columns = [
        { key: "groupCode", title: "공통코드" },
        { key: "detailCode", title: "상세코드" },
        { key: "detailName", title: "상세코드명" },
        { key: "note", title: "비고" },
        { key: "actions", title: "보기" },
    ] as Column<IDetailCode>[];

    useEffect(() => {
        searchDetailCodeList();
    }, [])

    const searchDetailCodeList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios.post("/system/detailListBody", {
            groupCode: state.groupCode,
            pageSize: 5,
            currentPage,
        }).then((res: AxiosResponse<IDetailCodeListResponse>) => {
            setDetailList(res.data.detailList);
            setDetailCnt(res.data.detailCnt);
            setCPage(currentPage);
        })
    }

    return (
        <DetailCodeMainStyled>
            <StyledTable
                columns={columns}
                data={detailList}
                hoverable={true}
                fullWidth={true}
                renderAction={(row) =>
                    <StyledButton size="small" onClick={(e) => { }}>
                        수정
                    </StyledButton>}
            />
            <PageNavigate
                totalItemsCount={detailCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchDetailCodeList}
            />
            <StyledButton>뒤로가기</StyledButton>
        </DetailCodeMainStyled>
    );
};
