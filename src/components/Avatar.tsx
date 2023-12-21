import { createAvatar } from "@dicebear/core";
import {  thumbs } from "@dicebear/collection";
import { createEffect, createSignal } from "solid-js";
import { Show } from "solid-js";

interface AvatarProps {
  username: any;
}

function Avatar(props: AvatarProps) {
  const [avatar, setAvatar] = createSignal<string>(null);

  createEffect(() => {
    const svg = createAvatar(thumbs, {
      seed: props.username,
      size: 50,
    }).toDataUriSync();

    setAvatar(svg);
  });

  return (
    <div>
      <Show when={avatar()}>
        <div class="w-10 h-10 overflow-visible">
          <img
            class="rounded-full"
            src={avatar()}
            alt={`Avatar for ${props.username}`}
          ></img>
        </div>
      </Show>
    </div>
  );
}

export default Avatar;
