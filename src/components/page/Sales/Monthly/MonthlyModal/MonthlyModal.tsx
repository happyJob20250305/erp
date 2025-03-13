import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import {
    IMonthlyClientDetail,
    IMonthlyModalDetail,
    IMonthlyProductDetail,
} from "../../../../../models/interface/IMonthly";
import { MonthlyModalStyled } from "./styled";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import axios, { AxiosResponse } from "axios";
import { useLocation } from "react-router-dom";
import { searchApi } from "../../../../../api/MonthlyApi/searchApi";
import { Monthly } from "../../../../../api/api";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Modal } from "react-bootstrap";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IMonthlyModalProps {
    postSuccess: () => void;
    modalType: "product" | "client";
}
export const MonthlyModal: React.FC<IMonthlyModalProps> = ({ postSuccess, modalType }) => {
    const { search } = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [topProduct, setTopProduct] = useState<IMonthlyModalDetail[]>([]);
    const [topClient, setTopClient] = useState<IMonthlyModalDetail[]>([]);

    useEffect(() => {
        monthlyModal();
    }, [search, modalType]);

    const monthlyModal = async () => {
        const searchParam = new URLSearchParams(search);

        if (modalType === "product") {
            const productResult = await searchApi<IMonthlyProductDetail>(Monthly.detail, searchParam);
            if (productResult.detail) setTopProduct(productResult.detail);
            console.log("topProduct데이터:", productResult.detail);
        } else {
            const clientResult = await searchApi<IMonthlyClientDetail>(Monthly.detailClient, searchParam);
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
        <MonthlyModalStyled>
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
                    <p>데이터를 불러오는 중...</p>
                )}
                <StyledButton type='button' onClick={() => setModal(false)}>
                    닫기
                </StyledButton>
            </div>
        </MonthlyModalStyled>
    );
};
