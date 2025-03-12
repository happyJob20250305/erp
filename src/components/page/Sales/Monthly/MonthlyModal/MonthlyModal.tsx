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

ChartJS.register(ArcElement, Tooltip, Legend);

interface IMonthlyModalProps {
    postSuccess: () => void;
}

export const MonthlyModal: FC<IMonthlyModalProps> = ({ postSuccess }) => {
    const { search, pathname } = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [topProduct, setTopProduct] = useState<IMonthlyModalDetail[]>([]);
    const [topClient, setTopClient] = useState<IMonthlyModalDetail[]>([]);

    useEffect(() => {
        monthlyModal();
    }, []);

    const monthlyModal = async () => {
        const searchParam = new URLSearchParams(search);

        const productResult = await searchApi<IMonthlyProductDetail>(Monthly.detail, searchParam);
        if (productResult.detail) {
            setTopProduct(productResult.detail);
        }
        const clientResult = await searchApi<IMonthlyClientDetail>(Monthly.detailClient, searchParam);
        if (clientResult.detailClient) {
            setTopClient(clientResult.detailClient);
        }
    };

    const monthlyModalPieChart = {
        labels: topProduct.map((product) => product.topTitle),
        type: "Pie",
        data: {
            labels: topProduct.map((product) => product.topTitle),
            datasets: [
                {
                    label: "매출",
                    data: topProduct.map((product) => product.totalSupplyPrice),
                    backgroundColor: ["#f27777", "#f5a96c", "#f2c64b", "#a8e3bf", "#9bc6fa"],
                },
            ],
        },
        options: {
            responsive: true,
            legend: { display: true, position: "top" },
        },
    };

    return (
        <MonthlyModalStyled>
            <div className='container'>
                <h2> {pathname === "/sales/monthlyTopProduct.do" ? "매출 상위 제품" : "매출 상위 기업"} </h2>
                {topProduct.length > 0 && (
                    <Pie data={monthlyModalPieChart.data} options={monthlyModalPieChart.options} />
                )}
                <StyledTable>
                    <thead>
                        <tr>
                            <StyledTh>순위</StyledTh>
                            <StyledTh>{pathname === "/sales/monthlyTopProduct.do" ? "제품명" : "기업명"}</StyledTh>

                            <StyledTh>매출액</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {topProduct.length > 0 ? (
                            topProduct.map((product, index) => (
                                <tr key={product.RNUM}>
                                    <StyledTd>{product.RNUM || index + 1}</StyledTd>
                                    <StyledTd>{product.topTitle}</StyledTd>
                                    <StyledTd>{product.totalSupplyPrice.toLocaleString()}</StyledTd>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                            </tr>
                        )}
                    </tbody>
                </StyledTable>
                <StyledButton type='button' onClick={() => setModal(false)}>
                    닫기
                </StyledButton>
            </div>
        </MonthlyModalStyled>
    );
};
