import { BankStatementCommonData } from "./BankStatementCommonData";
import { CustomerInfo } from "./CustomerInfo";

export class BankStatementViewData{
    customerInfo : CustomerInfo;
    bankStatementCommonData : BankStatementCommonData;

    closingBalance : number;
	totalWithdrawl : number;
	totalDeposit : number;
	totalDepositCount : number;
	cashWithdrawlCount : number;
	cashWithdrawlAmt : number;
	cashDepositCount : number;
	cashDepositAmt : number;
	transferWithdrawlCount : number;
	transferWithdrawlAmt : number;
	transferDepositCount : number;
	transferDepositAmt : number;
	previousBalance : number;
	totalWithdrawlCount : number;
}