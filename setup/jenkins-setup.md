# Jenkins CI/CD Setup for To-Do DevOps Project

## Overview

This project uses Jenkins to automate the CI/CD pipeline for a MERN-based To-Do application. Whenever changes are pushed to the GitHub repository, Jenkins can build, test, and deploy the application automatically.

---

## Architecture

GitHub Repository → Jenkins Pipeline → Docker Build → Docker Containers → EC2 Deployment

### Components Used

* AWS EC2 (Ubuntu)
* Jenkins
* Docker
* Docker Compose
* GitHub
* MongoDB Atlas
* Node.js
* React (Vite)

---

## EC2 Instance Setup

### Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Install Git

```bash
sudo apt install git -y
```

### Install Docker

```bash
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

Verify installation:

```bash
docker --version
```

### Give Docker Permission to Ubuntu User

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

---

## Install Java

Jenkins requires Java.

```bash
sudo apt install fontconfig openjdk-21-jdk -y
```

Verify:

```bash
java -version
```

---

## Install Jenkins

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
```

Start Jenkins:

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

Check status:

```bash
sudo systemctl status jenkins
```

---

## Access Jenkins

Open browser:

```text
http://<EC2-PUBLIC-IP>:8080
```

Get initial password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Complete the Jenkins setup wizard.

---

## Configure Security Groups

Allow:

| Port | Purpose     |
| ---- | ----------- |
| 22   | SSH         |
| 8080 | Jenkins     |
| 80   | Frontend    |
| 5000 | Backend API |

---

## Create Jenkins Agent

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

Verify:

```bash
node -v
npm -v
```

### Configure Docker Access

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

---

## Jenkins Credentials

Navigate to:

```text
Manage Jenkins
→ Credentials
→ Global Credentials
```

Create:

### MongoDB URI

Credential ID:

```text
mongodb_uri
```

### Port

Credential ID:

```text
Port
```

Example:

```text
5000
```

### Frontend API URL

Credential ID:

```text
base_url
```

Example:

```text
http://<EC2-PUBLIC-IP>:5000
```

---

## Jenkins Pipeline

The pipeline performs:

### 1. Checkout

Pull latest source code from GitHub.

### 2. Create Environment Files

Backend:

```env
MONGO_URI=<mongodb-uri>
PORT=5000
```

Frontend:

```env
VITE_API_URL=http://<EC2-PUBLIC-IP>:5000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Tests

```bash
npm test
```

### 5. Build Docker Images

```bash
docker compose build
```

### 6. Deploy Containers

```bash
docker compose down
docker compose up -d
```

### 7. Health Check

```bash
docker ps
```

---

## Verify Deployment

Frontend:

```text
http://<EC2-PUBLIC-IP>
```

Backend:

```text
http://<EC2-PUBLIC-IP>:5000
```

Check containers:

```bash
docker ps
```

Check logs:

```bash
docker logs todo-frontend
docker logs todo-backend
```

---

## Useful Commands

### Start Containers

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

### Restart Jenkins

```bash
sudo systemctl restart jenkins
```

### Check Jenkins Status

```bash
sudo systemctl status jenkins
```

### View Running Containers

```bash
docker ps
```

---

## Cost Saving

For learning projects:

* Stop the EC2 instance when not in use.
* Keep the EBS volume attached.
* Start the instance again whenever needed.

This preserves:

* Jenkins configuration
* Docker setup
* Git repositories
* Pipeline configuration
* Application code

while minimizing AWS costs.


# Jenkins CI/CD Setup for To-Do DevOps Project

## Overview

This project uses Jenkins to automate the CI/CD pipeline for a MERN-based To-Do application. Whenever changes are pushed to the GitHub repository, Jenkins can build, test, and deploy the application automatically.

---

## Architecture

GitHub Repository → Jenkins Pipeline → Docker Build → Docker Containers → EC2 Deployment

### Components Used

* AWS EC2 (Ubuntu)
* Jenkins
* Docker
* Docker Compose
* GitHub
* MongoDB Atlas
* Node.js
* React (Vite)

---

## EC2 Instance Setup

### Update System

```bash
sudo apt update
sudo apt upgrade -y
```

### Install Git

```bash
sudo apt install git -y
```

### Install Docker

```bash
sudo apt install docker.io -y
sudo systemctl enable docker
sudo systemctl start docker
```

Verify installation:

```bash
docker --version
```

### Give Docker Permission to Ubuntu User

```bash
sudo usermod -aG docker ubuntu
newgrp docker
```

---

## Install Java

Jenkins requires Java.

```bash
sudo apt install fontconfig openjdk-21-jdk -y
```

Verify:

```bash
java -version
```

---

## Install Jenkins

```bash
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install jenkins -y
```

Start Jenkins:

```bash
sudo systemctl enable jenkins
sudo systemctl start jenkins
```

Check status:

```bash
sudo systemctl status jenkins
```

---

## Access Jenkins

Open browser:

```text
http://<EC2-PUBLIC-IP>:8080
```

Get initial password:

```bash
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
```

Complete the Jenkins setup wizard.

---

## Configure Security Groups

Allow:

| Port | Purpose     |
| ---- | ----------- |
| 22   | SSH         |
| 8080 | Jenkins     |
| 80   | Frontend    |
| 5000 | Backend API |

---

## Create Jenkins Agent

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

Verify:

```bash
node -v
npm -v
```

### Configure Docker Access

```bash
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins
```

---

## Jenkins Credentials

Navigate to:

```text
Manage Jenkins
→ Credentials
→ Global Credentials
```

Create:

### MongoDB URI

Credential ID:

```text
mongodb_uri
```

### Port

Credential ID:

```text
Port
```

Example:

```text
5000
```

### Frontend API URL

Credential ID:

```text
base_url
```

Example:

```text
http://<EC2-PUBLIC-IP>:5000
```

---

## Jenkins Pipeline

The pipeline performs:

### 1. Checkout

Pull latest source code from GitHub.

### 2. Create Environment Files

Backend:

```env
MONGO_URI=<mongodb-uri>
PORT=5000
```

Frontend:

```env
VITE_API_URL=http://<EC2-PUBLIC-IP>:5000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Tests

```bash
npm test
```

### 5. Build Docker Images

```bash
docker compose build
```

### 6. Deploy Containers

```bash
docker compose down
docker compose up -d
```

### 7. Health Check

```bash
docker ps
```

---

## Verify Deployment

Frontend:

```text
http://<EC2-PUBLIC-IP>
```

Backend:

```text
http://<EC2-PUBLIC-IP>:5000
```

Check containers:

```bash
docker ps
```

Check logs:

```bash
docker logs todo-frontend
docker logs todo-backend
```

---

## Useful Commands

### Start Containers

```bash
docker compose up -d
```

### Stop Containers

```bash
docker compose down
```

### Restart Jenkins

```bash
sudo systemctl restart jenkins
```

### Check Jenkins Status

```bash
sudo systemctl status jenkins
```

### View Running Containers

```bash
docker ps
```

---

## Cost Saving

For learning projects:

* Stop the EC2 instance when not in use.
* Keep the EBS volume attached.
* Start the instance again whenever needed.

This preserves:

* Jenkins configuration
* Docker setup
* Git repositories
* Pipeline configuration
* Application code

while minimizing AWS costs.
