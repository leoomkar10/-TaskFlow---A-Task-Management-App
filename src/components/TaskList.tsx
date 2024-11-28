import { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Check, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

type Task = {
  id: string;
  title: string;
  description: string;
  priority: string;
  category: string;
  completed: boolean;
  userId: string;
  createdAt: string;
};

const priorityColors = {
  High: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  Medium: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
  Low: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!auth.currentUser) return;

    const q = query(
      collection(db, 'tasks'),
      where('userId', '==', auth.currentUser.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
      
      setTasks(taskList.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    });

    return () => unsubscribe();
  }, []);

  const toggleComplete = async (taskId: string, completed: boolean) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), { completed: !completed });
      toast.success('Task updated');
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      toast.success('Task deleted');
    } catch (error) {
      toast.error('Failed to delete task');
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'active'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
          }`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-4 py-2 rounded-lg ${
            filter === 'completed'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
          }`}
        >
          Completed
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md ${
              task.completed ? 'opacity-75' : ''
            }`}
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-start mb-3">
                <h3 className={`text-lg font-semibold ${
                  task.completed ? 'line-through text-gray-500' : ''
                }`}>
                  {task.title}
                </h3>
                <div className="flex gap-1">
                  <button
                    onClick={() => toggleComplete(task.id, task.completed)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                  >
                    <Check
                      size={18}
                      className={task.completed ? 'text-green-500' : 'text-gray-400'}
                    />
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 flex-grow">
                {task.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  priorityColors[task.priority as keyof typeof priorityColors]
                }`}>
                  {task.priority}
                </span>
                <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                  {task.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}