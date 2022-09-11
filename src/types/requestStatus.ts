import { IFetchResponse, IVariables } from "intefaces";

export type FetchWrapperType<T> = [
  (variables?: IVariables) => Promise<T>,
  () => void,
  IFetchResponse<T>
];

export enum RequestStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SUCCEEDED = 'succeeded',
  FAILED = 'failed'
}
