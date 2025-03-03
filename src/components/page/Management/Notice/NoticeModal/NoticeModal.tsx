import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { NoticeModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";
import { modalState } from "../../../../../stores/modalState";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { searchApi } from "../../../../../api/NoticeApi/searchApi";
import { Notice } from "../../../../../api/api";

interface NoticeModalProps {
    id: number;
    postSuccess: () => void;
    setNoticeId: React.Dispatch<React.SetStateAction<number>>;
}

interface INoticeDetail {
    noticeId: number;
    title: string;
    content: string;
    author: string;
    createdDate: string;
    updatedDate: string;
    fileName?: string;
    fileExt?: string;
    logicalPath?: string;
}

interface INoticeDetailResponse {
    detailValue: INoticeDetail;
}

export const NoticeModal: FC<NoticeModalProps> = ({ id, postSuccess, setNoticeId }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();
    const formRef = useRef<HTMLFormElement>(null);
    const [fileData, setFileData] = useState<File>();
    const [imageUrl, setImageUrl] = useState<string>();

    useEffect(() => {
        id && searchDetail(id);

        return () => {
            setNoticeId(0);
        };
    }, []);

    const handlerModal = () => {
        setModal(!modal);
    };

    const searchDetail = async (id: number) => {
        const result = await searchApi<INoticeDetailResponse, { noticeId: number }>(Notice.detail, { noticeId: id });
        if (result) {
            // 파일은 noticeFileDetail
            if (result.detailValue) {
                setDetail(result.detailValue);
                const { fileExt, logicalPath } = result.detailValue;
                if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
                    console.log(fileExt);
                    setImageUrl(logicalPath);
                } else {
                    setImageUrl("");
                }
            }
        }
        // axios
        //     .post("/management/noticeFileDetailBody.do", { noticeId: id })
        //     .then((res: AxiosResponse<INoticeDetailResponse>) => {
        //         // 파일은 noticeFileDetail
        //         if (res.data.detailValue) {
        //             setDetail(res.data.detailValue);
        //             const { fileExt, logicalPath } = res.data.detailValue;
        //             if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
        //                 console.log(fileExt);
        //                 setImageUrl(logicalPath);
        //             } else {
        //                 setImageUrl("");
        //             }
        //         }
        //     });
    };

    const saveNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post("/management/noticeSave.do", formRef.current).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const saveNoticeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        fileData && formData.append("file", fileData);
        axios.post("/management/noticeFileSave.do", formData).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const deleteNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        axios.post("/management/noticeFileDeleteJson.do", { noticeId: id }).then((res) => {
            // 파일은 noticeFileDeleteJson
            res.data.result === "success" && postSuccess();
        });
    };

    const updateNotice = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        formData.append("noticeId", id.toString());

        axios.post("/management/noticeUpdateJson.do", formData).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const updateNoticeFile = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        fileData && formData.append("file", fileData);
        formData.append("noticeId", id.toString());

        axios.post("/management/noticeFileUpdate.do", formData).then((res) => {
            res.data.result === "success" && postSuccess();
        });
    };

    const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
        const fileInfo = e.target.files;
        if (fileInfo?.length > 0) {
            const fileInfoSplit = fileInfo[0].name.split(".");
            const fileExtension = fileInfoSplit[1].toLowerCase();

            if (fileExtension === "jpg" || fileExtension === "gif" || fileExtension === "png") {
                setImageUrl(URL.createObjectURL(fileInfo[0]));
            } else {
                setImageUrl("");
            }

            setFileData(fileInfo[0]);
        }
    };

    const downloadFile = () => {
        const param = new URLSearchParams();
        param.append("noticeId", id.toString());

        axios
            .post("/management/noticeDownload.do", param, { responseType: "blob" })
            .then((res: AxiosResponse<Blob>) => {
                const url = window.URL.createObjectURL(res.data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", detail?.fileName as string);
                document.body.appendChild(link);
                link.click();

                document.body.removeChild(link); // 다운로드 후 a태그 삭제

                // createObjectURL로 만든 URL은 브라우저 메모리에 계속 남아있음
                // 메모리를 해제해야함
                window.URL.revokeObjectURL(url);
            });
    };

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        제목 :<StyledInput type='text' defaultValue={detail?.title} name='fileTitle'></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' defaultValue={detail?.content} name='fileContent'></StyledInput>
                    </label>
                    파일 :
                    <StyledInput
                        type='file'
                        id='fileInput'
                        style={{ display: "none" }}
                        onChange={handlerFile}
                    ></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div onClick={downloadFile}>
                        {imageUrl ? (
                            <div>
                                <label>미리보기</label>
                                <img src={imageUrl} />
                                {fileData?.name || detail.fileName}
                            </div>
                        ) : (
                            <div>{fileData?.name}</div>
                        )}
                    </div>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={id ? updateNoticeFile : saveNoticeFile}>
                            {id ? "수정" : "저장"}
                        </StyledButton>
                        {!!id && (
                            <StyledButton type='button' onClick={deleteNotice}>
                                삭제
                            </StyledButton>
                        )}
                        <StyledButton type='button' onClick={handlerModal}>
                            나가기
                        </StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
