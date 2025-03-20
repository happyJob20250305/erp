import { Bar } from "react-chartjs-2";
import { IDaily } from "../../../../../models/interface/sales/IDaily";

interface DailyChartProps {
    dailyListChart: IDaily[];
}

export const DailyChart = ({ dailyListChart }: DailyChartProps) => {
    const sortedDailyData = [...dailyListChart].sort(
        (a, b) => new Date(a.salesDate).getTime() - new Date(b.salesDate).getTime()
    );

    const chartData = {
        labels: sortedDailyData.map((daily) => daily.salesDate),
        datasets: [
            {
                label: "매출",
                data: sortedDailyData.map((daily) => daily.totalSupplyPrice.toString()),
                backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
                label: "지출",
                data: sortedDailyData.map((daily) => daily.totalExpenseAmount.toString()),
                backgroundColor: "rgba(153, 102, 255, 1)",
            },
            {
                label: "미수금",
                data: sortedDailyData.map((daily) => daily.totalReceivableAmount.toString()),
                backgroundColor: "rgba(54, 162, 235, 1)",
            },
        ],
    };

    return (
        <section className='chart-container' style={{ width: "100%", margin: "0 auto" }}>
            <Bar data={chartData} height={100} />
        </section>
    );
};
