import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { modalState } from "../../../../../stores/modalState";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ExpenseListSearchStyled } from "./styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { useContext, useEffect, useState } from "react";
import { ExpenseListContext } from "../../../../../api/Provider/ExpenseListProvider";
import { IAccountGroupOption } from "../../Manage/ManageSearch.tsx/ManageSearch";
import axios from "axios";

export const ExpenseListSearch = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [searchStDate, setSearchStDate] = useState<string>("");
    const [searchEdDate, setSearchEdDate] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDetail, setSelectedDetail] = useState<string>("");
    const [selectedApprove, setSelectedApprove] = useState<string>("");
    const { setSearchKeyword } = useContext(ExpenseListContext);
    const [accountDetailList, setAccountDetailList] = useState<IAccountGroupOption[]>([]);
    const approveStateList = [
        { label: "전체", value: "" },
        { label: "검토 대기", value: "W" },
        { label: "승인 대기", value: "F" },
        { label: "승인", value: "S" },
        { label: "반려", value: "N" },
    ];
    const accountGroupList = [
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
        axios.post("/account/accountSearchDetailBody.do", { group_code: selectedGroup }).then((res) => {
            const selectDetailList = [
                { label: "전체", value: "" },
                ...res.data.searchAccount.map((detail) => ({
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
        <ExpenseListSearchStyled>
            <span>신청일자</span>
            <StyledInput
                type='date'
                onChange={(e) => {
                    setSearchStDate(e.target.value);
                }}
            ></StyledInput>
            <span>~</span>
            <StyledInput
                type='date'
                onChange={(e) => {
                    setSearchEdDate(e.target.value);
                }}
            ></StyledInput>
            <StyledSelectBox options={approveStateList} value={selectedApprove} onChange={setSelectedApprove} />
            <StyledSelectBox options={accountGroupList} value={selectedGroup} onChange={setSelectedGroup} />
            <StyledSelectBox options={accountDetailList} value={selectedDetail} onChange={setSelectedDetail} />
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </ExpenseListSearchStyled>
    );
};
