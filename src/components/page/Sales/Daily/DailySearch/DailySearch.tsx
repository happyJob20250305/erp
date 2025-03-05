import { useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { useNavigate } from "react-router-dom";
import { DailySearchStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { error } from "console";

export const DailySearch = () => {
    const [searchDate, setSearchDate] = useState<string>();
    const [selectedClient, setSelectedClient] = useState<string>("");
    const [clientOptions, setClientOptions] = useState<{ label: string; value: string }[]>([]);
    const navigate = useNavigate();

    //거래처 목록 가져오기
    useEffect(() => {
        axios
            .get("/business/clientNames")
            .then((response) => {
                const clientData = response.data.map((client: { id: number; name: string }) => ({
                    label: client.name,
                    value: String(client.id),
                }));
                setClientOptions([{ label: "전체", value: "" }, ...clientData]);
            })
            .catch((error) => alert("거래처 목록 불러오기 실패"));
    }, []);

    //검색기능
    const dailySearch = () => {
        const query: string[] = [];
        !searchDate || query.push(`orderDate=${searchDate}`);
        !selectedClient || query.push(`clientId=${selectedClient}`);
        //if (selectedClient) query.push(`clientId=${selectedClient}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";
        navigate(`/react/sales/daily${queryString}`);
    };

    return (
        <DailySearchStyled>
            <div className='input-box'>
                거래처명
                <StyledSelectBox options={clientOptions} value={selectedClient} onChange={setSelectedClient} />
                기간 <StyledInput type='date' onChange={(e) => setSearchDate(e.target.value)}></StyledInput>
                <i className='bi bi-arrow-left-circle-fill'></i>
                <StyledButton> 오늘</StyledButton>
                <i className='bi bi-arrow-right-circle-fill'></i>
                <StyledButton variant='secondary' onClick={dailySearch}>
                    조회
                </StyledButton>
            </div>
        </DailySearchStyled>
    );
};
