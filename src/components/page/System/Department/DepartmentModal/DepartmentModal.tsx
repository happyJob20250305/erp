import { FC, useEffect, useRef, useState } from "react"
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { DepartmentModalStyle } from "./styled"
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { nullCheck } from "../../../../../common/nullCheck";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { Department } from "../../../../../api/api";
import { postApi } from "../../../../../api/SystemApi/postApi";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { IDepartment } from "../../../../../models/interface/system/department/IDepartment";


interface IDepartmentProps {
    detailCode: string,
    setDetailCode: React.Dispatch<React.SetStateAction<string>>;
    postSuccess: () => void;
}

interface IDepartmentDetailResponse {
    detail: IDepartment
}

export const DepartmentModal: FC<IDepartmentProps> = ({ detailCode, setDetailCode, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detail, setDetail] = useState<IDepartment>();
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        detailCode && searchDetail();
        return () => {
            setDetailCode("");
        }
    }, [])

    const searchDetail = async () => {
        const result = await searchApi<IDepartmentDetailResponse>(Department.searchDetail, { detailCode });

        if (result) {
            setDetail(result.detail);
        }
    }

    const saveDepartment = async () => {
        const formData = new FormData(formRef.current);

        if (!nullCheck([ //유효성검사
            { inval: formData.get("detailCode").toString(), msg: "부서코드를 입력해주세요." },
            { inval: formData.get("detailName").toString(), msg: "부서명을 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(Department.saveDepartment, formData);

        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        } else {
            alert(result.message);
        }
    }

    const updateDepartment = async () => {
        const formData = new FormData(formRef.current);
        formData.append("oldDetailCode", detailCode);
        formData.append("newDetailCode", formData.get("detailCode"));

        if (!nullCheck([ //유효성검사
            { inval: formData.get("detailCode").toString(), msg: "부서코드를 입력해주세요." },
            { inval: formData.get("detailName").toString(), msg: "부서명을 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(Department.saveDepartment, formData);

        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        } else {
            alert(result.message);
        }
    }

    return (
        <DepartmentModalStyle>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        부서코드*
                        <StyledInput type="text" name="detailCode" defaultValue={detail?.detailCode} />
                    </label>
                    <label>
                        부서명*
                        <StyledInput type="text" name="detailName" defaultValue={detail?.detailName} />
                    </label>
                    <div className={"button-container"}>
                        <button type='button' onClick={detailCode ? updateDepartment : saveDepartment}>
                            {detailCode ? "수정" : "저장"}</button>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </DepartmentModalStyle>
    )
}