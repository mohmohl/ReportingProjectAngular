import {CashWithdrawExpAcc} from './CashWithdrawExpAcc';

export class CashWithdrawExpAccResponse{
    totalPages : number;
    currentPage : number;
    pageSize : number;
    listData : CashWithdrawExpAcc[] = null;
}