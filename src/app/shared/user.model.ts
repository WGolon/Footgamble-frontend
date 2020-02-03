export interface UserLoginResponse {
  token: string;
  username: string;
  isPro: boolean;
  isAdmin: boolean;
 }

export class User {
  constructor(
    public token: string,
    public username: string,
    public isPro: boolean,
    public isAdmin: boolean,
    ) {

  }
}
