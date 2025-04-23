
import {
    type RouteConfig,
    route,
    layout
} from "@react-router/dev/routes";

export default [
    route("/", "./pages/index.tsx"),
    route("/auth/register", "./pages/auth/register.tsx"),
    route("/auth/login", "./pages/auth/login.tsx"),
    layout("./components/ProtectedRoute.tsx", [
        route("/recipes/create", "./pages/recipes/create-recipe.tsx"),
        route("/ingredients/create", "./pages/ingredients/createIngredient.tsx"),
        route("/profile", "./pages/profilePage.tsx"),
        route("/test", "./pages/recipes/update-recipe.tsx"),
    ] satisfies RouteConfig),
] satisfies RouteConfig;