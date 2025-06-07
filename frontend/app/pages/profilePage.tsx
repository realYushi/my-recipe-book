import { useEffect, useState } from "react";
import EditProfileButton from "@/components/profile/editProfileButton";
import authService from "@/service/authService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import type { User } from "@/model/user";
import DeleteAccountButton from "@/components/profile/deleteAccountButton";
import ResetPasswordButton from "@/components/profile/resetPassword";
import userService from "@/service/userService";
import LogoutButton from "@/components/profile/logoutButton";

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
        <div className="flex flex-col items-center justify-center bg-white w-full">
            <Card className="w-full max-w-xl mx-auto">
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
                        <p className="text-lg font-semibold">{user?.username}</p>
                    </div>

                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <p className="text-lg font-semibold">{user?.email}</p>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-wrap gap-2 justify-end">
                    <EditProfileButton
                        // onAvatarChange={handleAvatarChange}
                        username={user?.username || ''}
                        email={user?.email || ''}
                    />
                    <DeleteAccountButton />
                    <LogoutButton />
                    {user?.email && <ResetPasswordButton email={user.email} />}
                </CardFooter>
            </Card>
        </div>
    );
}


export default ProfilePage;
