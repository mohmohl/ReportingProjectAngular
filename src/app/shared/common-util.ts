import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable()
export class CommonUtil{
    constructor(public datepipe: DatePipe) {
    }

    groupBy(list, keyGetter) {
        const map = new Map();
        list.forEach((item) => {
            
             const key = keyGetter(item);
             const collection = map.get(key);
             if (!collection) {
                 map.set(key, [item]);
             } else {
                 collection.push(item);
             }
        });
       
        return (map);
    }
    
    getYYYYMMDD(objDT: Date){
        if(objDT != null){
            return `${objDT.getFullYear()}-${objDT.getMonth()+1}-${objDT.getDate()}`;
        }
       return '';
    }

    getDDMMYYYY(objDT: Date){
       
        if(objDT != null){
            return this.datepipe.transform(objDT, 'dd/MM/yyyy');
        }
       return '';
    }

    getDDMMMYYYY(objDT: Date){
       
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