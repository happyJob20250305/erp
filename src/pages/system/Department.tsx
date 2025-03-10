import { SystemProvider } from "../../api/Provider/SystemProvider"
import { ContentBox } from "../../components/common/ContentBox/ContentBox"
import { DepartmentMain } from "../../components/page/System/Department/DepartmentMain/DepartmentMain"
import { DepartmentSearch } from "../../components/page/System/Department/DepartmentSearch/DepartmentSearch"


export const Department = () => {
    return (
        <SystemProvider>
            <ContentBox variant='primary' fontSize='large'>
                부서 관리
            </ContentBox>
            <DepartmentSearch></DepartmentSearch>
            <DepartmentMain></DepartmentMain>
        </SystemProvider>
    )
}