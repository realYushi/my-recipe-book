import { Search, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SearchBar } from "@/components/recipes/RecipeSearchBar"
import { Input } from "@/components/ui/input"
import { NavLink } from "react-router"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import ProfilePage from "@/pages/profilePage"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background">
            <div className="container flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <NavLink to="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold">My Recipe Book</span>
                    </NavLink>
                    <nav className="hidden md:flex items-center gap-6 ml-6">
                        <NavLink to="#" className="text-sm font-medium hover:underline">
                            Home
                        </NavLink>
                        <NavLink to="#" className="text-sm font-medium hover:underline">
                            Browse
                        </NavLink>
                        <NavLink to="#" className="text-sm font-medium hover:underline">
                            About
                        </NavLink>
                    </nav>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Type to search" className="pl-8" />
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <User className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent
                            className="max-w-lg w-full  p-0 "
                        >
                            <ProfilePage />
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
