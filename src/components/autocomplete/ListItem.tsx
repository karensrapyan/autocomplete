import React, { useContext } from "react";
import { SearchFormContext } from "context";
import { ISearchFormContext } from "../../intefaces";

interface IListItemInterface {
  id: number;
  label: string;
}

//Can be declared in utils
const _highlightQuery = (string: string, search: string) => {
  let regex = new RegExp("(" + search + ")", "gi");
  return string.replace(regex, "<mark>$1</mark>");
}

/**
 * When we use general store like redux or InMemoryCache from apollo
 * it is better to pass only id and fetch label inside ListItem from store it will protect us from
 * unnecessary re-renders (ListItem is memoized)
 * */
function ListItem({ label }: IListItemInterface) {
  // fetch data from store by id and print label from it in case we use general store
  const {search, onSelect} = useContext(SearchFormContext) as ISearchFormContext;

  const handleSelect = () => {
    onSelect(label);
  }

  return (
    <div onClick={handleSelect}>
      <span dangerouslySetInnerHTML={{__html: _highlightQuery(label, search)}}></span>
    </div>
  );
}

export default React.memo(ListItem);
