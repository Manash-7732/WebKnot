import React from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Grid from '../../components/ui/Grid';
import TaskProgress from '../../components/Tasks/TaskProgress';

const TaskList = () => {
  const [tasks] = React.useState([
    {
      id: 1,
      name: 'Prepare presentation',
      deadline: '2024-03-20',
      status: 'Pending',
      assignedTo: 'John Doe',
      event: 'Annual Tech Conference',
      eventId: 1
    },
  ]);

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Tasks</h1>
          <TaskProgress tasks={tasks} />
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Add Task
        </Button>
      </div>

      <Grid>
        {tasks.map((task) => (
          <Card key={task.id}>
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{task.name}</h3>
              <button
                className={`p-1 rounded-full ${
                  task.status === 'Completed'
                    ? 'text-green-600'
                    : 'text-gray-400 hover:text-green-600'
                }`}
              >
                <CheckCircle size={20} />
              </button>
            </div>
            
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium w-20">Event:</span>
                <span className="ml-2 truncate">{task.event}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium w-20">Deadline:</span>
                <span className="ml-2">{new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="font-medium w-20">Assigned to:</span>
                <span className="ml-2 truncate">{task.assignedTo}</span>
              </div>
              <div className="flex items-center text-sm">
                <span className="font-medium w-20">Status:</span>
                <Badge variant={task.status === 'Completed' ? 'green' : 'yellow'}>
                  {task.status}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
};

export default TaskList;