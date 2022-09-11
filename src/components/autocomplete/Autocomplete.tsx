import React from "react";
import { IUserData } from 'intefaces';
import { useFetchWrapper, useAutoSelectCallback } from "hooks";
import List from './List';
import SearchForm from './SearchForm';
import './styles/Autocomplete.css';

function Autocomplete() {
  const [searchHandler, reset, { data, error, isLoading }] = useFetchWrapper<IUserData>('/users/search');

  /**
   * Please note that this can be reached also with ContextProvider
   * leaving like this just to variety because search, setSearch are used by context
   */
  const [callback, setCallback] = useAutoSelectCallback();

  if (error) {
    return <div className="App"> Something Went wrong </div>
  }

  return (
    <div className="App">
      <h2>Autocomplete</h2>
      {/*Note that searchHandler is already from useCallback and no need to wrap it once again here */}
      {/*Same is true for setCallback */}
      <SearchForm searchHandler={searchHandler} setCallback={setCallback} resetCallback={reset} />
      {/*
        In case we will use single store we can skip passing isLoading data from here and instead get them from store inside List
      */}
      <List isLoading={isLoading} data={data} onSelect={callback} />
    </div>
  );
}

export default React.memo(Autocomplete);
