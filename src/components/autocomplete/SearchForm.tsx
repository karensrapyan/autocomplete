import React, { useContext, useEffect, useState } from 'react';
import { IVariables } from "intefaces";
import { IAutoSelectCallbackSetter } from "types";
import { SearchFormContext } from "context";

interface ISearchForm {
  searchHandler: (variables?: IVariables) => Promise<any>;
  setCallback: IAutoSelectCallbackSetter;
  resetCallback: () => void;
}

const SEARCH_FORM = 'searchForm';

function SearchForm({searchHandler, setCallback, resetCallback}: ISearchForm) {
  const searchFormContext = useContext(SearchFormContext);
  const [search, setSearch] = useState<string>('');
  const [suggestionSelected, setSuggestionSelected] = useState<boolean>(false);

  const handleSearch = (e: any) => {
    setSuggestionSelected(false);
    setSearch(e.target.value);
  };

  useEffect(() => {
    const onSelect = (value: string) => {
      setSearch(value);
      setSuggestionSelected(true);
      resetCallback();
    }

    setCallback(onSelect);
  }, [setSearch, setSuggestionSelected]);

  useEffect(() => {
    /**
     * getData should be with debounced and I would like to use _debounce from lodash but since we are not allowed to
     * import additional libs then I will skip it for now
     * */
    if (search && !suggestionSelected) {
      searchHandler({
        q: search,
        select: 'firstName,lastName,email'
      });
    } else if (!search) {
      resetCallback();
    }
  }, [search, suggestionSelected]);


 return (
   <form name={SEARCH_FORM}>
     <p>Start typing:</p>
     <div className="autocomplete">
       <input onChange={handleSearch} value={search} name="search" placeholder="User" ref={searchFormContext} />
     </div>
   </form>
 );
}

export default React.memo(SearchForm);
