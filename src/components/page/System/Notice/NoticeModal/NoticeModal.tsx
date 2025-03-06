import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { ChangeEvent, useEffect, useState } from "react";
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
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>(null);

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

                const { fileExt, logicalPath } = res.data.detail;

                if (fileExt === 'jpg' || fileExt === 'png' || fileExt === 'gif') {
                    setImageUrl(logicalPath);
                } else {
                    setImageUrl("");
                }

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
                    <div>
                        {
                            imageUrl ?
                                (
                                    <div>
                                        <label>미리보기</label>
                                        <img src={imageUrl} />
                                    </div>
                                )
                                :
                                (
                                    <></>
                                )
                        }
                    </div>
                    <div className={"button-container"}>
                        <StyledButton type='button'>저장</StyledButton>
                        <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
