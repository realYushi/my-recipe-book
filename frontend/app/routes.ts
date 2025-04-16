
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
        route("/ingredients/create", "./pages/ingredients/createIngredient.tsx"),
    ] satisfies RouteConfig)
] satisfies RouteConfig;