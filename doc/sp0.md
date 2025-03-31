# Sprint 0: Project Setup & Design Planning

## Goals
- Set up the development environment
- Plan the application architecture
- Create initial design artifacts

## Design Approach

### 1. Domain Model
Start by modeling the core entities and their relationships:

- **Recipe**
  - Properties: id, title, description, ingredients, instructions, cookingTime, servingSize, createdBy, createdAt, updatedAt
  - Relationships: belongs to User

- **User**
  - Properties: id, email, password, name, createdAt
  - Relationships: has many Recipes

- **Ingredient**
  - Properties: id, name, quantity, unit, recipeId
  - Relationships: belongs to Recipe

### 2. Component Hierarchy
Define the UI component structure:

- **App** (root component)
  - **Layout** (header, footer, navigation)
  - **Pages**
    - **Home**
    - **RecipeList**
      - **SearchBar**
      - **RecipeCard** (multiple)
    - **RecipeDetail**
    - **RecipeForm** (create/edit)
    - **Login**
    - **Register**

### 3. API Design
Plan the backend API endpoints:

- **Recipes**
  - GET /api/recipes - List all recipes
  - GET /api/recipes/:id - Get single recipe
  - POST /api/recipes - Create recipe
  - PUT /api/recipes/:id - Update recipe
  - DELETE /api/recipes/:id - Delete recipe
  - GET /api/recipes/search?q=query - Search recipes

- **Auth**
  - POST /api/auth/register - User registration
  - POST /api/auth/login - User login
  - POST /api/auth/logout - User logout

## Main Class
### User
Represents a registered user of the application
Core attributes: id, email, password, name, createdAt
Relationships: one-to-many with Recipe (has many recipes)
### Recipe
Represents a cooking recipe created by a user
Core attributes: id, title, description, instructions, cookingTime, servingSize, createdBy, createdAt, updatedAt
Relationships: many-to-one with User (belongs to a user)
Contains a list of ingredients
### Ingredient
Represents a food item used in a recipe
Core attributes: id, name, quantity, unit, recipeId
Relationships: belongs to a Recipe

## Class UML

```mermaid
classDiagram
    class User {
        +String id
        +String email
        +String password
        +String name
        +Date createdAt
        +register()
        +login()
        +logout()
    }
    
    class Recipe {
        +String id
        +String title
        +String description
        +String instructions
        +Number cookingTime
        +Number servingSize
        +User createdBy
        +Date createdAt
        +Date updatedAt
        +create()
        +read()
        +update()
        +delete()
        +search()
    }
    
    class Ingredient {
        +String id
        +String name
        +Number quantity
        +String unit
        +Recipe recipeId
        +add()
        +remove()
        +update()
    }
    
    User "1" --> "many" Recipe : creates
    Recipe "1" --> "many" Ingredient : contains
```

