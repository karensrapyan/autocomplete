import { useCallback, useMemo, useRef, useState } from "react";
import { FetchWrapperType, RequestStatus } from "types";
import { IFetchResponse, IVariables } from "intefaces";
import { generateUrl } from "utils";

/**
 * We also can have fetchWrapper function which can be used outside of components
 *
 * async function fetchWrapper() {
 *   try {
 *     const response = await fetch('');
 *     return await response.json();
 *   } catch (e) {
 *     //Log your error in sentry or where you want
 *   }
 *   return null; // or what u want
 * }
 *
 * useFetchWrapper supports only GET request because it is just for test task.
 * But this can be enhanced to support fetch() accepting variables and be used in production for real apps
 * Here I have tried to implement something like in apollo useLazyQueryHook because I am fan of it :)
 *
 * */

/**
 * Please note that implementation of this hook returns function to be executed in components
 * we can also make it triggered within useEffect hook right here
 * */

// This hook is just a DEMO of my knowledge and skills in hooks, btw it could be simpler
export function useFetchWrapper<T = any>(route?: string): FetchWrapperType<T> {
  const [data, setData] = useState<T | null>(null);
  const [status, setStatus] = useState<RequestStatus>(RequestStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController>();

  const execute = useCallback(async (variables?: IVariables): Promise<any> => {
    try {
      const url = generateUrl(route ?? '', variables ?? {});

      if (abortControllerRef.current instanceof AbortController) {
        setStatus(RequestStatus.IDLE);
        abortControllerRef.current.abort();
      }

      /**
       * In React 18th version all set functions from useState will be handled in batch mode,
       * We are free to call them like below
       * */
      setStatus(RequestStatus.LOADING);
      //setData(null);
      setError(null);

      abortControllerRef.current = new AbortController();
      const response = await fetch(url, {
        signal: abortControllerRef.current!.signal
      });
      const result = await response.json();

      setData(result);
      setStatus(RequestStatus.SUCCEEDED);
      return response; // For case when u need this out of the hook
    } catch (e: any) {
      if (e.name !== "AbortError") {
        setStatus(RequestStatus.FAILED);
        setError(e.message);
      } else {
        console.log('Aborted'); // Just to understand that abort works
      }
    }
    return null;
  }, [route]);

  const resetData = useCallback(() => {
    setStatus(RequestStatus.IDLE);
    setData(null);
    setError(null);
  }, []);

  const result: IFetchResponse<T> = useMemo(() => ({
    data,
    status,
    error,
    isLoading: status === RequestStatus.LOADING
  }), [data, status, error]);

  return useMemo(() => {
    return [
      execute,
      resetData,
      result
    ] as FetchWrapperType<T>
  }, [execute, resetData /*can be excluded because it is memoized*/, result]);
}
