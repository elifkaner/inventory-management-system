# Inventory Management System

Live Application: [Inventory Management System](https://inventory-frontend-1059155057805.europe-west1.run.app/login)

## Overview

This is a comprehensive Inventory Management System designed to handle various inventory tracking and management tasks efficiently. The application is built with a modern full-stack architecture, utilizing a robust backend API and a responsive frontend interface.

## Technology Stack

### Frontend
- Framework: Next.js (React)
- Language: TypeScript
- Styling: Tailwind CSS
- Package Manager: pnpm / npm

### Backend
- Framework: .NET (C#)
- Architecture: RESTful API
- Database: SQL Database

### Infrastructure & Deployment
- Containerization: Docker
- Orchestration: Docker Compose

## Getting Started

### Prerequisites
- Docker and Docker Compose
- Node.js (for frontend development)
- .NET SDK (for backend development)

### Local Setup

1. Clone the repository and navigate to the project root:
   ```bash
   git clone <repository-url>
   cd inventory-management-system
   ```

2. Start the application using Docker Compose:
   ```bash
   cd backend
   docker-compose up -d
   ```

3. The SQL data can be initialized using the provided `docker_data.sql` or `inventory_data.sql` files in the root directory.

## Project Structure

- `/frontend`: Contains the Next.js application, UI components, and client-side logic.
- `/backend`: Contains the .NET solution, API controllers, business logic, and database configurations.
- `docker_data.sql` / `inventory_data.sql`: Database initialization scripts.

## Usage

Access the live application via the link provided at the top of this document. For local development, the frontend usually runs on `http://localhost:3000` (refer to the frontend configuration), and the backend API is exposed on the configured port.
