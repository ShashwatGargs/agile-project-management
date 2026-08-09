# Agile Project Management System

A full-stack **Agile Project Management System** for managing projects, user stories, and tasks.

The application follows a simple hierarchy:

**Project → User Story → Task**

It provides CRUD operations for projects, user stories, and tasks, along with status management, task assignments, due dates, and automatic overdue task handling.

---

## 🚀 Features

### 📁 Project Management

* Create projects
* View all projects
* Edit projects
* Delete projects
* Track project status

### 📖 User Story Management

* Create user stories under projects
* View user stories
* Edit user stories
* Delete user stories
* Set story priority
* Track story status

### ✅ Task Management

* Create tasks under user stories
* View tasks
* Edit tasks
* Delete tasks
* Assign tasks
* Set task due dates
* Track task status
* Automatically identify overdue tasks

### 📊 Dashboard

* Total number of projects
* Total number of tasks
* Completed tasks
* Pending tasks
* Quick access to projects

---

## 🛠️ Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data JPA
* REST API
* Maven

### Database

* SQLite

### Frontend

* React
* JavaScript
* HTML
* CSS
* Axios
* React Router

---

## 🏗️ Project Architecture

The backend follows a layered architecture:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

### Backend Layers

| Layer          | Responsibility                                     |
| -------------- | -------------------------------------------------- |
| **Controller** | Handles HTTP requests and API endpoints            |
| **Service**    | Contains application and business logic            |
| **Repository** | Handles database operations using Spring Data JPA  |
| **Entity**     | Represents database tables and their relationships |
| **Scheduler**  | Checks task due dates and handles overdue tasks    |

---

## 🔗 Entity Relationships

The application follows the following structure:

```text
Project
   │
   └── User Stories
          │
          └── Tasks
```

### Relationships

* One Project can contain multiple User Stories.
* One User Story can contain multiple Tasks.
* Each User Story belongs to one Project.
* Each Task belongs to one User Story.

---

## 🌐 Main API Endpoints

### Projects

| Method   | Endpoint         | Description       |
| -------- | ---------------- | ----------------- |
| `GET`    | `/projects`      | Get all projects  |
| `GET`    | `/projects/{id}` | Get project by ID |
| `POST`   | `/projects`      | Create a project  |
| `PUT`    | `/projects/{id}` | Update a project  |
| `DELETE` | `/projects/{id}` | Delete a project  |

### User Stories

| Method   | Endpoint                       | Description                    |
| -------- | ------------------------------ | ------------------------------ |
| `GET`    | `/stories/project/{projectId}` | Get stories for a project      |
| `GET`    | `/stories/{id}`                | Get story by ID                |
| `POST`   | `/stories/project/{projectId}` | Create a story under a project |
| `PUT`    | `/stories/{id}`                | Update a story                 |
| `DELETE` | `/stories/{id}`                | Delete a story                 |

### Tasks

| Method   | Endpoint                 | Description                 |
| -------- | ------------------------ | --------------------------- |
| `GET`    | `/tasks`                 | Get all tasks               |
| `GET`    | `/tasks/{id}`            | Get task by ID              |
| `GET`    | `/tasks/story/{storyId}` | Get tasks for a story       |
| `POST`   | `/tasks/story/{storyId}` | Create a task under a story |
| `PUT`    | `/tasks/{id}`            | Update a task               |
| `DELETE` | `/tasks/{id}`            | Delete a task               |

---

## 🗄️ Database

The application uses **SQLite** as its database.

SQLite stores the database in a local file, so a separate database server is not required during development.

The application uses **Spring Data JPA** to interact with the SQLite database.

### Database Structure

```text
Project
  │
  ├── Project ID
  ├── Project Name
  ├── Description
  └── Status
       │
       └── User Stories
              │
              ├── Story ID
              ├── Title
              ├── Description
              ├── Priority
              └── Status
                   │
                   └── Tasks
                          │
                          ├── Task ID
                          ├── Title
                          ├── Description
                          ├── Assigned User
                          ├── Due Date
                          └── Status
```

---

## 🔄 Application Workflow

The application allows users to manage work using the following workflow:

```text
Create Project
      ↓
Create User Story
      ↓
Create Tasks
      ↓
Assign Tasks
      ↓
Set Due Dates
      ↓
Track Task Status
      ↓
Complete Work
```

Tasks can be tracked using statuses such as:

```text
TODO
IN_PROGRESS
DONE
```

Tasks with applicable due dates can also be automatically identified as **overdue**.

---

## 🏃 Agile Approach

The project follows the basic Agile concept of breaking larger requirements into smaller units of work.

```text
Project
   ↓
User Story
   ↓
Task
```

### Project

A **Project** represents a larger area of work.

### User Story

A **User Story** represents a feature or requirement within the project.

### Task

A **Task** represents an individual piece of work required to complete a user story.

This structure makes it easier to organize, track, and manage development work.

---

## ⭐ Key Highlights

* RESTful backend using Spring Boot
* Layered backend architecture
* JPA-based database persistence
* SQLite database
* React-based frontend
* Project → User Story → Task hierarchy
* Complete CRUD operations
* Task status tracking
* Task due-date management
* Automatic overdue task handling
* Responsive user interface

---

## 🔮 Future Improvements

Possible future improvements include:

* User authentication and authorization
* Multiple users and team management
* Role-based access control
* Drag-and-drop task boards
* Project progress charts
* Notifications
* Search and filtering
* Pagination

---

## 📂 Project Structure

A typical project structure is:

```text
Agile-Project-Management-System/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── ...
│   │       └── resources/
│   │           └── application.properties
│   │
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   │
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Java
* Maven
* Node.js
* npm


### Run the Backend

Navigate to the backend directory:

```bash
cd backend
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on the configured Spring Boot port.

### Run the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the React application:

```bash
npm start
```

The frontend will start on the configured React development port.

---

## 📝 Author

Developed as part of an **internship assignment**.
