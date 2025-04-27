import { NavLink } from "react-router"

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row md:py-4">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    © 2025 My Recipe Book. All rights reserved.
                </p>
                <nav className="flex items-center gap-4 text-sm">
                    <NavLink to="#" className="text-muted-foreground hover:underline">
                        Terms
                    </NavLink>
                    <NavLink to="#" className="text-muted-foreground hover:underline">
                        Privacy
                    </NavLink>
                    <NavLink to="#" className="text-muted-foreground hover:underline">
                        Contact
                    </NavLink>
                </nav>
            </div>
        </footer>
    )
}
