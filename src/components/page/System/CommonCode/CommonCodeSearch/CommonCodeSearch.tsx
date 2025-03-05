import { StyledButton } from "../../../../common/StyledButton/StyledButton";

export const CommonCodeSearch = () => {
    return (
        <div>
            <div>
                <div className='flex space-x-4'>
                    <div>
                        <select>
                            <option value={"groupName"}>그룹코드명</option>
                            <option value={"groupCode"}>그룹코드</option>
                        </select>
                        <input />
                        <StyledButton>검색</StyledButton>
                        <StyledButton>등록</StyledButton>
                    </div>
                </div>
            </div>
        </div>
    );
};
