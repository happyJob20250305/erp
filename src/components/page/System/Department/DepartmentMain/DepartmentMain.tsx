import { useContext, useEffect, useState } from "react"
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { DepartmentMainStyled } from "./styled";
import { SystemContext } from "../../../../../api/Provider/SystemProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { DepartmentModal } from "../DepartmentModal/DepartmentModal";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { Department } from "../../../../../api/api";


export interface IDepartment {
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
    const { searchKeyword } = useContext(SystemContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detailCode, setDetailCode] = useState<string>("");

    const columns = [
        { key: "detailCode", title: "부서코드" },
        { key: "detailName", title: "부서명" },
    ] as Column<IDepartment>[];

    useEffect(() => {
        searchDepartmentList();
    }, [searchKeyword])

    const searchDepartmentList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<IDepartmentListBodyResponse>(Department.searchDepartmentList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        })

        if (result) {
            setDepartmentList(result.departmentList);
            setDepartmentCnt(result.departmentCnt);
            setCPage(currentPage);
        }
    }

    const handlerModal = (id: string) => {
        setModal(!modal);
        setDetailCode(id);
    }

    const postSuccess = () => {
        setModal(!modal);
        searchDepartmentList();
    }

    return (
        <DepartmentMainStyled>
            <StyledTable
                columns={columns}
                data={departmentList}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row, column) => {
                    handlerModal(row.detailCode)
                }}
            />
            <PageNavigate
                totalItemsCount={departmentCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchDepartmentList}
            />
            {
                modal && (
                    <Portal>
                        <DepartmentModal detailCode={detailCode} setDetailCode={setDetailCode} postSuccess={postSuccess} />
                    </Portal>
                )
            }
        </DepartmentMainStyled>
    )
}