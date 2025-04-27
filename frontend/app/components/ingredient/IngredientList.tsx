"use client"

import { Plus, Search } from "lucide-react"
import { NavLink } from "react-router"

import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { ScrollArea } from "~/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table"

// Sample ingredient data
const ingredients = [
    {
        id: "1",
        name: "Tomatoes",
        unit: "kg",
        price: 2.99,
    },
    {
        id: "2",
        name: "Onions",
        unit: "kg",
        price: 1.49,
    },
    {
        id: "3",
        name: "Chicken Breast",
        unit: "kg",
        price: 8.99,
    },
    {
        id: "4",
        name: "Olive Oil",
        unit: "bottle",
        price: 6.99,
    },
    {
        id: "5",
        name: "Garlic",
        unit: "head",
        price: 0.79,
    },
    {
        id: "6",
        name: "Rice",
        unit: "kg",
        price: 3.49,
    },
    {
        id: "7",
        name: "Pasta",
        unit: "pack",
        price: 1.99,
    },
    {
        id: "8",
        name: "Salt",
        unit: "kg",
        price: 1.29,
    },
]

export function IngredientList() {
    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4">
                <h1 className="text-xl font-semibold">Ingredients</h1>
                <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Ingredient
                </Button>
            </div>
            <div className="px-4 pb-4">
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search ingredients..." className="pl-8" />
                </div>
            </div>
            <ScrollArea className="flex-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Unit</TableHead>
                            <TableHead>Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {ingredients.map((ingredient) => (
                            <TableRow key={ingredient.id} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">
                                    <NavLink to={`/ingredients/${ingredient.id}`} className="block w-full">
                                        {ingredient.name}
                                    </NavLink>
                                </TableCell>
                                <TableCell>
                                    <NavLink to={`/ingredients/${ingredient.id}`} className="block w-full">
                                        {ingredient.unit}
                                    </NavLink>
                                </TableCell>
                                <TableCell>
                                    <NavLink to={`/ingredients/${ingredient.id}`} className="block w-full">
                                        ${ingredient.price.toFixed(2)}
                                    </NavLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

