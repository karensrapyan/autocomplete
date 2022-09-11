import React, { useContext } from "react";
import { IAutoSelectCallback } from "types";
import { SearchFormContext } from "context";

interface IListItemInterface {
  id: number;
  label: string;
  onSelect: IAutoSelectCallback
}

/**
 * When we use general store like redux or InMemoryCache from apollo
 * it is better to pass only id and fetch label inside ListItem from store it will protect us from
 * unnecessary re-renders (ListItem is memoized)
 * */
function ListItem({ label, onSelect }: IListItemInterface) {
  // fetch data from store by id and print label from it in case we use general store
  const searchFormContext = useContext(SearchFormContext)

  const _highlightQuery = (string: string, search: string) => {
    let regex = new RegExp("(" + search + ")", "gi");
    return string.replace(regex, "<mark>$1</mark>");
  }

  const handleSelect = () => {
    onSelect(label)
  }

  return (
    <div onClick={handleSelect}>
      <span dangerouslySetInnerHTML={{__html: _highlightQuery(label, searchFormContext.current.value)}}></span>
    </div>
  );
}

export default React.memo(ListItem);
