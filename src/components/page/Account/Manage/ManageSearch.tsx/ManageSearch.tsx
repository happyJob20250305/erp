import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ManageSearchStyled } from "./styled";
import { AccountManageContext } from "../../../../../api/Provider/AccountManageProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { IAccountGroupListBody, IDetailGroupListBody } from "../../../../../models/interface/account/manage/IAccount";

import { Manage } from "../../../../../api/api";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { setSelectOption } from "../../../../../common/setSelectOption";

export const ManageSearch = () => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedDetail, setSelectedDetail] = useState<string>("");
    const [selectedUse, setSelectedUse] = useState<string>("");
    const [selectCodeType, setSelectedCodeType] = useState<string>("");
    const { setSearchKeyword } = useContext(AccountManageContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [accountGroupList, setAccountGroupList] = useState<ISetListOption[]>([]);
    const [accountDetailList, setAccountDetailList] = useState<ISetListOption[]>([]);
    const useYn: ISetListOption[] = [
        { label: "전체", value: "" },
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];
    const codeType: ISetListOption[] = [
        { label: "전체", value: "" },
        { label: "수입", value: "수입" },
        { label: "지출", value: "지출" },
    ];
    useEffect(() => {
        searchAccountGroupList();
    }, []);

    useEffect(() => {
        if (selectedGroup) {
            searchAccountDetailList(selectedGroup);
        } else {
            setAccountDetailList([{ label: "전체", value: "" }]);
        }
    }, [selectedGroup]);

    const searchAccountGroupList = async () => {
        const result = await accountSearchApi<IAccountGroupListBody>(Manage.searchGroupList, {});
        if (result) {
            setAccountGroupList(setSelectOption(result.accountGroupList, "group_name", "group_code"));
        }
    };

    const searchAccountDetailList = async (selectedGroup: string) => {
        const result = await accountSearchApi<IDetailGroupListBody>(Manage.searchDetailList, {
            group_code: selectedGroup,
        });
        if (result) {
            setAccountDetailList(setSelectOption(result.searchAccount, "detail_name", "detail_code"));
        }
    };

    const handlerSearch = () => {
        setSearchKeyword({
            searchGroup: selectedGroup,
            searchDetail: selectedDetail,
            searchCode_type: selectCodeType,
            searchUse_yn: selectedUse,
        });
    };

    return (
        <ManageSearchStyled>
            <div className='search-bar'>
                계정대분류명:
                <StyledSelectBox
                    width={150}
                    options={accountGroupList}
                    value={selectedGroup}
                    onChange={setSelectedGroup}
                />
                계정세부명:
                <StyledSelectBox
                    width={150}
                    options={accountDetailList}
                    value={selectedDetail}
                    onChange={setSelectedDetail}
                />
                구분:
                <StyledSelectBox width={100} options={codeType} value={selectCodeType} onChange={setSelectedCodeType} />
                사용여부:
                <StyledSelectBox width={100} options={useYn} value={selectedUse} onChange={setSelectedUse} />
            </div>
            <div className='button-container'>
                <StyledButton variant='secondary' onClick={handlerSearch}>
                    조회
                </StyledButton>
                <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
            </div>
        </ManageSearchStyled>
    );
};
