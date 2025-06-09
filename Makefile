# Recipe Book Application Makefile

.PHONY: help start stop restart build logs clean dev prod test shell-frontend shell-backend shell-db status fix-deps

# Default target
help: ## Show this help message
	@echo "Recipe Book Application Commands:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

# Development Commands
start: ## Start all services in development mode
	docker-compose up -d
	@echo "✅ Application started!"
	@echo "🌐 Frontend: http://localhost:3000"
	@echo "🔧 Backend API: http://localhost:5000"
	@echo "🗄️  MongoDB: http://localhost:27017"

dev: start logs ## Start services and follow logs

stop: ## Stop all services
	docker-compose down
	@echo "🛑 All services stopped."

restart: ## Restart all services
	docker-compose restart
	@echo "🔄 All services restarted."

# Build Commands
build: ## Build all services
	docker-compose build
	@echo "🔨 All services built successfully."

build-no-cache: ## Build all services without cache
	docker-compose build --no-cache
	@echo "🔨 All services built from scratch."

rebuild: ## Rebuild and restart all services
	docker-compose down
	docker-compose build --no-cache
	docker-compose up -d
	@echo "🔄 Services rebuilt and restarted."

# Fix dependency issues
fix-deps: ## Fix frontend dependency issues and rebuild
	docker-compose down
	docker volume rm my-recipe-book_frontend_node_modules || true
	docker-compose build --no-cache frontend
	docker-compose up -d
	@echo "🔧 Dependencies fixed and services restarted."

# Logging and Monitoring
logs: ## Follow logs for all services
	docker-compose logs -f

logs-frontend: ## Follow frontend logs only
	docker-compose logs -f frontend

logs-backend: ## Follow backend logs only
	docker-compose logs -f backend

logs-db: ## Follow database logs only
	docker-compose logs -f database

status: ## Show status of all services
	docker-compose ps

# Shell Access
shell-frontend: ## Open shell in frontend container
	docker-compose exec frontend /bin/bash

shell-backend: ## Open shell in backend container
	docker-compose exec backend /bin/bash

shell-db: ## Open MongoDB shell
	docker-compose exec database mongosh recipe-book

# Cleanup Commands
clean: ## Remove containers, networks, and volumes
	docker-compose down -v --remove-orphans
	@echo "🧹 Cleaned up containers, networks, and volumes."

clean-images: ## Remove all related Docker images
	docker-compose down --rmi all
	@echo "🗑️  Removed all images."

clean-all: ## Complete cleanup including images and volumes
	docker-compose down -v --rmi all --remove-orphans
	docker system prune -f
	@echo "🧹 Complete cleanup finished."

# Testing Commands
test-backend: ## Run backend tests
	docker-compose exec backend npm test

# Production Commands
prod: ## Start services in production mode
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
	@echo "🚀 Production environment started."

# Database Commands
db-reset: ## Reset database (removes all data)
	docker-compose stop database
	docker volume rm my-recipe-book_mongodb_data || true
	docker-compose up -d database
	@echo "🗄️  Database reset complete."

# Quick Commands
up: start ## Alias for start
down: stop ## Alias for stop 