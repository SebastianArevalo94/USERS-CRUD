export interface User {
  userId: number;
  nombre: string;
  email: string;
}

export interface UserProp {
  user: User;
  open: boolean;
  close: Function;
  change: Function;
  submit: Function;
}

export interface AddProp {
  user: User;
  open: boolean;
  close: Function;
  change: Function;
  submit: Function;
}

export interface DeleteProp {
  open: boolean;
  close: Function;
  script: Function;
}

