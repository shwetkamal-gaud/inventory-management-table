import { SquarePen, Trash } from "lucide-react";
import React, { useState } from "react";
import Modal from "./Modal";

interface InventoryItem {
    id: number;
    name: string;
    category: string;
    quantity: number;
}

interface InventoryTableProps {
    inventory: InventoryItem[];
    onEdit: (item: InventoryItem) => void;
    onDelete: (id: number) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ inventory, onEdit, onDelete }) => {
    const [isDelete, setIsDelete] = useState<boolean>(false)
    const [id, setId] = useState<number>(-1)
    const onClose = () => {
        setIsDelete(false)
    }
    return (
        <>
            <table className="w-full table-auto border-collapse border border-gray-200">

                <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Category</th>
                        <th className="border border-gray-300 px-4 py-2">Quantity</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr
                            key={item.id}
                            className={`${item.quantity < 10 ? "bg-red-100" : "bg-white"
                                } hover:bg-gray-50`}
                        >
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.name}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.category}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">{item.quantity}</td>
                            <td className="border border-gray-300 px-4 py-2 text-center">
                                <div className="flex gap-10">
                                    <button
                                        onClick={() => onEdit(item)}
                                        className="rounded"
                                    >
                                        <SquarePen />
                                    </button>
                                    <button
                                        onClick={() => { setIsDelete(true); setId(item?.id) }}
                                        className="rounded"
                                    >
                                        <Trash />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Modal
                isOpen={isDelete}
                onClose={onClose}
                header="Deleting an Item"
            >
                <h2>Do you want to delete permanantly!</h2>
                <div className="flex justify-end gap-2 mt-10">
                    <button type="button" onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
                        Cancel
                    </button>
                    <button type="button" onClick={() => { onDelete(id); onClose() }} className="bg-blue-500 text-white px-4 py-2 rounded">
                        Save
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default InventoryTable;
