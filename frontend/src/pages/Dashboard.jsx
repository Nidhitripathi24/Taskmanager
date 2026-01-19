import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { taskAPI } from '../services/api';
import Navbar from '../components/Layout/Navbar';
import TaskCard from '../components/Tasks/TaskCard';
import TaskModal from '../components/Tasks/TaskModal';

const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await taskAPI.getTasks();
            setTasks(response.data);
        } catch (err) {
            console.error('Error fetching tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (data) => {
        try {
            const response = await taskAPI.createTask(data);
            setTasks([response.data, ...tasks]);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

    const handleUpdateTask = async (data) => {
        try {
            const response = await taskAPI.updateTask(editingTask._id, data);
            setTasks(tasks.map(t => t._id === editingTask._id ? response.data : t));
            setIsModalOpen(false);
            setEditingTask(null);
        } catch (err) {
            console.error('Error updating task:', err);
        }
    };

    const handleDeleteTask = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await taskAPI.deleteTask(id);
                setTasks(tasks.filter(t => t._id !== id));
            } catch (err) {
                console.error('Error deleting task:', err);
            }
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await taskAPI.updateTask(id, { status: newStatus });
            setTasks(tasks.map(t => t._id === id ? response.data : t));
        } catch (err) {
            console.error('Error updating status:', err);
        }
    };

    const handleEditClick = (task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleNewTask = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    // Filter tasks based on search and status
    const filteredTasks = tasks.filter(task => {
        const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // Group tasks by status for display
    const todoTasks = filteredTasks.filter(t => t.status === 'todo');
    const inProgressTasks = filteredTasks.filter(t => t.status === 'in-progress');
    const doneTasks = filteredTasks.filter(t => t.status === 'done');

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Section */}
                <div className="card mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        Dashboard
                    </h2>
                    <p className="text-gray-600">
                        Welcome back, {user?.name}! You have {tasks.length} tasks total.
                    </p>
                </div>

                {/* Controls */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field flex-1"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input-field sm:w-48"
                    >
                        <option value="all">All Status</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <button
                        onClick={handleNewTask}
                        className="btn btn-primary whitespace-nowrap"
                    >
                        + New Task
                    </button>
                </div>

                {/* Task Lists */}
                {loading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : tasks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg mb-4">No tasks yet!</p>
                        <button onClick={handleNewTask} className="btn btn-primary">
                            Create Your First Task
                        </button>
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No tasks match your filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* To Do Column */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="badge badge-todo">To Do</span>
                                <span className="text-sm">({todoTasks.length})</span>
                            </h3>
                            <div className="space-y-4">
                                {todoTasks.map(task => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteTask}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* In Progress Column */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="badge badge-in-progress">In Progress</span>
                                <span className="text-sm">({inProgressTasks.length})</span>
                            </h3>
                            <div className="space-y-4">
                                {inProgressTasks.map(task => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteTask}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Done Column */}
                        <div>
                            <h3 className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                                <span className="badge badge-done">Done</span>
                                <span className="text-sm">({doneTasks.length})</span>
                            </h3>
                            <div className="space-y-4">
                                {doneTasks.map(task => (
                                    <TaskCard
                                        key={task._id}
                                        task={task}
                                        onEdit={handleEditClick}
                                        onDelete={handleDeleteTask}
                                        onStatusChange={handleStatusChange}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                }}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                task={editingTask}
            />
        </div>
    );
};

export default Dashboard;
