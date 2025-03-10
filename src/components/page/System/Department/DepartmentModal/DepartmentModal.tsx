import { FC, useEffect, useState } from "react"
import { StyledButton } from "../../../../common/StyledButton/StyledButton"
import { StyledInput } from "../../../../common/StyledInput/StyledInput"
import { DepartmentModalStyle } from "./styled"
import axios, { AxiosResponse } from "axios";
import { IDepartment } from "../DepartmentMain/DepartmentMain";
import { modalState } from "../../../../../stores/modalState";
import { useRecoilState } from "recoil";


interface IDepartmentProps {
    detailCode: string,
    setDetailCode: React.Dispatch<React.SetStateAction<string>>;
}

interface IDepartmentDetailResponse {
    detail: IDepartment
}

export const DepartmentModal: FC<IDepartmentProps> = ({ detailCode, setDetailCode }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detail, setDetail] = useState<IDepartment>();

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

    return (
        <DepartmentModalStyle>
            <div className='container'>
                <form>
                    <label>
                        부서코드*
                        <StyledInput type="text" defaultValue={detail?.detailCode} />
                    </label>
                    <label>
                        부서명*
                        <StyledInput type="text" defaultValue={detail?.detailName} />
                    </label>
                    <div className={"button-container"}>
                        <button type='button' onClick={() => { setModal(!modal) }}>나가기</button>
                    </div>
                </form>
            </div>
        </DepartmentModalStyle>
    )
}