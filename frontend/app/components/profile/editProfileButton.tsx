import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import authService from "@/service/authService";
import { useNavigate } from 'react-router';

interface EditProfileButtonProps {
    onAvatarChange?: (newAvatar: string) => void;
    username: string;
    email: string;
    password?: string;
}

function EditProfileButton({ onAvatarChange, username, email, password }: EditProfileButtonProps) {
    const [newUsername, setNewUsername] = useState(username || email.split("@")[0]);
    const [newEmail, setNewEmail] = useState(email);
    const [newPassword, setNewPassword] = useState(password);
    const navigate = useNavigate();
    useEffect(() => {
        setNewUsername(username || email.split("@")[0]);
        setNewEmail(email);
        setNewPassword(password || "");
    }, [username, email, password]);

    const handleSave = async () => {
        const updatedUser = {
            username: newUsername,
            email: newEmail,
            password: newPassword,
        }
        try {
            await authService.updateUser(updatedUser);
        } catch (error) {
            console.error(error);
        }
        navigate("/app/auth/login");
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto">
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
                        <Input id="username" value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="Your New Username"
                            className="col-span-3" />
                    </div>
                </div>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Email
                        </Label>
                        <Input id="email" value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="Your New Email"
                            className="col-span-3" />
                    </div>
                </div>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                            Password
                        </Label>
                        <Input id="password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Your New  Password"
                            className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditProfileButton;