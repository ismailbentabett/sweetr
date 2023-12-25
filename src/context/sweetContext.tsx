import {
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  useContext,
} from "solid-js";
import { Sweet } from "../types/Sweet";
import axios from "../helpers/axios";

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
  const [sweets, setSweets] = createSignal<any[]>([]);
  const [sweet, setSweet] = createSignal<any | null>(null);

  const [mySweets, setmySweets] = createSignal<any[]>([]);
  const [userSweets, setuserSweets] = createSignal<any[]>([]);

  createEffect(() => {
    console.log("mySweets", mySweets());
    console.log("userSweets", userSweets());
    console.log("sweets", sweets());
  });

  const fetchSweets = async () => {
    try {
      const response = await axios.get("/sweets");
      setSweets(response.data.data);
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
      setSweets((prevSweets) => [response.data.data, ...prevSweets]);
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
      const response = await axios.post(`/sweets/like/${id}`);
      const data = response.data.data;
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? data : s))
      );
      setuserSweets((prevSweets) => {
        const prev = prevSweets as any;

        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
      setmySweets((prevSweets) => {
        const prev = prevSweets as any;
        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
    } catch (error) {
      console.error(`Error liking sweet ${id}:`, error);
    }
  };

  const unlikeSweet = async (id: number | string) => {
    try {
      const response = await axios.post(`/sweets/unlike/${id}`);
      const data = response.data.data;
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? data : s))
      );
      setuserSweets((prevSweets) => {
        const prev = prevSweets as any;

        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
      setmySweets((prevSweets) => {
        const prev = prevSweets as any;
        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
    } catch (error) {
      console.error(`Error unliking sweet ${id}:`, error);
    }
  };

  const bookmarkSweet = async (id: number | string) => {
    try {
      const response = await axios.post(`/sweets/bookmark/${id}`);
      const data = response.data.data;
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? data : s))
      );
      setuserSweets((prevSweets) => {
        const prev = prevSweets as any;

        if (Array.isArray(prev) && prev.length === 0) return prev;
        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
      setmySweets((prevSweets) => {
        const prev = prevSweets as any;
        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
    } catch (error) {
      console.error(`Error bookmarking sweet ${id}:`, error);
    }
  };

  const unbookmarkSweet = async (id: number | string) => {
    try {
      const response = await axios.post(`/sweets/unbookmark/${id}`);
      const data = response.data.data;
      setSweets((prevSweets) =>
        prevSweets.map((s) => (s.id === id ? data : s))
      );
      setuserSweets((prevSweets) => {
        const prev = prevSweets as any;

        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
      setmySweets((prevSweets) => {
        const prev = prevSweets as any;
        if (Array.isArray(prev) && prev.length === 0) return prev;

        let dd = prev.data.map((s: { id: string | number }) =>
          s.id === id ? data : s
        );
        return { data: dd } as any;
      });
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
