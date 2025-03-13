import { forwardRef, useEffect, useRef } from "react";
import { ExpenseApprovalPrintStyle, ExpensePrintTable } from "./styled";
import { ModalStyledTable } from "../../VoucherList/VoucherListModal/styled";

export const ExpenseApprovalPrint = forwardRef<HTMLDivElement, { expenseDetail: any }>(({ expenseDetail }, ref) => {
    return (
        <ExpenseApprovalPrintStyle>
            <div ref={ref} className='print-section'>
                <h2>지출 결의서</h2>
                {expenseDetail ? (
                    <>
                        <ExpensePrintTable>
                            <tbody>
                                <tr>
                                    <th>결의번호</th>
                                    <td>{expenseDetail.id}</td>
                                    <th>사원명</th>
                                    <td>{expenseDetail.name}</td>
                                    <th>부서명</th>
                                    <td>{expenseDetail.use_department}</td>
                                </tr>
                                <tr>
                                    <th>신청일자</th>
                                    <td>{expenseDetail.req_date}</td>
                                    <th>사용일자</th>
                                    <td>{expenseDetail.use_date}</td>
                                </tr>
                                <tr>
                                    <th>계정대분류명</th>
                                    <td>{expenseDetail.group_name}</td>
                                    <th>계정과목명</th>
                                    <td>{expenseDetail.detail_name}</td>
                                    <th>결의금액</th>
                                    <td>{expenseDetail.expense_payment}</td>
                                </tr>
                                <tr>
                                    <th colSpan={6}>비고</th>
                                </tr>
                                <tr>
                                    <td colSpan={6}>{expenseDetail.expense_content}</td>
                                </tr>
                            </tbody>
                        </ExpensePrintTable>

                        <div className='btn_areaC mt30'>
                            <p>
                                <span>위 금액을 영수(청구)합니다.</span>
                            </p>
                            <p>
                                <span>
                                    영수자 <span id='sign_name'></span> (인)
                                </span>
                            </p>
                        </div>
                    </>
                ) : (
                    <p>선택된 데이터가 없습니다.</p>
                )}
            </div>
        </ExpenseApprovalPrintStyle>
    );
});
