export const Login = {
    login: "/loginProc.do",
};

export const Daily = {
    search: "/sales/dailyList.do",
};

export const Monthly = {
    search: "/sales/monthlyList.do",
    detail: "/sales/monthlyTopProduct.do",
    detailClient: "/sales/monthlyTopClient.do",
};

export const ReceivablesList = {
    search: "/sales/receivableList.do",
};

export const Annual = {
    search: "/sales/annualList.do",
    detail: "/sales/annualTopProduct.do",
    detailClient: "/sales/annualTopClient.do",
};
export const SalaryManager = {
    salaryList: "/personnel/salaryList.do",
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
