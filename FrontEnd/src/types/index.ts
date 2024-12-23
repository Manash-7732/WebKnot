export interface Task {
    id: number;
    name: string;
    deadline: string;
    status: 'Pending' | 'Completed';
    assignedTo: string;
    eventId: number;
  }
  
  export interface Event {
    id: number;
    name: string;
    description: string;
    location: string;
    date: string;
    attendees: string[];
    tasks: Task[];
  }