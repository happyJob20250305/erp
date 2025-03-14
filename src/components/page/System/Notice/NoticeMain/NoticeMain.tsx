import { useContext, useEffect, useState } from "react";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { NoticeModal } from "../NoticeModal/NoticeModal";
import { NoticeMainStyled } from "./styled";
import { SystemContext } from "../../../../../api/Provider/SystemProvider";
import { searchApi } from "../../../../../api/SystemApi/searchApi";
import { Notice } from "../../../../../api/api";
import { INotice } from "../../../../../models/interface/system/Notice/INotice";

interface INoticeListBodyResponse {
    noticeList: INotice[];
    noticeCnt: number;
}

export const NoticeMain = () => {
    const [noticeList, setNoticeList] = useState<INotice[]>([]);
    const [noticeCnt, setNoticeCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const { searchKeyword } = useContext(SystemContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [notiSeq, setNotiSeq] = useState<number>(0);

    const columns = [
        { key: "notiSeq", title: "번호" },
        { key: "notiTitle", title: "제목" },
        { key: "loginId", title: "작성자" },
        { key: "notiDate", title: "작성일" },
    ] as Column<INotice>[];

    useEffect(() => {
        searchNoticeList();
    }, [searchKeyword]);

    const searchNoticeList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<INoticeListBodyResponse>(Notice.searchNoticeList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setNoticeList(result.noticeList);
            setNoticeCnt(result.noticeCnt);
            setCPage(currentPage);
        }
    };

    const handlerModal = (id: number) => {
        setModal(!modal);
        setNotiSeq(id);
    };

    const postSuccess = () => {
        setModal(!modal);
        searchNoticeList();
    };

    return (
        <NoticeMainStyled>
            총 갯수 {noticeCnt} : 현재 페이지 : {cPage}
            <StyledTable
                columns={columns}
                data={noticeList}
                hoverable={true}
                fullWidth={true}
                onCellClick={(row, column) => {
                    handlerModal(row.notiSeq);
                }}
            />
            <PageNavigate
                totalItemsCount={noticeCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchNoticeList}
            />
            {modal && (
                <Portal>
                    <NoticeModal notiSeq={notiSeq} setNotiSeq={setNotiSeq} postSuccess={postSuccess} />
                </Portal>
            )}
        </NoticeMainStyled>
    );
};
