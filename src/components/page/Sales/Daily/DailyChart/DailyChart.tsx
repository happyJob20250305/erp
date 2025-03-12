import axios from "axios";
import { useEffect, useState } from "react";
import { IDaily } from "../../../../../models/interface/IDaily";
import { Bar } from "react-chartjs-2";

interface DailyChartProps {
    dailyListChart: IDaily[];
}

export const DailyChart = ({ dailyListChart }: DailyChartProps) => {
    const chartData = {
        labels: dailyListChart.map((daily) => daily.salesDate),
        datasets: [
            {
                label: "매출",
                data: dailyListChart.map((daily) => daily.totalSupplyPrice.toString()),
                backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
                label: "지출",
                data: dailyListChart.map((daily) => daily.totalExpenseAmount.toString()),
                backgroundColor: "rgba(153, 102, 255, 1)",
            },
            {
                label: "미수금",
                data: dailyListChart.map((daily) => daily.totalReceivableAmount.toString()),
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
        ],
    };

    return (
        <section className='chart-container' style={{ width: "50%", margin: "0 auto" }}>
            <h2>매출 현황 차트</h2>
            <Bar data={chartData} height={100} />
        </section>
    );
};
