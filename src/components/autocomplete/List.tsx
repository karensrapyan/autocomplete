import React, { useCallback, useEffect, useState } from "react";
import { IUser, IUserData } from "intefaces";
import { IAutoSelectCallback } from "types";
import ListItem from "./ListItem";

interface IList {
  isLoading: boolean;
  data: IUserData | null;
  onSelect: IAutoSelectCallback;
}

function List({ isLoading, data, onSelect }: IList) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);
  }, [isLoading])

  const handleSelect = useCallback((label: string) => {
    onSelect(label);
    setHide(true);
  }, [onSelect]);

  return (
    <>
      {
        isLoading && (
          <div className="autocompleteItems" hidden={hide}>
            <div>Loading ...</div>
          </div>
        )
      }
      <div className="autocompleteItems" hidden={hide || isLoading}>
        <>
          {
            (data?.users || []).map((user: IUser) => {
              /**
               * When we use general store like redux or InMemoryCache from apollo
               * it is better to pass only id and fetch label inside ListItem from store it will protect us from
               * unnecessary re-renders (ListItem is memoized)
               * */
              return (
                <ListItem
                  key={user.id}
                  id={user.id}
                  label={[user.firstName, user.lastName, `(${user.email})`].join(' ')}
                  onSelect={handleSelect}
                />
              )
            })
          }
        </>
      </div>
    </>
  );
}

export default List;
