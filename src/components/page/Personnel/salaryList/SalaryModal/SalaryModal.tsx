import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { SalaryModalStyled } from "./styled";

export const SalaryModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    if (!modal) return null; // 모달이 false면 렌더링하지 않음

    return (
        <SalaryModalStyled>
            <div
                id='premiumRateModal'
                className='layerPop layerType2'
                style={{
                    width: "400px", // 모달 가로 길이
                    padding: "20px",
                    position: "fixed", // 고정 위치
                    top: "50%", // 세로 중앙
                    left: "50%", // 가로 중앙
                    transform: "translate(-50%, -50%)", // 가운데 정렬
                    backgroundColor: "white", // 배경색
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // 그림자
                    borderRadius: "8px", // 둥근 테두리
                    zIndex: 1000, // 최상위 레벨
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                    }}
                >
                    <strong>보험료율(근로자 부담)</strong>
                    <button
                        onClick={() => setModal(false)}
                        style={{ border: "none", background: "none", cursor: "pointer", fontSize: "16px" }}
                    >
                        ❌
                    </button>
                </div>
                <p>- 국민연금: 4.5%</p>
                <p>- 건강보험: 3.43%</p>
                <p>- 고용보험: 0.8%</p>
                <p>- 산재보험: 1.56%</p>
            </div>
            {/* 뒷배경 어둡게 */}
            <div
                onClick={() => setModal(false)}
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // 반투명 배경
                    zIndex: 999, // 모달보다 아래
                }}
            />
        </SalaryModalStyled>
    );
};
