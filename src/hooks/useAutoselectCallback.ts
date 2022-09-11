import { useCallback, useRef } from "react";
import { IAutoSelectCallback, IAutoSelectCallbackHook, IAutoSelectCallbackSetter } from "types";

export function useAutoSelectCallback(): IAutoSelectCallbackHook {
  const selectRef = useRef<IAutoSelectCallback>();
  const setCallback = useCallback<IAutoSelectCallbackSetter>((callback: IAutoSelectCallback) => {
    selectRef.current = callback;
  }, []);

  return [
    selectRef.current,
    setCallback
  ] as IAutoSelectCallbackHook
}
