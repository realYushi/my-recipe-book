import React from "react";
import ProfileCard from "~/components/profile/profileCard";
import EditProfileButton from "~/components/profile/editProfileButton";

const ProfilePage: React.FC = () => {
    const user = {
        name : "Katsumi Kawai",
        email : "Katsumi@gmail.com",
        avatar : "https://example.com/icon.png",
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <ProfileCard name={user.name} email={user.email} avatar={user.avatar} />
            <EditProfileButton />
        </div>
    );
}

export default ProfilePage;