# Full Stack Landing Page Application

## Overview
A complete full-stack web application built with Java 8, Spring Boot, PostgreSQL, HTML, CSS, and Bootstrap. The application features a modern landing page with dynamic content and an admin panel for content management.

## Tech Stack
- **Backend**: Java 8, Spring Boot 2.7.18, Maven
- **Database**: PostgreSQL (Neon)
- **Frontend**: HTML5, CSS3, Bootstrap 5, Vanilla JavaScript
- **ORM**: Hibernate/JPA
- **Server**: Embedded Tomcat (port 5000)

## Project Structure
```
├── src/
│   └── main/
│       ├── java/com/fullstack/app/
│       │   ├── Application.java              # Main Spring Boot application
│       │   ├── config/
│       │   │   └── WebConfig.java            # CORS and resource handling
│       │   ├── controller/                    # REST API controllers
│       │   │   ├── ProjectController.java
│       │   │   ├── ClientController.java
│       │   │   ├── ContactController.java
│       │   │   └── SubscriptionController.java
│       │   ├── entity/                        # JPA entities
│       │   │   ├── Project.java
│       │   │   ├── Client.java
│       │   │   ├── Contact.java
│       │   │   └── Subscription.java
│       │   ├── repository/                    # Data access layer
│       │   │   ├── ProjectRepository.java
│       │   │   ├── ClientRepository.java
│       │   │   ├── ContactRepository.java
│       │   │   └── SubscriptionRepository.java
│       │   └── service/                       # Business logic layer
│       │       ├── ProjectService.java
│       │       ├── ClientService.java
│       │       ├── ContactService.java
│       │       ├── SubscriptionService.java
│       │       └── FileStorageService.java
│       └── resources/
│           ├── application.properties         # Spring Boot configuration
│           └── static/                        # Frontend files
│               ├── index.html                 # Landing page
│               ├── admin.html                 # Admin panel
│               ├── css/
│               │   ├── style.css
│               │   └── admin.css
│               └── js/
│                   ├── main.js
│                   └── admin.js
├── pom.xml                                    # Maven dependencies
└── uploads/                                   # Image upload directory
```

## Features

### Landing Page
1. **Hero Section**: Eye-catching gradient background with call-to-action
2. **Our Projects Section**: Displays all projects from database with:
   - Project image
   - Project name
   - Project description
   - Read more button (non-functional as per requirements)
3. **Happy Clients Section**: Shows client testimonials with:
   - Client image (circular)
   - Client testimonial
   - Client name
   - Client designation
4. **Contact Form**: Captures user inquiries with fields:
   - Full name
   - Email address
   - Mobile number
   - City
5. **Newsletter Subscription**: Email subscription with duplicate prevention

### Admin Panel
1. **Project Management**:
   - Add new projects with image upload
   - View all projects in table format
   - Delete projects
2. **Client Management**:
   - Add new clients with image upload
   - View all clients in table format
   - Delete clients
3. **Contact Form Submissions**:
   - View all contact form entries
   - See submission timestamps
4. **Newsletter Subscriptions**:
   - View all subscribed email addresses
   - See subscription timestamps

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get project by ID
- `POST /api/projects` - Create new project (multipart/form-data)
- `DELETE /api/projects/{id}` - Delete project

### Clients
- `GET /api/clients` - Get all clients
- `GET /api/clients/{id}` - Get client by ID
- `POST /api/clients` - Create new client (multipart/form-data)
- `DELETE /api/clients/{id}` - Delete client

### Contacts
- `GET /api/contacts` - Get all contact submissions
- `POST /api/contacts` - Submit contact form (JSON)

### Subscriptions
- `GET /api/subscriptions` - Get all subscriptions
- `POST /api/subscriptions` - Subscribe to newsletter (JSON)

## Database Schema

### projects
- `id` (bigserial, primary key)
- `name` (varchar, not null)
- `description` (varchar(1000))
- `image_path` (varchar)

### clients
- `id` (bigserial, primary key)
- `name` (varchar, not null)
- `description` (varchar(1000))
- `designation` (varchar, not null)
- `image_path` (varchar)

### contacts
- `id` (bigserial, primary key)
- `full_name` (varchar, not null)
- `email` (varchar, not null)
- `mobile` (varchar, not null)
- `city` (varchar, not null)
- `submitted_at` (timestamp)

### subscriptions
- `id` (bigserial, primary key)
- `email` (varchar, unique, not null)
- `subscribed_at` (timestamp)

## Configuration

### Database Connection
The application uses environment variables for database configuration:
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGDATABASE` - Database name
- `PGUSER` - Database username
- `PGPASSWORD` - Database password

### File Upload
- Upload directory: `uploads/`
- Max file size: 10MB
- Supported formats: Images (png, jpg, jpeg, gif)

## Running the Application

The application runs automatically via the configured workflow:
```bash
mvn spring-boot:run
```

Access the application at:
- **Landing Page**: http://localhost:5000/
- **Admin Panel**: http://localhost:5000/admin.html
- **API Base URL**: http://localhost:5000/api/

## Sample Data
The database is pre-populated with:
- 6 sample projects (E-Commerce Platform, Mobile Banking App, Healthcare System, etc.)
- 6 client testimonials with professional images

## Security Features
- CORS enabled for API access
- Email uniqueness constraint for subscriptions
- SQL injection prevention via JPA
- XSS prevention via HTML escaping in JavaScript
- Secure file upload handling

## Responsive Design
- Mobile-first approach using Bootstrap 5
- Fully responsive on all devices
- Modern gradient hero section
- Card-based layouts for projects and clients
- Smooth hover effects and transitions

## Development Notes
- Java 8 compatible
- Uses Lombok for reducing boilerplate code
- Hibernate auto-creates/updates database schema
- Console logging enabled for SQL queries (development mode)
- Static resources served from classpath

## Recent Changes (Nov 17, 2025)
- Initial project setup with Spring Boot and PostgreSQL
- Created all REST API endpoints with proper validation
- Implemented file upload functionality for images
- Built responsive landing page with Bootstrap 5
- Created admin panel with full CRUD operations
- Added sample data for demonstration purposes
- Fixed database connection configuration for Replit environment
