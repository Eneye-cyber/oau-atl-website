"use client";

import { createContext, useState, useContext, useEffect, ReactNode, useMemo } from "react";
import data from "@/lib/pages/tempSchema.json";
import { Content, EventCollection, JsonData, ProjectCollection } from "@/app/lib/types";
import { fetchData, fetchRouteList } from "../utils/api";

// Define the context value type
interface DataContextType {
  state: JsonData; // Current state of the JSON data
  routes: string[];
  updateItem: (newItem: JsonData) => void; // Function to update the data
  getOptions: (slug: string) => Content[];
}

const DataContextInitial: DataContextType = {
  state: data,
  updateItem: () => {},
  routes: [],
  getOptions: () => [],
};
const DataContext = createContext<DataContextType>(DataContextInitial);

// Define the provider's props
interface DataProviderProps {
  children: ReactNode;
}

// Create the provider component
export const DataProvider = ({ children }: DataProviderProps) => {
  const [state, setState] = useState<JsonData>(data);
  const [routes, setRoutes] = useState<string[]>([]);
  const [events, setEvents] = useState<EventCollection[]>([]);
  const [projects, setProjects] = useState<ProjectCollection[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const responseReq = fetchRouteList();
        const projectsReq = fetchData("projects");
        const eventsReq = fetchData("physical-events");

        const [response, projects, events] = await Promise.all([responseReq, projectsReq, eventsReq]);

        setRoutes(response.data);
        setProjects(projects.payload.data);
        setEvents(events.payload.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchRoutes();
  }, []);

  // Function to update the data
  const updateItem = (newItem: JsonData) => {
    setState((prev) => ({ ...prev, ...newItem }));
  };

  // Memoized function to get options based on the slug
  const getOptions = useMemo(() => {
    // Inline transformCollection with type guard
    const transformCollection = (type: "projects" | "events"): Content[] => {
      const collection = type === "projects" ? projects : events;
      return collection.map((item) => {
        if (type === "projects") {
          const project = item as ProjectCollection;
          return {
            id: project.project_id,
            label: null,
            title: project.project_title,
            subtitle: null,
            text: project.project_text,
            media: project.image_url,
            action: { href: `projects/${project.project_id}`, label: "View Project" },
            list: null,
          };
        } else {
          const event = item as EventCollection;
          return {
            id: event.event_id,
            label: null,
            title: event.title,
            subtitle: event.start_date,
            text: event.content,
            media: event.image_url,
            action: null,
            list: null,
          };
        }
      });
    };

    return (slug: string): Content[] =>
      slug === "projects" ? transformCollection("projects") : transformCollection("events");
  }, [projects, events]);

  return (
    <DataContext.Provider value={{ state, updateItem, routes, getOptions }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the DataContext
export const useDataContext = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context.state) {
    throw new Error("JsonData Error");
  }
  return context;
};
