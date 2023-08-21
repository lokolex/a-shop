export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
}

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IAuthState {
  user: IUser | null;
  status: Status;
}

export interface IFetchLoginArgs {
  email: string;
  password: string;
}

export interface IFetchRegisterArgs extends IFetchLoginArgs {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
}

export interface IDataAxios {
  accessToken: string;
  user: IUser;
}

export interface IDataGetUser extends IUser {
  password?: string;
}
