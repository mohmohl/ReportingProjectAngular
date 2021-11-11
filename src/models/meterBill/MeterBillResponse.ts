import { MeterBill_Error } from "./MeterBill_Error";
import { MeterBill_Vendor } from "./MeterBill_Vendor";

export class MeterBillResponse {
    flag: Boolean;
    message: string;
    totalCount: number;
    errorList: Array<MeterBill_Error>;
    vendorList: Array<MeterBill_Vendor>;
}