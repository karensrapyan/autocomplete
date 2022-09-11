import { useRef } from "react";
import { SearchFormContext } from "context";
import './styles/Autocomplete.css';
import Autocomplete from "./Autocomplete";

function AutocompleteWrapper() {
  let searchRef = useRef<any>(null);
  return (
    <SearchFormContext.Provider value={searchRef}>
      <Autocomplete />
    </SearchFormContext.Provider>
  )
}

export default AutocompleteWrapper;
