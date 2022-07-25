import { BranchData } from "./BranchData";
import { MenuItem } from "./menuItem";
import { ReportRole } from "./ReportRole";

export class UserInfo{
      user_id: string;
	  user_name: string;
	  password: string;
	  already_account_status:boolean;
	  login_status: string;
	  user_status: string;
	  menuItem:MenuItem[];
	  roleList:ReportRole[];
	  branchList: BranchData[];
	  record_stat : string;
}