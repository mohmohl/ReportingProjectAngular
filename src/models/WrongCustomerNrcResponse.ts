import { WrongCustomerAccountData } from './WrongCustomerAccountData';
import { WrongCustomerData } from './WrongCustomerData';

export class WrongCustomerNrcResponse{
    msgCode : string;
    msgDesc : string;
    customerData : WrongCustomerData[];
    accountData : WrongCustomerAccountData[];

}    