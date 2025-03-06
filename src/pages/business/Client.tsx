import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ClientMain } from "../../components/page/Business/Client/ClientMain/ClientMain";

export const Client = () => {
    return (
        <>
            <ContentBox variant='primary' fontSize='large'>
                거래처 조회
            </ContentBox>
            <ClientMain />
        </>
    );
};
