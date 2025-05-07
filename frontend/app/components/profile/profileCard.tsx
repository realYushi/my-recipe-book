import EditableAvatar from "@/components/profile/editableAvatar";

interface ProfileCardProps {
    name: string;
    email: string;
    avatar: string;
}

function ProfileCard({ avatar }: ProfileCardProps) {
    return (
        <div className="flex items-center gap-6">
            <EditableAvatar
                avatar={avatar}
            />
        </div>
    );
}
export default ProfileCard;