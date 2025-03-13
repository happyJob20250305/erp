import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ManageModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useRef, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import axios, { AxiosResponse } from "axios";
import { IAccountGroup, IAccountGroupListBody, ISetListOption } from "../ManageSearch.tsx/ManageSearch";
import { IAccount } from "../ManageMain/ManageMain";
import { nullCheck } from "../../../../../common/nullCheck";
import { ButtonArea, ModalStyledTable } from "../../VoucherList/VoucherListModal/styled";

interface IPostResponse {
    result: string;
}

interface IManageModalProps {
    detailCode?: IAccount;
    postSuccess: () => void;
    setDetailCode: (detailCode?: IAccount) => void;
}

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

    const searchAccountGroupList = () => {
        axios.post("/account/accountGroupList.do", {}).then((res: AxiosResponse<IAccountGroupListBody>) => {
            const selectGroupList: ISetListOption[] = [
                { label: "전체", value: "" },
                ...res.data.accountGroupList.map((account: IAccountGroup) => ({
                    label: account.group_name,
                    value: account.group_code,
                })),
            ];
            setAccountGroupList(selectGroupList);
        });
    };

    const accountSave = () => {
        const formData = new FormData(formRef.current);
        if (
            nullCheck([
                { inval: formData.get("group_code").toString(), msg: "계정대분류를 선택해주세요." },
                { inval: formData.get("detail_name").toString(), msg: "계정세부명을 입력해주세요." },
            ])
        )
            axios.post("/account/accountSave.do", formRef.current).then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    postSuccess();
                }
            });
    };

    const accountUpdate = () => {
        const formData = new FormData(formRef.current);
        console.log(formData.values());
        if (nullCheck([{ inval: formData.get("detail_name").toString(), msg: "계정세부명을 입력해주세요." }]))
            formData.append("detail_code", detailCode.detail_code);
        axios.post("/account/accountUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("수정되었습니다.");
                postSuccess();
            }
        });
    };

    const accountDelete = () => {
        axios
            .post("/account/accountDelete.do", new URLSearchParams({ detail_code: detailCode.detail_code }))
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("삭제되었습니다.");
                    postSuccess();
                }
            });
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
                                        계정대분류명 <span style={{ color: "red" }}>*</span>
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
                                        계정세부명<span style={{ color: "red" }}> * </span>
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
