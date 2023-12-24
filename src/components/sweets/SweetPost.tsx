import { AiFillHeart, AiOutlineMessage } from "solid-icons/ai";
import { FaRegularHeart } from "solid-icons/fa";
import { FiTrash } from "solid-icons/fi";
import { Sweet } from "../../types/Sweet";
import Avatar from "../Avatar";
import { useAuth } from "../../context/authContext";
import { Show } from "solid-js";
import { useSweet } from "../../context/sweetContext";
import { BsBookmark, BsBookmarkFill } from "solid-icons/bs";
import SweetPostSkeleton from "../skeletons/SweetPostSkeleton";

type Props = {
  sweet: Sweet;
};

const SweetPost = (props: { sweet: Sweet }) => {
  const { user } = useAuth() as any;
  const { likeSweet, unlikeSweet, unbookmarkSweet, bookmarkSweet } =
    useSweet() as any;

  const sweet = () => props.sweet;
  /* const user = () => sweet().user; */

  const handleLike = () => {
    likeSweet(sweet().id);
  };
  const handleUnlike = () => {
    unlikeSweet(sweet().id);
  };

  const handleBookmark = () => {
    bookmarkSweet(sweet().id);
  };

  const handleUnbookmark = () => {
    unbookmarkSweet(sweet().id);
  };

  return (
    <Show when={user() !== null}fallback={<div><SweetPostSkeleton/></div>}>
      <div class="flex-it p-4 border-b-1 border-solid border-gray-700">
        <div class="flex-it flex-row">
          <div class="flex-it mr-4">
            <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
              <Avatar username={sweet().user!.name} size={140} />{" "}
            </div>
          </div>
          <article class="flex-it flex-grow flex-shrink cursor-pointer">
            <div class="flex-it justify-center flex-grow mb-1">
              <div class="flex-it justify-between flex-row w-full">
                <div>
                  <span class="font-bold">{sweet().user!.name}</span>
                  <span class="mx-2">&#8226;</span>
                  <span class="text-gray-400">2h</span>
                </div>
                <Show when={sweet().user!.id === user().id}>
                <div class="text-gray-400 cursor-pointer transition hover:text-red-400">
                  <FiTrash size={16} />
                </div>
                </Show>
              </div>
            </div>
            <div class="flex-it flex-row flex-grow-0 items-center mb-2">
              <div class="flex-it mr-3 mb-3 w-full">
                {sweet().content} 
              </div>
            </div>
            <div class="flex-it flex-row flex-grow text-gray-400">
              <div class="w-full flex">
                <div class="flex-it flex-row items-center cursor-pointer mr-5 transition hover:text-froly-400">
                  <AiOutlineMessage size={18} />
                  <span class="text-xs ml-3">10</span>
                </div>
                <button
                  onClick={sweet().liked ? handleUnlike : handleLike}
                  class={`flex-it flex-row items-center cursor-pointer mr-5 transition hover:text-froly-400 ${
                    sweet().liked ? "text-froly-400" : ""
                  }`}
                >
                  {!sweet().liked && <FaRegularHeart size={18} />}
                  {sweet().liked && <AiFillHeart size={18} color="#D91346" />}
                  <span class="text-xs ml-3">{sweet().likes_count}</span>
                </button>
              </div>
              <button
                onClick={sweet().bookmarked ? handleUnbookmark : handleBookmark}
                class={`flex-it flex-row items-center cursor-pointer mr-5 transition hover:text-froly-400 ${
                  sweet().bookmarked ? "text-froly-400" : ""
                }`}
              >
                {!sweet().bookmarked && <BsBookmark size={18} />}
                {sweet().bookmarked && <BsBookmarkFill size={18} color="#D91346" />}
              </button>
            </div>
          </article>
        </div>
      </div>
    </Show>
  );
};

export default SweetPost;
