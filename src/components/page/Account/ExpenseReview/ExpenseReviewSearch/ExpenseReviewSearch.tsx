import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ExpenseReviewSearchStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { useContext, useEffect, useState } from "react";
import { ExpenseReviewContext } from "../../../../../api/Provider/ExpenseReviewProvider";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import axios, { AxiosResponse } from "axios";
import {
    IExpenseDetailGroup,
    IExpenseDetailGroupListBody,
} from "../../../../../models/interface/account/expenseList/IExpenseList";

export const ExpenseReviewSearch = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const { setSearchKeyword } = useContext(ExpenseReviewContext);
    const [searchStDate, setSearchStDate] = useState<string>("");
    const [searchEdDate, setSearchEdDate] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDetail, setSelectedDetail] = useState<string>("");
    const [selectedApprove, setSelectedApprove] = useState<string>("");
    const [accountDetailList, setAccountDetailList] = useState<ISetListOption[]>([]);
    const approveStateList: ISetListOption[] = [
        { label: "전체", value: "" },
        { label: "검토 대기", value: "W" },
        { label: "승인 대기", value: "F" },
        { label: "승인", value: "S" },
        { label: "반려", value: "N" },
    ];
    const accountGroupList: ISetListOption[] = [
        { label: "전체", value: "" },
        { label: "온라인지출", value: "AC03" },
        { label: "영업지출", value: "AC04" },
    ];

    useEffect(() => {
        if (selectedGroup) {
            searchAccountDetailList(selectedGroup);
        } else {
            setAccountDetailList([{ label: "전체", value: "" }]);
        }
    }, [selectedGroup]);

    const searchAccountDetailList = (selectedGroup: string) => {
        axios
            .post("/account/expenseSearchDetailBody.do", { group_code: selectedGroup })
            .then((res: AxiosResponse<IExpenseDetailGroupListBody>) => {
                const selectDetailList: ISetListOption[] = [
                    { label: "전체", value: "" },
                    ...res.data.searchAccount.map((detail: IExpenseDetailGroup) => ({
                        label: detail.detail_name,
                        value: detail.detail_code,
                    })),
                ];
                setAccountDetailList(selectDetailList);
            });
    };

    const handlerSearch = () => {
        setSearchKeyword({
            searchStDate: searchStDate,
            searchEdDate: searchEdDate,
            searchGroup: selectedGroup,
            searchDetail: selectedDetail,
            searchApproval: selectedApprove,
            currentPage: 1,
            pageSize: 5,
        });
    };
    return (
        <ExpenseReviewSearchStyled>
            <div className='searchBar'>
                <span>신청일자</span>
                <StyledInput
                    width={110}
                    type='date'
                    onChange={(e) => {
                        setSearchStDate(e.target.value);
                    }}
                ></StyledInput>
                <span>~</span>
                <StyledInput
                    width={110}
                    type='date'
                    onChange={(e) => {
                        setSearchEdDate(e.target.value);
                    }}
                ></StyledInput>
                <span>승인여부</span>
                <StyledSelectBox
                    width={120}
                    options={approveStateList}
                    value={selectedApprove}
                    onChange={setSelectedApprove}
                />
                <span>계정대분류</span>
                <StyledSelectBox
                    width={120}
                    options={accountGroupList}
                    value={selectedGroup}
                    onChange={setSelectedGroup}
                />
                <span>계정과목</span>
                <StyledSelectBox
                    width={120}
                    options={accountDetailList}
                    value={selectedDetail}
                    onChange={setSelectedDetail}
                />
            </div>
            <div className='button-container'>
                <StyledButton variant='secondary' onClick={handlerSearch}>
                    조회
                </StyledButton>
            </div>
        </ExpenseReviewSearchStyled>
    );
};
