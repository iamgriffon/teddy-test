import { BaseModel } from './base.model';

export class User extends BaseModel {
  name: string;
  session_token: string;
  session_token_expiry: Date;
}
