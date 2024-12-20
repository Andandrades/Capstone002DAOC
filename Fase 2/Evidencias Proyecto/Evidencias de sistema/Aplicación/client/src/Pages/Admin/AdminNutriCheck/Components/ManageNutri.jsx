import React, { useState } from 'react'
import menu from "../../../../assets/Certificate.svg";
import { deleteNutri } from '../../../../Components/API/Endpoints';
import ModifyNutriModal from './ModifyNutriModal';
import { toast } from 'react-toastify';
import { Button } from 'antd';

export const ManageNutri = ({ id, name, amount,description, fetchPlans }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingButton, setLoadingButton] = useState(false);
    const formatPriceWithDots = (amount) => {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const DeleteNutri = async (id) => {
        setLoadingButton(true)
        try {
            const response = await deleteNutri(id);
            if (response) {
                fetchPlans(true);
                toast.success('La consulta ha sido eliminada exitosamente.');
            } else {
                toast.error('Ha ocurrido un error, Intentalo nuevamente.');
            }
            setLoadingButton(false)
        } catch (error) {
            setLoadingButton(false)
            console.error("Error al eliminar el plan:", error);
            toast.error('La consulta no se puede eliminar, Usuarios han tenien esta consulta en el historial de transaciones...');
        }
    };


    const ModifyPlan = (id) => {
        setIsModalOpen(true);

    }
    return (
        <>
            <div className="flex gap-10 justify-between items-center relative text-white lg:py-6 px-6 rounded-md bg-[#1C1C1C] flex-col w-80 mt-4 mx-auto pb-9">
                <img
                    className="absolute top-[-15px] right-[0px] m-0 p-0"
                    src={menu}
                    alt=""
                />
                <div>
                    <div className="flex flex-col justify-center items-center font-semibold pt-6">
                        <h1 className="text-3xl font-bold text-center ">{name}</h1>
                        <h2 className="font-bold   text-[#FFAE3A]  pt-6">
                            ${formatPriceWithDots(amount)} CLP
                        </h2>
                    </div>
                </div>
                <div className="flex space-x-4">
                    <Button className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#EFDD37]"
                        onClick={() => { ModifyPlan() }}>
                        Modificar
                    </Button>
                    <Button
                        type="submit"
                        className="text-base rounded-full py-2 pl-4 pr-4 text-black font-bold bg-[#FF0000]"
                        loading={loadingButton}
                        onClick={() => { DeleteNutri(id) }}
                    >
                        Eliminar
                    </Button>
                </div>

            </div>
            <ModifyNutriModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                id ={id}
                name={name}
                price={amount}
                description={description}
                fetchPlans={fetchPlans}
            />
        </>
    );
}
