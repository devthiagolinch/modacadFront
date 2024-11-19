import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ISubjectData, SubjectsService } from '../../../../shared/api/subjects/SubjectsService';
import { Alert } from '../../../../shared/components/ui/alert/Alert';

interface IFormCreateSubject extends Omit<ISubjectData, 'id'> {}

const createSubjectSchema: yup.ObjectSchema<IFormCreateSubject> = yup.object({
  name: yup.string().required(),
  priority: yup.number().required(),
});

interface ICreateTagProps {
  onCreated: () => void;
  clearTag: () => void;
  selectedSubject: ISubjectData | null;
}

const initialSubject = {
  name: '',
  priority: 0,
};

type TMessage = { type: 'success' | 'danger'; text: string };

export const CreateSubject: React.FC<ICreateTagProps> = ({ onCreated, clearTag, selectedSubject }) => {
  const [message, setMessage] = useState<TMessage>({ type: 'success', text: '' });

  const { handleSubmit, register, reset } = useForm<IFormCreateSubject>({ resolver: yupResolver(createSubjectSchema) });

  const onSubmit: SubmitHandler<IFormCreateSubject> = async (data) => {
    if (selectedSubject) {
      console.log('editando');
      SubjectsService.updateById(selectedSubject.id, data).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao atualizar o assunto',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Assunto atualizado com sucesso',
        });
        reset(initialSubject);
        onCreated();
      });
    } else {
      console.log('criando');
      SubjectsService.create(data).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao criar o assunto',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Assunto criado com sucesso',
        });
        reset(initialSubject);
        onCreated();
      });
    }
  };

  const handleClear = () => {
    clearTag();
    reset(initialSubject);
  };

  const handleDelete = () => {
    if (selectedSubject) {
      SubjectsService.deleteById(selectedSubject.id).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao excluir o assunto',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Assunto excluída com sucesso',
        });
        clearTag();
        onCreated();
      });
    }
  };

  // Atualiza o formulário com os dados da tag se estiver selecionada
  useEffect(() => {
    if (selectedSubject) {
      reset(selectedSubject);
    } else {
      reset(initialSubject);
    }
  }, [selectedSubject, reset]);

  // Exibir mensagem de sucesso ou erro
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
      <div className="flex justify-between flex-wrap gap-2">
        <h1 className="text-3xl">Criar assunto</h1>
        <div className="flex flex-wrap gap-2">
          <button className="bg-bgBtn text-white font-medium px-4 py-2" type="submit">
            {selectedSubject ? 'ATUALIZAR' : 'SALVAR'}
          </button>
          <button className="text-bgBtn border border-bgBtn font-medium px-4 py-2" type="button" onClick={handleClear}>
            LIMPAR
          </button>
          <button className="bg-red-500 text-white font-medium px-4 py-2" type="button" onClick={handleDelete}>
            EXCLUIR
          </button>
        </div>
      </div>
      {message.text && <Alert color={message.type}>{message.text}</Alert>}
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
