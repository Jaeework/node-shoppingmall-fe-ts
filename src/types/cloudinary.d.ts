interface CloudinaryWidget {
  open: () => void;
  destroy: () => void;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
    [key: string]: unknown;
  };
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: { cloudName: string; uploadPreset: string },
        callback: (error: unknown, result: CloudinaryUploadResult) => void
      ) => CloudinaryWidget;
    };
  }
}

export {};
