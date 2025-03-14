import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ManageModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { nullCheck } from "../../../../../common/nullCheck";
import { ButtonArea, ModalStyledTable } from "../../VoucherList/VoucherListModal/styled";
import { IManageModalProps } from "../../../../../models/interface/account/manage/IAccount";
import { ISetListOption } from "../../../../../models/interface/ISetListOption";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { accountSearchApi } from "../../../../../api/AccountApi/accountSearchApi";
import { Manage } from "../../../../../api/api";
import { accountPostApi } from "../../../../../api/AccountApi/accountPostApi";
import { setSelectOption } from "../../../../../common/setSelectOption";
import { IAccountGroupListBody } from "../../../../../models/interface/account/groupList/IAccountGroup";

export const ManageModal: FC<IManageModalProps> = ({ detailCode, postSuccess, setDetailCode }) => {
    const [selectedGroup, setSelectedGroup] = useState<string>(detailCode?.group_code || "");
    const [selectCodeType, setSelectedCodeType] = useState<string>(detailCode?.code_type || "");
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>(null);
    const [accountGroupList, setAccountGroupList] = useState<ISetListOption[]>([]);
    const codeType: ISetListOption[] = [
        { label: "전체", value: "" },
        { label: "수입", value: "수입" },
        { label: "지출", value: "지출" },
    ];
    const useYn: ISetListOption[] = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    useEffect(() => {
        searchAccountGroupList();
    }, []);

    useEffect(() => {
        searchAccountGroupList();
        return () => {
            setDetailCode();
        };
    }, [detailCode]);

    const searchAccountGroupList = async () => {
        const result = await accountSearchApi<IAccountGroupListBody>(Manage.searchGroupList, {});
        if (result) {
            setAccountGroupList(setSelectOption(result.accountGroupList, "group_name", "group_code"));
        }
    };

    const accountSave = async () => {
        const formData = new FormData(formRef.current);
        if (
            !nullCheck([
                { inval: formData.get("group_code").toString(), msg: "계정대분류를 선택해주세요." },
                { inval: formData.get("detail_name").toString(), msg: "계정세부명을 입력해주세요." },
            ])
        ) {
            return false;
        }
        const result = await accountPostApi<IPostResponse>(Manage.save, formRef.current);
        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        }
    };

    const accountUpdate = async () => {
        const formData = new FormData(formRef.current);

        if (!nullCheck([{ inval: formData.get("detail_name").toString(), msg: "계정세부명을 입력해주세요." }])) {
            return false;
        }
        formData.append("detail_code", detailCode.detail_code);
        const result = await accountPostApi<IPostResponse>(Manage.update, formData);
        if (result.result === "success") {
            alert("수정되었습니다.");
            postSuccess();
        }
    };

    const accountDelete = async () => {
        const result = await accountPostApi<IPostResponse>(
            Manage.delete,
            new URLSearchParams({ detail_code: detailCode.detail_code })
        );
        if (result.result === "success") {
            alert("삭제되었습니다.");
            postSuccess();
        }
    };

    return (
        <ManageModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <ModalStyledTable>
                        <tbody>
                            <tr>
                                <th>
                                    <label
                                        style={{
                                            display: "flex",
                                            flexDirection: "row",
                                        }}
                                    >
                                        계정
                                        <br />
                                        대분류명 <span style={{ color: "red" }}>*</span>
                                    </label>
                                </th>
                                <td colSpan={3}>
                                    <StyledSelectBox
                                        name='group_code'
                                        options={accountGroupList}
                                        value={selectedGroup}
                                        onChange={setSelectedGroup}
                                        disabled={!!detailCode}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label style={{ display: "flex", flexDirection: "row" }}>
                                        계정
                                        <br />
                                        세부명
                                        <span style={{ color: "red" }}> * </span>
                                    </label>
                                </th>
                                <td colSpan={3}>
                                    <StyledInput
                                        type='text'
                                        name='detail_name'
                                        defaultValue={detailCode?.detail_name}
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>상세내용</label>
                                </th>
                                <td colSpan={3}>
                                    <StyledInput
                                        type='text'
                                        name='content'
                                        defaultValue={detailCode?.content}
                                    ></StyledInput>
                                </td>
                            </tr>
                            <tr>
                                <th>
                                    <label>수입/지출구분</label>
                                </th>
                                <td colSpan={3}>
                                    <StyledSelectBox
                                        name='code_type'
                                        options={codeType}
                                        value={selectCodeType}
                                        onChange={setSelectedCodeType}
                                    />
                                </td>
                            </tr>
                            {detailCode ? (
                                <tr>
                                    <th>
                                        <label>사용여부 </label>
                                    </th>
                                    <td colSpan={3}>
                                        <StyledSelectBox
                                            name='use_Yn'
                                            options={useYn}
                                            defaultValue={detailCode?.use_yn}
                                        />
                                    </td>
                                </tr>
                            ) : (
                                <tr style={{ display: "none" }}>
                                    <td colSpan={3}>
                                        <StyledInput type='text' name='use_Yn' defaultValue='Y' />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </ModalStyledTable>
                    <ButtonArea>
                        <StyledButton type='button' onClick={detailCode ? accountUpdate : accountSave}>
                            {detailCode ? "수정" : "저장"}
                        </StyledButton>
                        {!!detailCode && (
                            <StyledButton type='button' onClick={accountDelete}>
                                삭제
                            </StyledButton>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </ButtonArea>
                </form>
            </div>
        </ManageModalStyle>
    );
};
