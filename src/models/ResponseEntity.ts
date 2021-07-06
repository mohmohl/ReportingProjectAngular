import {CCS_Outward} from './CCS_Outward';
import {CCS_Inward} from './CCS_Inward';

export class ResponseEntity{
    totalRecord:number;
    resultSetSize:number;
    ccsoutwards ?: CCS_Outward[];
    ccsinwards ?: CCS_Inward[];
}