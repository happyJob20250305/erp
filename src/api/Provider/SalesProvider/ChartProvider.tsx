import { createContext, useState, useContext, ReactNode } from "react";
import { IDaily } from "../../../models/interface/sales/IDaily";

const ChartDataContext = createContext<any>(null);

export const useChartData = () => useContext(ChartDataContext);

interface ChartDataProviderProps {
    children: ReactNode;
}

export const ChartDataProvider = ({ children }: ChartDataProviderProps) => {
    const [dailyListChart, setDailyListChart] = useState<IDaily[]>([]);

    return (
        <ChartDataContext.Provider value={{ dailyListChart, setDailyListChart }}>{children}</ChartDataContext.Provider>
    );
};
