export const validateEmployeeForm = (employeeData: {
    employeeName: string;
    registrationNumber: string;
    hp: string;
    email: string;
    birthday: string;
}) => {
    const { employeeName, registrationNumber, hp, email, birthday } = employeeData;

    // 1. 필수 항목 체크
    if (!employeeName) {
        alert("이름을 입력해주세요.");
        return false;
    }
    if (!registrationNumber) {
        alert("주민번호를 입력해주세요.");
        return false;
    }
    if (!hp) {
        alert("연락처를 입력해주세요.");
        return false;
    }
    if (!email) {
        alert("이메일을 입력해주세요.");
        return false;
    }

    // 2. 만 20세 이상 검사
    const today = new Date();
    const birthDate = new Date(birthday);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--; // 생일이 아직 안 지났으면 -1
    }

    if (age < 20) {
        alert("만 20세 이상만 등록할 수 있습니다.");
        return false;
    }

    // 3. 이메일 형식 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("올바른 이메일 형식이 아닙니다.");
        return false;
    }

    return true; // 모든 검사 통과
};
