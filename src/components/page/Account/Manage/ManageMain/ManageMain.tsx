import { useContext, useEffect, useState } from "react";
import { AccountManageContext } from "../../../../../api/Provider/AccountManageProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { ManageMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { ManageModal } from "../ManageModal/ManageModal";

export interface IAccount {
    group_name: string;
    group_code: string;
    detail_code: string;
    detail_name: string;
    use_yn: string;
    content: string;
    code_type: string;
}

interface IAccountBodyResponse {
    account: IAccount[];
    accountCnt: number;
}

export const ManageMain = () => {
    const { searchKeyword } = useContext(AccountManageContext);
    const [accountList, setAccountList] = useState<IAccount[]>([]);
    const [accountCnt, setAccountCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detailCode, setDetailCode] = useState<IAccount>();
    const columns = [
        { key: "group_code", title: "계정대분류코드" },
        { key: "group_name", title: "계정대분류명" },
        { key: "detail_code", title: "계정세부코드", clickable: true },
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

    const handlerModal = (row: IAccount) => {
        setModal(!modal);
        setDetailCode(row);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchAccountList();
    };

    return (
        <ManageMainStyled>
            <StyledTable
                data={accountList}
                columns={columns}
                fullWidth={true}
                onCellClick={(row) => {
                    handlerModal(row);
                }}
            />
            <PageNavigate
                totalItemsCount={accountCnt}
                onChange={searchAccountList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <ManageModal detailCode={detailCode} postSuccess={postSuccess} setDetailCode={setDetailCode} />
                </Portal>
            )}
        </ManageMainStyled>
    );
};
