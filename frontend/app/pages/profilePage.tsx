import React, { useEffect, useState } from "react";
import ProfileCard from "~/components/profile/profileCard";
import EditProfileButton from "~/components/profile/editProfileButton";
import { userService } from "~/service/userService";
import { authService } from "~/service/authService";

const ProfilePage: React.FC = () => {
    const [user, setUser] =useState ({
        id : "",
        name : "",
        email : "",
        avatar : "",
    });
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const jwtToken = await authService.getJwtToken();
                const decodedToken = JSON.parse(atob(jwtToken.split(".")[1]));
                const userId = decodedToken.user_Id;

                const userData = await userService.getUser(userId); 
                setUser({
                    id: userId,
                    name: userData.username,
                    email: userData.email,
                    avatar: userData.avatar || "https://via.placeholder.com/150", 
                });
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }
    , []);

    const handleNameChange = async (newName: string) => {
        try {
            const updatedUser = { ...user, name: newName };
            await userService.updateUser(user.id, updatedUser);
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleAvatarChange = async (newAvatar: string) => {
        try {
            const updatedUser = { ...user, avatar: newAvatar };
            await userService.updateUser(user.id, updatedUser);
            setUser(updatedUser);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-6">
            <div className="flex items-center w-full max-w-3xl bg-grey-100 p-6 rounded-lg shadow-md">
                <ProfileCard
                    name={user.name}
                    email={user.email}
                    avatar={user.avatar}
                />
                <EditProfileButton 
                    onAvatarChange={handleAvatarChange} 
                    onNameChange={handleNameChange} 
                />
            </div>
        </div>
    );
}
            

export default ProfilePage;