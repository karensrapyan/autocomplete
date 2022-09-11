import { IVariables } from "intefaces";

export function generateUrl(route: string, variables: IVariables) {
  const searchParams = new URLSearchParams(variables as any).toString();
  return [process.env.REACT_APP_ENDPOINT, route, searchParams ? '?' + searchParams : ''].join('');
}
