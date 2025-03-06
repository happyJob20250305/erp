import axios from "axios";
import { useEffect } from "react";

export const ClientMain = () => {
    useEffect(() => {
        searchClient();
    });

    const searchClient = () => {
        axios.post("/business/searchClientListBody.do").then((res) => {
            console.log(res);
            console.log(res.data);
            console.log(res.data.clientList);
        });
    };

    return (
        <div>
            <div>
                <table>
                    <colgroup>
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                        <col style={{ width: "9%", height: "400px" }} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>날짜</th>
                            <th>거래처 이름</th>
                            <th>담당자</th>
                            <th>전화번호</th>
                            <th>핸드폰</th>
                            <th>이메일</th>
                            <th>주소</th>
                            <th>메모</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={8}>검색 결과가 없습니다.</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
