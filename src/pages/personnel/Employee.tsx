import { EmployeeDetailProvider } from "../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { EmplyoeeMain } from "../../components/page/Personnel/employee/EmployeeMain/EmployeeMain";
import { EmployeeSearch } from "../../components/page/Personnel/employee/EmployeSearch/EmployeeSearch";

export const Employee = () => {
    return (
        <>
            <EmployeeDetailProvider>
                <ContentBox>인사 관리</ContentBox>
                <EmployeeSearch />
                <EmplyoeeMain />
            </EmployeeDetailProvider>
        </>
    );
};
