import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";
import { createEffect, createSignal } from "solid-js";
import { Show } from "solid-js";

interface AvatarProps {
  username: any;
  size?: number; // Add the size prop
}

function Avatar(props: AvatarProps) {
  const [avatar, setAvatar] = createSignal<string>("");

  createEffect(() => {
    const svg = createAvatar(thumbs, {
      seed: props.username,
      size: props.size || 40, // Use the provided size or default to 50
    }).toDataUriSync();

    setAvatar(svg);
  });

  return (
    <div>
      <Show when={avatar()}>
        <div class={`w-${props.size} h-${props.size} overflow-visible`}>
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
