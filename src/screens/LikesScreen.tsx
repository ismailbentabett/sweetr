import { Component, For, Show, createEffect } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import { useUser } from "../context/userContext";
import SweetPost from "../components/sweets/SweetPost";
import Empty from "../components/Empty";

const LikesScreen: Component = () => {
  const { likes, fetchLikes } = useUser() as any;

    fetchLikes();
;

  return (
    <Authenticatedlayout>
        {JSON.stringify(likes())}
    {/*   <Show
        when={likes().data.length > 0}
        fallback={
          <div>
            <Empty />
          </div>
        }
      >
        <For each={likes().data}>{(sweet) => <SweetPost sweet={sweet} />}</For>
      </Show> */}
    </Authenticatedlayout>
  );
};

export default LikesScreen;
