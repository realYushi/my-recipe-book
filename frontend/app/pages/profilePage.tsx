import React, { useEffect, useState } from "react";
import ProfileCard from "~/components/profile/profileCard";
import EditProfileButton from "~/components/profile/editProfileButton";
import { userService } from "~/service/userService";

const ProfilePage: React.FC = () => {
    const [user, setUser] =useState ({
        name : "",
        email : "",
        avatar : "",
    });
    
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userData = await userService.getUser("currentUserId"); 
                setUser({
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
            const updattedUser = { ...user, name: newName };
            await userService.updateUser("currentUserId", updattedUser);
            setUser(updattedUser);
        } catch (error) {
            console.error("Error updating user data:", error);
        }
    };

    const handleAvatarChange = async (newAvatar: string) => {
        try {
            const updatedUser = { ...user, avatar: newAvatar };
            await userService.updateUser("currentUserId", updatedUser);
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