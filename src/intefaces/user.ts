export interface IUserData {
  users?: IUser[]
  total: number,
  skip: number,
  limit: number
}

export interface IUser {
  id: number,
  firstName: string;
  lastName: string;
  email: string;
}
