
import {
    type RouteConfig,
    route,
    layout
} from "@react-router/dev/routes";
export default [
    route("/auth/login", "./pages/auth/login.tsx"),
    layout("./components/ProtectedRoute.tsx", [
        layout("./pages/layout.tsx", [
            route("/ingredients", "./pages/ingredients/page.tsx"),
            route("/ingredients/:id", "./components/ingredient/IngredientDetail.tsx"),
        ]),
    ] satisfies RouteConfig),

] satisfies RouteConfig;