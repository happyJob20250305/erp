import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import axios, { Axios, AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";


export interface IGroupCode {
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
    const { searchKeyword } = useContext(CommonCodeContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [groupCode, setGroupCode] = useState<string>("");

    const columns = [
        { key: "groupCode", title: "공통코드" },
        { key: "groupName", title: "공통코드명" },
        { key: "note", title: "비고" },
        { key: "actions", title: "보기" },
    ] as Column<IGroupCode>[];

    useEffect(() => {
        searchCommonList();
    }, [searchKeyword])

    const searchCommonList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios.post("/system/groupListBody", {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        })
            .then((res: AxiosResponse<IGroupCodeListResponse>) => {
                setGroupCodeList(res.data.groupList);
                setGroupCnt(res.data.groupCnt);
                setCPage(currentPage);
            })
    }

    const handlerModal = (id: string) => {
        setModal(!modal);
        setGroupCode(id);
    }

    return (
        <CommonCodeMainStyled>
            <StyledTable
                columns={columns}
                data={groupCodeList}
                hoverable={true}
                fullWidth={true}
                renderAction={(row) =>
                    <StyledButton size="small" onClick={() => { handlerModal(row.groupCode) }}>
                        수정
                    </StyledButton>}
            />
            <PageNavigate
                totalItemsCount={groupCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchCommonList}
            />
            {
                modal && (
                    <Portal>
                        <CommonCodeModal groupCode={groupCode} setGroupCode={setGroupCode} />
                    </Portal>
                )
            }
        </CommonCodeMainStyled>
    );
};
