import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { useEffect, useState } from "react";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";


interface INoticeDetail {
    notiSeq: number,
    notiTitle: string,
    loginId: string,
    notiContent: string,
    notiDate: string
}

interface INoticeDetailFile extends INoticeDetail {
    fileName: string | null,
    physicalPath: string | null,
    logicalPath: string | null,
    fileSize: number | null,
    fileExt: string | null
}

interface INoticeDetailResponse {
    detail: INoticeDetailFile;
}


export const NoticeModal = ({ notiSeq, setNotiSeq }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetailFile>();

    useEffect(() => {
        notiSeq && searchDetail();

        return () => {
            setNotiSeq(0);
        }
    }, [])

    const searchDetail = () => {
        console.log(notiSeq);

        axios.post("/system/noticeFileDetailBody.do", { noticeSeq: notiSeq })
            .then((res: AxiosResponse<INoticeDetailResponse>) => {
                setDetail(res.data.detail);
            });
    }

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form>
                    <label>
                        제목 :<StyledInput type='text' name='fileTitle' defaultValue={detail?.notiTitle}></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='fileContent' defaultValue={detail?.notiContent}></StyledInput>
                    </label>
                    파일 :<StyledInput type='file' id='fileInput' style={{ display: "none" }}></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div></div>
                    <div className={"button-container"}>
                        <StyledButton type='button'>저장</StyledButton>
                        <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
