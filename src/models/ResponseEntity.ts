import { CCS_Outward } from './CCS_Outward';
import { CCS_Inward } from './CCS_Inward';
import { ACH_Outward } from './ACH_Outward';
import { ACH_Inward } from './ACH_Inward';

export class ResponseEntity{
    totalRecord:number;
    resultSetSize:number;
    ccsoutwards ?: CCS_Outward[];
    ccsinwards ?: CCS_Inward[];
    achoutwards ?: ACH_Outward[];
    achinwards ?: ACH_Inward[];
}