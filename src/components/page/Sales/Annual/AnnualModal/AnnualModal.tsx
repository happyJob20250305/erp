import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useEffect, useState } from "react";
import {
    IAnnualClientDetail,
    IAnnualModalDetail,
    IAnnualProductDetail,
} from "../../../../../models/interface/sales/IAnnual";
import { Annual } from "../../../../../api/api";
import { searchApi } from "../../../../../api/SalesApi/AnnualApi/searchApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { AnnualModalStyled } from "./styled";

ChartJS.register(ArcElement, Tooltip, Legend);
interface IAnnualModalProps {
    postSuccess: () => void;
    modalType: "product" | "client";
}

export const AnnualModal: React.FC<IAnnualModalProps> = ({ postSuccess, modalType }) => {
    const { search } = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [topProduct, setTopProduct] = useState<IAnnualModalDetail[]>([]);
    const [topClient, setTopClient] = useState<IAnnualModalDetail[]>([]);

    useEffect(() => {
        annualModal();
    }, [search, modalType]);

    const annualModal = async () => {
        const searchParam = new URLSearchParams(search);

        if (modalType === "product") {
            const productResult = await searchApi<IAnnualProductDetail>(Annual.detail, searchParam);
            if (productResult.detail) setTopProduct(productResult.detail);
            console.log("topProduct데이터:", productResult.detail);
        } else {
            const clientResult = await searchApi<IAnnualClientDetail>(Annual.detailClient, searchParam);
            console.log("clientResult", clientResult);
            if (clientResult.detail) setTopClient(clientResult.detail);
            console.log("topClient데이터:", clientResult.detail);
        }
    };

    const chartData = {
        labels: (modalType === "product" ? topProduct : topClient).map((item) => item.topTitle),
        datasets: [
            {
                label: "매출",
                data: (modalType === "product" ? topProduct : topClient).map((item) => item.totalSupplyPrice),
                backgroundColor: ["#f27777", "#f5a96c", "#f2c64b", "#a8e3bf", "#9bc6fa"],
            },
        ],
    };

    return (
        <AnnualModalStyled>
            <div className='container'>
                <h2>{modalType === "product" ? "매출 상위 제품" : "매출 상위 기업"}</h2>
                {(modalType === "product" ? topProduct : topClient).length > 0 ? (
                    <>
                        <Pie data={chartData} options={{ responsive: true }} />
                        <StyledTable>
                            <thead>
                                <tr>
                                    <StyledTh>순위</StyledTh>
                                    <StyledTh>{modalType === "product" ? "제품명" : "기업명"}</StyledTh>
                                    <StyledTh>매출액</StyledTh>
                                </tr>
                            </thead>
                            <tbody>
                                {(modalType === "product" ? topProduct : topClient).map((item, index) => (
                                    <tr key={item.RNUM || index}>
                                        <StyledTd>{item.RNUM || index + 1}</StyledTd>
                                        <StyledTd>{item.topTitle}</StyledTd>
                                        <StyledTd>{item.totalSupplyPrice.toLocaleString()}</StyledTd>
                                    </tr>
                                ))}
                            </tbody>
                        </StyledTable>
                    </>
                ) : (
                    <p>데이터가 존재하지 않습니다.</p>
                )}
                <StyledButton type='button' onClick={() => setModal(false)}>
                    닫기
                </StyledButton>
            </div>
        </AnnualModalStyled>
    );
};
