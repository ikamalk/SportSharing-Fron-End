import { Request } from './Request';

export interface Participant {
    id:number;
    accountId:number;
    name:string;
    age:number;
    phoneNumber:string;
    request:Request
  }