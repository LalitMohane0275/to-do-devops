# DevOps Todo App

A full-stack Todo application built to learn and practice modern DevOps concepts.

## Project Goal

The primary goal of this project is not just to build a Todo application, but to understand the complete DevOps workflow including:

* Backend Development
* Frontend Development
* Docker Containerization
* CI/CD using Jenkins
* Deployment on AWS EC2
* Automation and Infrastructure Management

---

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

### DevOps

* Docker
* Docker Compose

### Planned

* Jenkins
* AWS EC2
* Nginx Reverse Proxy
* CI/CD Pipeline

---

## Features

### Todo Management

* Create Todo
* View Todos
* Update Todo Status
* Delete Todo

### UI Features

* Responsive Design
* Statistics Dashboard
* Task Completion Tracking
* Creation Timestamp Display
* Modern User Interface

---

## Project Structure

```text
to-do-devops/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── Dockerfile
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
│
└── README.md
```

---

## API Endpoints

### Get All Todos

```http
GET /api/todos
```

### Create Todo

```http
POST /api/todos
```

Request Body:

```json
{
  "title": "Learn Docker"
}
```

### Update Todo

```http
PUT /api/todos/:id
```

Request Body:

```json
{
  "completed": true
}
```

### Delete Todo

```http
DELETE /api/todos/:id
```

---

## Todo Schema

```javascript
{
  title: String,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Running Locally

### Backend

```bash
cd backend

npm install

npm start
```

Backend runs on:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## Docker Setup

### Build and Run

```bash
docker compose up --build
```

### Start Existing Containers

```bash
docker compose up
```

### Run in Detached Mode

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

### View Running Containers

```bash
docker ps
```

### View Images

```bash
docker images
```

### View Logs

```bash
docker logs todo-backend

docker logs todo-frontend
```

---

## Docker Architecture

```text
                    Docker Compose
                           │
                           ▼
        ┌─────────────────────────────────┐
        │        Docker Network           │
        └─────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
         ▼                       ▼

 ┌─────────────────┐   ┌─────────────────┐
 │ Frontend        │   │ Backend         │
 │ React + Vite    │   │ Express + Mongo │
 │ Container       │   │ Container       │
 └─────────────────┘   └─────────────────┘
```

---

## Learning Progress

### Completed

* Backend Development
* MongoDB Integration
* REST API Development
* Frontend Development
* React API Integration
* Docker Installation
* Dockerfile Creation
* Docker Compose Setup
* Containerized Application

### Upcoming

* Jenkins Setup
* CI Pipeline
* CD Pipeline
* GitHub Webhooks
* AWS EC2 Deployment
* Nginx Reverse Proxy

---

## Roadmap

### Phase 1 – Docker

* [x] Docker Installation
* [x] Dockerfile Creation
* [x] Docker Compose Setup
* [x] Run Application in Containers

### Phase 2 – Jenkins

* [ ] Jenkins Installation
* [ ] Freestyle Jobs
* [ ] Pipeline Jobs
* [ ] Jenkinsfile
* [ ] GitHub Integration
* [ ] Webhooks

### Phase 3 – CI/CD

* [ ] Automated Build
* [ ] Automated Testing
* [ ] Automated Deployment

### Phase 4 – Production Deployment

* [ ] AWS EC2 Deployment
* [ ] Nginx Reverse Proxy
* [ ] Production Docker Setup

---

## Author

**Lalit Mohane**

Built as a hands-on DevOps learning project to understand modern software development, containerization, CI/CD, and cloud deployment.
