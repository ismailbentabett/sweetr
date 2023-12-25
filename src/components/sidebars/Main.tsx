import { A } from "@solidjs/router";
import { FiMoreHorizontal } from "solid-icons/fi";
import { RiDesignQuillPenLine } from "solid-icons/ri";
import { Component, For, Show, createSignal } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";
import pageSize from "../../helpers/pageSize";
import Avatar from "../Avatar";
import Popup from "../utils/Popup";
import { links } from "./links";
import { useAuth } from "../../context/authContext";

const MainSidebar: Component = (props: any) => {
  const [isOpen, setIsOpen] = createSignal(false);
  const { user } = useAuth() as any;
  const handleOpenModal = () => {
    setIsOpen((old) => !old);
    props.openSideBar(isOpen());
  };

  return (
    <header class="lg:flex-grow flex-it items-end">
      <div class="xl:w-80 w-20 flex-it">
        <div class="h-full fixed flex-it top-0">
          <div class="flex-it h-full xl:w-80 w-20 overflow-y-auto px-3 justify-between">
            <div class="flex-it items-start">
              <div class="p-3 pt-4 xl:pb-3 pb-0 xl:text-2xl text-sm font-bold transition duration-200 hover:opacity-80">
                <div class=" xl:pb-3 pb-0 xl:text-2xl text-sm font-bold transition duration-200 hover:opacity-80">
                  <A href="/" class="-m-1.5 p-1.5">
                    <span class="sr-only">Sweetr</span>
                    <img class="h-16 w-16 " src="/logo.svg" alt="" />
                  </A>
                </div>
              </div>
              <div class="my-1 w-full flex-it">
                <nav class="flex-it items-start">
                  <For each={links}>
                    {(link: {
                      href: string;
                      icon: () =>
                        | number
                        | boolean
                        | Node
                        | JSX.ArrayElement
                        | (string & {})
                        | null
                        | undefined;
                      name:
                        | number
                        | boolean
                        | Node
                        | JSX.ArrayElement
                        | (string & {})
                        | null
                        | undefined;
                    }) => (
                      <A
                        class="flex-it items-start flex-grow w-full"
                        href={link.href}
                      >
                        <div class="p-3 flex-row justify-center items-center flex-it rounded-3xl hover:bg-gray-800 hover:rounded-3xl transition duration-200">
                          <div class="flex-it">{link.icon()}</div>
                          <div class="mx-4 text-2xl truncate xl:block hidden">
                            <span class="truncate">{link.name}</span>
                          </div>
                        </div>
                      </A>
                    )}
                  </For>
                </nav>
              </div>
              {/* sweetR SEND-MESSAGE BUTTON */}
              <div class="my-1 flex-it w-10/12 cursor-pointer">
                <div class="bg-froly-400 hover:bg-froly-500 text-white font-bold py-2 px-4 rounded-full flex-it transition">
                  <button
                    onClick={handleOpenModal}
                    class="flex-it flex-row text-xl font-bold text-white items-start justify-center truncate duration-200"
                  >
                    <Show
                      when={pageSize.isXl()}
                      fallback={<RiDesignQuillPenLine />}
                    >
                      <div>Sweet It</div>
                    </Show>
                  </button>
                </div>
              </div>
            </div>
            {/* PROFILE MENU */}
            <div class="flex-it hover:cursor-pointer">
              {/* POPUP START*/}
              <Popup
                opener={() => (
                  <div class="my-3 flex justify-center items-center flex-row p-3 rounded-3xl hover:bg-gray-800 hover:rounded-3xlcursor-pointer">
                    <Show when={user()}>
                      <Avatar username={user().data.name}  />
                    </Show>
                    <div class="flex-it xl:flex hidden flex-grow flex-row justify-between items-center">
                      <Show when={user()}>
                        <div class="flex-it mx-3 font-bold">
                          {user().data.name}
                        </div>
                      </Show>
                      <div class="flex-it">
                        <FiMoreHorizontal />
                      </div>
                    </div>
                  </div>
                )}
              />
              {/* POPUP END */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainSidebar;
function props(props: {}): Element {
  throw new Error("Function not implemented.");
}
