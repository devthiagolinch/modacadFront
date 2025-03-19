import React from 'react';

interface FacebookPreviewProps {
  imageUrl: string | null;
  url: string | undefined;
  title: string;
  description: string;
}

export const FacebookPreview: React.FC<FacebookPreviewProps> = ({ imageUrl, url, title, description }) => (
  <div className="max-w-screen border-gray-300 overflow-hidden bg-white mb-5 gap-5">
    <span className="text-sm">Facebook preview</span>
    {/* Imagem de destaque */}
    <div className="h-48 w-full bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}></div>

    {/* Conteúdo */}
    <div className="bg-slate-100 p-4">
      <p className="text-xs text-gray-500 uppercase">blog.modacad.com.br/{url}</p>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="text-sm text-gray-600 mt-1 truncate">{description}</p>
    </div>
  </div>
);
