import { api } from './axios';

const upload = (file: File, onUploadProgress: any): Promise<any> => {
  let formData = new FormData();

  formData.append('file', file);

  return api.post('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

const getFiles = (): Promise<any> => {
  return api.get('/files');
};

const FileUploadService = {
  upload,
  getFiles,
};

export default FileUploadService;
