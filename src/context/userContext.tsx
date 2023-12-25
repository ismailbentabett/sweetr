// userContext.js
import { createContext, createSignal, useContext } from "solid-js";
import { User } from "../types/User";

import axios from "../helpers/axios";
import { useToast } from "./ToastContext";

type UserContextValue = {
  user: any;
  users: any;
  isFollowing: any;
  isFollower: any;
  isFollowedBy: any;
  likes: any;
  bookmarks: any;
  fetchUsers: () => Promise<void>;
  getUser: (id: string | number) => Promise<void>;

  updateUser: (id: string | number, data: User) => Promise<void>;
  deleteUser: (id: string | number) => Promise<void>;
  isFollowingfunc: (id: string | number) => Promise<void>;
  isFollowerfunc: (id: string | number) => Promise<void>;
  isFollowedByfunc: (
    followeeId: string | number,
    followerId: string | number
  ) => Promise<void>;

  follow: (id: string | number) => Promise<void>;
  unfollow: (id: string | number) => Promise<void>;
  fetchLikes: () => Promise<void>;
  fetchBookmarks: () => Promise<void>;
};

const userContext = createContext<UserContextValue>();

export const UserProvider = (props: { children: any }) => {
  const { showToast } = useToast() as any;

  const [users, setUsers] = createSignal<User[]>([]);
  const [user, setUser] = createSignal<User | null>(null);
  const [isFollowing, setIsFollowing] = createSignal(true);
  const [isFollower, setIsFollower] = createSignal(true);
  const [isFollowedBy, setIsFollowedBy] = createSignal(true);
  const [likes, setLikes] = createSignal(true);
  const [bookmarks, setBookmarks] = createSignal(true);

  const fetchLikes = async () => {
    try {
      axios.get;
      const response = await axios.get("/liked");
      console.log(response.data);
      setLikes(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get("/bookmarked");
      setBookmarks(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  };

  const getUser = async (id: string | number) => {
    try {
      const response = await axios.get(`/user/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  };

  const updateUser = async (id: string | number, data: User) => {
    try {
      const response = await axios.put(`/users/${id}`, data);
      setUser(response.data);
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  };

  const deleteUser = async (id: string | number) => {
    try {
      await axios.delete(`/users/${id}`);
      // Assuming deletion should also clear the user state
      setUser(null);
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  };

  const isFollowingfunc = async (id: string | number) => {
    try {
      const response = await axios.get(`user/isFollowing/${id}`);
      setIsFollowing(response.data);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  };

  const isFollowerfunc = async (id: string | number) => {
    try {
      const response = await axios.get(`user/isFollower/${id}`);
      setIsFollower(response.data);
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  };

  const isFollowedByfunc = async (
    followeeId: string | number,
    followerId: string | number
  ) => {
    try {
      const response = await axios.get(
        `user/isFollowedBy/${followeeId}/${followerId}`
      );
      setIsFollowedBy(response.data);
    } catch (error) {
      console.error(`Error fetching user ${followeeId}:`, error);
      throw error;
    }
  };

  const follow = async (id: string | number) => {
    try {
      const response = await axios.post(`user/follow/${id}`);
      console.log(response.data);

      setIsFollowing(response.data);
      showToast("Followed successfully", { duration: 3000 });
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  };

  const unfollow = async (id: string | number) => {
    try {
      const response = await axios.post(`user/unfollow/${id}`);
      console.log(response.data);
      setIsFollowing(response.data);
      showToast("Unfollowed successfully", { duration: 3000 });
    } catch (error) {
      console.error(`Error fetching user ${id}:`, error);
      throw error;
    }
  };

  return (
    <userContext.Provider
      value={{
        user,
        users,
        isFollowing,
        isFollower,
        isFollowedBy,
        likes,
        bookmarks,
        fetchUsers,
        getUser,
        updateUser,
        deleteUser,
        isFollowingfunc,
        isFollowerfunc,
        isFollowedByfunc,
        follow,
        unfollow,
        fetchLikes,
        fetchBookmarks,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};


export const useUser = () => {
  const context = useContext(userContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
