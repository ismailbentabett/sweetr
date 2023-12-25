import { Component, createEffect } from "solid-js";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import { useAuth } from "../context/authContext";
import useForm from "../hooks/useForm";
import Avatar from "../components/Avatar";

const SettingScreen: Component = () => {
  const { user, updateUser } = useAuth() as any;

  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    email: "",
    name: "",
    website: "",
    bio: "",
  });

  createEffect(() => {
    handleChange("email", user().data.email ? user().data.email : "");
    handleChange("name", user().data.name ? user().data.name : "");
    handleChange("website", user().data.website ? user().data.website : "");
    handleChange("bio", user().data.bio ? user().data.bio : "");
  });

  const handleUpdate = async () => {
    try {
      // Call the login function from the AuthContext
      updateUser({
        email: values().email,
        name: values().name,
        website: values().website,
        bio: values().bio,
      });
      // Redirect to the dashboard after successful login
    } catch (error) {
      // Handle login error here (e.g., display an error message)
      console.error("Login failed:", error);
    }
  };

  return (
    <Authenticatedlayout>
      <div class="p-2 md:p-4">
        <div class="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
          <h2 class="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>

          <div class="grid max-w-2xl mx-auto mt-8">
            <div class="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
              <div class="object-cover w-40 h-40 p-1.5 rounded-full ring-2 ring-froly-300 dark:ring-froly-500">
                <Avatar username={user().data.name} size={140} userId={user().data.id} />
              </div>

              <div class="flex flex-col space-y-5 sm:ml-8">
                <button
                  type="button"
                  class="py-3.5 px-7 text-base font-medium text-froly-100 focus:outline-none bg-[#202142] rounded-lg border border-froly-200 hover:bg-froly-900 focus:z-10 focus:ring-4 focus:ring-froly-200 "
                >
                  Change picture
                </button>
                <button
                  type="button"
                  class="py-3.5 px-7 text-base font-medium text-white focus:outline-none bg-froly-500 rounded-lg border border-froly-600 hover:bg-froly-600 over:text-white focus:z-10 focus:ring-4 focus:ring-froly-200 "
                >
                  Delete picture
                </button>
              </div>
            </div>

            <div class="items-center mt-8 sm:mt-14 text-[#202142]">
              <div class="mb-2 sm:mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your Full Name
                </label>
                <input
                  type="email"
                  id="email"
                  class="bg-gray-800 border border-gray-500 text-white text-sm rounded-lg focus:ring-froly-500 focus:border-froly-500 block w-full p-2.5 "
                  placeholder="your.email@mail.com"
                  required
                  value={values().name}
                  onInput={(e: { target: { value: any } }) =>
                    handleChange("name", e.target.value)
                  }
                />
              </div>

              <div class="mb-2 sm:mb-6">
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  class="bg-gray-800 border border-gray-500 text-white text-sm rounded-lg focus:ring-froly-500 focus:border-froly-500 block w-full p-2.5 "
                  placeholder="your.email@mail.com"
                  required
                  value={values().email}
                  onInput={(e: { target: { value: any } }) =>
                    handleChange("email", e.target.value)
                  }
                />
              </div>

              <div class="mb-2 sm:mb-6">
                <label
                  for="website"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  website
                </label>
                <input
                  type="text"
                  id="website"
                  class="bg-gray-800 border border-gray-500 text-white text-sm rounded-lg focus:ring-froly-500 focus:border-froly-500 block w-full p-2.5 "
                  placeholder="your website"
                  required
                  value={values().website}
                  onInput={(e: { target: { value: any } }) =>
                    handleChange("website", e.target.value)
                  }
                />
              </div>

              <div class="mb-6">
                <label
                  for="message"
                  class="block mb-2 text-sm font-medium text-white dark:text-white"
                >
                  Bio
                </label>
                <textarea
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-white bg-gray-800 rounded-lg border border-gray-500 focus:ring-froly-500 focus:border-froly-500 "
                  placeholder="Write your bio here..."
                  required
                  value={values().bio}
                  onInput={(e: { target: { value: any } }) =>
                    handleChange("bio", e.target.value)
                  }
                ></textarea>
              </div>

              <div class="flex justify-end">
                <button
                  onClick={handleUpdate}
                  type="submit"
                  class="text-white bg-froly-500  hover:bg-froly-600 focus:ring-4 focus:outline-none focus:ring-froly-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-froly-600 dark:hover:bg-froly-700 dark:focus:ring-froly-800"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Authenticatedlayout>
  );
};

export default SettingScreen;
