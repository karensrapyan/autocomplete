import React, { useContext, useEffect } from 'react';
import { ISearchFormContext, IVariables } from "intefaces";
import { SearchFormContext } from "context";

interface ISearchForm {
  searchHandler: (variables?: IVariables) => Promise<any>;
  resetCallback: () => void;
}

const SEARCH_FORM = 'searchForm';

function SearchForm({ searchHandler, resetCallback }: ISearchForm) {
  const { search, suggestionSelected, onSearch } = useContext(SearchFormContext) as ISearchFormContext;

  const handleSearch = (e: any) => {
    onSearch(e.target.value);
  };

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
    } else if (!search || suggestionSelected) {
      resetCallback();
    }
  }, [resetCallback, searchHandler, search, suggestionSelected]);


  return (
    <form name={SEARCH_FORM}>
      <p>Start typing:</p>
      <div className="autocomplete">
        <input onChange={handleSearch} value={search} name="search" placeholder="User"/>
      </div>
    </form>
  );
}

export default React.memo(SearchForm);
