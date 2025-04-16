import React, { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface EditableAvatarProps {
    name?: string;
    avatar?: string;
    onChange?: (imageDataUrl: string) => void;
}

const EditableAvatar: React.FC<EditableAvatarProps> = ({ name, onChange }) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result as string);
                if (onChange) {
                    onChange(reader.result as string);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="relative">
            <Avatar className="w-24 h-24 mb-4 cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                {imageSrc ? (
                    <AvatarImage src={imageSrc} alt={name} />
                ) : (
                    <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
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