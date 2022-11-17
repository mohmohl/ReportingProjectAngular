import { Deno_Detail } from "./Deno_Detail";

export class Deno_Header{

	branch_code:string;
	ccy:string;
    trn_dt:string;
	cash_in_hand:Number;
	detailList:Deno_Detail[];
}