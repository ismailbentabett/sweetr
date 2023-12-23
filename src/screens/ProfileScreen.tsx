import { Component } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import Avatar from "../components/Avatar";

const ProfileScreen: Component = () => {
  return (
    <Authenticatedlayout>
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
           
     <span  class="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32">
             <Avatar username="ismailbentabett" size={140}  />{" "}
             </span>            </div>
            <div class="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div class="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
                <h1 class="truncate text-2xl font-bold text-white">
                ISMAIL BENTABET
                </h1>
                <p class="text-sm font-medium text-gray-400">@ismailbentabett</p>

              </div>
              <div class="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  class="inline-flex justify-center rounded-3xl border border-white-300  px-7 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <span class="font-bold text-white">Edit Profile</span>
                </button>
              </div>
            </div>
          </div>
          <div class="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
            <h1 class="truncate text-2xl font-bold text-white">
              ISMAIL BENTABET
            </h1>
            <p class="text-sm font-medium text-gray-400">@ismailbentabett</p>
          </div>
        </div>
      </div>
    </Authenticatedlayout>
  );
};

export default ProfileScreen;
