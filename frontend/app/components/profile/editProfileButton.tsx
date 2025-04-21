import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,  
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "~/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface EditProfileButtonProps {
    onAvatarChange: (newAvatar: string) => void;
    onNameChange: (newName: string) => void;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({onAvatarChange,onNameChange,}) => {
    const [name, setName] = useState("");

    const handleSave = () => {
        onNameChange(name);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className = "ml-auto">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value={name}
                        onChange={(e) => setName(e.target.value)} 
                        placeholder = "Your Name"
                        className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick = {handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditProfileButton;