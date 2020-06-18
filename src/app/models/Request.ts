import { Account } from './Account';
import { Participant } from './Participant';

export interface Request {
    id: number;
    account:Account;
    sport_type:string;
    player:number;
    skill_level:number;
    time_schedule:string;
    address:string;
    participants:Participant[]
  }