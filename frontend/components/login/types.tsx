
export enum AuthMode {
  LOGIN = 'login',
  SIGNUP = 'signup'
}

export interface Country {
  name: string;
  code: string;
  flag: string;
  dialCode: string;
}
