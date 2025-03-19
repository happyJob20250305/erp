import { FC, useEffect, useRef, useState } from "react";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { ClientListModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { IClient, IClientResponse } from "../ClientListMain/ClientListMain";
import axios, { AxiosResponse } from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";

interface IClientModalProps {
    detailClient: IClient;
    setDetailClient: (detailSalesPlan?: IClient) => void;
    postSuccess: () => void;
}

interface IPostResponse {
    result: "exist" | "success" | "fail";
}

export const ClientListModal: FC<IClientModalProps> = ({ detailClient, setDetailClient, postSuccess }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const bankRef = useRef<HTMLElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const [clientId, setClientId] = useState<string>(detailClient?.id || "");
    const [custUpdateDate, setCustUpdateDate] = useState<string>(detailClient?.cust_update_date || "");
    const [zipCode, setZipCode] = useState<string>(detailClient?.zip || "");
    const [address, setAddress] = useState<string>(detailClient?.addr || "");

    const [isEmailLocal, setIsEmailLocal] = useState<string>(detailClient?.email.split("@")[0] || "");
    const [selectEmailDomain, setSelectEmailDomain] = useState<string>(detailClient?.email.split("@")[1] || "");
    const [isEmailAddr, setIsEmailAddr] = useState<string>(detailClient?.email || "");
    const [selectBank, setSelectBank] = useState<string>(detailClient?.bank.split("은행")[0] || "");

    useEffect(() => {
        handlerEmailAddr(isEmailLocal, selectEmailDomain);
        return () => {
            setDetailClient();
        };
    }, [isEmailLocal, selectEmailDomain]);

    const emailAddrOptions = [
        // { label: "직접입력", value: "" },
        { label: "gmail.com", value: "gmail.com" },
        { label: "hotmail.com", value: "hotmail.com" },
        { label: "naver.com", value: "naver.com" },
        { label: "hanmail.net", value: "hanmail.net" },
        { label: "nate.com", value: "nate.com" },
    ];

    const bankOptions = [
        // { label: "직접입력", value: "" },
        { label: "기업", value: "기업" },
        { label: "신한", value: "신한" },
        { label: "하나", value: "하나" },
        { label: "농협", value: "농협" },
        { label: "우리", value: "우리" },
        { label: "국민", value: "국민" },
        { label: "수협", value: "수협" },
        { label: "카카오뱅크", value: "카카오뱅크" },
        { label: "산업", value: "산업" },
    ];

    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const handlerComplete = (data: {
        sido: string;
        sigungu: string;
        zonecode: any;
        address: any;
        jibunAddress: any;
        roadAddress: any;
        addressType: string;
        bname: string;
        buildingName: string;
        userSelectedType: string;
    }) => {
        let jibunAddress = data.jibunAddress;
        let roadAddress = data.roadAddress;
        let fullAddress = "";
        let extraAddress = "";
        let zonecode = data.zonecode;
        if (data.userSelectedType === "R") {
            fullAddress = roadAddress;
            if (data.bname !== "") {
                extraAddress += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
        } else fullAddress = jibunAddress;

        // console.log("zonecode:" + zonecode);
        // console.log("fullAddress:" + fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'

        setZipCode(zonecode);
        setAddress(fullAddress);
    };

    const handlerPostCode = () => {
        open({ onComplete: handlerComplete });
    };

    const handlerEmailAddr = (isEmailLocal: string, selectEmailDomain: string): string => {
        let resultEmailAddr = "";
        if (selectEmailDomain === "") {
            resultEmailAddr = isEmailLocal;
        } else {
            resultEmailAddr = isEmailLocal + "@" + selectEmailDomain;
        }
        setIsEmailAddr(resultEmailAddr);
        return resultEmailAddr;
    };

    // const handlerBank = (e: string) => {
    //     if (e !== "직접입력") {
    //         setSelectBank(e);
    //     } else {
    //         // const inputTagofBank =
    //         console.log("e:" + e);
    //     }
    // };
    const insertClient = () => {
        const formData = new FormData(formRef.current);
        console.log("formData:" + formData.get("zip"));

        axios
            .post(
                "/business/client-list/insertClientListBody.do",
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                }
                //     {
                //     zip: "08390",
                //     biz_num: "987-45-61230",
                //     memo: "250318-2 거래처 등록 테스트",
                //     bank: "신한",
                //     person: "푸드",
                //     ph: "031-987-6543",
                //     person_ph: "031-123-4567",
                //     detail_addr: "지하 1층 B108호",
                //     client_id: "",
                //     addr: "서울 구로구 디지털로 288",
                //     client_name: "멘치까스",
                //     email: "itsthe@naver.com",
                //     bank_account: "110-1234-567890",
                //     cust_update_date: "",
                // }
            )
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    console.log("Response:", res);
                    alert("저장되었습니다.");
                    postSuccess();
                } else if (res.data.result === "exist") {
                    console.log("Response:", res);
                    alert("이미 존재하는 거래처 이름입니다.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("서버 오류가 발생했습니다.");
            });
    };

    const updateClient = () => {
        const formData = new FormData(formRef.current);

        axios
            .post("/business/client-list/updateClientListBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    console.log("Response:", res);
                    alert("수정되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("서버 오류가 발생했습니다.");
            });
    };

    return (
        <ClientListModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        업체명*
                        <StyledInput
                            type='text'
                            name='client_name'
                            defaultValue={detailClient?.client_name}
                        ></StyledInput>
                    </label>
                    <label>
                        담당자*
                        <StyledInput type='text' name='person' defaultValue={detailClient?.person}></StyledInput>
                    </label>
                    <label>
                        회사전화*
                        <StyledInput type='text' name='ph' defaultValue={detailClient?.ph}></StyledInput>
                    </label>
                    <label>
                        담당자전화*
                        <StyledInput type='text' name='person_ph' defaultValue={detailClient?.person_ph}></StyledInput>
                    </label>
                    <label>우편번호*</label>
                    <span>
                        <StyledInput type='text' name='zip' defaultValue={zipCode} readOnly></StyledInput>
                    </span>
                    <span className={"button-container"}>
                        <StyledButton type='button' onClick={handlerPostCode}>
                            주소검색
                        </StyledButton>
                    </span>
                    <label>
                        주소*
                        <StyledInput type='text' name='addr' defaultValue={address} readOnly></StyledInput>
                    </label>
                    <label>
                        상세주소*
                        <StyledInput
                            type='text'
                            name='detail_addr'
                            defaultValue={detailClient?.detail_addr}
                        ></StyledInput>
                    </label>
                    <label>
                        이메일*
                        <StyledInput
                            type='text'
                            name='email_local'
                            defaultValue={isEmailLocal}
                            onChange={(e) => setIsEmailLocal(e.target.value)}
                        ></StyledInput>
                        <StyledSelectBox
                            options={emailAddrOptions}
                            value={selectEmailDomain}
                            onChange={setSelectEmailDomain}
                            name='email_domain'
                        />
                        <input type='hidden' name='email' defaultValue={isEmailAddr} />
                    </label>
                    <label>
                        사업자등록번호*
                        <StyledInput type='text' name='biz_num' defaultValue={detailClient?.biz_num}></StyledInput>
                    </label>
                    <label>
                        은행*
                        {/* <StyledSelectBox
                            options={bankOptions}
                            value={selectBank}
                            onChange={(e: string) => handlerBank(e)}
                            name='bank_select'
                        /> */}
                        <StyledSelectBox
                            options={bankOptions}
                            value={selectBank}
                            onChange={setSelectBank}
                            name='bank'
                        />
                        {/* <StyledInput type='hidden' name='bank' value={selectBank} ref={bankRef}></StyledInput> */}
                        <StyledInput
                            type='text'
                            name='bank_account'
                            defaultValue={detailClient?.bank_account}
                        ></StyledInput>
                    </label>
                    <label>
                        메모*
                        <StyledInput type='text' name='memo' defaultValue={detailClient?.memo}></StyledInput>
                    </label>
                    <div className={"button-container"}>
                        {custUpdateDate ? (
                            <>
                                <StyledButton type='button' onClick={updateClient}>
                                    수정
                                </StyledButton>
                            </>
                        ) : (
                            <>
                                <StyledButton type='button' onClick={insertClient}>
                                    등록
                                </StyledButton>
                            </>
                        )}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>
                            나가기
                        </StyledButton>
                    </div>
                    <input type='hidden' name='id' value={clientId} readOnly />
                    <input type='hidden' name='cust_update_date' value={custUpdateDate} readOnly />
                </form>
            </div>
        </ClientListModalStyled>
    );
};
