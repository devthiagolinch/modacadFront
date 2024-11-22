import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { IPlanData } from '../../../../shared/api/plans/PlansService';
import * as yup from 'yup';

interface ICreatePlanProps {
  selectedPlan: Omit<IPlanData, 'id'> | null;
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

export const CreatePlan: React.FC<ICreatePlanProps> = ({ selectedPlan }) => {
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'topics',
  });

  const onSubmit: SubmitHandler<IPlanForm> = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
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
