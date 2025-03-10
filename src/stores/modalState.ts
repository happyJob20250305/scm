import { atom } from "recoil";

export const modalState = atom<boolean>({
    key: "modalState",
    default: false,
});
export const findModalState = atom<boolean>({
    key: "findModalState",
    default: false,
});
