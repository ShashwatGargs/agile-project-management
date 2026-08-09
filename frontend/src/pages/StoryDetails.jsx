import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function StoryDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [story, setStory] = useState(null);
    const [tasks, setTasks] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");
    const [assignee, setAssignee] = useState("");
    const [dueDate, setDueDate] = useState("");

    const [editingTask, setEditingTask] = useState(null);

    useEffect(() => {
        loadStory();
        loadTasks();
    }, [id]);

    const loadStory = async () => {
        try {
            const response = await api.get(`/stories/${id}`);
            setStory(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadTasks = async () => {
        try {
            const response = await api.get(`/tasks/story/${id}`);
            setTasks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createTask = async (e) => {
        e.preventDefault();

        try {
            await api.post(`/tasks/story/${id}`, {
                title,
                description,
                status,
                assignee,
                dueDate
            });

            setTitle("");
            setDescription("");
            setStatus("TODO");
            setAssignee("");
            setDueDate("");

            setShowForm(false);

            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const updateTask = async (e) => {
        e.preventDefault();

        try {
            await api.put(
                `/tasks/${editingTask.id}`,
                editingTask
            );

            setEditingTask(null);
            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            loadTasks();
        } catch (error) {
            console.error(error);
        }
    };

    if (!story) {
        return (
            <div className="dashboard">
                <p>Loading story...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">

            {/* Back */}

            <button
                className="back-button"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>


            {/* Story Header */}

            <div className="story-details-header">

                <div>
                    <h1>{story.title}</h1>

                    <p className="subtitle">
                        {story.description ||
                            "No story description provided."}
                    </p>
                </div>

                <div className="story-header-info">

                    <span
                        className={`priority ${story.priority
                            ?.toLowerCase()}`}
                    >
                        {story.priority}
                    </span>

                    <span
                        className={`status ${story.status
                            ?.toLowerCase()
                            .replace("_", "-")}`}
                    >
                        {story.status}
                    </span>

                </div>

            </div>


            {/* Tasks Header */}

            <div className="section-header">

                <div>
                    <h2>Tasks</h2>

                    <p className="section-description">
                        {tasks.length}{" "}
                        {tasks.length === 1
                            ? "task"
                            : "tasks"}{" "}
                        in this story
                    </p>
                </div>

                <button
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    + Add Task
                </button>

            </div>


            {/* Create Task */}

            {showForm && (
                <form
                    className="form"
                    onSubmit={createTask}
                >

                    <h3>Create Task</h3>

                    <input
                        placeholder="Task title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                    />

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                    >
                        <option value="TODO">
                            Todo
                        </option>

                        <option value="IN_PROGRESS">
                            In Progress
                        </option>

                        <option value="DONE">
                            Done
                        </option>
                    </select>

                    <input
                        placeholder="Assignee"
                        value={assignee}
                        onChange={(e) =>
                            setAssignee(e.target.value)
                        }
                    />

                    <label className="input-label">
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) =>
                            setDueDate(e.target.value)
                        }
                    />

                    <div className="form-actions">

                        <button type="submit">
                            Create Task
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                setShowForm(false)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}


            {/* Edit Task */}

            {editingTask && (
                <form
                    className="form"
                    onSubmit={updateTask}
                >

                    <h3>Edit Task</h3>

                    <input
                        value={editingTask.title}
                        onChange={(e) =>
                            setEditingTask({
                                ...editingTask,
                                title: e.target.value
                            })
                        }
                        required
                    />

                    <textarea
                        value={
                            editingTask.description || ""
                        }
                        onChange={(e) =>
                            setEditingTask({
                                ...editingTask,
                                description: e.target.value
                            })
                        }
                    />

                    <select
                        value={editingTask.status}
                        onChange={(e) =>
                            setEditingTask({
                                ...editingTask,
                                status: e.target.value
                            })
                        }
                    >
                        <option value="TODO">Todo</option>

                        <option value="IN_PROGRESS">
                            In Progress
                        </option>

                        <option value="DONE">Done</option>

                        <option value="OVERDUE">
                            Overdue
                        </option>
                    </select>

                    <input
                        placeholder="Assignee"
                        value={
                            editingTask.assignee || ""
                        }
                        onChange={(e) =>
                            setEditingTask({
                                ...editingTask,
                                assignee: e.target.value
                            })
                        }
                    />

                    <label className="input-label">
                        Due Date
                    </label>

                    <input
                        type="date"
                        value={
                            editingTask.dueDate || ""
                        }
                        onChange={(e) =>
                            setEditingTask({
                                ...editingTask,
                                dueDate: e.target.value
                            })
                        }
                    />

                    <div className="form-actions">

                        <button type="submit">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                setEditingTask(null)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}


            {/* Tasks */}

            {tasks.length === 0 ? (

                <div className="empty-state">

                    <h3>No tasks yet</h3>

                    <p>
                        Add a task to start working on this
                        user story.
                    </p>

                    <button
                        onClick={() =>
                            setShowForm(true)
                        }
                    >
                        + Add Task
                    </button>

                </div>

            ) : (

                <div className="project-list">

                    {tasks.map(task => (

                        <div
                            className="project-card task-card"
                            key={task.id}
                        >

                            <div className="task-header">

                                <h3>{task.title}</h3>

                                <span
                                    className={`status ${task.status
                                        ?.toLowerCase()
                                        .replace("_", "-")}`}
                                >
                                    {task.status}
                                </span>

                            </div>

                            <p>
                                {task.description ||
                                    "No description provided."}
                            </p>

                            <div className="task-info">

                                <div>
                                    <span className="info-label">
                                        Assignee
                                    </span>

                                    <strong>
                                        {task.assignee ||
                                            "Unassigned"}
                                    </strong>
                                </div>

                                <div>
                                    <span className="info-label">
                                        Due Date
                                    </span>

                                    <strong
                                        className={
                                            task.status ===
                                            "OVERDUE"
                                                ? "overdue-text"
                                                : ""
                                        }
                                    >
                                        {task.dueDate ||
                                            "No due date"}
                                    </strong>
                                </div>

                            </div>

                            <div className="card-actions">

                                <button
                                    onClick={() =>
                                        setEditingTask({
                                            ...task
                                        })
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="danger-button"
                                    onClick={() =>
                                        deleteTask(task.id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default StoryDetails;