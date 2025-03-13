import { FC, useEffect, useRef, useState } from "react";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeModalStyle } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { IGroupCode } from "../CommonCodeMain/CommonCodeMain";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { nullCheck } from "../../../../../common/nullCheck";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { CommonCode } from "../../../../../api/api";
import { postApi } from "../../../../../api/SystemApi/postApi";


interface IGroupCodeProps {
    groupCode: string,
    setGroupCode: React.Dispatch<React.SetStateAction<string>>;
    postSuccess: () => void;
}

interface IGroupCodeDetailResponse {
    detail: IGroupCode
}

interface IPostResponse {
    result: string
    message?: string
}

export const CommonCodeModal: FC<IGroupCodeProps> = ({ groupCode, setGroupCode, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [groupCodeDetail, setGroupCodeDetail] = useState<IGroupCode>();
    const formRef = useRef<HTMLFormElement>(null);

    const options = [
        { label: "Y", value: "Y" },
        { label: "N", value: "N" },
    ]

    useEffect(() => {
        groupCode && searchDetail();

        return () => {
            setGroupCode("");
        }
    }, [])

    const searchDetail = async () => {
        const result = await searchApi<IGroupCodeDetailResponse>(CommonCode.searchGroupDetail, { groupCode });

        if (result) {
            setGroupCodeDetail(result.detail);
        }
    }

    const saveGroupCode = async () => {
        const formData = new FormData(formRef.current);

        if (!nullCheck([
            { inval: formData.get("groupCode").toString(), msg: "공통코드를 입력해주세요." },
            { inval: formData.get("groupName").toString(), msg: "공통코드명을 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(CommonCode.saveGroupCode, formData);

        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        } else {
            alert(result.message);
        }
    }

    const updateGroupCode = async () => {
        const formData = new FormData(formRef.current);
        formData.append("oldGroupCode", groupCode);
        formData.append("newGroupCode", groupCode);

        if (!nullCheck([
            { inval: formData.get("groupCode").toString(), msg: "공통코드를 입력해주세요." },
            { inval: formData.get("groupName").toString(), msg: "공통코드명을 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(CommonCode.updateGroupCode, formData);

        if (result.result === "success") {
            alert("수정되었습니다.");
            postSuccess();
        } else {
            alert(result.message);
        }
    }

    return (
        <CommonCodeModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        공통코드*
                        <StyledInput type='text' name="groupCode" defaultValue={groupCodeDetail?.groupCode} readOnly={!!groupCode} />
                    </label>
                    <label>
                        공통코드명*
                        <StyledInput type='text' name="groupName" defaultValue={groupCodeDetail?.groupName} />
                    </label>
                    <label>
                        비고
                        <StyledInput type='text' name="groupNote" defaultValue={groupCodeDetail?.note} />
                    </label>
                    {
                        groupCode?.length > 0 && (
                            <label>
                                사용여부*
                                <StyledSelectBox
                                    options={options}
                                    name="groupUseYn"
                                    defaultValue={groupCodeDetail?.useYn}
                                />
                            </label>
                        )
                    }
                    <div className={"button-container"}>
                        <button type='button' onClick={groupCode ? updateGroupCode : saveGroupCode}>
                            {groupCode ? "수정" : "저장"}
                        </button>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </CommonCodeModalStyle>
    );
};
