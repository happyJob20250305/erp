import DaumPostcode from "react-daum-postcode";

interface Props {
    onComplete: (data: any) => void;
    onClose: () => void;
}

export const DaumAddressModal = ({ onComplete, onClose }: Props) => {
    return (
        <div
            style={{
                position: "absolute",
                top: "20%",
                left: "30%",
                width: "500px",
                height: "600px",
                zIndex: 100,
                border: "1px solid #ccc",
                backgroundColor: "#fff",
            }}
        >
            <DaumPostcode onComplete={onComplete} autoClose onClose={onClose} />
        </div>
    );
};
