import { MeterBillConfigDetails } from "./MeterBillConfigDetails";

export class MeterBillConfigHeader{
    id:number;
    configName : string;
    headerRowNo:number;
    removeLastRow : string;
    details : MeterBillConfigDetails[] = [];
}