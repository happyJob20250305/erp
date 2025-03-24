// 유효성 검사 유틸 함수들

/** 필수 입력값 확인 */
export const validateRequiredFields = (formData: FormData, requiredFields: string[]): boolean => {
    for (const field of requiredFields) {
        if (!formData.get(field)?.toString().trim()) {
            alert(`${field}은(는) 필수 입력 항목입니다.`);
            return false;
        }
    }
    return true;
};

/** 이메일 형식 검사 */
export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return false;
    }
    return true;
};

/** 연락처 자동 포맷팅 */
export const formatPhoneNumber = (value: string): string => {
    let phone = value.replace(/[^0-9]/g, "").slice(0, 11); // 숫자만 허용, 최대 11자리
    if (phone.length >= 8) {
        phone = phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (phone.length >= 4) {
        phone = phone.replace(/(\d{3})(\d{3,4})/, "$1-$2");
    }
    return phone;
};

/** 계좌번호 형식 검사 */
export const validateBankAccount = (account: string): boolean => {
    const accountRegex = /^\d{10,14}$/; // 10~14자리 숫자
    if (!accountRegex.test(account)) {
        alert("계좌번호는 10~14자리 숫자로 입력하세요.");
        return false;
    }
    return true;
};

/** 생년월일이 만 20세 이상인지 검사 */
export const validateAge = (birthday: string): boolean => {
    const birthDate = new Date(birthday);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();

    if (age < 20 || (age === 20 && today < new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate()))) {
        alert("만 20세 이상만 등록할 수 있습니다.");
        return false;
    }
    return true;
};

/** 주민번호 입력 시 생년월일 자동 생성 */
export const formatRegistrationNumber = (value: string): string => {
    let regNum = value.replace(/[^0-9]/g, "").slice(0, 13); // 숫자만 허용, 최대 13자리
    if (regNum.length > 6) {
        regNum = regNum.replace(/(\d{6})(\d{1,7})/, "$1-$2");
    }
    return regNum;
};

/**
 * 주민번호를 이용해 생년월일을 자동 생성하는 함수
 * @param regNum 주민번호 (XXXXXX-XXXXXXX 형태)
 * @returns YYYY-MM-DD 형식의 생년월일 (올바르지 않으면 빈 문자열 반환)
 */
export const generateBirthdayFromRegNumber = (regNum: string): string => {
    // 숫자만 추출
    const cleanRegNum = regNum.replace(/[^0-9]/g, "");
    if (cleanRegNum.length !== 13) return ""; // 13자리 미만이면 리턴

    // 주민번호 앞 6자리로 생년월일 계산
    const yearPrefix = cleanRegNum[6] === "1" || cleanRegNum[6] === "2" ? "19" : "20";
    const year = yearPrefix + cleanRegNum.substring(0, 2);
    const month = cleanRegNum.substring(2, 4);
    const day = cleanRegNum.substring(4, 6);

    // 유효한 날짜인지 확인
    const dateStr = `${year}-${month}-${day}`;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return ""; // 잘못된 날짜이면 빈 문자열 반환

    return dateStr;
};

/** 파일(사진) 유효성 검사 */
export const validateFile = (file: File): boolean => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
        alert("허용된 이미지 형식은 jpg, png, gif입니다.");
        return false;
    }
    if (file.size > maxSize) {
        alert("이미지 크기는 2MB 이하로 업로드해야 합니다.");
        return false;
    }
    return true;
};
