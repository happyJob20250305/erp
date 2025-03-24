import { atom } from "recoil";

export const modalState = atom<boolean>({
    key: "modalState",
    default: false,
});

export const modalTypeState = atom<string>({
    key: "modalTypeState",
    default: "",
});
