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
    onAvatarChange?: (newAvatar: string) => void;
}

const EditProfileButton: React.FC<EditProfileButtonProps> = ({onAvatarChange}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        console.log('Profile updated:', { name, email });
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className = "mt-4">
                    Edit Profile
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="name" 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder = "Your Name"
                        className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            Email
                        </Label>
                        <Input id="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                        placeholder = "Your Email"
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