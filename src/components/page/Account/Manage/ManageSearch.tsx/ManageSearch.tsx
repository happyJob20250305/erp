import { useContext, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ManageSearchStyled } from "./styled";
import { AccountManageContext } from "../../../../../api/Provider/AccountManageProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";

export interface IAccountGroup {
    group_name: string;
    group_code: string;
}
export interface IAccountGroupListBody {
    accountGroupList: IAccountGroup[];
}

export interface IDetailGroup {
    detail_name: string;
    detail_code: string;
}

export interface IDetailGroupListBody {
    searchAccount: IDetailGroup[];
}

export interface ISetListOption {
    label: string;
    value: string | number;
}

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

    const convertToSelectOptions = (data: IAccountGroup[]): ISetListOption[] => {
        return data.map((account) => ({
            label: account.group_name,
            value: account.group_code,
        }));
    };

    const searchAccountGroupList = () => {
        axios.post("/account/accountGroupList.do", {}).then((res: AxiosResponse<IAccountGroupListBody>) => {
            const selectGroupList: ISetListOption[] = [
                { label: "전체", value: "" },
                ...convertToSelectOptions(res.data.accountGroupList),
            ];
            setAccountGroupList(selectGroupList);
        });
    };

    const searchAccountDetailList = (selectedGroup: string) => {
        axios
            .post("/account/accountSearchDetailBody.do", { group_code: selectedGroup })
            .then((res: AxiosResponse<IDetailGroupListBody>) => {
                const selectDetailList: ISetListOption[] = [
                    { label: "전체", value: "" },
                    ...res.data.searchAccount.map((detail: IDetailGroup) => ({
                        label: detail.detail_name,
                        value: detail.detail_code,
                    })),
                ];
                setAccountDetailList(selectDetailList);
            });
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
            <StyledSelectBox options={accountGroupList} value={selectedGroup} onChange={setSelectedGroup} />
            <StyledSelectBox options={accountDetailList} value={selectedDetail} onChange={setSelectedDetail} />
            <StyledSelectBox options={codeType} value={selectCodeType} onChange={setSelectedCodeType} />
            <StyledSelectBox options={useYn} value={selectedUse} onChange={setSelectedUse} />
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </ManageSearchStyled>
    );
};
