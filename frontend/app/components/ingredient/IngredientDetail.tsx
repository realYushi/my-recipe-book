import { ArrowLeft, Edit, Trash2 } from "lucide-react"
import { Link, NavLink, useParams } from "react-router"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Separator } from "~/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import UpdateIngredient from "./UpdateIngredient"

export function IngredientDetail() {
    const { id } = useParams();
    const ingredient = {
        id: "68085453b24f5e5b280c9687",
        name: "Tomatoes",
        unit: "kg",
        price: 2.99,
        stock: 3,
        supplier: "Local Farm",
        notes: "Organic Roma tomatoes. Best for pasta sauces and stews.",
    }

    return (
        <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" asChild>
                        <Link to="/ingredients">
                            <ArrowLeft className="h-4 w-4" />
                            <span className="sr-only">Back to ingredients</span>
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold">{ingredient.name}</h1>
                </div>
                <div className="flex items-center gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Edit className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <UpdateIngredient id={id as string} />
                        </DialogContent>
                    </Dialog>
                    <Button variant="outline" size="icon" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete ingredient</span>
                    </Button>
                </div>
            </div>

            <div className="flex-1 p-4 overflow-auto">
                <div className="grid gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Unit</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">{ingredient.unit}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Price</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">${ingredient.price.toFixed(2)}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="py-2">
                                <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                            </CardHeader>
                            <CardContent className="py-2">
                                <p className="text-lg font-semibold">
                                    {ingredient.stock} {ingredient.unit}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Additional Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <p className="text-sm text-muted-foreground">Supplier</p>
                                <p className="font-medium">{ingredient.supplier}</p>
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Notes</h2>
                        <p>{ingredient.notes}</p>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Used In Recipes</h2>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Tomato Pasta Sauce</li>
                            <li>Garden Salad</li>
                            <li>Bruschetta</li>
                            <li>Caprese Salad</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IngredientDetail;