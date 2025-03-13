import { EmployeeDetailProvider } from "../../api/Provider/EmployeeProvider/EmployeeDetailModalProvider";
import { EmployeeRetirementModalProvider } from "../../api/Provider/EmployeeProvider/EmployeeRetirementModalProvider";
import { EmployeeSearchProvider } from "../../api/Provider/EmployeeProvider/EmployeeSearchProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { EmplyoeeMain } from "../../components/page/Personnel/employee/EmployeeMain/EmployeeMain";
import { EmployeeSearch } from "../../components/page/Personnel/employee/EmployeSearch/EmployeeSearch";

export const Employee = () => {
    return (
        <>
            <EmployeeSearchProvider>
                <EmployeeDetailProvider>
                    <EmployeeRetirementModalProvider>
                        <ContentBox>인사 관리</ContentBox>
                        <EmployeeSearch />
                        <EmplyoeeMain />
                    </EmployeeRetirementModalProvider>
                </EmployeeDetailProvider>
            </EmployeeSearchProvider>
        </>
    );
};
