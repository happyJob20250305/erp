import { useContext, useEffect, useState } from "react";
import { StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { AccountManageContext } from "../../../../../api/Provider/AccountManageProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useNavigate } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ManageMainStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";

export interface IAccount {
    group_name: string;
    group_code: string;
    detail_code: string;
    detail_name: string;
    use_yn: string;
    content: string;
    code_type: string;
}

export interface IAccountGroupList {
    group_name: string;
    group_code: string;
}

interface IAccountBodyResponse {
    account: IAccount[];
    accountCnt: number;
    accountGroupList: IAccountGroupList[];
}

export const ManageMain = () => {
    const { searchKeyword } = useContext(AccountManageContext);
    const [accountList, setAccountList] = useState<IAccount[]>([]);
    const [accountCnt, setAccountCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();

    const columns = [
        { key: "group_code", title: "계정대분류코드", clickable: true },
        { key: "group_name", title: "계정대분류명" },
        { key: "detail_code", title: "계정세부코드" },
        { key: "detail_name", title: "계정세부명" },
        { key: "code_type", title: "구분" },
        { key: "content", title: "상세내용" },
        { key: "use_yn", title: "사용여부" },
    ] as Column<IAccount>[];

    useEffect(() => {
        searchAccountList();
    }, [searchKeyword]);

    const searchAccountList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/account/accountListBody.do", {
                ...searchKeyword,
                pageSize: 5,
                currentPage,
            })
            .then((res: AxiosResponse<IAccountBodyResponse>) => {
                setAccountList(res.data.account);
                setAccountCnt(res.data.accountCnt);
                setCPage(currentPage);
            });
    };

    const handlerModal = (detail_code: string) => {
        setModal(!modal);
    };

    return (
        <ManageMainStyled>
            총 갯수 : {accountCnt} 현재 페이지 : {cPage}
            <StyledTable
                data={accountList}
                columns={columns}
                renderAction={(row) => (
                    <StyledButton size='small' onClick={() => handlerModal(row.detail_code)}>
                        수정
                    </StyledButton>
                )}
                onCellClick={(row, column) => {
                    if (column === "detail_code") {
                        navigate(`${row.detail_code}`, { state: { groupCode: row.detail_code } });
                    }
                }}
            />
            <PageNavigate
                totalItemsCount={accountCnt}
                onChange={searchAccountList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
        </ManageMainStyled>
    );
};
