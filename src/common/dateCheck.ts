export const dateCheck = (
    searchStDate: string,
    searchEdDate: string,
    type: "start" | "end",
    setSearchStDate: (value: string) => void,
    setSearchEdDate: (value: string) => void
) => {
    const startDateObj = new Date(searchStDate);
    const endDateObj = new Date(searchEdDate);

    if (type === "start") {
        if (searchEdDate && startDateObj > endDateObj) {
            alert("시작 날짜는 종료 날짜보다 클 수 없습니다.");
            setSearchStDate("");
        } else {
            setSearchStDate(searchStDate);
        }
    } else {
        if (searchStDate && endDateObj < startDateObj) {
            alert("종료 날짜는 시작 날짜보다 작을 수 없습니다.");
            setSearchEdDate("");
            return;
        } else {
            setSearchEdDate(searchEdDate);
        }
    }
};
