import { IDetailCode } from "./IDetailCode";

export interface IDetailCodeDetail extends IDetailCode {
    useYn: "Y" | "N",
    higherCode: string
}