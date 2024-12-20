import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addNutri } from '../../../../Components/API/Endpoints';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from 'antd';

const AddPlanModal = ({ isOpen, onClose, fetchPlans }) => {
  if (!isOpen) return null;

  const [loadingButton, setLoadingButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoadingButton(true);
    try {
      const payload = { ...data };
      await addNutri(payload);
      toast.success('Consulta nutricional agregada.');
      fetchPlans(true);
      onClose();
    } catch (error) {
      toast.error('Error al agregar la consulta nutricional');
    } finally {
      setLoadingButton(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-dialog bg-gray-200 w-full max-w-lg mx-auto p-5 rounded-md shadow-lg">
        <div className="modal-content">
          <div className="modal-header flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black">Añadir consulta nutricional</h1>
            <button
              type="button"
              className="text-black text-xl"
              onClick={onClose}
              aria-label="Cerrar"
            >
              ×
            </button>
          </div>
          <div className="modal-body mt-4">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre de la consulta
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  {...register('name', { required: 'Este campo es obligatorio' })}
                />
                {errors.name && <span className="text-red-500">{errors.name.message}</span>}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Descripción de la consulta
                </label>
                <input
                  type="text"
                  id="description"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  {...register('description', { required: 'Este campo es obligatorio' })}
                />
                {errors.description && (
                  <span className="text-red-500">{errors.description.message}</span>
                )}
              </div>

              <div className="form-group mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Precio
                </label>
                <input
                  type="number"
                  id="price"
                  className="form-control w-full p-2 border border-gray-300 rounded-md"
                  {...register('price', {
                    required: 'Este campo es obligatorio',
                    min: {
                      value: 5000,
                      message: 'El precio no puede ser menor a 5000',
                    },
                  })}
                />
                {errors.price && <span className="text-red-500">{errors.price.message}</span>}
              </div>

              <div className="modal-footer flex justify-end mt-4">
                <button
                  type="button"
                  className="p-2 bg-gray-300 text-black rounded-md mr-2"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadingButton}
                  className="p-2 bg-blue-500 text-white rounded-md"
                >
                  Guardar consulta
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

AddPlanModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fetchPlans: PropTypes.func.isRequired,
};

export default AddPlanModal;
