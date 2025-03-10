import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { DepartmentMainStyled } from "./styled";


interface IDepartment {
    detailCode: string,
    detailName: string
}

interface IDepartmentListBodyResponse {
    departmentList: IDepartment[],
    departmentCnt: number
}

export const DepartmentMain = () => {
    const [departmentList, setDepartmentList] = useState<IDepartment[]>([]);
    const [departmentCnt, setDepartmentCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);

    const columns = [
        { key: "detailCode", title: "부서코드" },
        { key: "detailName", title: "부서명" },
    ] as Column<IDepartment>[];

    useEffect(() => {
        searchDepartmentList();
    }, [])

    const searchDepartmentList = (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams();
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        axios.post("/system/departmentListBody", searchParam)
            .then((res: AxiosResponse<IDepartmentListBodyResponse>) => {
                setDepartmentList(res.data.departmentList);
                setDepartmentCnt(res.data.departmentCnt);
                setCPage(currentPage);
            })
    }

    return (
        <DepartmentMainStyled>
            <StyledTable
                columns={columns}
                data={departmentList}
                hoverable={true}
                fullWidth={true}
            />
            <PageNavigate
                totalItemsCount={departmentCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchDepartmentList}
            />
        </DepartmentMainStyled>
    )
}