
import {
    type RouteConfig,
    route,
    layout,
} from "@react-router/dev/routes";
export default [
    route("app/auth/login", "./pages/auth/login.tsx"),
    layout("./components/ProtectedRoute.tsx", [
        layout("./pages/layout.tsx", [
            route("app/ingredients", "./pages/ingredients/page.tsx"),
            route("app/ingredients/:id", "./components/ingredient/IngredientDetail.tsx"),
            route("app/recipes", "./pages/recipes/page.tsx"),
            route("app/recipes/:id", "./components/recipes/RecipeDetail.tsx"),
            route("app/dashboard", "./pages/dashboard/page.tsx"),
        ]),
    ] satisfies RouteConfig),

] satisfies RouteConfig;