import { useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import axios, { Axios, AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";


interface IGroupCode {
    groupCode: string,
    groupName: string,
    note: string,
    useYn: null,
}

interface IGroupCodeListResponse {
    groupList: IGroupCode[],
    groupCnt: number
}

export const CommonCodeMain = () => {
    const [groupCodeList, setGroupCodeList] = useState<IGroupCode[]>([]);
    const [groupCnt, setGroupCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const columns = [
        { key: "groupCode", title: "공통코드" },
        { key: "groupName", title: "공통코드명" },
        { key: "note", title: "비고" },
        { key: "actions", title: "보기" },
    ] as Column<IGroupCode>[];

    useEffect(() => {
        searchCommonList();
    }, [])

    const searchCommonList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams();
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        axios.post("/system/groupListBody", searchParam)
            .then((res: AxiosResponse<IGroupCodeListResponse>) => {
                setGroupCodeList(res.data.groupList);
                setGroupCnt(res.data.groupCnt);
                setCPage(currentPage);
            })
    }

    return (
        <CommonCodeMainStyled>
            <StyledTable
                columns={columns}
                data={groupCodeList}
                hoverable={true}
                fullWidth={true}
                renderAction={(row) => <StyledButton size="small">
                    수정
                </StyledButton>}
            />
        </CommonCodeMainStyled>
    );
};
