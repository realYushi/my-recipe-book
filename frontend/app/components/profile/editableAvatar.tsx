import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditableAvatarProps {
    avatar?: string;
    onChange?: (imageDataUrl: string) => void;
}

const EditableAvatar: React.FC<EditableAvatarProps> = ({ avatar, onChange }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(avatar || null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setImageSrc(result );
                if (onChange) {
                    onChange(result);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative">
            <Avatar className="w-24 h-24 cursor-pointer border-2 border-gray-300 shadow-md" 
            onClick={() => fileInputRef.current?.click()}>
                {imageSrc ? (
                    <AvatarImage src={imageSrc} alt="Avatar" />
                ) : (
                    <AvatarFallback>?</AvatarFallback>
                )}
            </Avatar>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default EditableAvatar;