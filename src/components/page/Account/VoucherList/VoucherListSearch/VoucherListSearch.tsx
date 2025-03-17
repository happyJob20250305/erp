import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useContext, useEffect, useRef, useState } from "react";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { VoucherListContext } from "../../../../../api/Provider/AccountProvider/VoucherListProvider";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { VoucherListSearchStyled } from "./styled";
import { VoucherList } from "../../../../../api/api";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { IClientListBody } from "../../../../../models/interface/account/groupList/IAccountGroup";

export const VoucherListSearch = () => {
    const { setSearchKeyword } = useContext(VoucherListContext);
    const [searchStDate, setSearchStDate] = useState<string>("");
    const [searchEdDate, setSearchEdDate] = useState<string>("");
    const [searchType, setSearchType] = useState<string>("sales");
    const [selectedClient, setSelectedClient] = useState<string>("");
    const searchDebitName = useRef<HTMLInputElement>();
    const searchCrebitName = useRef<HTMLInputElement>();
    const [clientList, setClientList] = useState<ISetListOption[]>([]);
    const searchTypeList: ISetListOption[] = [
        { label: "매출", value: "sales" },
        { label: "비용", value: "expense" },
    ];

    useEffect(() => {
        voucherClientListSearch();
        console.log("searchType changed:", searchType);
    }, [searchType]);

    const voucherClientListSearch = async () => {
        const result = await accountSearchApi<IClientListBody>(VoucherList.searchClientList, {});
        if (result) {
            setClientList(setSelectOption(result.clientList, "clientName", "id", { label: "전체", value: "" }));
        }
    };

    const handlerSearch = () => {
        setSearchKeyword({
            searchStDate: searchStDate,
            searchEdDate: searchEdDate,
            searchType: searchType,
            searchClientName: selectedClient,
            searchDebitName: searchDebitName.current.value,
            searchCrebitName: searchCrebitName.current.value,
            currentPage: 1,
            pageSize: 5,
        });
    };
    return (
        <VoucherListSearchStyled>
            <div className='search-group'>
                <div className='search-bar'>
                    <span>신청일자</span>
                    <StyledInput type='date' onChange={(e) => setSearchStDate(e.target.value)} />
                    <span>~</span>
                    <StyledInput type='date' onChange={(e) => setSearchEdDate(e.target.value)} />
                    <span>거래처명</span>
                    <StyledSelectBox options={clientList} value={selectedClient} onChange={setSelectedClient} />
                </div>

                <div className='search-bar'>
                    <span>차변 계정과목명</span>
                    <StyledInput ref={searchDebitName} />
                    <span>대변 계정과목명</span>
                    <StyledInput ref={searchCrebitName} />
                    <span>구분</span>
                    <StyledSelectBox options={searchTypeList} value={searchType} onChange={setSearchType} />
                </div>
                <div className='button-container'>
                    <StyledButton variant='secondary' onClick={handlerSearch}>
                        조회
                    </StyledButton>
                </div>
            </div>
        </VoucherListSearchStyled>
    );
};
