import React, { useEffect, useState } from "react";
import ProfileCard from "~/components/profile/profileCard";
import EditProfileButton from "~/components/profile/editProfileButton";
import { userService } from "~/service/userService";
import { authService } from "~/service/authService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { User } from "~/model/user";
const ProfilePage: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    setUser({
                        id: userData.uid,
                        name: userData.displayName || userData.email?.split("@")[0] || '',
                        email: userData.email || '',
                    });
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);



    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="w-full max-w-md mx-auto">
                <Card className="w-full">
                    <CardHeader className="flex flex-col item-center gap-4">
                        {/*<ProfileCard
                            name={user.name}
                            email={user.email}
                            avatar={user.avatar}
                        /> */}
                        <CardTitle className="text-2x1 font-bold">Profile</CardTitle>
                    </CardHeader>

                    <CardContent className="grid w-full items-center gap-6">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <p className="text-lg font-semibold">{user?.name}</p>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <p className="text-lg font-semibold">{user?.email}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        <EditProfileButton
                            // onAvatarChange={handleAvatarChange}
                            name={user?.name || ''}
                            email={user?.email || ''}
                        />
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}


export default ProfilePage;