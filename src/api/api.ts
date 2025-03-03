export const Login = {
    login: "/loginProc.do",
};

export const CommonCode = {
    search: "/management/commonCodeListBody.do",
    detail: "/management/commonCodeDetailJson.do",
    save: "/management/commonCodeSaveBody.do",
    update: "/management/commonCodeUpdateBody.do",
} as const; // 🚀 'as const'를 추가하면 값이 변하지 않도록 고정!

export const Notice = {
    search: "/management/noticeListBody.do",
    detail: "/management/noticeFileDetailBody.do",
} as const;
