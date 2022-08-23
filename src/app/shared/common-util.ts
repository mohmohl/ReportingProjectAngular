import { Injectable } from "@angular/core";

@Injectable()
export class CommonUtil{
    constructor() {
    }
    
    getYYYYMMDD(objDT: Date){
        if(objDT != null){
            return `${objDT.getFullYear()}-${objDT.getMonth()+1}-${objDT.getDate()}`;
        }
       return '';
    }

    getDDMMMYYYY(objDT: Date){
        const month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        if(objDT != null){
            return `${objDT.getDate()}-`+ this.getMonthName(objDT.getMonth(), 'S') +`-${objDT.getFullYear()}`;
        }
       return '';
    }

    getMonthName(midx : number, type : string){
        let month_names = [];
        if(type == 'S'){
            month_names = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        }
        else if(type == 'L'){
            month_names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
          ];
        }
        return month_names[midx];
    }

}