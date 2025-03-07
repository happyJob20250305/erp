import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { ManageModalStyle } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { useEffect, useRef, useState } from "react";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import axios, { AxiosResponse } from "axios";

export const ManageModal = ({ detailCode, postSuccess, setDetailCode }) => {
    const [selectedGroup, setSelectedGroup] = useState<string>(detailCode?.group_code || "");
    const [selectCodeType, setSelectedCodeType] = useState<string>(detailCode?.code_type || "");
    const [selectedUse, setSelectedUse] = useState<string>(detailCode?.use_yn || "");
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const formRef = useRef<HTMLFormElement>(null);

    const [accountGroupList, setAccountGroupList] = useState<{ label: string; value: string }[]>([]);
    const codeType = [
        { label: "수입", value: "수입" },
        { label: "지출", value: "지출" },
    ];
    const useYn = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ];

    useEffect(() => {
        searchAccountGroupList();
        setDetailCode;
        return () => {
            setDetailCode();
        };
    }, []);

    const searchAccountGroupList = () => {
        axios.post("/account/accountGroupList.do", {}).then((res) => {
            const selectGroupList = [
                { label: "전체", value: "" },
                ...res.data.accountGroupList.map((account) => ({
                    label: account.group_name,
                    value: account.group_code,
                })),
            ];
            setAccountGroupList(selectGroupList);
        });
    };

    const accountSave = () => {
        axios.post("/account/accountSave.do", formRef.current).then((res: AxiosResponse) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            }
        });
    };

    const accountUpdate = () => {
        const formData = new FormData(formRef.current);
        formData.append("detail_code", detailCode.detail_code);
        axios.post("/account/accountUpdate.do", formData).then((res: AxiosResponse) => {
            if (res.data.result === "success") {
                alert("수정되었습니다.");
                postSuccess();
            }
        });
    };

    const accountDelete = () => {
        axios
            .post("/account/accountDelete.do", new URLSearchParams({ detail_code: detailCode.detail_code }))
            .then((res: AxiosResponse) => {
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
                    <label>
                        계정대분류명 :
                        <StyledSelectBox
                            name='group_code'
                            options={accountGroupList}
                            value={selectedGroup}
                            onChange={setSelectedGroup}
                        />
                    </label>
                    <label>
                        계정세부명 :
                        <StyledInput
                            type='text'
                            name='detail_name'
                            defaultValue={detailCode?.detail_name}
                        ></StyledInput>
                    </label>
                    <label>
                        상세내용 :
                        <StyledInput type='text' name='content' defaultValue={detailCode?.content}></StyledInput>
                    </label>
                    <label>
                        수입/지출구분 :
                        <StyledSelectBox
                            name='code_type'
                            options={codeType}
                            value={selectCodeType}
                            onChange={setSelectedCodeType}
                        />
                    </label>
                    {detailCode ? (
                        <label>
                            사용여부 :
                            <StyledSelectBox
                                name='use_Yn'
                                options={useYn}
                                value={selectedUse}
                                onChange={setSelectedUse}
                                defaultValue={detailCode?.use_yn}
                            />
                        </label>
                    ) : (
                        <StyledInput
                            type='text'
                            name='use_Yn'
                            defaultValue='Y'
                            style={{ display: "none" }}
                        ></StyledInput>
                    )}
                    <div className={"button-container"}>
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
                    </div>
                </form>
            </div>
        </ManageModalStyle>
    );
};
