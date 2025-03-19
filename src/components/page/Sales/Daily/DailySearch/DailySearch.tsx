import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { DailySearchStyled } from "./styled";
import axios from "axios";
import { DailyListContext } from "../../../../../api/Provider/SalesProvider/DailyProvider";

export const DailySearch = () => {
    const { setSearchKeyword } = useContext(DailyListContext);
    const [selectedClient, setSelectedClient] = useState<string>("");
    const [clientOptions, setClientOptions] = useState<{ label: string; value: string }[]>([]);

    const getCurrentDate = () => {
        const now = new Date();
        return now.toISOString().split("T")[0];
    };
    const [searchDate, setSearchDate] = useState<string>(getCurrentDate());

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
        dailySearch();
    }, []);

    const dailySearch = () => {
        setSearchKeyword({
            orderDate: searchDate,
            clientId: selectedClient,
        });
    };

    const getDay = (value: number) => {
        const currentDate = new Date(searchDate);
        currentDate.setDate(currentDate.getDate() + value);
        setSearchDate(currentDate.toISOString().split("T")[0]);
    };

    return (
        <DailySearchStyled>
            <div className='input-box'>
                <label>거래처명</label>
                <StyledSelectBox options={clientOptions} value={selectedClient} onChange={setSelectedClient} />
                <label>기간</label>
                <StyledInput
                    type='date'
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                ></StyledInput>
                <i className='bi bi-arrow-left-circle-fill' onClick={() => getDay(-1)}></i>
                <StyledButton onClick={() => setSearchDate(getCurrentDate())}> 오늘</StyledButton>
                <i className='bi bi-arrow-right-circle-fill' onClick={() => getDay(1)}></i>
                <StyledButton variant='secondary' onClick={dailySearch}>
                    조회
                </StyledButton>
            </div>
        </DailySearchStyled>
    );
};
