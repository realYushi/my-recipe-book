import { NavLink, useLocation } from "react-router";
import { Apple, BarChart2, Book, Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

function Sidebar() {
    const location = useLocation();
    const pathname = location.pathname;

    const routes = [
        {
            label: "Home",
            icon: Home,
            href: "/app/",
            active: pathname.startsWith("/app/"),
        },
        {
            label: "Ingredients",
            icon: Apple,
            href: "/app/ingredients",
            active: pathname.startsWith("/app/ingredients"),
        },
        {
            label: "Recipes",
            icon: Book,
            href: "/app/recipes",
            active: pathname.startsWith("/app/recipes"),
        },
    ];

    return (
        <div className="flex h-full flex-col border-r bg-muted/10">
            <ScrollArea className="flex-1 pt-4">
                <div className="px-3 py-2">
                    <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Menu</h2>
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Button
                                key={route.href}
                                variant={route.active ? "secondary" : "ghost"}
                                className={cn("w-full justify-start", route.active && "bg-primary/10")}
                                asChild
                            >
                                <NavLink to={route.href} >
                                    <route.icon className="mr-2 h-4 w-4" />
                                    {route.label}
                                </NavLink>
                            </Button>
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
}

export default Sidebar;