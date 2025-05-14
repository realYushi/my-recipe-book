"use client"

import { Plus, Search } from "lucide-react"
import { Link } from "react-router-dom"
import { getAuth } from "firebase/auth"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DialogContent, DialogTrigger, Dialog } from "@/components/ui/dialog"
import CreateIngredient from "@/components/ingredient/createIngredient"
import { useEffect, useState } from "react"

export function IngredientList() {
    interface Ingredient {
        id: string;
        name: string;
        unit: string;
        price: number;
    }

    const [ingredients, setIngredients] = useState<Ingredient[]>([])

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const auth = getAuth()
                const user = auth.currentUser

                if (!user) {
                    console.warn("User not logged in")
                    return
                }

                const token = await user.getIdToken()

                const response = await fetch("/api/ingredients", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                const data = await response.json()
                console.log("Fetched ingredients:", data)

                if (Array.isArray(data)) {
                    setIngredients(data)
                } else {
                    console.error("API did not return an array:", data)
                }
            } catch (error) {
                console.error("Failed to fetch ingredients:", error)
            }
        }

        fetchIngredients()
    }, [])

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

export default IngredientList