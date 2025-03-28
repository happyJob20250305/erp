import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";
import { useNavigate } from "react-router-dom";
import { SystemContext } from "../../../../../api/Provider/SystemProvider";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { CommonCode } from "../../../../../api/api";
import { IGroupCode } from "../../../../../models/interface/system/commoncode/IGroupCode";

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

    const searchGroupCodeList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IGroupCodeListResponse>(CommonCode.searchGroupCodeList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        })

        if (result) {
            setGroupCodeList(result.groupList);
            setGroupCnt(result.groupCnt);
            setCPage(currentPage);
        }
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
