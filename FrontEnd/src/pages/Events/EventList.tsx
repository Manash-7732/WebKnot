import React from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import EventForm from "./EventForm";
import TaskForm from "../../components/Tasks/TaskForm";
import TaskList from "../../components/Tasks/TaskList";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Badge from "../../components/ui/Badge";
import Grid from "../../components/ui/Grid";
import { Event, Task } from "../../types";

const EventList = () => {
  const [showEventForm, setShowEventForm] = React.useState(false);
  const [showTaskForm, setShowTaskForm] = React.useState<number | null>(null);
  const [events, setEvents] = React.useState<Event[]>([
    {
      id: 1,
      name: "Annual Tech Conference",
      description: "A gathering of tech enthusiasts and industry leaders",
      location: "Convention Center",
      date: "2024-04-15",
      attendees: ["John Doe", "Jane Smith"],
      tasks: [
        {
          id: 1,
          name: "Prepare presentation",
          deadline: "2024-03-20",
          status: "Pending",
          assignedTo: "John Doe",
          eventId: 1,
        },
      ],
    },
  ]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     try {
  //       const result = await all();
  //       // setEvents(result);
  //     } catch (error) {
  //       console.error("Error fetching events:", error);
  //     }
  //   };

  //   fetchEvents();
  // }, [all]);

  const handleAddTask = (
    eventId: number,
    taskData: Omit<Task, "id" | "status">
  ) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            tasks: [
              ...event.tasks,
              {
                ...taskData,
                id: Math.max(0, ...event.tasks.map((t) => t.id)) + 1,
                status: "Pending",
              },
            ],
          };
        }
        return event;
      })
    );
  };

  const handleToggleTaskStatus = (eventId: number, taskId: number) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          return {
            ...event,
            tasks: event.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status:
                      task.status === "Completed" ? "Pending" : "Completed",
                  }
                : task
            ),
          };
        }
        return event;
      })
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Events</h1>
        <Button onClick={() => setShowEventForm(true)}>
          <Plus size={20} className="mr-2" />
          Add Event
        </Button>
      </div>

      <Grid>
        {events.map((event) => (
          <Card key={event.id}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900">
                {event.name}
              </h3>
              <div className="flex space-x-2">
                <button className="p-1 text-gray-500 hover:text-indigo-600">
                  <Edit2 size={16} />
                </button>
                <button className="p-1 text-gray-500 hover:text-red-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600 line-clamp-2">
              {event.description}
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Location:</span>
                <span className="ml-2 truncate">{event.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium">Date:</span>
                <span className="ml-2">
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <span className="text-sm font-medium text-gray-500">
                Attendees:
              </span>
              <div className="mt-1 flex flex-wrap gap-2">
                {event.attendees.map((attendee, index) => (
                  <Badge key={index} variant="blue">
                    {attendee}
                  </Badge>
                ))}
              </div>
            </div>

            <TaskList
              tasks={event.tasks}
              onAddTask={() => setShowTaskForm(event.id)}
              onToggleStatus={(taskId) =>
                handleToggleTaskStatus(event.id, taskId)
              }
            />
          </Card>
        ))}
      </Grid>

      {showEventForm && <EventForm onClose={() => setShowEventForm(false)} />}
      {showTaskForm && (
        <TaskForm
          eventId={showTaskForm}
          onClose={() => setShowTaskForm(null)}
          onSubmit={(taskData) => handleAddTask(showTaskForm, taskData)}
        />
      )}
    </div>
  );
};

export default EventList;
