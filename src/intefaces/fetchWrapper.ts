import { RequestStatus } from "types";

export interface IFetchResponse<T> {
  data: T | null,
  error: string | null,
  status: RequestStatus
  isLoading: boolean
}

// can be enlarged
export interface IVariables {
  [key: string]: string | null | number
}
