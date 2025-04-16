import React from "react";

import EditableAvatar from "~/components/profile/editableAvatar";

interface ProfileCardProps {
    name: string;
    email: string;
    avatar: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, avatar }) => {
    const handleAvatarChange = (imageDataUrl: string) => {
        console.log("Avatar changed:", imageDataUrl);
    }

    return (
        <div className="flex flex-col items-center p-4 bg-white shadow-md rounded-lg">
            <EditableAvatar
                avatar={avatar}
                onChange={handleAvatarChange}
            />
            <h2 className="mt-4 text-xl font-semibold">{name}</h2>
            <p className="text-gray-600">{email}</p>
        </div>
    );
}
export default ProfileCard;