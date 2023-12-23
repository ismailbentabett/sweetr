import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";
import { Sweet } from "../types/Sweet";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.withCredentials = true;

type SweetContextValue = {
  sweet: any;
  sweets: any;
  mySweets: any;
  userSweets: any;
  fetchSweets: () => Promise<void>;
  createSweet: (data: Sweet) => Promise<void>;
  getSweet: (id: number | string) => Promise<void>;
  updateSweet: (id: number | string, data: Sweet) => Promise<void>;
  deleteSweet: (id: number | string) => Promise<void>;
  likeSweet: (id: number | string) => Promise<void>;
  unlikeSweet: (id: number | string) => Promise<void>;
  bookmarkSweet: (id: number | string) => Promise<void>;
  unbookmarkSweet: (id: number | string) => Promise<void>;
  fetchMySweets: () => Promise<void>;
  fetchUserSweets: (id: string) => Promise<void>;
};

const sweetContext = createContext<SweetContextValue>();

export const SweetProvider = (props: { children: any }) => {
  const [sweets, setSweets] = createSignal<Sweet[]>([]);
  const [sweet, setSweet] = createSignal<Sweet | null>(null);

  const [mySweets, setmySweets] = createSignal<Sweet[]>([]);
  const [userSweets, setuserSweets] = createSignal<Sweet[]>([]);

  const fetchSweets = async () => {
    try {
      const response = await axios.get("/sweets");
      setSweets(response.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };
  const fetchMySweets = async () => {
    try {
      const response = await axios.get("/sweets/my");
      setmySweets(response.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };
  const fetchUserSweets = async (id: string) => {
    try {
      const response = await axios.get("/sweets/user/" + id);
      setuserSweets(response.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };

  createEffect(() => {
    fetchSweets();
  });

  const createSweet = async (data: Sweet) => {
    try {
      const response = await axios.post("/sweets", data);
      setSweets((prevSweets) => [...prevSweets, response.data]);
    } catch (error) {
      console.error("Error creating sweet:", error);
    }
  };

  const getSweet = async (id: number | string) => {
    try {
      const response = await axios.get(`/sweets/${id}`);
      setSweet(response.data);
    } catch (error) {
      console.error(`Error fetching sweet ${id}:`, error);
    }
  };

  const updateSweet = async (id: number | string, data: Sweet) => {
    try {
      const response = await axios.put(`/sweets/${id}`, data);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error updating sweet ${id}:`, error);
    }
  };

  const deleteSweet = async (id: number | string) => {
    try {
      await axios.delete(`/sweets/${id}`);
      setSweets((prevSweets) => prevSweets.filter((s) => s.id !== id));
    } catch (error) {
      console.error(`Error deleting sweet ${id}:`, error);
    }
  };

  const likeSweet = async (id: number | string) => {
    try {
      const response = await axios.get(`/sweets/like/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error liking sweet ${id}:`, error);
    }
  };

  const unlikeSweet = async (id: number | string) => {
    try {
      const response = await axios.get(`/sweets/unlike/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error unliking sweet ${id}:`, error);
    }
  };

  const bookmarkSweet = async (id: number | string) => {
    try {
      const response = await axios.get(`/sweets/bookmark/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error bookmarking sweet ${id}:`, error);
    }
  };

  const unbookmarkSweet = async (id: number | string) => {
    try {
      const response = await axios.get(`/sweets/unbookmark/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error unbookmarking sweet ${id}:`, error);
    }
  };

  const value: SweetContextValue = {
    sweet,
    sweets,
    mySweets,
    userSweets,
    fetchSweets,
    createSweet,
    getSweet,
    updateSweet,
    deleteSweet,
    likeSweet,
    unlikeSweet,
    bookmarkSweet,
    unbookmarkSweet,
    fetchMySweets,
    fetchUserSweets,
  };

  onCleanup(() => {
    // Cleanup logic if needed
  });

  return (
    <sweetContext.Provider value={value}>
      {props.children}
    </sweetContext.Provider>
  );
};

export const useSweet = () => {
  return useContext(sweetContext);
};
