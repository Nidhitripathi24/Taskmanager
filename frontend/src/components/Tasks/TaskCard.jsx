const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'todo':
                return 'badge-todo';
            case 'in-progress':
                return 'badge-in-progress';
            case 'done':
                return 'badge-done';
            default:
                return 'badge-todo';
        }
    };

    const handleStatusClick = () => {
        // Cycle through statuses: todo -> in-progress -> done -> todo
        const statusCycle = {
            'todo': 'in-progress',
            'in-progress': 'done',
            'done': 'todo'
        };
        onStatusChange(task._id, statusCycle[task.status]);
    };

    return (
        <div className="card hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
                <button
                    onClick={handleStatusClick}
                    className={`badge ${getStatusBadgeClass(task.status)} cursor-pointer hover:opacity-80`}
                >
                    {task.status}
                </button>
            </div>

            {task.description && (
                <p className="text-gray-600 mb-4">{task.description}</p>
            )}

            <div className="flex gap-2 mt-4">
                <button
                    onClick={() => onEdit(task)}
                    className="btn btn-secondary text-sm flex-1"
                >
                    Edit
                </button>
                <button
                    onClick={() => onDelete(task._id)}
                    className="btn btn-danger text-sm flex-1"
                >
                    Delete
                </button>
            </div>

            <div className="text-xs text-gray-400 mt-3">
                Created: {new Date(task.createdAt).toLocaleDateString()}
            </div>
        </div>
    );
};

export default TaskCard;
