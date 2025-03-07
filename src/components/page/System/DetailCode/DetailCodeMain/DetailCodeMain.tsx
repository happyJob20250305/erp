import { useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { DetailCodeMainStyled } from "./styled";
import axios, { AxiosResponse } from "axios";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";
import { useLocation } from "react-router-dom";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { DetailModal } from "../DetailModal/DetailModal";
import { Portal } from "../../../../common/potal/Portal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";


export interface IDetailCode {
    groupCode: string,
    detailCode: string,
    detailName: string,
    note: string,
}

interface IDetailCodeListResponse {
    detailList: IDetailCode[],
    detailCnt: number
}

export const DetailCodeMain = () => {
    const { state } = useLocation();
    const [detailList, setDetailList] = useState<IDetailCode[]>([]);
    const [detailCnt, setDetailCnt] = useState<number>(0);
    const [cPage, setCPage] = useState<number>(0);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detailCode, setDetailCode] = useState<string>("");

    const columns = [
        { key: "groupCode", title: "공통코드" },
        { key: "detailCode", title: "상세코드" },
        { key: "detailName", title: "상세코드명" },
        { key: "note", title: "비고" },
        { key: "actions", title: "보기" },
    ] as Column<IDetailCode>[];

    useEffect(() => {
        searchDetailCodeList();
    }, [])

    const searchDetailCodeList = (currentPage?: number) => {
        currentPage = currentPage || 1;

        axios.post("/system/detailListBody", {
            groupCode: state.groupCode,
            pageSize: 5,
            currentPage,
        }).then((res: AxiosResponse<IDetailCodeListResponse>) => {
            setDetailList(res.data.detailList);
            setDetailCnt(res.data.detailCnt);
            setCPage(currentPage);
        })
    }

    const handlerModal = (id: string) => {
        setDetailCode(id);
        setModal(!modal)
    }

    const postSuccess = () => {
        setModal(!modal)
        searchDetailCodeList();
    }

    return (
        <DetailCodeMainStyled>
            <StyledTable
                columns={columns}
                data={detailList}
                hoverable={true}
                fullWidth={true}
                renderAction={(row) =>
                    <StyledButton size="small" onClick={() => { handlerModal(row.detailCode) }}>
                        수정
                    </StyledButton>}
            />
            <PageNavigate
                totalItemsCount={detailCnt}
                activePage={cPage}
                itemsCountPerPage={5}
                onChange={searchDetailCodeList}
            />
            {
                modal && (
                    <Portal>
                        <DetailModal detailCode={detailCode} setDetailCode={setDetailCode} postSuccess={postSuccess} />
                    </Portal>
                )
            }
            <StyledButton>뒤로가기</StyledButton>
        </DetailCodeMainStyled>
    );
};
