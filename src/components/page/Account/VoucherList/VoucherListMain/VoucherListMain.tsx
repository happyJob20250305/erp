import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { VoucherListContext } from "../../../../../api/Provider/VoucherListProvider";
import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import axios, { AxiosResponse } from "axios";
import { VoucherListMainStyled } from "./styled";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../../common/potal/Portal";
import { VoucherListModal } from "../VoucherListModal/VoucherListModal";

export interface IVoucher {
    voucher_no: string;
    voucher_date: string;
    account_type: string;
    client_name: string;
    debit_name: string;
    crebit_name: string;
    voucher_amount: number;
    order_id: number;
    exp_id: number;
    emp_name: string;
}

interface IVocherResponseBody {
    voucher: IVoucher[];
    voucherCnt: number;
}

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
        Object.keys(searchKeyword).length && searchVoucherList();
    }, [searchKeyword]);

    const searchVoucherList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        axios
            .post("/account/voucherListBody.do", {
                ...searchKeyword,
                pageSize: 5,
                currentPage,
            })
            .then((res: AxiosResponse<IVocherResponseBody>) => {
                setVoucherList(res.data.voucher);
                setVoucherListCnt(res.data.voucherCnt);
                setCPage(currentPage);
            });
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
                    <VoucherListModal voucherDetail={voucherDetail} setVoucherDetail={setVoucherDetail} />
                </Portal>
            )}
        </VoucherListMainStyled>
    );
};
