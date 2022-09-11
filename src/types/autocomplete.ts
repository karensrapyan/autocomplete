export type IAutoSelectCallback = (value: string) => void;
export type IAutoSelectCallbackSetter = (callback: IAutoSelectCallback) => void;
export type IAutoSelectCallbackHook = [
  IAutoSelectCallback,
  IAutoSelectCallbackSetter
];
