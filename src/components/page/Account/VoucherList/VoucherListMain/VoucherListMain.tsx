import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { VoucherListContext } from "../../../../../api/Provider/VoucherListProvider";
import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { VoucherListMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { VoucherListModal } from "../VoucherListModal/VoucherListModal";
import { IVocherResponseBody, IVoucher } from "../../../../../models/interface/account/voucherList/IVoucher";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { VoucherList } from "../../../../../api/api";

export const VoucherListMain = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const { searchKeyword } = useContext(VoucherListContext);
    const [voucherList, setVoucherList] = useState<IVoucher[]>([]);
    const [voucherListCnt, setVoucherListCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [voucherDetail, setVoucherDetail] = useState<IVoucher>();
    const columns = [
        { key: "voucher_no", title: "전표번호" },
        { key: "voucher_date", title: "일자" },
        { key: "account_type", title: "구분" },
        { key: "client_name", title: "거래처" },
        { key: "debit_name", title: "차변계정과목" },
        { key: "crebit_name", title: "대변계정과목" },
        { key: "voucher_amount", title: "장부금액" },
    ] as Column<IVoucher>[];

    useEffect(() => {
        // searchKeyword가 없을 때 500error 방지
        Object.keys(searchKeyword).length && searchVoucherList();
    }, [searchKeyword]);

    const searchVoucherList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await accountSearchApi<IVocherResponseBody>(VoucherList.searchVoucherList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setVoucherList(result.voucher);
            setVoucherListCnt(result.voucherCnt);
            setCPage(currentPage);
        }
    };

    const handlerModal = (row: IVoucher) => {
        setModal(!modal);
        setVoucherDetail(row);
    };

    return (
        <VoucherListMainStyled>
            <StyledTable
                data={voucherList}
                columns={columns}
                fullWidth={true}
                onCellClick={(row) => {
                    handlerModal(row);
                }}
            />
            <PageNavigate
                totalItemsCount={voucherListCnt}
                onChange={searchVoucherList}
                itemsCountPerPage={5}
                activePage={cPage}
            />
            {modal && (
                <Portal>
                    <VoucherListModal voucherDetail={voucherDetail} />
                </Portal>
            )}
        </VoucherListMainStyled>
    );
};
