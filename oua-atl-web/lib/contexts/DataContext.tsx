"use client";

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import {
  Content,
  EventCollection,
  JsonData,
  ProjectCollection,
} from "@/app/lib/types";
import { fetchData, fetchPageSchema, fetchRouteList } from "../utils/api";
import { usePathname } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

// Define the context value type
interface DataContextType {
  state: JsonData; // Current state of the JSON data
  routes: string[];
  updateItem: (newItem: JsonData) => void; // Function to update the data
  getOptions: (slug: string) => Content[];
}

const DataContextInitial: DataContextType = {
  state: {pages: {}},
  updateItem: () => {},
  routes: [],
  getOptions: () => [],
};
const DataContext = createContext<DataContextType>(DataContextInitial);

// Define the provider's props
interface DataProviderProps {
  children: ReactNode;
}

// Centralized slug mapping
const slugMapping: Record<string, string> = {
  "/about-us": "about",
  "/": "home",
};

const transformCollection = (
  type: "projects" | "events",
  data: ProjectCollection[] | EventCollection[]
): Content[] => {
  return data.map((item) => {
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

// Create the provider component
export const DataProvider = ({ children }: DataProviderProps) => {
  const [state, setState] = useState<JsonData | null>(null);
  const [routes, setRoutes] = useState<string[]>([]);
  const [events, setEvents] = useState<EventCollection[]>([]);
  const [projects, setProjects] = useState<ProjectCollection[]>([]);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const slug = slugMapping[pathname.replace("/customize", "").trim()];

  useEffect(() => {
    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const responseReq = fetchRouteList();
        const projectsReq = fetchData("projects");
        const eventsReq = fetchData("physical-events");
        const pageReq = fetchPageSchema(slug);

        const [response, projects, events, pageData] = await Promise.all([
          responseReq,
          projectsReq,
          eventsReq,
          pageReq,
        ]);

        setRoutes(response.data);
        setProjects(projects.payload.data);
        setEvents(events.payload.data);
        setState(pageData.pageSchema);
        console.table(pageData.pageSchema)
      } catch (error) {
        console.error("Error fetching data:", error);
        setState({ pages: {} }); // Reset state if an error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchRoutes();
  }, [slug]);

  // Function to update the data
  const updateItem = (newItem: JsonData) => {
    setState((prev) => ({ ...prev, ...newItem }));
  };

  // Memoized function to get options based on the slug
  const getOptions = useMemo(() => {
    return (slug: string): Content[] =>
      slug === "projects"
        ? transformCollection("projects", projects)
        : transformCollection("events", events);
  }, [projects, events]);

  if (loading) {
    return <LoadingSpinner />; 
  }

  if (!state || !Object.keys(state.pages).length) {
    return <div>Error: Data could not be loaded.</div>; // Handle missing state gracefully
  }

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
    throw new Error("JsonData Error: DataContext must be used within a DataProvider.");
  }
  return context;
};
