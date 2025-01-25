import React, { useState } from "react";
import SimpleSelect from "./Select";

interface InventoryFormProps {
    onSave: (item: { name: string; category: string; quantity: number }) => void;
    initialData?: { name: string; category: string; quantity: number } | null;
    onCancel: () => void;
}

const InventoryForm: React.FC<InventoryFormProps> = ({ onSave, initialData, onCancel }) => {
    const [formData, setFormData] = useState(
        initialData || { name: "", category: "", quantity: 1 }
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500"
                required
            />
            <SimpleSelect options={[
                "Technology",
                "Health",
                "Education",
                "Finance",
                "Entertainment",
            ]} selectedValue={formData.category} onValueChange={(value: string) => setFormData({ ...formData, category: value })} />
            <input
                type="number"
                placeholder="Quantity"
                value={formData.quantity}

                onChange={(e) =>
                    setFormData({ ...formData, quantity: parseInt(e.target.value, 10) })
                }
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500"
                min="1"
                required
            />
            <div className=" flex justify-end gap-2 mt-10">
                <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded">
                    Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    Save
                </button>
            </div>
        </form>
    );
};

export default InventoryForm;
