import React from "react";
import EditableAvatar from "~/components/profile/editableAvatar";

interface ProfileCardProps {
    name: string;
    email: string;
    avatar: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, email, avatar }) => {
    return (
        <div className="flex items-center gap-6">
            <EditableAvatar
                avatar={avatar}
            />
            <div>
                <h2 className="text-2xl font-semibold">{name}</h2>
                <p className="text-gray-600">{email}</p>
            </div>
        </div>
    );
}
export default ProfileCard;