import React from 'react';
import { Plus, CheckCircle } from 'lucide-react';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  onAddTask: () => void;
  onToggleStatus: (taskId: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onAddTask, onToggleStatus }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-medium text-gray-900">Tasks</h3>
        <Button onClick={onAddTask} variant="secondary" className="text-sm">
          <Plus size={16} className="mr-1" />
          Add Task
        </Button>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{task.name}</p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                <span className="truncate">Assigned to: {task.assignedTo}</span>
                <span className="mx-2">•</span>
                <span>Due: {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex items-center ml-4">
              <Badge variant={task.status === 'Completed' ? 'green' : 'yellow'}>
                {task.status}
              </Badge>
              <button
                onClick={() => onToggleStatus(task.id)}
                className={`ml-3 p-1 rounded-full ${
                  task.status === 'Completed'
                    ? 'text-green-600'
                    : 'text-gray-400 hover:text-green-600'
                }`}
              >
                <CheckCircle size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;