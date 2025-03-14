import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { modalState } from "../../../../../stores/modalState";
import { nullCheck } from "../../../../../common/nullCheck";
import { Notice } from "../../../../../api/api";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { postApi } from "../../../../../api/SystemApi/postApi";
import { IPostResponse } from "../../../../../models/interface/IPostResponse";
import { INoticeDetail } from "../../../../../models/interface/system/notice/INoticeDetail";

interface INoticeModalProps {
    notiSeq: number;
    setNotiSeq: React.Dispatch<React.SetStateAction<number>>;
    postSuccess: () => void;
}

interface INoticeDetailResponse {
    detail: INoticeDetail;
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

    const searchDetail = async () => {
        const result = await searchApi<INoticeDetailResponse>(Notice.searchDetail, { noticeSeq: notiSeq });

        if (result) {
            setDetail(result.detail);
            const { fileExt, logicalPath } = result.detail;

            if (fileExt) {
                const fileExtLowerCase = fileExt.toLowerCase();
                if (fileExtLowerCase === 'jpg' || fileExtLowerCase === 'png' || fileExtLowerCase === 'gif') {
                    setImageUrl(logicalPath);
                } else {
                    setImageUrl("");
                }
            }
        }
    }

    const saveNotice = async () => {
        const formData = new FormData(formRef.current);

        if (!nullCheck([
            { inval: formData.get("fileTitle").toString(), msg: "제목을 입력해주세요." },
            { inval: formData.get("fileContent").toString(), msg: "내용을 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(Notice.saveNotice, formData);

        if (result.result === "success") {
            alert("저장되었습니다.");
            postSuccess();
        }
    }

    const updateNotice = async () => {
        const formData = new FormData(formRef.current);
        formData.append("noticeSeq", notiSeq.toString());

        if (!nullCheck([
            { inval: formData.get("fileTitle").toString(), msg: "제목을 입력해주세요." },
            { inval: formData.get("fileContent").toString(), msg: "내용을 입력해주세요." }
        ])) { return false; }

        const result = await postApi<IPostResponse>(Notice.updateNotice, formData);

        if (result.result === "success") {
            alert("수정되었습니다.");
            postSuccess();
        }
    }

    const deleteNotice = async () => {
        const result = await postApi<IPostResponse>(Notice.deleteNotice, { noticeSeq: notiSeq });

        if (result.result === "success") {
            alert("삭제되었습니다.");
            postSuccess();
        }
    }

    const fileDownload = async () => {
        const param = new URLSearchParams();
        param.append("noticeSeq", notiSeq.toString());

        const result = await postApi<Blob>(Notice.fileDownload, param, { responseType: "blob" });

        if (result) {
            const url = window.URL.createObjectURL(result);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", detail.fileName as string);
            document.body.appendChild(link);
            link.click();

            //브라우저에서 a태그 삭제
            document.body.removeChild(link);
            //삭제
            window.URL.revokeObjectURL(url);
        }
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
                        제목 :<StyledInput type='text' name='fileTitle' defaultValue={detail?.notiTitle} />
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='fileContent' defaultValue={detail?.notiContent} />
                    </label>
                    파일 :<StyledInput type='file' id='fileInput' name='file' style={{ display: "none" }} onChange={handlerFile} />
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
                                ) : (<>{fileName}</>)
                        }
                    </div>
                    <div className={"button-container"}>
                        {
                            notiSeq ?
                                (
                                    <>
                                        <StyledButton type='button' onClick={updateNotice}>수정</StyledButton>
                                        <StyledButton type='button' onClick={deleteNotice}>삭제</StyledButton>
                                    </>
                                )
                                :
                                (
                                    <>
                                        <StyledButton type='button' onClick={saveNotice}>저장</StyledButton>
                                    </>
                                )
                        }
                        <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
