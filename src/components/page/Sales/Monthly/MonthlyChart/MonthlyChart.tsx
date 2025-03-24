import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IMonthly } from "../../../../../models/interface/sales/IMonthly";

interface MonthlyChartProps {
    monthlyListChart: IMonthly[];
}

export const MonthlyChart = ({ monthlyListChart }: MonthlyChartProps) => {
    const monthlyChartData = monthlyListChart.map((monthly) => ({
        date: new Date(monthly.orderDate).toLocaleDateString("ko-KR", { year: "numeric", month: "2-digit" }),
        sales: monthly.totalSupplyPrice.toString(),
        expenses: monthly.totalExpenseAmount.toString(),
    }));

    const sortedMonthlyData = [...monthlyChartData].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return (
        <section className='chart-container' style={{ width: "100%", margin: "0 auto" }}>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={sortedMonthlyData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis width={100} />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='sales' stroke='rgba(255, 99, 132, 1)' name='매출' />
                    <Line type='monotone' dataKey='expenses' stroke='rgba(153, 102, 255, 1)' name='지출' />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};
