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
import { IAccount, IAccountBodyResponse } from "../../../../../models/interface/Account/Manage/IAccount";
import { accountSearchApi } from "../../../../../api/Account/ManageApi/accountSearchApi";
import { ManageApi } from "../../../../../api/api";

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

    const searchAccountList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await accountSearchApi<IAccountBodyResponse>(ManageApi.searchAccountList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setAccountList(result.account);
            setAccountCnt(result.accountCnt);
            setCPage(currentPage);
        }
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
