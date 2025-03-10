import { atom, useSetRecoilState } from "recoil";
import { ILoginInfo } from "../models/interface/store/userInfo";

export const loginInfoState = atom<ILoginInfo>({
    key: "loginInfoState",
    default: {},
});
