import { FC, useEffect, useRef, useState } from "react";
import { StyledButton } from "../../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../../common/StyledInput/StyledInput";
import { ClientListModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../../stores/modalState";
import { IClient } from "../ClientListMain/ClientListMain";
import axios, { AxiosResponse } from "axios";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { StyledSelectBox } from "../../../../../common/StyledSelectBox/StyledSelectBox";

interface IClientModalProps {
    detailClient: IClient;
    setDetailClient: (detailClient?: IClient) => void;
    postSuccess: () => void;
}

interface IPostResponse {
    result: "exist" | "success" | "fail";
}

export const ClientListModal: FC<IClientModalProps> = ({ detailClient, setDetailClient, postSuccess }) => {
    const formRef = useRef<HTMLFormElement>(null);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const [clientId, setClientId] = useState<string>(detailClient?.id || "");
    const [custUpdateDate, setCustUpdateDate] = useState<string>(detailClient?.cust_update_date || "");
    const [zipCode, setZipCode] = useState<string>(detailClient?.zip || "");
    const [address, setAddress] = useState<string>(detailClient?.addr || "");
    const [detailAddr, setDetailAddr] = useState<string>(detailClient?.detail_addr || "");

    const [isEmailLocal, setIsEmailLocal] = useState<string>(detailClient?.email.split("@")[0] || "");
    const [selectEmailDomain, setSelectEmailDomain] = useState<string>(detailClient?.email.split("@")[1] || "");
    const [selectBank, setSelectBank] = useState<string>(detailClient?.bank.split("은행")[0] || "");

    useEffect(() => {
        return () => {
            setDetailClient();
            setClientId("");
        };
    }, []);

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

    // 주소 검색 API를 활용한 주소 정보 기입 구현
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

        setZipCode(zonecode);
        setAddress(fullAddress);
        setDetailAddr("");
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
        return resultEmailAddr;
    };

    const insertClient = () => {
        const formData = new FormData(formRef.current);

        //
        const emailFullAddr = handlerEmailAddr(isEmailLocal, selectEmailDomain);

        //
        formData.append("email", emailFullAddr);
        // formData.append("iSBN", detailClient?.bank_account.split("-")[0]);

        axios
            .post("/business/client-list/insertClientListBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("저장되었습니다.");
                    postSuccess();
                } else if (res.data.result === "exist") {
                    alert("이미 존재하는 거래처 이름입니다.");
                }
            })
            .catch((error) => {
                alert("서버 오류가 발생했습니다.");
            });
    };

    const updateClient = () => {
        const formData = new FormData(formRef.current);

        //
        const emailFullAddr = handlerEmailAddr(isEmailLocal, selectEmailDomain);
        console.log("emailFullAddr:" + emailFullAddr);

        //
        formData.append("id", clientId);
        formData.append("email", emailFullAddr);
        // formData.append("iSBN", detailClient?.bank_account.split("-")[0]);
        formData.append("cust_update_date", custUpdateDate);

        axios
            .post("/business/client-list/updateClientListBody.do", formData, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res: AxiosResponse<IPostResponse>) => {
                if (res.data.result === "success") {
                    alert("수정되었습니다.");
                    postSuccess();
                }
            })
            .catch((error) => {
                alert("서버 오류가 발생했습니다.");
            });
    };

    return (
        <ClientListModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        거래처*
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
                        <StyledInput
                            type='text'
                            name='zip'
                            value={zipCode}
                            onChange={() => setZipCode}
                            readOnly
                        ></StyledInput>
                    </span>
                    <span className={"button-container"}>
                        <StyledButton type='button' onClick={handlerPostCode}>
                            주소검색
                        </StyledButton>
                    </span>
                    <label>
                        주소*
                        <StyledInput
                            type='text'
                            name='addr'
                            value={address}
                            onChange={() => setAddress}
                            readOnly
                        ></StyledInput>
                    </label>
                    <label>
                        상세주소*
                        <StyledInput
                            type='text'
                            name='detail_addr'
                            value={detailAddr}
                            onChange={(e) => setDetailAddr(e.target.value)}
                        ></StyledInput>
                    </label>
                    <label>
                        이메일*
                        <StyledInput
                            type='text'
                            name='firstEmail'
                            value={isEmailLocal}
                            onChange={(e) => setIsEmailLocal(e.target.value)}
                        ></StyledInput>
                        <StyledSelectBox
                            options={emailAddrOptions}
                            value={selectEmailDomain}
                            onChange={setSelectEmailDomain}
                            name='selectemailaddr'
                        />
                    </label>
                    <label>
                        사업자등록번호*
                        <StyledInput type='text' name='biz_num' defaultValue={detailClient?.biz_num}></StyledInput>
                    </label>
                    <label>
                        은행*
                        <StyledSelectBox
                            options={bankOptions}
                            value={selectBank}
                            onChange={setSelectBank}
                            name='bank'
                        />
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
                        {clientId ? (
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
                </form>
            </div>
        </ClientListModalStyled>
    );
};
