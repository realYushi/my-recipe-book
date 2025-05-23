import { useEffect, useState } from "react";
import userService from "@/service/userService";
import authService from "@/service/authService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function Profile() {
    // const handleNameChange = async (newName: string) => {
    //     try {
    //         const updatedUser = { ...user, name: newName };
    //         await userService.updateUser(user.id, updatedUser);
    //         setUser(updatedUser);
    //     } catch (error) {
    //         console.error("Error updating user data:", error);
    //     }
    // };

    // const handleAvatarChange = async (newAvatar: string) => {
    //     try {
    //         const updatedUser = { ...user, avatar: newAvatar };
    //         await userService.updateUser(user.id, updatedUser);
    //         setUser(updatedUser);
    //     } catch (error) {
    //         console.error("Error updating user data:", error);
    //     }
    // }
    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        // avatar: "",
    });
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const jwtToken = await authService.getJwtToken();
                const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
                const userId = decodedToken.user_id;

                const userData = await userService.getUser(userId);
                setUser({
                    id: userId,
                    name: userData.username,
                    email: userData.email,
                    // avatar: userData.avatar || "https://via.placeholder.com/150",
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }
        , []);
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
                            <p className="text-lg font-semibold">{user.name}</p>
                        </div>

                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Email</Label>
                            <p className="text-lg font-semibold">{user.email}</p>
                        </div>
                    </CardContent>

                    <CardFooter className="flex justify-end">
                        {/* <EditProfileButton
                                onAvatarChange={handleAvatarChange}
                                onNameChange={handleNameChange}
                            /> */}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );

}
export default Profile;