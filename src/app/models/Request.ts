import { Account } from './Account';

export interface Request {
    id: number;
    account:Account;
    sport_type:string,
    player:number,
    skill_level:number,
    time_schedule:string,
  }