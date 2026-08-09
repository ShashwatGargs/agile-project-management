import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [project, setProject] = useState(null);
    const [stories, setStories] = useState([]);

    const [showForm, setShowForm] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("MEDIUM");
    const [status, setStatus] = useState("TODO");

    const [editingStory, setEditingStory] = useState(null);

    useEffect(() => {
        loadProject();
        loadStories();
    }, [id]);

    const loadProject = async () => {
        try {
            const response = await api.get(`/projects/${id}`);
            setProject(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const loadStories = async () => {
        try {
            const response = await api.get(`/stories/project/${id}`);
            setStories(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createStory = async (e) => {
        e.preventDefault();

        try {
            await api.post(`/stories/project/${id}`, {
                title,
                description,
                priority,
                status
            });

            setTitle("");
            setDescription("");
            setPriority("MEDIUM");
            setStatus("TODO");
            setShowForm(false);

            loadStories();
        } catch (error) {
            console.error(error);
        }
    };

    const updateStory = async (e) => {
        e.preventDefault();

        try {
            await api.put(
                `/stories/${editingStory.id}`,
                editingStory
            );

            setEditingStory(null);
            loadStories();
        } catch (error) {
            console.error("Failed to update story", error);
        }
    };

    const deleteStory = async (storyId) => {
        try {
            await api.delete(`/stories/${storyId}`);
            loadStories();
        } catch (error) {
            console.error(error);
        }
    };

    if (!project) {
        return (
            <div className="dashboard">
                <p>Loading project...</p>
            </div>
        );
    }

    return (
        <div className="dashboard">

            {/* Back */}

            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                ← Back to Projects
            </button>


            {/* Project Header */}

            <div className="project-details-header">

                <div>
                    <h1>{project.name}</h1>

                    <p className="subtitle">
                        {project.description ||
                            "No project description provided."}
                    </p>
                </div>

                <span
                    className={`status ${project.status
                        ?.toLowerCase()
                        .replace("_", "-")}`}
                >
                    {project.status}
                </span>

            </div>


            {/* Stories Header */}

            <div className="section-header">

                <div>
                    <h2>User Stories</h2>

                    <p className="section-description">
                        {stories.length}{" "}
                        {stories.length === 1
                            ? "story"
                            : "stories"}{" "}
                        in this project
                    </p>
                </div>

                <button
                    onClick={() =>
                        setShowForm(!showForm)
                    }
                >
                    + Add Story
                </button>

            </div>


            {/* Create Story */}

            {showForm && (
                <form
                    className="form"
                    onSubmit={createStory}
                >

                    <h3>Create User Story</h3>

                    <input
                        placeholder="Story title"
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
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value)
                        }
                    >
                        <option value="LOW">
                            Low Priority
                        </option>
                        <option value="MEDIUM">
                            Medium Priority
                        </option>
                        <option value="HIGH">
                            High Priority
                        </option>
                    </select>

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
                            Create Story
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


            {/* Edit Story */}

            {editingStory && (
                <form
                    className="form"
                    onSubmit={updateStory}
                >

                    <h3>Edit User Story</h3>

                    <input
                        type="text"
                        value={editingStory.title}
                        onChange={(e) =>
                            setEditingStory({
                                ...editingStory,
                                title: e.target.value
                            })
                        }
                        required
                    />

                    <textarea
                        value={
                            editingStory.description || ""
                        }
                        onChange={(e) =>
                            setEditingStory({
                                ...editingStory,
                                description: e.target.value
                            })
                        }
                    />

                    <select
                        value={editingStory.priority}
                        onChange={(e) =>
                            setEditingStory({
                                ...editingStory,
                                priority: e.target.value
                            })
                        }
                    >
                        <option value="LOW">Low Priority</option>
                        <option value="MEDIUM">
                            Medium Priority
                        </option>
                        <option value="HIGH">
                            High Priority
                        </option>
                    </select>

                    <select
                        value={editingStory.status}
                        onChange={(e) =>
                            setEditingStory({
                                ...editingStory,
                                status: e.target.value
                            })
                        }
                    >
                        <option value="TODO">Todo</option>
                        <option value="IN_PROGRESS">
                            In Progress
                        </option>
                        <option value="DONE">Done</option>
                    </select>

                    <div className="form-actions">

                        <button type="submit">
                            Save Changes
                        </button>

                        <button
                            type="button"
                            className="secondary-button"
                            onClick={() =>
                                setEditingStory(null)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>
            )}


            {/* Stories */}

            {stories.length === 0 ? (

                <div className="empty-state">

                    <h3>No user stories yet</h3>

                    <p>
                        Add a user story to start organizing
                        work for this project.
                    </p>

                    <button
                        onClick={() =>
                            setShowForm(true)
                        }
                    >
                        + Add Story
                    </button>

                </div>

            ) : (

                <div className="project-list">

                    {stories.map(story => (

                        <div
                            className="project-card"
                            key={story.id}
                        >

                            <div className="story-header">

                                <h3>{story.title}</h3>

                                <span
                                    className={`priority ${story.priority
                                        ?.toLowerCase()}`}
                                >
                                    {story.priority}
                                </span>

                            </div>

                            <p>
                                {story.description ||
                                    "No description provided."}
                            </p>

                            <div className="story-meta">

                                <span
                                    className={`status ${story.status
                                        ?.toLowerCase()
                                        .replace("_", "-")}`}
                                >
                                    {story.status}
                                </span>

                            </div>

                            <div className="card-actions">

                                <button
                                    onClick={() =>
                                        navigate(
                                            `/stories/${story.id}`
                                        )
                                    }
                                >
                                    View Tasks
                                </button>

                                <button
                                    onClick={() =>
                                        setEditingStory({
                                            ...story
                                        })
                                    }
                                >
                                    Edit
                                </button>

                                <button
                                    className="danger-button"
                                    onClick={() =>
                                        deleteStory(story.id)
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

export default ProjectDetails;