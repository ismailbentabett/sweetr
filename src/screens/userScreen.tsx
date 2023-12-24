import { useNavigate, useParams } from "@solidjs/router";
import { Component, For, Show, createEffect, createSignal } from "solid-js";
import Avatar from "../components/Avatar";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import SweetPost from "../components/sweets/SweetPost";
import { useSweet } from "../context/sweetContext";
import { useUser } from "../context/userContext";
import { useAuth } from "../context/authContext";

const userScreen: Component = () => {
  //get user id from url
  const params = useParams();
  const userId = params.id;

  const { user, getUser } = useUser() as any;
  const { user: authUser } = useAuth() as any;
  const navigate = useNavigate();

  const { userSweets, fetchUserSweets } = useSweet() as any;

  createEffect(() => {
    fetchUserSweets(userId);
    getUser(userId);

    if (authUser() && userId == authUser().id) {
      navigate("/profile");
    }
  });

  const [isFollowing, setIsFollowing] = createSignal(true);

  function handleMouseOver() {
    setIsFollowing(false);
  }

  function handleMouseOut() {
    setIsFollowing(true);
  }

  return (
    <Authenticatedlayout>
      <Show when={user()}>
        <div class="text-white">
          <div>
            <img
              class="h-32 w-full object-cover lg:h-48"
              src="https://images.unsplash.com/photo-1520052205864-92d242b3a76b?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
          </div>
          <div class="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div class="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div class="flex">
                <span class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32">
                  <Avatar username="ismailbentabett" size={140} />{" "}
                </span>{" "}
              </div>
              <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 class="truncate text-2xl font-bold text-white">
                    {user().user.name}
                  </h1>
                  <p class="text-sm font-medium text-gray-400">
                    @ {user().user.name}
                  </p>
                </div>
                <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-3xl border border-white-300 bg-white text-gray-900  px-7 py-2 text-sm font-medium  shadow-sm hover:bg-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                  >
                    <span class="font-bold text-gray-900">Follow</span>
                  </button>
                  <button
                    type="button"
                    class={`inline-flex justify-center rounded-3xl border border-white-300  text-white px-7 py-2 text-sm font-medium shadow-sm hover:border-red-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                      isFollowing() ? "" : "unfollow"
                    }`}
                    onmouseover={handleMouseOver}
                    onmouseout={handleMouseOut}
                  >
                    <span class="font-bold text-white hover:text-red-600">
                      {isFollowing() ? "Following" : "Unfollow"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 class="truncate text-2xl font-bold text-white">
                {user().user.name}
              </h1>
              <p class="text-sm font-medium text-gray-400">
                @ {user().user.name}
              </p>
            </div>
          </div>

          <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">About</dt>
                <dd class="mt-1 max-w-prose space-y-5 text-sm text-white">
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
                    error laudantium quas fuga repellat alias maxime reiciendis
                    saepe aut. Eligendi sed, nesciunt minima animi maxime odit
                    perspiciatis rem quam at.
                  </p>
                </dd>
              </div>
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Phone</dt>
                <dd class="mt-1 text-sm text-white">(555) 123-4567</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Email</dt>
                <dd class="mt-1 text-sm text-white">
                  ricardocooper@example.com
                </dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Title</dt>
                <dd class="mt-1 text-sm text-white">
                  Senior Front-End Developer
                </dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Team</dt>
                <dd class="mt-1 text-sm text-white">Product Development</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Location</dt>
                <dd class="mt-1 text-sm text-white">San Francisco</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Sits</dt>
                <dd class="mt-1 text-sm text-white">Oasis, 4th floor</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Salary</dt>
                <dd class="mt-1 text-sm text-white">$145,000</dd>
              </div>

              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Birthday</dt>
                <dd class="mt-1 text-sm text-white">June 8, 1990</dd>
              </div>
            </dl>
          </div>
          <For each={userSweets()} fallback={<div></div>}>
            {(sweet) => <SweetPost sweet={sweet} />}
          </For>
        </div>
      </Show>
    </Authenticatedlayout>
  );
};

export default userScreen;
