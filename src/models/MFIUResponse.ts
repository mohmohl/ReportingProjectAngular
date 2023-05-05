import { MFIUReportDto } from "./MFIUReportDto";

export class MFIUResponseDto {

	  code:string;
	  message:string;
	  flag:boolean;
	 data_list:MFIUReportDto[];
}