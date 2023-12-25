import { Component, For, Show, createEffect } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import Avatar from "../components/Avatar";
import SweetPost from "../components/sweets/SweetPost";
import { useSweet } from "../context/sweetContext";
import { useAuth } from "../context/authContext";
import { A, useParams } from "@solidjs/router";
import SweetPostSkeleton from "../components/skeletons/SweetPostSkeleton";
import Empty from "../components/Empty";

const ProfileScreen: Component = () => {
  //get user id from url
  const params = useParams();
  const userId = params.id;

  const { user } = useAuth() as any;

  const { mySweets, fetchMySweets } = useSweet() as any;

  createEffect(() => {
    fetchMySweets();
  });

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
                  <A
                    href="/settings"
                    type="button"
                    class="inline-flex justify-center rounded-3xl border border-white-300  px-7 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-froly-500 focus:ring-offset-2"
                  >
                    <span class="font-bold text-white">Edit Profile</span>
                  </A>
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
              <Show when={user().data.website}>

                <dt class="text-sm font-medium text-gray-500">Website</dt>
                  <a
                    href={user().data.website}
                    class="font-medium text-froly-600 dark:text-froly-500 hover:underline"
                  >
                    {user().data.website ? user().data.website : "No website"}
                  </a>
                </Show>
              </div>

              <div class="sm:col-span-2">
                <dt class="text-sm font-medium text-gray-500">About</dt>
                <dd class="mt-1 max-w-prose space-y-5 text-sm text-white">
                  <p>
                    {user().data.bio ? user().data.bio : "No bio available"}
                  </p>
                </dd>
              </div>
            </dl>
          </div>
          <Show
            when={mySweets().data.length > 0}
            fallback={
              <div>
                <Empty />
              </div>
            }
          >
            <For each={mySweets().data}>
              {(sweet) => <SweetPost sweet={sweet} />}
            </For>
          </Show>
        </div>
      </Show>
    </Authenticatedlayout>
  );
};

export default ProfileScreen;
