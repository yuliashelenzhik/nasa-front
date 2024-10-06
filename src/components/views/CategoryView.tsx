import React, { useEffect, useState, useMemo } from "react";
import { useGlobalContext } from "../../context/GlobalContext";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getEventsByCategory } from "../../services/nasaService";
import { useLoading } from "../../context/LoadingContext";
import { EXPIRATION_TIME } from "../../utils/constants";

interface Event {
  id: string;
  title: string;
  geometries: { date: string; coordinates: number[] }[];
  categories: any[];
}
interface CategoryViewProps {
  activeTab: number;
}

const CategoryView: React.FC<CategoryViewProps> = ({ activeTab }) => {
  const { categories } = useGlobalContext();
  const { setLoading } = useLoading();
  const [events, setEvents] = useState<Event[]>([]);

  const currentYear = new Date().getFullYear();

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

  const activeCategory = useMemo(() => {
    return categories.find((category) => category.id === activeTab);
  }, [categories, activeTab]);

  const categoryColor = useMemo(() => {
    if (activeCategory) {
      switch (activeCategory.id) {
        case 8:
          return "#FFD166";
        case 10:
          return "#028090";
        case 12:
          return "#FF6B35";
        case 15:
          return "#6FB1E0";
        default:
          return "#B56576";
      }
    }
    return "gray";
  }, [activeCategory]);

  useEffect(() => {
    const fetchEventsByCategory = async (categoryIds: number[]) => {
      const categoryIdKey = categoryIds.join(",");
      const cachedData = getLocalStorageData(`events_${categoryIdKey}`);

      if (cachedData && !isExpired(cachedData.timestamp)) {
        setEvents(cachedData.data);
        return;
      }

      setLoading(true);
      if (!categoryIds || categoryIds.length === 0) return;

      try {
        const data = await getEventsByCategory(categoryIds);
        setEvents(data);
        setLocalStorageData(`events_${categoryIdKey}`, {
          data,
          timestamp: new Date().getTime(),
        });
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (activeTab) {
      fetchEventsByCategory([activeTab]);
    }
  }, [activeTab]);

  //CONTINENTS
  const getContinentFromCoords = (lat: number, lon: number): string => {
    if (lat > 0 && lon < -30) return "N.America";
    if (lat < 0 && lon < -30) return "S.America";
    if (lat > 35 && lon > -30 && lon < 60) return "Europe";
    if (lat > -35 && lat < 35 && lon > -20 && lon < 50) return "Africa";
    if (lat > 20 && lon > 50 && lon < 150) return "Asia";
    if (lat < 0 && lon > 110) return "Australia";
    if (lat < -60) return "Antarctica";
    return "Unknown";
  };

  // COUNT BY MONTHS
  const eventsByMonth = useMemo(() => {
    const monthlyData: { [month: string]: number } = {};

    events.forEach((event) => {
      const firstGeometry = event.geometries[0];
      const eventDate = new Date(firstGeometry.date);
      const eventYear = eventDate.getFullYear();

      if (eventYear === currentYear) {
        const month = eventDate.toLocaleString("default", { month: "long" });

        if (monthlyData[month]) {
          monthlyData[month] += 1;
        } else {
          monthlyData[month] = 1;
        }
      }
    });

    return Object.keys(monthlyData)
      .map((month) => ({
        month: month,
        count: monthlyData[month],
      }))
      .reverse();
  }, [events, currentYear]);

  // COUNT BY CONTINENTS
  const eventsByContinent = useMemo(() => {
    const continentData: { [continent: string]: number } = {};

    events.forEach((event) => {
      const firstGeometry = event.geometries[0];
      const eventDate = new Date(firstGeometry.date);
      const eventYear = eventDate.getFullYear();

      if (eventYear === currentYear) {
        const [lon, lat] = firstGeometry.coordinates;
        const continent = getContinentFromCoords(lat, lon);

        if (continent !== "Unknown") {
          if (continentData[continent]) {
            continentData[continent] += 1;
          } else {
            continentData[continent] = 1;
          }
        }
      }
    });

    return Object.keys(continentData).map((continent) => ({
      continent: continent,
      count: continentData[continent],
    }));
  }, [events, currentYear]);

  return (
    <div className="view">
      <h2 style={{ color: categoryColor }}>
        Count of {activeCategory?.title} in {currentYear}
      </h2>
      <div className="charts-container">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={eventsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickSize={5}
              interval={0}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => value.substring(0, 3)}
            />
            <YAxis tickSize={5} tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Line dataKey="count" stroke={categoryColor} type="monotone" />
          </LineChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={eventsByContinent}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="continent"
              tickSize={5}
              interval={0}
              tick={{ fontSize: 12 }}
            />
            <YAxis tickSize={5} tick={{ fontSize: 12 }} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" barSize={30} fill={categoryColor} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryView;
