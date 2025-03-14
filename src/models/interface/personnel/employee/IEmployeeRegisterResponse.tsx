export interface IEmployeeRegisterResponse {
    employeeId: string | number; // number로만 고정하고 싶다면 number
    number: string | number;
    employeeName: string;
    registrationNumber: string;
    sex: "남자" | "여자";
    fileInput: File | null; // 바이너리 파일은 File 객체로
    birthday: string; // 날짜 형식 (YYYY-MM-DD)
    email: string;
    hp: string; // 핸드폰 번호
    zipCode: string | number;
    address: string;
    bankAccount: string;
    addressDetail: string;
    departmentCode: string | null;
    jobGradeCode: string | null;
    regDate: string; // 날짜 (YYYY-MM-DD)
    resignationDate: string | null;
    workingYear: string | number | null; // 근속연수
    salary: string; // "123,123,123,123"처럼 콤마 포함된 문자열
    detailSeverancePay: string | null;
    empMemo: string | null;
    emplStatus: string; // ex) 'W'
    departmentDetailName: string;
    jobGradeDetailName: string;
    jobRoleDetailName: string;
    finalEducation: string; // ex) '중졸'
    bank: string;
    paymentDate: string; // ex) '2025-03'
    empty: string | null;
}