```mermaid
graph TD
    %% Frontend
    subgraph Frontend["Frontend"]
        style Frontend fill:#e1f5fe,stroke:#01579b
        
        subgraph Views["Views"]
            style Views fill:#bbdefb,stroke:#1976d2
            RecipeListView["RecipeListView"]
            RecipeDetailView["RecipeDetailView"]
            RecipeFormView["RecipeFormView"]
            SearchView["SearchView"]
            LoginView["LoginView"]
            RegisterView["RegisterView"]
            NavigationView["NavigationView"]
            
            style RecipeListView fill:#e3f2fd,stroke:#2196f3
            style RecipeDetailView fill:#e3f2fd,stroke:#2196f3
            style RecipeFormView fill:#e3f2fd,stroke:#2196f3
            style SearchView fill:#e3f2fd,stroke:#2196f3
            style LoginView fill:#e3f2fd,stroke:#2196f3
            style RegisterView fill:#e3f2fd,stroke:#2196f3
            style NavigationView fill:#e3f2fd,stroke:#2196f3
        end
        
        subgraph ViewModels["ViewModels"]
            style ViewModels fill:#b3e5fc,stroke:#0288d1
            RecipeListViewModel["RecipeListViewModel"]
            RecipeDetailViewModel["RecipeDetailViewModel"]
            RecipeFormViewModel["RecipeFormViewModel"]
            SearchViewModel["SearchViewModel"]
            AuthViewModel["AuthViewModel"]
            
            style RecipeListViewModel fill:#e1f5fe,stroke:#03a9f4
            style RecipeDetailViewModel fill:#e1f5fe,stroke:#03a9f4
            style RecipeFormViewModel fill:#e1f5fe,stroke:#03a9f4
            style SearchViewModel fill:#e1f5fe,stroke:#03a9f4
            style AuthViewModel fill:#e1f5fe,stroke:#03a9f4
        end
        
        subgraph Services["Services"]
            style Services fill:#b2ebf2,stroke:#0097a7
            RecipeService["RecipeService"]
            AuthService["AuthService"]
            UserService["UserService"]
            
            style RecipeService fill:#e0f7fa,stroke:#00bcd4
            style AuthService fill:#e0f7fa,stroke:#00bcd4
            style UserService fill:#e0f7fa,stroke:#00bcd4
        end
    end
    
    %% Backend
    subgraph Backend["Backend"]
        style Backend fill:#f3e5f5,stroke:#4a148c
        
        subgraph APIControllers["API Controllers"]
            style APIControllers fill:#e1bee7,stroke:#7b1fa2
            RecipeController["RecipeController"]
            AuthController["AuthController"]
            UserController["UserController"]
            
            style RecipeController fill:#f3e5f5,stroke:#9c27b0
            style AuthController fill:#f3e5f5,stroke:#9c27b0
            style UserController fill:#f3e5f5,stroke:#9c27b0
        end
        
        subgraph Models["Models"]
            style Models fill:#d1c4e9,stroke:#512da8
            RecipeModel["RecipeModel"]
            UserModel["UserModel"]
            IngredientModel["IngredientModel"]
            
            style RecipeModel fill:#ede7f6,stroke:#673ab7
            style UserModel fill:#ede7f6,stroke:#673ab7
            style IngredientModel fill:#ede7f6,stroke:#673ab7
        end
        
        subgraph Database["Database"]
            style Database fill:#ffcdd2,stroke:#b71c1c
            RecipesCollection[(RecipesCollection)]
            UsersCollection[(UsersCollection)]
            
            style RecipesCollection fill:#ffebee,stroke:#f44336
            style UsersCollection fill:#ffebee,stroke:#f44336
        end
    end
    
    %% View to ViewModel bindings
    RecipeListView -->|binds to| RecipeListViewModel
    RecipeDetailView -->|binds to| RecipeDetailViewModel
    RecipeFormView -->|binds to| RecipeFormViewModel
    SearchView -->|binds to| SearchViewModel
    LoginView -->|binds to| AuthViewModel
    RegisterView -->|binds to| AuthViewModel
    
    %% ViewModel to Service interactions
    RecipeListViewModel -->|uses| RecipeService
    RecipeDetailViewModel -->|uses| RecipeService
    RecipeFormViewModel -->|uses| RecipeService
    SearchViewModel -->|uses| RecipeService
    AuthViewModel -->|uses| AuthService
    AuthViewModel -->|uses| UserService
    
    %% Service to API communication
    RecipeService -.->|HTTP requests| RecipeController
    AuthService -.->|HTTP requests| AuthController
    UserService -.->|HTTP requests| UserController
    
    %% Backend connections
    RecipeController -->|uses| RecipeModel
    RecipeController -->|uses| IngredientModel
    AuthController -->|uses| UserModel
    UserController -->|uses| UserModel
    
    %% Database persistence
    RecipeModel -->|persists to| RecipesCollection
    UserModel -->|persists to| UsersCollection

    %% Edge styling
    linkStyle default stroke:#666,stroke-width:2px;
```