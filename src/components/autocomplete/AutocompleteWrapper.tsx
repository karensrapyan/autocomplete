import { useCallback, useState } from "react";
import { SearchFormContext } from "context";
import Autocomplete from "./Autocomplete";
import './styles/Autocomplete.css';

function AutocompleteWrapper() {
  const [search, setSearch] = useState<string>('');
  const [suggestionSelected, setSuggestionSelected] = useState<boolean>(false);

  const onSearch = useCallback((value: string) => {
    setSuggestionSelected(false);
    setSearch(value);
  }, []);

  const onSelect = useCallback((value: string) => {
    setSuggestionSelected(true);
    setSearch(value);
  }, []);

  return (
    <SearchFormContext.Provider value={{
      search,
      suggestionSelected,
      onSearch,
      onSelect
    }}>
      <Autocomplete />
    </SearchFormContext.Provider>
  )
}

export default AutocompleteWrapper;
