import { useLocation } from "react-router-dom";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { NoticeModal } from "../NoticeModal/NoticeModal";
import { modalState } from "../../../../../stores/modalState";
// import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { Portal } from "../../../../common/potal/Portal";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { NoticeMainStyled } from "./styled";
import { searchApi } from "../../../../../api/NoticeApi/searchApi";
import { Notice } from "../../../../../api/api";

interface INotice {
    noticeId: number;
    title: string;
    author: string;
    createdDate: string;
}

interface INoticeResponse {
    noticeList: INotice[];
    noticeCnt: number;
}

export const NoticeMain = () => {
    const { search } = useLocation();
    const [noticeList, setNoticeList] = useState<INotice[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [noticeId, setNoticeId] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state

    // ✔ 타입스크립트가 columns를 Column<INotice>[]로 강제 변환하도록 유도
    // ✔ clickable이 없는 경우 자동으로 undefined로 처리됨
    const columns = [
        { key: "noticeId", title: "번호" },
        { key: "title", title: "제목", clickable: true },
        { key: "author", title: "작성자" },
        { key: "createdDate", title: "등록일" },
    ] as Column<INotice>[];

    useEffect(() => {
        searchNoitceList();
    }, [search]);

    const searchNoitceList = async (currentPage?: number) => {
        currentPage = currentPage || 1;
        const searchParam = new URLSearchParams(search);
        searchParam.append("currentPage", currentPage.toString());
        searchParam.append("pageSize", "5");

        const result = await searchApi<INoticeResponse, URLSearchParams>(Notice.search, searchParam);
        if (result) {
            setNoticeList(result.noticeList);
            setListCount(result.noticeCnt);
        }
        // axios.post("/management/noticeListBody.do", searchParam).then((res: AxiosResponse<INoticeResponse>) => {
        //     setNoticeList(res.data.noticeList);
        //     setListCount(res.data.noticeCnt);
        // });
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setNoticeId(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchNoitceList();
    };
    return (
        <NoticeMainStyled>
            총 갯수 : {listCount} 현재 페이지 : 0
            {/* <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={5}>번호</StyledTh>
                        <StyledTh size={50}>제목</StyledTh>
                        <StyledTh size={10}>작성자</StyledTh>
                        <StyledTh size={20}>등록일</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {noticeList?.length > 0 ? (
                        noticeList?.map((notice) => {
                            return (
                                <tr
                                    key={notice.noticeId}
                                    onClick={() =>
                                        handlerModal(notice.noticeId)
                                    }
                                >
                                    <StyledTd>{notice.noticeId}</StyledTd>
                                    <StyledTd>{notice.title}</StyledTd>
                                    <StyledTd>{notice.author}</StyledTd>
                                    <StyledTd>{notice.createdDate}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable> */}
            <StyledTable
                data={noticeList}
                columns={columns}
                onCellClick={(row, column) => {
                    if (column === "title") handlerModal(row.noticeId); // ✅ 제목 클릭 시 모달 열기
                }}
            ></StyledTable>
            {modal && (
                <Portal>
                    <NoticeModal id={noticeId} postSuccess={postSuccess} setNoticeId={setNoticeId} />
                </Portal>
            )}
        </NoticeMainStyled>
    );
};
