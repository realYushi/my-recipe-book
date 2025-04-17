import { Crepe } from "@milkdown/crepe";
import "@milkdown/crepe/theme/common/style.css";
import "@milkdown/crepe/theme/frame.css";
import { Button } from "~/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "~/components/ui/select"
import CreateIngredient from "../ingredient/createIngredient";
import { useEffect, useRef } from "react";

function CreateRecipe() {
    const editorRef = useRef(null);

    useEffect(() => {
        let crepeInstance = null;
        if (editorRef.current) {
            crepeInstance = new Crepe({
                root: editorRef.current,
                defaultValue: "Add your cooking instructions here...",
            });
            crepeInstance.create();
        }
        return () => {
            if (crepeInstance) {
                crepeInstance.destroy();
            }
        };
    }, []);

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader>
                    <CardTitle>Create New Recipe</CardTitle>
                    <CardDescription>Share your culinary masterpiece with the world</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Recipe Name</Label>
                            <Input id="name" placeholder="Enter recipe name" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="portions">Portions</Label>
                                <Input id="portions" type="number" min="1" placeholder="Number of servings" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="prepTime">Preparation Time (min)</Label>
                                <Input id="prepTime" type="number" min="0" placeholder="Prep time" />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="cookTime">Cooking Time (min)</Label>
                                <Input id="cookTime" type="number" min="0" placeholder="Cook time" />
                            </div>
                        </div>


                        <div>
                            <Label className="text-lg font-medium">Ingredients</Label>
                            <div className="mt-2 space-y-2">
                                <div className="grid grid-cols-12 gap-2">
                                    <div className="col-span-6">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select ingredient" />
                                            </SelectTrigger>
                                            <SelectContent>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="col-span-3">
                                        <Input type="number" min="0" placeholder="Quantity" />
                                    </div>
                                    <div className="col-span-3">
                                        <Select>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Unit" />
                                            </SelectTrigger>
                                            <SelectContent>

                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </div>
                            <Button type="button" variant="outline" className="mt-2">+ Add Ingredient</Button>
                        </div>


                        <div>
                            <Label className="text-lg font-medium">Cooking Instructions</Label>
                            <div
                                ref={editorRef}
                                className="mt-2 min-h-[200px] border rounded-md p-4"
                            ></div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Save Recipe</Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateRecipe;


