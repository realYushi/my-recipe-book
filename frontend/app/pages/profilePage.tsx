import React, { use, useEffect, useState } from "react";
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

    const handleAvatarChange = (newAvatar: string) => {
        setUser((prevUser) => ({ ...prevUser, avatar: newAvatar }));
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 p-6">
            <ProfileCard name={user.name} email={user.email} avatar={user.avatar} />
            <EditProfileButton onAvatarChange = {handleAvatarChange}/>
        </div>
    );
}

export default ProfilePage;