import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useContext, useEffect, useState } from "react";
import {
    IAnnualClientDetail,
    IAnnualModalDetail,
    IAnnualProductDetail,
} from "../../../../../models/interface/sales/IAnnual";
import { Annual } from "../../../../../api/api";
import { searchApi } from "../../../../../api/SalesApi/AnnualApi/searchApi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { AnnualModalStyled, AnnualStyledTable, StyledTd, StyledTh } from "./styled";
import { AnnualListContext } from "../../../../../api/Provider/SalesProvider/AnnualProvider";

ChartJS.register(ArcElement, Tooltip, Legend);

interface IAnnualModalProps {
    postSuccess: () => void;
    modalType: "product" | "client";
}

export const AnnualModal: React.FC<IAnnualModalProps> = ({ postSuccess, modalType }) => {
    const { searchKeyword } = useContext(AnnualListContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [topProduct, setTopProduct] = useState<IAnnualModalDetail[]>([]);
    const [topClient, setTopClient] = useState<IAnnualModalDetail[]>([]);

    useEffect(() => {
        annualModal();
    }, [searchKeyword, modalType]);

    const annualModal = async () => {
        if (modalType === "product") {
            const productResult = await searchApi<IAnnualProductDetail>(Annual.detail, {
                ...searchKeyword,
            });
            if (productResult.detail) setTopProduct(productResult.detail);
        } else {
            const clientResult = await searchApi<IAnnualClientDetail>(Annual.detailClient, {
                ...searchKeyword,
            });
            if (clientResult.detail) setTopClient(clientResult.detail);
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
                <i className='bi bi-x-lg' onClick={() => setModal(false)}></i>
                <h2>{modalType === "product" ? "매출 상위 제품" : "매출 상위 기업"}</h2>
                {(modalType === "product" ? topProduct : topClient).length > 0 ? (
                    <>
                        <Pie data={chartData} options={{ responsive: true }} />
                        <AnnualStyledTable>
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
                        </AnnualStyledTable>
                    </>
                ) : (
                    <p>데이터가 존재하지 않습니다.</p>
                )}
            </div>
        </AnnualModalStyled>
    );
};
