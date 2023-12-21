import { Component, createSignal, createUniqueId, For, onCleanup, onMount } from "solid-js";
import { FaRegularImage } from "solid-icons/fa";
import MainLayout from "../components/layouts/Main";
import SweetPost from "../components/sweets/SweetPost";
import { Sweet } from "../types/Sweet";
import Avatar from "../components/Avatar";
import { useAuthContext } from "../context/authContext";

const HomeScreen: Component = () => {
  const [content, setContent] = createSignal("");
  const [sweets, setSweets] = createSignal<Sweet[]>([]);

  const AuthState = useAuthContext();

  const createSweet = () => {
    const sweet = {
      id: createUniqueId(),
      content: content(),
      user: {
        nickName: "ismailbentabett",
        avatar: "https://www.pinclipart.com/picdir/middle/133-1331433_free-user-avatar-icons-happy-flat-design-png.png"
      },
      likesCount: 0,
      subsweetsCount: 0,
      date: new Date()
    }

    setSweets([sweet, ...sweets()]);
    setContent("");
  }

  return (
    <MainLayout>
      {/* HOME PAGE START */}
      <div class="flex-it py-1 px-4 flex-row">
        <div class="flex-it mr-4">
          <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
          <Avatar username={"ismailbentabett"}  />

          </div>
        </div>
        {/* MESSENGER START */}
        <div class="flex-it flex-grow">
          <div class="flex-it">
            <textarea
              value={content()}
              onInput={(event) => {
                setContent(event.currentTarget.value);
              }}
              name="content"
              rows="1"
              id="sweet"
              class="bg-transparent resize-none overflow-hidden block !outline-none !border-none border-transparent focus:border-transparent focus:ring-0 text-gray-100 text-xl w-full p-0"
              placeholder={"What's new?"}
            />
          </div>
          <div class="flex-it mb-1 flex-row xs:justify-between items-center">
            <div class="flex-it mt-3 mr-3 cursor-pointer text-white hover:text-froly-400 transition">
              <div class="upload-btn-wrapper cursor-pointer">
              <FaRegularImage size={18} style={{ cursor: 'pointer' }} />
                <input style={{ cursor: 'pointer' }} type="file" name="myfile" />
              </div>
            </div>
            <div class="flex-it w-32 mt-3 cursor-pointer">
              <button
                onClick={createSweet}
                type="button"
                class="
                  disabled:cursor-not-allowed disabled:bg-gray-400
                  bg-froly-400 hover:bg-froly-500 text-white font-bold py-2 px-4 rounded-full flex-it transition duration-200"
              >
                <div class="flex-it flex-row text-sm font-bold text-white items-start justify-center">
                  <span>Sweet It</span>
                </div>
              </button>
            </div>
          </div>
        </div>
        {/* MESSENGER END */}
      </div>
      <div class="h-px bg-gray-700 my-1" />
      <For each={sweets()}>
        { (sweet) =>
          <SweetPost sweet={sweet} />
        }
      </For>
      {/* HOME PAGE END */}
    </MainLayout>
  );
};

export default HomeScreen;