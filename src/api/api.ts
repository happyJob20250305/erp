export const Login = {
    login: "/loginProc.do",
};

export const Employee = {
    employeeList: "/personnel/employeeListBody",
    getJobRolesByDepartment: "/personnel/getJobRolesByDepartment.do",
    employeeSave: "/personnel/employeeSave.do",
    employeeStatusUpdate: "/personnel/employeeStatusUpdate.do",
    employeeDetail: "/personnel/employeeDetailBody",
    emplStatusUpdate: "/personnel/emplStatusUpdate.do",
    employeeUpdate: "/personnel/employeeUpdate.do",
};

export const Promotion = {
    promitionList: "/personnel/promotionListBody",
    promitionDetailList: "/personnel/promotionDetail.do",
};

export const AttendanceApproval = {
    searchAttendanceList: "/personnel/attendanceListBody.do",
    searchDetail: "/personnel/attendanceDetailBody.do",
    rejectAttendance: "/personnel/attendanceRejectBody.do",
    firstApproveAttendance: "/personnel/attendanceFirstApproveBody.do",
    approveRejectAttendance: "/personnel/attendanceApproveRejectBody.do",
    secondApproveAttendance: "/personnel/attendanceSecondApproveBody.do",
};

export const AttendanceRequest = {
    searchAttendanceListCnt: "/personnel/attendanceCntBody.do",
    searchAttendanceList: "/personnel/attendanceListBody.do",
    searchDetail: "/personnel/attendanceDetailBody.do",
    saveAttendanceRequest: "/personnel/attendanceRequest.do",
    updateAttendanceRequest: "/personnel//attendanceUpdate.do",
    cancleAttendanceRequest: "/personnel/attendanceCancleBody.do",
    searchRejectDetail: "/personnel/attendanceDetailBody.do",
};

export const AttendanceList = {
    attendanceCalendar: "/personnel/attendanceCalendarSummary.do",
    searchDetail: "/personnel/approveDetailListBody.do",
};

export const SalaryManager = {
    salaryList: "/personnel/salaryListBody",
    empnoSalaryList: "/personnel/salaryDetail.do",
    salarySave: "/personnel/salarySave.do",
    allPaymentStatusUpdate: "/personnel/allPaymentStatusUpdate.do",
    paymentStatusUpdate: "/personnel/paymentStatusUpdate.do",
};

export const MySalaryDetail = {
    mySalaryDetailList: "/personnel/salaryListDetail.do",
};

export const SalaryOptionList = {
    optionList: "/personnel/salary-manage-body",
};

export const Manage = {
    searchGroupList: "/account/accountGroupList.do",
    searchDetailList: "/account/accountSearchDetailBody.do",
    searchAccountList: "/account/accountListBody.do",
    save: "/account/accountSave.do",
    update: "/account/accountUpdate.do",
    delete: "/account/accountDelete.do",
};

export const ExpenseList = {
    searchDetailList: "/account/accountSearchDetailBody.do",
    searchExpenseList: "/account/expenseListBody.do",
    searchAccountDetailList: "/account/expenseSearchDetailBody.do",
    getLoginInfo: "/account/expenseLoginInfoBody.do",
    expenseSave: "/account/expenseFileSave.do",
    expenseDelete: "/account/expenseDelete.do",
    expensefileDownload: "/account/expenseDownload.do",
};

export const ExpenseReview = {
    searchAccountDetailList: "/account/expenseSearchDetailBody.do",
    searchExpenseReviewList: "/account/expenseListBody.do",
    getCrebitList: "/account/expense-reviewBody.do",
    expenseUpdate: "/account/expenseUpdate.do",
    expensefileDownload: "/account/expenseDownload.do",
};

export const ExpenseApproval = {
    expenseLastUpdate: "/account/expenseLastUpdate.do",
    expensefileDownload: "/account/expenseDownload.do",
};

export const VoucherList = {
    searchClientList: "/account/voucherClientListSearch.do",
    searchVoucherList: "/account/voucherListBody.do",
};

export const Daily = {
    search: "/sales/dailyListBody.do",
};

export const Monthly = {
    search: "/sales/monthlyListBody.do",
    detail: "/sales/monthlyTopProductBody.do",
    detailClient: "/sales/monthlyTopClientBody.do",
};

export const ReceivablesList = {
    search: "/sales/receivableListBody.do",
    detail: "/sales/receivableDetailBody.do",
    saveDepositAmount: "/sales/insertReceivableHistory.do",
};

export const Annual = {
    search: "/sales/annualListBody.do",
    detail: "/sales/annualTopProductBody.do",
    detailClient: "/sales/annualTopClientBody.do",
};

export const CommonCode = {
    searchGroupCodeList: "/system/groupListBody",
    searchGroupCodeDetail: "/system/groupDetailBody",
    saveGroupCode: "/system/groupSave",
    updateGroupCode: "/system/groupUpdate",
    searchDetailCodeList: "/system/detailListBody",
    searchDetailCodeDetail: "/system/detailDetailBody",
    saveDetailCode: "/system/detailSave",
    updateDetailCode: "/system/detailUpdate",
};

export const Notice = {
    searchNoticeList: "/system/noticeListBody.do",
    searchDetail: "/system/noticeFileDetailBody.do",
    saveNotice: "/system/noticeFileSave.do",
    updateNotice: "/system/noticeFileUpdate.do",
    deleteNotice: "/system/noticeDeleteBody.do",
    fileDownload: "/system/noticeDownload.do",
};

export const Department = {
    searchDepartmentList: "/system/departmentListBody",
    searchDetail: "/system/departmentDetailBody",
    saveDepartment: "/system/departmentSave",
    updateDepartment: "/system/departmentUpdate",
};
