
import {
    type RouteConfig,
    route,
    layout,
} from "@react-router/dev/routes";
export default [
    route("/", "./pages/landingPage/page.tsx"),
    route("app/auth/login", "./pages/auth/login.tsx"),
    route("app/auth/register", "./pages/auth/register.tsx"),
    route("app/auth/mfa-verify", "./components/auth/MfaVerifyForm.tsx"),

    layout("./components/ProtectedRoute.tsx", [
        layout("./pages/layout.tsx", [
            route("app/ingredients", "./pages/ingredients/page.tsx"),
            route("app/ingredients/:id", "./components/ingredient/IngredientDetail.tsx"),
            route("app/recipes", "./pages/recipes/page.tsx"),
            route("app/recipes/:id", "./components/recipes/RecipeDetail.tsx"),
            route("app/home", "./components/home/HomePage.tsx"),
        ]),
    ] satisfies RouteConfig),

] satisfies RouteConfig;