"use client"

import { Plus, Search } from "lucide-react"
import { Link } from "react-router"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Dialog } from "@/components/ui/dialog"
import CreateIngredient from "@/components/ingredient/createIngredient"

// Sample ingredient data
const ingredients = [
    {
        id: "68085453b24f5e5b280c9687",
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
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Ingredient
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <CreateIngredient />
                    </DialogContent>
                </Dialog>
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
                                    <Link to={`/app/ingredients/${ingredient.id}`} className="block w-full">
                                        {ingredient.name}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/app/ingredients/${ingredient.id}`} className="block w-full">
                                        {ingredient.unit}
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/app/ingredients/${ingredient.id}`} className="block w-full">
                                        ${ingredient.price.toFixed(2)}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </ScrollArea>
        </div>
    )
}

export default IngredientList;
