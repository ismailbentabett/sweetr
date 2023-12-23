import { FaRegularImage } from "solid-icons/fa";
import { Component, For } from "solid-js";
import Avatar from "../components/Avatar";
import Authenticatedlayout from "../components/layouts/Authenticatedlayout";
import { useAuth } from "../context/authContext";
import { useSweet } from "../context/sweetContext";
import useForm from "../hooks/useForm";
import SweetPost from "../components/sweets/SweetPost";

const HomeScreen: Component = () => {
  const { user } = useAuth();
  const { sweets , createSweet } = useSweet();
  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    content: "",
  });


  const handleCreateSweet = () => {
    createSweet({ content: values().content, user_id: user().id });
  };

  return (
    <Authenticatedlayout>
      {/* HOME PAGE START */}
      <div class="flex-it py-1 px-4 flex-row">
        <div class="flex-it mr-4">
          <div class="w-12 h-12 overflow-visible cursor-pointer transition duration-200 hover:opacity-80">
            <Avatar username="ismailbentabett" />
          </div>
        </div>
        {/* MESSENGER START */}
        <div class="flex-it flex-grow">
          <div class="flex-it">
            <textarea
              value={values().content}
              onInput={(e: { target: { value: any } }) =>
                handleChange("content", e.target.value)
              }
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
                <FaRegularImage size={18} style={{ cursor: "pointer" }} />
                <input
                  style={{ cursor: "pointer" }}
                  type="file"
                  name="myfile"
                />
              </div>
            </div>
            <div class="flex-it w-32 mt-3 cursor-pointer">
              <button
                onClick={handleCreateSweet}
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
 
       <For each={sweets()} fallback={<div></div>} >
        { (sweet) =>
          <SweetPost sweet={sweet} />
        }
      </For> 
      {/* HOME PAGE END */}
    </Authenticatedlayout>
  );
};

export default HomeScreen;
