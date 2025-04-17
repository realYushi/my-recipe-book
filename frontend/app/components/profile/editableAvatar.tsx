import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditableAvatarProps {
    name?: string;
    avatar?: string;
    onChange?: (imageDataUrl: string) => void;
}

const EditableAvatar: React.FC<EditableAvatarProps> = ({ name, avatar, onChange }) => {
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
            <Avatar className="w-24 h-24 mb-4 cursor-pointer border-2 border-white shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out" 
            onClick={() => fileInputRef.current?.click()}>
                {imageSrc ? (
                    <AvatarImage src={imageSrc} alt={name} />
                ) : (
                    <AvatarFallback>{name?.charAt(0) ?? "?"}</AvatarFallback>
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