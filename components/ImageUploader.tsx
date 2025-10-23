
import React, { useState, useCallback } from 'react';
import CameraIcon from './icons/CameraIcon';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  promptText: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, promptText }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFileName(file.name);
      onImageUpload(file);
    }
  }, [onImageUpload]);

  return (
    <div className="w-full">
      <label
        htmlFor="image-upload"
        className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 border-gray-300"
      >
        {preview ? (
          <img src={preview} alt="Preview" className="object-contain h-full w-full rounded-lg" />
        ) : (
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
            <CameraIcon className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">{promptText}</p>
          </div>
        )}
        <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
      </label>
      {fileName && <p className="text-sm text-center text-gray-500 mt-2">File: {fileName}</p>}
    </div>
  );
};

export default ImageUploader;
