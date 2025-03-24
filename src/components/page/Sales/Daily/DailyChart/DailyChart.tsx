import { Bar } from "react-chartjs-2";
import { IDaily } from "../../../../../models/interface/sales/IDaily";

interface DailyChartProps {
    dailyListChart: IDaily[];
}

export const DailyChart = ({ dailyListChart }: DailyChartProps) => {
    const groupedData: Record<string, { supply: number; expense: number; receivable: number }> = {};

    dailyListChart.forEach(({ salesDate, totalSupplyPrice, totalExpenseAmount, totalReceivableAmount }) => {
        if (!groupedData[salesDate]) {
            groupedData[salesDate] = { supply: 0, expense: 0, receivable: 0 };
        }
        groupedData[salesDate].supply += Number(totalSupplyPrice);
        groupedData[salesDate].expense += Number(totalExpenseAmount);
        groupedData[salesDate].receivable += Number(totalReceivableAmount);
    });

    const sortedDates = Object.keys(groupedData).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

    const chartData = {
        labels: sortedDates,
        datasets: [
            {
                label: "매출",
                data: sortedDates.map((date) => groupedData[date].supply),
                backgroundColor: "rgba(255, 99, 132, 1)",
            },
            {
                label: "지출",
                data: sortedDates.map((date) => groupedData[date].expense),
                backgroundColor: "rgba(153, 102, 255, 1)",
            },
            {
                label: "미수금",
                data: sortedDates.map((date) => groupedData[date].receivable),
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
