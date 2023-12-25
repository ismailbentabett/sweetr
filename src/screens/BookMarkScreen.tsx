import { Component, For, Show, createEffect } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import { useUser } from "../context/userContext";
import SweetPost from "../components/sweets/SweetPost";
import Empty from "../components/Empty";

const BookMarkScreen: Component = () => {
  const { bookmarks, fetchBookmarks } = useUser() as any;

    fetchBookmarks();
  
  return (
    <Authenticatedlayout>
        {JSON.stringify(bookmarks())}
 {/*      <Show
        when={bookmarks().data.length > 0}
        fallback={
          <div>
            <Empty />
          </div>
        }
      >
        <For each={bookmarks().data}>
          {(sweet) => <SweetPost sweet={sweet} />}
        </For>
      </Show> */}
    </Authenticatedlayout>
  );
};

export default BookMarkScreen;
