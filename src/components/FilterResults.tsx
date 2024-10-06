import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { useLoading } from "../context/LoadingContext";
import { getEventsByContinent } from "../services/nasaService";
import { ReactComponent as PinIcon } from "../assets/icons/location-pin.svg";
import { EXPIRATION_TIME } from "../utils/constants";

interface Event {
  id: string;
  title: string;
  geometries: { date: string; coordinates: number[] }[];
  categories: { id: number; title: string }[];
}

const FilterResults = () => {
  const { selectedContinent } = useGlobalContext();
  const { setLoading } = useLoading();
  const [events, setEvents] = useState<Event[]>([]);
  const [categoryCounts, setCategoryCounts] = useState<{
    [key: string]: number;
  }>({});

  const isExpired = (timestamp: number) => {
    return !timestamp || new Date().getTime() - timestamp > EXPIRATION_TIME;
  };

  const getLocalStorageData = (key: string) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const setLocalStorageData = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const fetchEventsByContinent = async (continent: string) => {
      if (!continent || continent === "") return;

      const cachedData = getLocalStorageData(`events_${continent}`);

      if (cachedData && !isExpired(cachedData.timestamp)) {
        setEvents(cachedData.data);
        return;
      }

      setLoading(true);

      try {
        const data = await getEventsByContinent(continent);
        setEvents(data);
        setLocalStorageData(`events_${continent}`, {
          data,
          timestamp: new Date().getTime(),
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedContinent) {
      fetchEventsByContinent(selectedContinent);
    }
  }, [selectedContinent]);

  useEffect(() => {
    const countEventsByCategory = () => {
      const counts: { [key: string]: number } = {};

      events.forEach((event) => {
        event.categories.forEach((category) => {
          if (counts[category.title]) {
            counts[category.title]++;
          } else {
            counts[category.title] = 1;
          }
        });
      });

      setCategoryCounts(counts);
    };

    countEventsByCategory();
  }, [events]);

  const totalEvents = events.length;

  return (
    <div className="filter-results-container">
      {!selectedContinent ? (
        <div>
          <h2>Please select a continent to see the data</h2>
          <PinIcon />
        </div>
      ) : (
        <div>
          <h2>
            All events in {selectedContinent}: {totalEvents}
          </h2>
          <ul>
            {Object.entries(categoryCounts).map(([category, count]) => (
              <li key={category}>
                {category} - {count}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterResults;
