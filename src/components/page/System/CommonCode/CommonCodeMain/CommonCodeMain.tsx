import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";
import { useNavigate } from "react-router-dom";
import { SystemContext } from "../../../../../api/Provider/SystemProvider";


export interface IGroupCode {
    groupCode: string,
    groupName: string,
    note: string,
    useYn: "Y" | "N",
}

interface IGroupCodeListResponse {
    groupList: IGroupCode[],
    groupCnt: number
}

export const CommonCodeMain = () => {
    const [groupCodeList, setGroupCodeList] = useState<IGroupCode[]>([]);
    const [groupCnt, setGroupCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const { searchKeyword } = useContext(SystemContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [groupCode, setGroupCode] = useState<string>("");
    const navigate = useNavigate();

    const columns = [
        { key: "groupCode", title: "공통코드" },
        { key: "groupName", title: "공통코드명" },
        { key: "note", title: "비고" },
        { key: "actions", title: "보기" },
    ] as Column<IGroupCode>[];

    useEffect(() => {
        searchGroupCodeList();
    }, [searchKeyword])

    const searchGroupCodeList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios.post("/system/groupListBody", {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        }).then((res: AxiosResponse<IGroupCodeListResponse>) => {
            setGroupCodeList(res.data.groupList);
            setGroupCnt(res.data.groupCnt);
            setCPage(currentPage);
        })
    }

    const handlerModal = (id: string, e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation()
        setModal(!modal);
        setGroupCode(id);
    }

    const postSuccess = () => {
        setModal(!modal);
        searchGroupCodeList();
    }

    return (
        <CommonCodeMainStyled>
            <StyledTable
                columns={columns}
                data={groupCodeList}
                hoverable={true}
                fullWidth={true}
                renderAction={(row) =>
                    <StyledButton size="small" onClick={(e) => { handlerModal(row.groupCode, e) }}>
                        수정
                    </StyledButton>}
                onCellClick={(row, column) => {
                    navigate(`${row.groupCode}`, { state: { groupCode: row.groupCode } })
                }}
            />
            <PageNavigate
                totalItemsCount={groupCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchGroupCodeList}
            />
            {
                modal && (
                    <Portal>
                        <CommonCodeModal groupCode={groupCode} setGroupCode={setGroupCode} postSuccess={postSuccess} />
                    </Portal>
                )
            }
        </CommonCodeMainStyled>
    );
};
