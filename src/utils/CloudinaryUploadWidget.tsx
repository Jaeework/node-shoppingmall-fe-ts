import React, { useEffect, useRef } from "react";
import Button from "../components/ui/atoms/button/Button";

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOADPRESET = import.meta.env.VITE_CLOUDINARY_PRESET as string;

interface CloudinaryUploadWidgetProps {
  uploadImage: (url: string) => void;
}

const CloudinaryUploadWidget: React.FC<CloudinaryUploadWidgetProps> = ({
  uploadImage,
}) => {
  const widgetRef = useRef<ReturnType<typeof window.cloudinary.createUploadWidget> | null>(null);
  const uploadImageRef = useRef(uploadImage);

  useEffect(() => {
    uploadImageRef.current = uploadImage;
  });

  useEffect(() => {
    widgetRef.current = window.cloudinary.createUploadWidget(
      { cloudName: CLOUDNAME, uploadPreset: UPLOADPRESET },
      (_error, result) => {
        if (result && result.event === "success") {
          const imgEl = document.getElementById(
            "uploadedimage"
          ) as HTMLImageElement | null;
          if (imgEl) imgEl.src = result.info.secure_url;
          uploadImageRef.current(result.info.secure_url);
        }
      }
    );

    return () => {
      widgetRef.current?.destroy();
      widgetRef.current = null;
    };
  }, []);

  const handleClick = () => {
    widgetRef.current?.open();
  };

  return (
    <Button
      type="button"
      variant="chrome"
      radius="md"
      size="md"
      onClick={handleClick}
    >
      <h1 className="text-sm text-gray-800 font-heading">Upload Image +</h1>
    </Button>
  );
};

export default CloudinaryUploadWidget;
