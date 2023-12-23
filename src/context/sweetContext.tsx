import { createContext, createSignal, onCleanup, useContext } from "solid-js";
import { apiClient } from "../services/api";
import { Sweet } from "../types/Sweet";

type SweetContextValue = {
  sweet: Sweet | null;
  sweets: Sweet[];
  fetchSweets: () => Promise<void>;
  createSweet: (data: Sweet) => Promise<void>;
  getSweet: (id: number | string) => Promise<void>;
  updateSweet: (id: number | string, data: Sweet) => Promise<void>;
  deleteSweet: (id: number | string) => Promise<void>;
  likeSweet: (id: number | string) => Promise<void>;
  unlikeSweet: (id: number | string) => Promise<void>;
  bookmarkSweet: (id: number | string) => Promise<void>;
  unbookmarkSweet: (id: number | string) => Promise<void>;
};

const sweetContext = createContext<SweetContextValue>();

export const SweetProvider = (props: { children: any }) => {
  const [sweets, setSweets] = createSignal<Sweet[]>([]);
  const [sweet, setSweet] = createSignal<Sweet | null>(null);

  const fetchSweets = async () => {
    try {
      const response = await apiClient.get("/sweets");
      setSweets(response.data);
    } catch (error) {
      console.error("Error fetching sweets:", error);
    }
  };

  const createSweet = async (data: Sweet) => {
    try {
      const response = await apiClient.post("/sweets", data);
      console.log(response.data);
      setSweets((prevSweets) => [...prevSweets, response.data]);
    } catch (error) {
      console.error("Error creating sweet:", error);
    }
  };

  const getSweet = async (id: number | string) => {
    try {
      const response = await apiClient.get(`/sweets/${id}`);
      setSweet(response.data);
    } catch (error) {
      console.error(`Error fetching sweet ${id}:`, error);
    }
  };

  const updateSweet = async (id: number | string, data: Sweet) => {
    try {
      const response = await apiClient.put(`/sweets/${id}`, data);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error updating sweet ${id}:`, error);
    }
  };

  const deleteSweet = async (id: number | string) => {
    try {
      await apiClient.delete(`/sweets/${id}`);
      setSweets((prevSweets) => prevSweets.filter((s) => s.id !== id));
    } catch (error) {
      console.error(`Error deleting sweet ${id}:`, error);
    }
  };

  const likeSweet = async (id: number | string) => {
    try {
      const response = await apiClient.get(`/sweets/like/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error liking sweet ${id}:`, error);
    }
  };

  const unlikeSweet = async (id: number | string) => {
    try {
      const response = await apiClient.get(`/sweets/unlike/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error unliking sweet ${id}:`, error);
    }
  };

  const bookmarkSweet = async (id: number | string) => {
    try {
      const response = await apiClient.get(`/sweets/bookmark/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error bookmarking sweet ${id}:`, error);
    }
  };

  const unbookmarkSweet = async (id: number | string) => {
    try {
      const response = await apiClient.get(`/sweets/unbookmark/${id}`);
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? response.data : s))
      );
    } catch (error) {
      console.error(`Error unbookmarking sweet ${id}:`, error);
    }
  };

  const value: SweetContextValue = {
    sweet: sweet(),
    sweets: sweets(),
    fetchSweets,
    createSweet,
    getSweet,
    updateSweet,
    deleteSweet,
    likeSweet,
    unlikeSweet,
    bookmarkSweet,
    unbookmarkSweet,
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
