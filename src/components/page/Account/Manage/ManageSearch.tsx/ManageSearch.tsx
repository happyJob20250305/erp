import { useContext, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { SelectBox } from "../../../../common/StyledSelectBox/styled";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { ManageSearchStyled } from "./styled";
import { AccountManageContext } from "../../../../../api/Provider/AccountManageProvider";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";

export const ManageSearch = () => {
    const [selectedUse, setSelectedUse] = useState<string>("");
    const [selectCodeType, setSelectedCodeType] = useState<string>("");
    const { setSearchKeyword } = useContext(AccountManageContext);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const useYn = [
        { label: "전체", value: "" },
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];
    const codeType = [
        { label: "전체", value: "" },
        { label: "수입", value: "수입" },
        { label: "지출", value: "지출" },
    ];

    const handlerSearch = () => {
        setSearchKeyword({
            searchCode_type: selectCodeType,
            searchUse_yn: selectedUse,
        });
    };

    return (
        <ManageSearchStyled>
            <StyledSelectBox options={useYn} value={selectedUse} onChange={setSelectedUse} />
            <StyledSelectBox options={codeType} value={selectCodeType} onChange={setSelectedCodeType} />
            <StyledButton variant='secondary' onClick={handlerSearch}>
                검색
            </StyledButton>
            <StyledButton onClick={() => setModal(!modal)}>등록</StyledButton>
        </ManageSearchStyled>
    );
};
