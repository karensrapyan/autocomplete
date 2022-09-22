import React, { useEffect, useState } from "react";
import { IUser, IUserData } from "intefaces";
import ListItem from "./ListItem";

interface IList {
  isLoading: boolean;
  data: IUserData | null;
}

function List({ isLoading, data }: IList) {
  const [hide, setHide] = useState(false);

  useEffect(() => {
    setHide(false);
  }, [isLoading])

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
