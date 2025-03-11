import { atom } from "recoil";
import { ILoginInfo } from "../models/interface/store/userInfo";

export const loginInfoState = atom<ILoginInfo>({
    key: "loginInfoState",
    default: {},
});
