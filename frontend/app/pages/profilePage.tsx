import { useEffect, useState } from "react";
import EditProfileButton from "@/components/profile/editProfileButton";
import authService from "@/service/authService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { User } from "@/model/user";
import DeleteAccountButton from "@/components/profile/deleteAccountButton";

import userService from "@/service/userService";
import LogoutButton from "@/components/profile/logoutButton";
import ResetPasswordButton from "@/components/profile/resetPassword";

function ProfilePage() {

    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await authService.getCurrentUser();
                if (userData) {
                    const user = await userService.getUser(userData.uid);
                    if (user) {
                        console.log("User data fetched:", user);
                        setUser({
                            id: user.id,
                            username: user.username || user.email?.split("@")[0] || '',
                            email: user.email || '',
                        });
                    }
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div className="container mx-auto max-w-2xl ">
            <Card className="w-full shadow-lg">
                <CardHeader className="text-center pb-6">
                    <CardTitle className="text-3xl font-bold">Profile</CardTitle>
                </CardHeader>

                <CardContent className="space-y-6 px-8">
                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium text-gray-500">Name</Label>
                        <p className="text-xl font-semibold text-gray-900">{user?.username}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-500">Email</Label>
                        <p className="text-xl font-semibold text-gray-900">{user?.email}</p>
                    </div>
                </CardContent>

                <CardFooter className="flex justify-end ">
                    <EditProfileButton
                        username={user?.username || ''}
                        email={user?.email || ''}
                    />
                    <DeleteAccountButton />
                    <LogoutButton />
                     {user?.email && <ResetPasswordButton email={user.email} />}
                </CardFooter>
            </Card>
        </div >
    );
}


export default ProfilePage;
