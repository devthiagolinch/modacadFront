import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IPlanData, PlansService } from '../../../../shared/api/plans/PlansService';
import * as yup from 'yup';
import { Alert } from '../../../../shared/components/ui/alert/Alert';

interface ICreatePlanProps {
  selectedPlan: IPlanData | null;
  onCreated: () => void;
}

interface IPlanForm extends Omit<IPlanData, 'id'> {}

const initialPlanForm: IPlanForm = {
  title: '',
  price: '',
  description: '',
  topics: [],
};

const createPlansSchema: yup.ObjectSchema<IPlanForm> = yup.object({
  title: yup.string().required('Nome é obrigatório'),
  price: yup.string().required('Preço é obrigatório'),
  description: yup.string().required('Descrição é obrigatória'),
  topics: yup
    .array()
    .of(
      yup.object({
        id: yup.number().required(),
        value: yup.string().required('Vantagem é obrigatória'),
      })
    )
    .required('Vantagens são obrigatórias'),
});

type TMessage = { type: 'success' | 'danger'; text: string };

export const CreatePlan: React.FC<ICreatePlanProps> = ({ selectedPlan, onCreated }) => {
  const [message, setMessage] = useState<TMessage>({ type: 'success', text: '' });

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IPlanForm>({
    resolver: yupResolver(createPlansSchema),
    defaultValues: initialPlanForm,
  });

  useEffect(() => {
    if (selectedPlan) {
      reset({
        title: selectedPlan.title,
        price: selectedPlan.price,
        description: selectedPlan.description,
        topics: selectedPlan.topics,
      });
    } else {
      reset(initialPlanForm);
    }
  }, [selectedPlan, reset]);

  // Exibir mensagem de sucesso ou erro
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: 'success', text: '' });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'topics',
  });

  const onSubmit: SubmitHandler<IPlanForm> = (data) => {
    // Se houver plano selecionado é então para atualizar
    const formattedData = { ...data, topics: data.topics.map((topic) => topic.value) };

    if (selectedPlan) {
      PlansService.updateById(selectedPlan.id, formattedData).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          setMessage({
            type: 'danger',
            text: 'Erro ao atualizar o plano',
          });
          return;
        }
        setMessage({
          type: 'success',
          text: 'Plano atualizado com sucesso',
        });
        reset(initialPlanForm);
        onCreated();
      });
    } else {
      PlansService.create(formattedData).then((response) => {
        if (response instanceof Error) {
          console.error(response);
          return;
        }
        setMessage({
          type: 'success',
          text: 'Plano criado com sucesso',
        });
        reset(initialPlanForm);
        onCreated();
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {message.text && <Alert color={message.type}>{message.text}</Alert>}
      <div className="mt-2">
        <button className="bg-bgBtn text-white font-medium px-4 py-2" type="submit">
          {selectedPlan ? 'ATUALIZAR' : 'SALVAR'}
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          {/* Nome */}
          <div className="mt-2">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">
              Nome
            </label>
            <input
              type="text"
              id="title"
              {...register('title')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>
          {/* Preço */}
          <div className="mt-2">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
              Preço
            </label>
            <input
              type="text"
              id="price"
              {...register('price')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          {/* Descrição */}
          <div className="mt-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">
              Descrição
            </label>
            <input
              type="text"
              id="description"
              {...register('description')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
        </div>
        <div>
          {/* Ofertas de valor */}
          <div className="mt-2">
            <label className="block mb-2 text-sm font-medium text-gray-900">Ofertas de valor</label>
            {fields.map((field, index) => (
              <div key={field.id} className="flex items-center mb-2">
                <Controller
                  control={control}
                  name={`topics.${index}.value`}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                  )}
                />
                <button type="button" onClick={() => remove(index)} className="ml-2 text-red-500">
                  Excluir
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ id: fields.length + 1, value: '' })}
              className="mt-2 text-blue-500"
            >
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
