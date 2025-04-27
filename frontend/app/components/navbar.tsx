import { Search, User } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { NavLink } from "react-router"

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
                    <div className="relative hidden md:flex w-full max-w-sm items-center">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input type="search" placeholder="Search..." className="pl-8 w-[200px]" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
