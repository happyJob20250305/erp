import { ClientListProvider } from "../../api/Provider/SalaryMangerProvider/ClientListProvider";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { ClientListMain } from "../../components/page/Business/Client/ClientList/ClientListMain/ClientListMain";
import { ClientListSearch } from "../../components/page/Business/Client/ClientList/ClientListSearch/ClientListSearch";

export const ClientList = () => {
    return (
        <>
            <ClientListProvider>
                <ContentBox variant='primary' fontSize='large'>
                    거래처 조회
                </ContentBox>
                <ClientListSearch />
                <ClientListMain />
            </ClientListProvider>
        </>
    );
};
