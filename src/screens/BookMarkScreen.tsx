import { Component, For, Show, createEffect } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import { useUser } from "../context/userContext";
import SweetPost from "../components/sweets/SweetPost";
import Empty from "../components/Empty";

const BookMarkScreen: Component = () => {
  const { bookmarks, fetchBookmarks } = useUser() as any;
  createEffect(() => {
    fetchBookmarks();
  });

  return (
    <Authenticatedlayout>
   
     <Show
        when={JSON.stringify(bookmarks().data) !== JSON.stringify([])}
        fallback={
          <div>
            <Empty />
          </div>
        }
      >
        <For each={bookmarks().data}>
          {(sweet) => <SweetPost sweet={sweet} />}
        </For>
      </Show> 
    </Authenticatedlayout>
  );
};

export default BookMarkScreen;
