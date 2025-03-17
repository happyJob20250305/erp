import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ExpenseReviewSearchStyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { ExpenseReviewContext } from "../../../../../api/Provider/AccountProvider/ExpenseReviewProvider";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { ExpenseReview } from "../../../../../api/api";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { dateCheck } from "../../../../../common/dateCheck";
import { IDetailGroupListBody } from "../../../../../models/interface/account/groupList/IAccountGroup";
import { useRecoilValue } from "recoil";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";

export const ExpenseReviewSearch = () => {
    const { setSearchKeyword } = useContext(ExpenseReviewContext);
    const loginInfo = useRecoilValue<ILoginInfo>(loginInfoState);
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
        setSelectedDetail("");
        setSearchKeyword((prev) => ({
            ...prev,
            searchApproval: loginInfo.userType === "C" ? "F" : "W",
        }));
    }, [selectedGroup]);

    const searchAccountDetailList = async (selectedGroup: string) => {
        const result = await accountSearchApi<IDetailGroupListBody>(ExpenseReview.searchAccountDetailList, {
            group_code: selectedGroup,
        });
        if (result) {
            setAccountDetailList(
                setSelectOption(result.searchAccount, "detail_name", "detail_code", { label: "전체", value: "" })
            );
        }
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
            <div className='search-bar'>
                <span>신청일자</span>
                <StyledInput
                    width={105}
                    type='date'
                    onChange={(e) => {
                        dateCheck(e.target.value, searchEdDate, "start", setSearchStDate, setSearchEdDate);
                    }}
                    max={searchEdDate}
                ></StyledInput>
                <span>~</span>
                <StyledInput
                    width={105}
                    type='date'
                    onChange={(e) => {
                        dateCheck(searchStDate, e.target.value, "end", setSearchStDate, setSearchEdDate);
                    }}
                    min={searchStDate}
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
