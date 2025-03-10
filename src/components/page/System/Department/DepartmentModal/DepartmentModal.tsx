import { FC, useEffect, useRef, useState } from "react"
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { DepartmentModalStyle } from "./styled"
import axios, { AxiosResponse } from "axios";
import { IDepartment } from "../DepartmentMain/DepartmentMain";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { nullCheck } from "../../../../../common/nullCheck";


interface IDepartmentProps {
    detailCode: string,
    setDetailCode: React.Dispatch<React.SetStateAction<string>>;
    postSuccess: () => void;
}

interface IDepartmentDetailResponse {
    detail: IDepartment
}

interface IPostResponse {
    result: string
    message?: string
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

    const searchDetail = () => {
        axios.post("/system/departmentDetailBody", { detailCode })
            .then((res: AxiosResponse<IDepartmentDetailResponse>) => {
                setDetail(res.data.detail);
            })
    }

    const saveDepartment = () => {
        const formData = new FormData(formRef.current);

        if (nullCheck([ //유효성검사
            { inval: formData.get("detailCode").toString(), msg: "부서코드를 입력해주세요." },
            { inval: formData.get("detailName").toString(), msg: "부서명을 입력해주세요." }
        ]))

            axios.post("/system/departmentSave", formData)
                .then((res: AxiosResponse<IPostResponse>) => {
                    if (res.data.result === "success") {
                        alert("저장되었습니다.");
                        postSuccess();
                    } else {
                        alert(res.data.message);
                    }
                })
    }

    const updateDepartment = () => {
        const formData = new FormData(formRef.current);
        formData.append("oldDetailCode", detailCode);
        formData.append("newDetailCode", formData.get("detailCode"));

        if (nullCheck([ //유효성검사
            { inval: formData.get("newDetailCode").toString(), msg: "부서코드를 입력해주세요." },
            { inval: formData.get("detailName").toString(), msg: "부서명을 입력해주세요." }
        ]))

            axios.post("/system/departmentUpdate", formData)
                .then((res: AxiosResponse<IPostResponse>) => {
                    if (res.data.result === "success") {
                        alert("저장되었습니다.");
                        postSuccess();
                    } else {
                        alert(res.data.message);
                    }
                })
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