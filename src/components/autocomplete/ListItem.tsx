import React from "react";
import { IAutoSelectCallback } from "types";

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

  const handleSelect = () => {
    onSelect(label)
  }

  return (
    <div onClick={handleSelect}>{label}</div>
  );
}

export default React.memo(ListItem);
