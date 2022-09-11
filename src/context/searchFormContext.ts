import { createContext } from "react";
import { ISearchFormContext } from "intefaces";

export const SearchFormContext = createContext<ISearchFormContext>({
  search: '',
  setSearch: () => {}
});
