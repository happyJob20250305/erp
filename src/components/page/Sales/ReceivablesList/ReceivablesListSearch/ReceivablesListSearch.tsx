import { useContext, useState } from "react";
import { AttendanceContext } from "../../../../../api/Provider/AttendanceProvider";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { ReceivablesListSearchStyled } from "./styled";

export const ReceivablesListSearch = () => {
    const { setSearchKeyword } = useContext(AttendanceContext);
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const [client, setClient] = useState<string>();
    const [product, setProduct] = useState<string>();
    const [selectReceivableValue, setSelectReceivableValue] = useState<string>("");

    const optionStatus = [
        { label: "전체", value: "" },
        { label: "미수금", value: "N" },
        { label: "수금완료", value: "Y" },
    ];

    const handlerSearch = () => {
        setSearchKeyword({
            searchStDate: startDate,
            searchEdDate: endDate,
            clientName: client,
            productName: product,
            receivableStatus: selectReceivableValue,
        });
    };

    return (
        <ReceivablesListSearchStyled>
            <div className='input-group'>
                <label>수주일자</label>
                <StyledInput
                    type='date'
                    onChange={(e) => {
                        setStartDate(e.target.value);
                    }}
                />

                <StyledInput
                    type='date'
                    onChange={(e) => {
                        setEndDate(e.target.value);
                    }}
                />
                <label>수금상태</label>
                <StyledSelectBox
                    options={optionStatus}
                    value={selectReceivableValue}
                    onChange={setSelectReceivableValue}
                />
            </div>
            <div className='input-group'>
                <label>제품명</label>
                <StyledInput
                    type='text'
                    onChange={(e) => {
                        setProduct(e.target.value);
                    }}
                />
                <label>거래처</label>
                <StyledInput
                    type='text'
                    onChange={(e) => {
                        setClient(e.target.value);
                    }}
                />

                <StyledButton variant='secondary' onClick={handlerSearch}>
                    조회
                </StyledButton>
            </div>
        </ReceivablesListSearchStyled>
    );
};
