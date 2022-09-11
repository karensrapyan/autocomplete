import { useFetchWrapper, useAutoSelectCallback } from "hooks";
import { IUserData } from 'intefaces';
import List from './List';
import SearchForm from './SearchForm';
import './styles/Autocomplete.css';

function Autocomplete() {
  const [searchHandler, reset, { data, error, isLoading }] = useFetchWrapper<IUserData>('/users/search');

  /**
   * 1. We are not allowed to use store management tools like react
   * 2. I don't want to use context API
   * 3. I don't want to lift search from SearchForm to parent component Autocomplete
   * I have used another approach to get properties from SearchForm and pass to List using Ref's
   * it is ok for my case because I don't need to track .current value
   * Please note that this is also in questions for test task
   * We can use useState for saving data, but I preferred useRef just to avoid from re-renders in this level
   * */
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
        In case we use single store we can skip passing anything to List
        but fetch and listen with useEffect isLoading, data inside List itself
      */}
      <List isLoading={isLoading} data={data} onSelect={callback} />
    </div>
  );
}

export default Autocomplete;
