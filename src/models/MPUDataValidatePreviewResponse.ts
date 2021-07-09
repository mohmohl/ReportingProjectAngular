import { INC_01C } from './mpu9files/INC_01C';
import { INC_01R } from './mpu9files/INC_01R';
import { INC_01S } from './mpu9files/INC_01S';
import { INC_11C } from './mpu9files/INC_11C';
import { INC_11S } from './mpu9files/INC_11S';
import { INDSCOM } from './mpu9files/INDSCOM';
import { IND_01ACOM } from './mpu9files/IND_01ACOM';
import { IND_01ICOM } from './mpu9files/IND_01ICOM';
import { IND_01IERR } from './mpu9files/IND_01IERR';

export class MPUDataValidatePreviewResponse{
    valid:Boolean;
    
    inc_01c:INC_01C[];
    inc_01r:INC_01R[];
    inc_01s:INC_01S[];
    inc_11c:INC_11C[];
    inc_11s:INC_11S[];
    ind_01acom:IND_01ACOM[];
    ind_01icom:IND_01ICOM[];
    ind_01ierr:IND_01IERR[];
    ind_01scom:INDSCOM[];
}