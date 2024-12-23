import React, { createContext, useContext, useState } from "react";
import axios from "axios";

interface Event {
  id: Number;
  name: string;
  description: string;
  location: string;
  date: string;
}

interface EventContextType {
  events: Array<Event> | null;
  create: (
    name: string,
    description: string,
    location: string,
    date?: string
  ) => Promise<Array<any>>;
  delete: (username: string, password: string) => Promise<boolean>;
  all: () => Array<Event>;
}

const EventContext = createContext<EventContextType | null>(null);

export const EventProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [events, setEvents] = useState();
  const create = async (
    name: string,
    description: string,
    location: string,
    date?: string
  ) => {
    if (name && description && location) {
      const result = await axios.post("http://localhost:4000/event/create", {
        name,
        description,
        location,
        date,
      });
      return [result.data.success, result.data.message];
    }
  };

  const all = async () => {
    const result = await axios.get("http://localhost:4000/event/all");
    setEvents(result.data.events);
    return events;
  };

  return (
    <EventContext.Provider value={{ events, create, all }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
