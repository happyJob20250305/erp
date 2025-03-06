import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { INotice } from "../NoticeMain/NoticeMain";

interface INoticeModalProps {
    notiSeq: number;
    setNotiSeq: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}
interface INoticeDetail extends INotice {
    fileName: string | null,
    physicalPath: string | null,
    logicalPath: string | null,
    fileSize: number | null,
    fileExt: string | null
}
interface INoticeDetailResponse {
    detail: INoticeDetail;
}

interface IPostResponse {
    result: string
}

export const NoticeModal: FC<INoticeModalProps> = ({ notiSeq, setNotiSeq, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();
    const [imageUrl, setImageUrl] = useState<string>("");
    const [fileName, setFileName] = useState<string>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        notiSeq && searchDetail();

        return () => {
            setNotiSeq(0);
        }
    }, [])

    const searchDetail = () => {
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

    const saveNotice = () => {
        axios.post("/system/noticeFileSave.do", formRef.current)
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    postSuccess();
                }
            })
    }

    const fileDownload = () => {
        const param = new URLSearchParams();
        param.append("noticeSeq", notiSeq.toString());
        axios.post("/system/noticeDownload.do", param, { responseType: "blob" })
            .then((res: AxiosResponse<Blob>) => {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", detail.fileName as string);
                document.body.appendChild(link);
                link.click();

                //브라우저에서 a태그 삭제
                document.body.removeChild(link);
                //삭제
                window.URL.revokeObjectURL(url);
            })
    }

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileSplit = fileInfo[0].name.split(".");
            const fileExt = fileSplit[1].toLowerCase();

            if (fileExt === 'jpg' || fileExt === 'png' || fileExt === 'gif') {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            }
            setFileName(fileInfo[0].name);
        }
    };

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        제목 :<StyledInput type='text' name='fileTitle' defaultValue={detail?.notiTitle}></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='fileContent' defaultValue={detail?.notiContent}></StyledInput>
                    </label>
                    파일 :<StyledInput type='file' id='fileInput' name='file' style={{ display: "none" }} onChange={handlerFile}></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div>
                        {
                            imageUrl ?
                                (
                                    <div onClick={fileDownload}>
                                        <label>미리보기</label>
                                        <img src={imageUrl} />
                                        {fileName || detail.fileName}
                                    </div>
                                )
                                :
                                (
                                    <>
                                        {fileName}
                                    </>
                                )
                        }
                    </div>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={saveNotice}>저장</StyledButton>
                        <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
