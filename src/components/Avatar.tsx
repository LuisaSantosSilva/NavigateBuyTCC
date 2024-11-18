import React, { useEffect, useRef, useState } from 'react';

interface AvatarProps {
  initialAvatarUrl?: string;
  onAvatarChange: (file: File | null) => void;
}

const Avatar: React.FC<AvatarProps> = ({ initialAvatarUrl = '../img/logo-lupa.png', onAvatarChange }) => {
  const [avatar, setAvatar] = useState<string>(initialAvatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setAvatar(initialAvatarUrl);
  }, [initialAvatarUrl]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const fileURL = URL.createObjectURL(file);
      setAvatar(fileURL);
      onAvatarChange(file);
    } else {
      onAvatarChange(null);
    }
  };

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex items-center justify-center ml-5">
      <img
        src={avatar}
        alt="Avatar"
        className="mt-7 mb-10 w-48 h-48 border-2 object-cover rounded-full border-navigateblue"
      />
      <img
        src="../img/icon editar.png"
        alt="Editar"
        className="mt-36 cursor-pointer"
        width={28}
        onClick={handleEditClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        className="hidden"
        onChange={handleAvatarChange}
      />
    </div>
  );
};

export default Avatar;