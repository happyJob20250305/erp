import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { useContext, useEffect, useRef, useState } from "react";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { VoucherListContext } from "../../../../../api/Provider/VoucherListProvider";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import axios, { AxiosResponse } from "axios";
import { SearchTable, TableCell, TableRow, VoucherListSearchStyled } from "./styled";

interface IClient {
    id: number;
    clientName: string;
}

interface IClientListBody {
    clientList: IClient[];
}

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

    const voucherClientListSearch = () => {
        axios.post("/account/voucherClientListSearch.do", {}).then((res: AxiosResponse<IClientListBody>) => {
            const getClientList: ISetListOption[] = [
                { label: "전체", value: "" },
                ...res.data.clientList.map((detail: IClient) => ({
                    label: detail.clientName,
                    value: detail.id,
                })),
            ];
            setClientList(getClientList);
        });
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
            <SearchTable>
                <TableRow>
                    <TableCell>
                        <span>신청일자</span>
                        <StyledInput type='date' onChange={(e) => setSearchStDate(e.target.value)} />
                        <span>~</span>
                        <StyledInput type='date' onChange={(e) => setSearchEdDate(e.target.value)} />
                    </TableCell>
                    <TableCell>
                        <span>구분</span>
                        <StyledSelectBox options={searchTypeList} value={searchType} onChange={setSearchType} />
                    </TableCell>
                    <TableCell>
                        <span>거래처명</span>
                        <StyledSelectBox options={clientList} value={selectedClient} onChange={setSelectedClient} />
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <span>차변 계정과목명</span>
                        <StyledInput ref={searchDebitName} />
                    </TableCell>
                    <TableCell>
                        <span>대변 계정과목명</span>
                        <StyledInput ref={searchCrebitName} />
                    </TableCell>
                    <TableCell className='search-button'>
                        <StyledButton variant='secondary' onClick={handlerSearch}>
                            검색
                        </StyledButton>
                    </TableCell>
                </TableRow>
            </SearchTable>
        </VoucherListSearchStyled>
    );
};
