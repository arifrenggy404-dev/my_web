# Portofolio Cyberpunk

A modern, aesthetic portfolio application built with Laravel and React, featuring a cyberpunk-themed UI.

## Project Overview

- **Purpose:** Personal portfolio to showcase projects with a high-tech, futuristic aesthetic.
- **Backend:** Laravel 11/13 (PHP 8.3)
- **Frontend:** React 19 with Inertia.js for seamless SPA experience.
- **Styling:** Tailwind CSS 4, Framer Motion for animations, and Lucide React for icons.
- **Database:** SQLite (Persistent storage via Railway Volumes).
- **Deployment:** Containerized with Docker, optimized for Railway.

## Architecture

- **Monolith:** Laravel serves as the API and routing engine.
- **Inertia.js:** Bridges the gap between Laravel and React without building a separate API.
- **Dockerized:** Uses a multi-stage Dockerfile to build frontend assets and run the PHP-FPM/Nginx environment.
- **Persistence:** SQLite database is stored in `/var/www/html/database_persistent` which is mounted as a volume in production.

## Key Commands

### Local Development

- **Install Dependencies:**
  ```bash
  composer install
  npm install
  ```
- **Environment Setup:**
  ```bash
  cp .env.example .env
  php artisan key:generate
  ```
- **Run Development Server:**
  ```bash
  # Terminal 1: Laravel
  php artisan serve
  
  # Terminal 2: Vite (Frontend)
  npm run dev
  ```
- **Database Migrations & Seeding:**
  ```bash
  php artisan migrate --seed
  ```

### Production / Docker

- **Build Image:**
  ```bash
  docker build -t portofolio-cyberpunk .
  ```
- **Run Container:**
  ```bash
  docker run -p 8080:80 -e PORT=8080 portofolio-cyberpunk
  ```

## Development Conventions

- **PHP:** Adheres to PSR-12 coding standards.
- **React:** Uses functional components and hooks.
- **Styling:** Utilizes Tailwind CSS 4 `@theme` and `@layer` directives for custom cyberpunk effects (neon glows, grid backgrounds, scanlines).
- **HTTPS:** In production, HTTPS is forced in `AppServiceProvider` to ensure secure asset loading.
- **Persistence:** All production data changes should be reflected in the SQLite database within the persistent volume.

## Project Structure

- `app/Filament/`: Admin panel configuration (managed via Filament).
- `app/Models/Proyek.php`: Main data model for portfolio projects.
- `resources/js/Pages/`: Inertia.js React components.
- `resources/js/Pages/Portofolio.jsx`: Main landing page component.
- `docker/`: Contains Nginx, Supervisor, and Entrypoint configurations.
- `database_persistent/`: (Production only) Mounted volume for SQLite database and storage.
