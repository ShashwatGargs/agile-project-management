import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("TODO");

    const [editingProject, setEditingProject] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const projectResponse = await api.get("/projects");
            const taskResponse = await api.get("/tasks");

            setProjects(projectResponse.data);
            setTasks(taskResponse.data);
        } catch (error) {
            console.error("Failed to load dashboard data", error);
        }
    };

    const createProject = async (e) => {
        e.preventDefault();

        try {
            await api.post("/projects", {
                name,
                description,
                status
            });

            setName("");
            setDescription("");
            setStatus("TODO");
            setShowForm(false);

            loadData();
        } catch (error) {
            console.error("Failed to create project", error);
        }
    };

    const updateProject = async (e) => {
        e.preventDefault();

        try {
            await api.put(
                `/projects/${editingProject.id}`,
                editingProject
            );

            setEditingProject(null);
            loadData();
        } catch (error) {
            console.error("Failed to update project", error);
        }
    };

    const deleteProject = async (projectId) => {
        try {
            await api.delete(`/projects/${projectId}`);
            loadData();
        } catch (error) {
            console.error("Failed to delete project", error);
        }
    };

    const completedTasks = tasks.filter(
        task => task.status === "DONE"
    ).length;

    const pendingTasks = tasks.filter(
        task => task.status !== "DONE"
    ).length;

    return (
        <div className="dashboard">

            {/* Header */}

            <div className="dashboard-header">
                <div>
                    <h1>Agile Project Management</h1>

                    <p className="subtitle">
                        Manage projects, user stories and tasks
                    </p>
                </div>
            </div>


            {/* Statistics */}

            <div className="stats">

                <div className="stat-card">
                    <h3>Projects</h3>
                    <p>{projects.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Total Tasks</h3>
                    <p>{tasks.length}</p>
                </div>

                <div className="stat-card">
                    <h3>Completed</h3>
                    <p>{completedTasks}</p>
                </div>

                <div className="stat-card">
                    <h3>Pending</h3>
                    <p>{pendingTasks}</p>
                </div>

            </div>


            {/* Projects Header */}

            <div className="section-header">

                <div>
                    <h2>Projects</h2>
                    <p className="section-description">
                        Your current projects
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(!showForm)}
                >
                    + New Project
                </button>

            </div>


            {/* Create Project */}

            {showForm && (
                <form
                    className="form"
                    onSubmit={createProject}
                >

                    <h3>Create New Project</h3>

                    <input
                        type="text"
                        placeholder="Project name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />

                    <textarea
                        placeholder="Project description"
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

                    <div className="form-actions">

                        <button type="submit">
                            Create Project
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


            {/* Edit Project */}

            {editingProject && (
                <form
                    className="form"
                    onSubmit={updateProject}
                >

                    <h3>Edit Project</h3>

                    <input
                        type="text"
                        value={editingProject.name}
                        onChange={(e) =>
                            setEditingProject({
                                ...editingProject,
                                name: e.target.value
                            })
                        }
                        required
                    />

                    <textarea
                        value={
                            editingProject.description || ""
                        }
                        onChange={(e) =>
                            setEditingProject({
                                ...editingProject,
                                description: e.target.value
                            })
                        }
                    />

                    <select
                        value={editingProject.status}
                        onChange={(e) =>
                            setEditingProject({
                                ...editingProject,
                                status: e.target.value
                            })
                        }
                    >
                        <option value="PLANNED">
                            Planned
                        </option>

                        <option value="IN_PROGRESS">
                            In Progress
                        </option>

                        <option value="COMPLETED">
                            Completed
                        </option>
                    </select>

                    <div className="form-actions">

                        <button type="submit">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                setEditingProject(null)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}


            {/* Project List */}

            {projects.length === 0 ? (

                <div className="empty-state">

                    <h3>No projects yet</h3>

                    <p>
                        Create your first project to get started.
                    </p>

                    <button
                        onClick={() => setShowForm(true)}
                    >
                        + Create Project
                    </button>

                </div>

            ) : (

                <div className="project-list">

                    {projects.map(project => (

                        <div
                            className="project-card"
                            key={project.id}
                            onClick={() =>
                                navigate(
                                    `/projects/${project.id}`
                                )
                            }
                        >

                            <div className="project-card-header">

                                <h3>{project.name}</h3>

                                <span
                                    className={`status ${project.status
                                        ?.toLowerCase()
                                        .replace("_", "-")}`}
                                >
                                    {project.status}
                                </span>

                            </div>

                            <p>
                                {project.description ||
                                    "No description provided."}
                            </p>

                            <div className="card-actions">

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        setEditingProject({
                                            ...project
                                        });
                                    }}
                                >
                                    Edit
                                </button>

                                <button
                                    className="danger-button"
                                    onClick={(e) => {
                                        e.stopPropagation();

                                        deleteProject(
                                            project.id
                                        );
                                    }}
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

export default Dashboard;