import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX } from 'react-icons/fi';

export type TImageFile = {
  file: File;
  preview: string;
} | null;

interface IImageDropzoneProps {
  onChange: (value: TImageFile) => void;
  value: TImageFile;
  error?: { message: string };
  className?: string;
}

export const ImageDropzone: React.FC<IImageDropzoneProps> = ({ onChange, value, error, className }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
          onChange({
            file,
            preview: reader.result as string,
          });
        };

        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/gif': ['.gif'],
    },
    maxFiles: 1,
  });

  const removeImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onChange(null);
  };

  return (
    <div className={`${className} space-y-2`}>
      {value?.preview ? (
        <div className="relative group">
          <img src={value.preview} alt="Preview" className="w-48 aspect-square object-cover rounded-lg" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 left-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <FiX size={16} />
          </button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
            isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          <input {...getInputProps()} />
          <FiUpload className="mx-auto text-gray-400 mb-2" size={24} />
          <p className="text-sm text-gray-600">
            {isDragActive ? 'Solte a imagem aqui' : 'Arraste uma imagem ou clique para selecionar'}
          </p>
          <p className="text-xs text-gray-500 mt-1">Formatos aceitos: JPG, PNG, GIF (máx. 2MB)</p>
        </div>
      )}
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};
