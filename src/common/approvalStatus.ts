export const approvalCode = (value: string) => {
    switch (value) {
        case "W":
            return "검토 대기";
        case "N":
            return "반려";
        case "F":
            return "승인 대기";
        case "S":
            return "승인";
    }
};
