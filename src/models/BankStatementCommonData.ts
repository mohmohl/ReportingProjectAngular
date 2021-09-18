import { BankStatementCountData } from "./BankStatementCountData";
import { BankStatementData } from "./BankStatementData";

export class BankStatementCommonData{
    statementList: Array<BankStatementData>;
    cashList : Array<BankStatementCountData>;
    transferList : Array<BankStatementCountData>;
}