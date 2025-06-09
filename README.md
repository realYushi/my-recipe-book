# My Recipe Book 🍳

A modern, full-stack recipe management application that allows users to collect, organize, and share their favorite recipes. Built with React Router, Node.js, and MongoDB, featuring web scraping capabilities to import ingredients from popular supermarket.

## ✨ Features

- **Recipe Management**: Create, edit, organize, and delete recipes
- **Web Scraping**: Automatically import ingredients from popular supermarket Puppeteer
- **Modern UI**: Beautiful, responsive interface built with React Router and Tailwind CSS
- **Rich Text Editor**: Create detailed recipe instructions with Milkdown editor
- **Image Export**: Generate beautiful recipe cards as images to share
- **Containerized**: Fully dockerized application for easy deployment
- **Testing**: Comprehensive test suite with Vitest
- **Authentication**: Firebase-based user authentication system

## 🛠 Tech Stack

### Frontend
- **React Router 7** - Full-stack React framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Vite** - Fast build tool and dev server
- **Lucide React** - Beautiful icons
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Puppeteer** - Web scraping and automation
- **Firebase Admin** - Authentication and user management
- **Vitest** - Testing framework

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **OpenAPI** - API documentation
- **Makefile** - Development automation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Docker** (version 20.0 or higher)
- **Docker Compose** (version 2.0 or higher)
- **Make** (for convenient development commands)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-recipe-book
   ```

2. **Start the application**
   ```bash
   make start
   ```
   Or manually with Docker Compose:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**
   - 🌐 **Frontend**: http://localhost:3000
   - 🔧 **Backend API**: http://localhost:5000
   - 🗄️ **MongoDB**: http://localhost:27017

## 📖 Usage

### Quick Start
```bash
# Start all services
make start

# View logs
make logs

# Stop services
make stop

# Clean restart
make restart
```

### Development
```bash
# Start development environment with logs
make dev

# Access service shells
make shell-frontend  # Frontend container
make shell-backend   # Backend container
make shell-db       # MongoDB shell

# Run tests
make test-backend

# Fix dependency issues
make fix-deps
```

### Recipe Management

1. **Adding Recipes**: Click "Add Recipe" to create new recipes manually
2. **Import from Web**: Use the scraping feature to import ingredients from your local supermarket
3. **Export**: Generate beautiful recipe card images to share on social media

## 🔧 Development

### Project Structure
```
my-recipe-book/
├── backend/              # Node.js/Express API
│   ├── src/             # Source code
│   ├── package.json     # Backend dependencies
│   └── Dockerfile.backend
├── frontend/            # React Router application
│   ├── app/            # React Router app directory
│   ├── package.json    # Frontend dependencies
│   └── Dockerfile.frontend
├── doc/                # Documentation
│   └── openapi.yaml    # API specification
├── docker-compose.yml  # Docker services configuration
└── Makefile           # Development commands
```

### Available Make Commands
```bash
make help              # Show all available commands
make start             # Start all services
make stop              # Stop all services
make restart           # Restart all services
make build             # Build all services
make rebuild           # Rebuild from scratch
make logs              # Follow all logs
make logs-frontend     # Frontend logs only
make logs-backend      # Backend logs only
make clean             # Remove containers and volumes
make test              # Run all tests
make test-backend      # Run backend tests only
make test-frontend     # Run frontend tests only
```

### Environment Variables

Create environment files for custom configuration. **Firebase authentication is required for the application to work properly.**
see more detai from https://firebase.google.com/docs/cloud-messaging/auth-server
**Backend** (`backend/.env`):
```env
PRIVATE_KEY_ID="Your PRIVATE_KEY_ID"
PRIVATE_KEY="Your PRIVATE_KEY"
CLIENT_EMAIL="Your CLIENT_EMAIL"
```


📋 **See `env.example` for complete Firebase configuration templates**

## 🧪 Testing

Run the test suite:
```bash
# Run all tests
make test

# Individual test suites
make test-backend      # Backend tests only
make test-frontend     # Frontend tests only

# Or directly with Docker
docker-compose exec backend npm run test
docker-compose exec frontend npm run test
```

## 🐳 Docker

The application is fully containerized with multi-stage builds for development, building, and production:

- **Development**: Hot reload with volume mounts
- **Production**: Optimized builds with minimal image sizes
- **Database**: MongoDB with persistent volumes

## 📊 API Documentation

The API is documented using OpenAPI 3.0 specification. You can:

- View the API docs at `doc/openapi.yaml`
- Import the spec into tools like Postman or Insomnia

## 🎯 Roadmap

- [ ] Recipe rating and review system
- [ ] Social sharing features
- [ ] Advanced search and filtering
- [ ] Recipe recommendations
- [ ] Meal planning functionality

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup for Contributors

1. Clone your fork
2. Run `make start` to start the development environment
3. Make your changes
4. Run `make test-backend` and `make test-frontend` to ensure tests pass
5. Submit a pull request


## 🙏 Acknowledgments

- [React Router](https://reactrouter.com/) - Full-stack React framework
- [Puppeteer](https://pptr.dev/) - Web scraping capabilities
- [Tailwind CSS](https://tailwindcss.com/) - Beautiful styling
- [Radix UI](https://www.radix-ui.com/) - Accessible components
- [MongoDB](https://www.mongodb.com/) - Database solution


**Happy Cooking! 🍳✨**