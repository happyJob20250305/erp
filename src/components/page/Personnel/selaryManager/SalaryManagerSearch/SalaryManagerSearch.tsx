import { useEffect, useRef, useState } from "react";
import { SalalyListSearchStyled } from "../../salaryList/SalaryListSearch/styled";

import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";

import { SalalyManagerSearchStyled } from "./styled";
import {
    IDepartmentGroupItem,
    IGroupListResponse,
    IJobGradeGroupItem,
} from "../../../../../models/interface/personnel/salary/IOptionList";
import { postApiNoPram } from "../../../../../api/PersonnelApi/postApi";
import { SalaryOptionList } from "../../../../../api/api";

export const SalaryManagerSearch = () => {
    // 상위 컴포넌트에서 받아올 Props 타입 정의

    //사원명
    const [searchEmployeeName, setSearchEmployeeName] = useState<string>("");
    // 부서
    const [department, setDepartment] = useState<string>("");
    //지급 여부
    const [searchPaymentStatus, setSearchPaymentStatus] = useState<number>();
    //급여 연월
    const [searchPaymentMonth, setSearchPaymentMonth] = useState<string>("");
    //직급
    const [jobGrade, setJobGrade] = useState<string>("");

    //DepartmentGroupItem
    const [DepartmentGroupItem, setDepartmentGroupItem] = useState<IDepartmentGroupItem[]>([]);

    //JobGradeGroupItem
    const [JobGradeGroupItem, setGradeGroupItem] = useState<IJobGradeGroupItem[]>([]);

    // 컴포넌트 마운트 시점에 옵션 목록 조회
    useEffect(() => {
        getOptionList();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchEmployeeName(e.target.value); // 입력값을 state로 반영
    };

    const getOptionList = async () => {
        const result = await postApiNoPram<IGroupListResponse>(SalaryOptionList.optionList);

        if (result) {
            setDepartmentGroupItem(result.DepartmentGroupList);
            setGradeGroupItem(result.JobGradeGroupList);
            console.log(result);
        }
    };

    // "검색" 버튼 클릭 시, 부모에서 내려준 onSearch에 현재 검색값을 전달
    // const handleSearchClick = () => {
    //     onSearch({
    //         searchEmployeeName,
    //         searchPaymentMonth,
    //         department,
    //         jobGrade,
    //         searchPaymentStatus,
    //     });
    // };

    // 2) SelectBox에서 사용할 옵션 배열 생성
    //    (label, value) 형태를 StyledSelectBox에 맞춰 변환
    const departmentOptions = DepartmentGroupItem.map((item) => ({
        label: item.departmentDetailName,
        value: item.departmentDetailName,
    }));

    const jobGradeOptions = JobGradeGroupItem.map((item) => ({
        label: item.jobGradeDetailName,
        value: item.jobGradeDetailName,
    }));

    // (추가) 지급여부 SelectBox용 옵션 예시
    const paymentStatusOptions = [
        { label: "전체", value: "" },
        { label: "지급완료", value: "1" },
        { label: "미지급", value: "0" },
    ];

    return (
        <SalalyManagerSearchStyled>
            {/* 급여 계산  */}
            {/* <div className='top-right'>
                <StyledInput
                    type='month'
                    value={searchPaymentMonth}
                    onChange={(e) => setSearchPaymentMonth(e.target.value)}
                />
                <StyledButton>급여 계산</StyledButton>
            </div> */}
            {/* 사원명 : searchEmployeeName */}
            <div className='row'>
                사원명 <StyledInput value={searchEmployeeName} onChange={handleChange} />
                {/* 급여년월 searchPaymentMonth */}
                급여년월
                <StyledInput
                    type='month'
                    value={searchPaymentMonth}
                    onChange={(e) => setSearchPaymentMonth(e.target.value)}
                />
            </div>
            {/* 부서 : department */}
            부서 <StyledSelectBox options={departmentOptions} value={department} onChange={setDepartment} />
            {/* 직급 : jobGrade */}
            직급 <StyledSelectBox options={jobGradeOptions} value={jobGrade} onChange={setJobGrade} />
            {/* 지급 여부 : searchPamentStatus */}
            지급여부
            <StyledSelectBox
                options={paymentStatusOptions}
                value={searchPaymentStatus}
                onChange={setSearchPaymentStatus}
            />
            {/* 검색  */}
            <StyledButton>검색</StyledButton>
            {/* 일괄 지급 */}
            <StyledButton>일괄 지급</StyledButton>
        </SalalyManagerSearchStyled>
    );
};
