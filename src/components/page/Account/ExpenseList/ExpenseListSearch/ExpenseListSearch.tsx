import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { modalState } from "../../../../../stores/modalState";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ExpenseListSearchStyled } from "./styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { useContext, useEffect, useState } from "react";
import { ExpenseListContext } from "../../../../../api/Provider/AccountProvider/ExpenseListProvider";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { ExpenseList } from "../../../../../api/api";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { dateCheck } from "../../../../../common/dateCheck";
import { IDetailGroupListBody } from "../../../../../models/interface/account/groupList/IAccountGroup";

export const ExpenseListSearch = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [searchStDate, setSearchStDate] = useState<string>("");
    const [searchEdDate, setSearchEdDate] = useState<string>("");
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDetail, setSelectedDetail] = useState<string>("");
    const [selectedApprove, setSelectedApprove] = useState<string>("");
    const { setSearchKeyword } = useContext(ExpenseListContext);
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
    }, [selectedGroup]);

    const searchAccountDetailList = async (selectedGroup: string) => {
        const result = await accountSearchApi<IDetailGroupListBody>(ExpenseList.searchDetailList, {
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
            searchGroup: selectedGroup || "",
            searchDetail: selectedDetail || "",
            searchApproval: selectedApprove,
            currentPage: 1,
            pageSize: 5,
        });
    };
    return (
        <ExpenseListSearchStyled>
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
                승인여부
                <StyledSelectBox
                    width={110}
                    options={approveStateList}
                    value={selectedApprove}
                    onChange={setSelectedApprove}
                />
                계정대분류
                <StyledSelectBox
                    width={120}
                    options={accountGroupList}
                    value={selectedGroup}
                    onChange={setSelectedGroup}
                />
                계정과목
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
                <StyledButton onClick={() => setModal(!modal)}>신청</StyledButton>
            </div>
        </ExpenseListSearchStyled>
    );
};
