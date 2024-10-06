import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCategories, getEventCounts } from "../services/nasaService";
import { useLoading } from "./LoadingContext";
import { EXPIRATION_TIME } from "../utils/constants";

export interface Category {
  id: number;
  title: string;
  quantity?: number;
}

interface Event {
  id: string;
  title: string;
  categories: Category[];
}

interface EventCount {
  categoryId: number;
  categoryTitle: string;
  count: number;
}

interface GlobalContextType {
  categories: Category[];
  eventCounts: EventCount[];
  events: Event[];
  selectedContinent: string | null;
  setSelectedContinent: (continent: string | null) => void;
  error: string | null;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

const getLocalStorageData = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const setLocalStorageData = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const isExpired = (timestamp: number) => {
  return !timestamp || new Date().getTime() - timestamp > EXPIRATION_TIME;
};

export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { setLoading } = useLoading();
  const [categories, setCategories] = useState<Category[]>([]);
  const [eventCounts, setEventCounts] = useState<EventCount[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedContinent, setSelectedContinent] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchEventCounts();
  }, []);

  const fetchCategories = async () => {
    const cachedData = getLocalStorageData("categories");
    if (cachedData && !isExpired(cachedData.timestamp)) {
      setCategories(cachedData.data);
      return;
    }

    try {
      const data = await getCategories();
      setCategories(data);
      setLocalStorageData("categories", {
        data,
        timestamp: new Date().getTime(),
      });
    } catch (err) {
      setError("Failed to load categories.");
      console.error(err);
    }
  };

  const fetchEventCounts = async () => {
    const cachedData = getLocalStorageData("eventCounts");
    if (cachedData && !isExpired(cachedData.timestamp)) {
      setEventCounts(cachedData.data);
      return;
    }
    setLoading(true);
    try {
      const data = await getEventCounts();
      setEventCounts(data?.data);
      setLocalStorageData("eventCounts", {
        data: data?.data,
        timestamp: new Date().getTime(),
      });
    } catch (err) {
      setError("Failed to load event counts.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        categories,
        eventCounts,
        events,
        selectedContinent,
        setSelectedContinent,
        error,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
