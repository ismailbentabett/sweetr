import { Component, For, Show, createEffect } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import Avatar from "../components/Avatar";
import SweetPost from "../components/sweets/SweetPost";
import { useSweet } from "../context/sweetContext";
import { useAuth } from "../context/authContext";
import { useParams } from "@solidjs/router";
import SweetPostSkeleton from "../components/skeletons/SweetPostSkeleton";
import Empty from "../components/Empty";

const ProfileScreen: Component = () => {
  //get user id from url
  const params = useParams();
  const userId = params.id;

  const { user } = useAuth() as any;

  const { userSweets, fetchUserSweets } = useSweet() as any;

  createEffect(() => {
    fetchUserSweets(userId);
  });

  return (
    <Authenticatedlayout>
      <Show when={user()} fallback={<div></div>}>
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
                  <Avatar username={user().data.name} size={140} />{" "}
                </span>{" "}
              </div>
              <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                  <h1 class="truncate text-2xl font-bold text-white">
                    {user().data.name}
                  </h1>
                  <p class="text-sm font-medium text-gray-400">
                    {user().data.email}
                  </p>
                </div>
                <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <button
                    type="button"
                    class="inline-flex justify-center rounded-3xl border border-white-300  px-7 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-froly-500 focus:ring-offset-2"
                  >
                    <span class="font-bold text-white">Edit Profile</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
              <h1 class="truncate text-2xl font-bold text-white">
                {user().data.name}
              </h1>
              <p class="text-sm font-medium text-gray-400">
                {user().data.email}
              </p>
            </div>
          </div>

          <div class="mx-auto mt-6 max-w-5xl px-4 sm:px-6 lg:px-8 mb-10 border-b border-gray-700 pb-10">
            <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
              <div class="sm:col-span-1">
                <dt class="text-sm font-medium text-gray-500">Website</dt>

                <a
                  href="https://www.ismailbentabett.com"
                  class="font-medium text-froly-600 dark:text-froly-500 hover:underline"
                >
                  https://www.ismailbentabett.com
                </a>
              </div>

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
            </dl>
          </div>
          <Show when={userSweets().length > 0} fallback={<div><Empty/></div>}>
          <For each={userSweets()} >
            {(sweet) => <SweetPost sweet={sweet} />}
          </For>
          </Show>
        </div>
      </Show>
    </Authenticatedlayout>
  );
};

export default ProfileScreen;
