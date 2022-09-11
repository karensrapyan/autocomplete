import { useState } from "react";
import { SearchFormContext } from "context";
import './styles/Autocomplete.css';
import Autocomplete from "./Autocomplete";

function AutocompleteWrapper() {
  const [search, setSearch] = useState<string>('')
  return (
    <SearchFormContext.Provider value={{
      search,
      setSearch
    }}>
      <Autocomplete />
    </SearchFormContext.Provider>
  )
}

export default AutocompleteWrapper;
