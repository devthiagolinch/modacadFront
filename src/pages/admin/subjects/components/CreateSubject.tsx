import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISubjectData, SubjectsService } from '../../../../shared/api/subjects/SubjectsService';

interface IFormCreateSubject extends Omit<ISubjectData, 'id'> {}

const createSubjectSchema: yup.ObjectSchema<IFormCreateSubject> = yup.object({
  name: yup.string().required(),
  priority: yup.number().required(),
});

interface ICreateTagProps {
  onCreated: () => void;
}

type TMessage = { type: 'success' | 'error'; text: string };

export const CreateSubject: React.FC<ICreateTagProps> = ({ onCreated }) => {
  const [message, setMessage] = useState<TMessage>({ type: 'success', text: '' });

  const { handleSubmit, register, reset } = useForm<IFormCreateSubject>({ resolver: yupResolver(createSubjectSchema) });

  const onSubmit: SubmitHandler<IFormCreateSubject> = async (data) => {
    try {
      await SubjectsService.create(data);
      onCreated();
      reset();
      setMessage({
        type: 'success',
        text: 'Tag criada com sucesso',
      });
    } catch (error) {
      console.error(error);
      setMessage({
        type: 'error',
        text: 'Erro ao criar a tag',
      });
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: 'success', text: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between">
        <button className="bg-bgBtn text-white font-medium px-4 py-2" type="submit">
          CRIAR
        </button>
      </div>
      {message.text && (
        <div className={`mt-4 ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{message.text}</div>
      )}
      <div className="mt-2">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Assunto
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="mt-2">
        <label htmlFor="slug" className="block mb-2 text-sm font-medium text-gray-900">
          número posição na lista
        </label>
        <input
          {...register('priority')}
          type="text"
          id="priority"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required
        />
      </div>
    </form>
  );
};
