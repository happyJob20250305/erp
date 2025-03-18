import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { IAnnual } from "../../../../../models/interface/sales/IAnnual";

interface AnnualChartProps {
    annualListChart: IAnnual[];
}

export const AnnualChart = ({ annualListChart }: AnnualChartProps) => {
    const annualChartData = annualListChart.map((annual) => ({
        date: annual.orderDate,
        sales: annual.totalSupplyPrice.toString(),
        expenses: annual.totalExpenseAmount.toString(),
    }));

    return (
        <section className='chart-container' style={{ width: "50%", margin: "0 auto" }}>
            <ResponsiveContainer width='100%' height={300}>
                <LineChart data={annualChartData}>
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type='monotone' dataKey='sales' stroke='rgba(255, 99, 132, 1)' name='매출' />
                    <Line type='monotone' dataKey='expenses' stroke='rgba(153, 102, 255, 1)' name='지출' />
                </LineChart>
            </ResponsiveContainer>
        </section>
    );
};
