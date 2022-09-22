import React from "react";
import { IUserData } from 'intefaces';
import { useFetchWrapper } from "hooks";
import List from './List';
import SearchForm from './SearchForm';
import './styles/Autocomplete.css';

function Autocomplete() {
  // can be in context as well searchHandler call when search has been changed
  const [searchHandler, reset, { data, error, isLoading }] = useFetchWrapper<IUserData>('/users/search');

  if (error) {
    return <div className="App"> Something Went wrong </div>
  }

  return (
    <div className="App">
      <h2>Autocomplete</h2>
      {/*Note that searchHandler is already from useCallback and no need to wrap it once again here */}
      <SearchForm searchHandler={searchHandler} resetCallback={reset} />
      {/*
        In case we will use single store we can skip passing isLoading data from here and instead get them from store inside List
      */}
      <List isLoading={isLoading} data={data} />
    </div>
  );
}

export default React.memo(Autocomplete);
