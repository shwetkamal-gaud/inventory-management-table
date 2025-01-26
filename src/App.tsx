import React, { useMemo, useState } from "react";
import InventoryTable from "./components/InventoryTable";
import InventoryForm from "./components/InventoryForm";
import Modal from "./components/Modal";
import SimpleSelect from "./components/Select";

interface InventoryItem {
  id: number;
  name: string;
  category: string;
  quantity: number;
}

const App: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: 1, name: "Laptop", category: "Technology", quantity: 15 },
    { id: 2, name: "Smartphone", category: "Technology", quantity: 30 },
    { id: 3, name: "First Aid Kit", category: "Health", quantity: 50 },
    { id: 4, name: "Yoga Mat", category: "Health", quantity: 20 },
    { id: 5, name: "Textbook", category: "Education", quantity: 40 },
    { id: 6, name: "Notebook", category: "Education", quantity: 100 },
    { id: 7, name: "Calculator", category: "Education", quantity: 25 },
    { id: 8, name: "Accounting Software", category: "Finance", quantity: 10 },
    { id: 9, name: "Credit Card Terminal", category: "Finance", quantity: 5 },
    { id: 10, name: "Movie Ticket", category: "Entertainment", quantity: 75 },
    { id: 11, name: "Board Game", category: "Entertainment", quantity: 40 },
    { id: 12, name: "Gaming Console", category: "Entertainment", quantity: 8 },
    { id: 13, name: "Tablet", category: "Technology", quantity: 12 },
    { id: 14, name: "Wearable Fitness Tracker", category: "Health", quantity: 18 },
    { id: 15, name: "Microscope", category: "Education", quantity: 7 },
    { id: 16, name: "Budget Planner", category: "Finance", quantity: 50 },
    { id: 17, name: "Streaming Service Subscription", category: "Entertainment", quantity: 100 },
    { id: 18, name: "3D Printer", category: "Technology", quantity: 4 },
    { id: 19, name: "Blood Pressure Monitor", category: "Health", quantity: 22 },
    { id: 20, name: "E-Learning Course Access", category: "Education", quantity: 60 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>("All");
  const [sortAsc, setSortAsc] = useState<boolean>(false);
  const [sortDsc, setSortDsc] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')

  const handleSave = (item: Omit<InventoryItem, "id">) => {
    if (currentItem) {
      setInventory((prev) =>
        prev.map((i) =>
          i.id === currentItem.id ? { ...item, id: currentItem.id } : i
        )
      );
    } else {
      setInventory((prev) => [...prev, { ...item, id: Date.now() }]);
    }
    closeModal();
  };


  const handleDelete = (id: number) => {
    setInventory((prev) => prev.filter((item) => item.id !== id));
  };

  const openModal = () => {
    setCurrentItem(null);
    setIsModalOpen(true);
  };
  const handleEditClick = (item: InventoryItem) => {
    setCurrentItem(item);
    setIsModalOpen(true);
  }
  const closeModal = () => {
    setCurrentItem(null);
    setIsModalOpen(false);
  };

  const handleAscendingClick = () => {
    setSortAsc(!sortAsc)
    if (sortDsc && !sortAsc) {
      setSortDsc(false)
    }
  }
  const handleDescendingClick = () => {
    setSortDsc(!sortDsc)
    if (!sortDsc && sortAsc) {
      setSortAsc(false)
    }
  }

  const filteredData = useMemo(() => {
    let filtered = filterCategory === "All" ? [...inventory] : inventory.filter((Item: InventoryItem) => Item.category === filterCategory)
    if (searchValue) {
      filtered = filtered.filter((item: InventoryItem) => item.name.includes(searchValue) || item.category.includes(searchValue))
    }
    if (sortAsc) {
      filtered.sort((a, b) => a.quantity - b.quantity)
    }
    else if (sortDsc) {
      filtered.sort((a, b) => b.quantity - a.quantity)
    }

    return filtered
  }, [inventory, filterCategory, sortAsc, sortDsc, searchValue])

  return (
    <div className="flex w-full flex-col overflow-hidden items-center p-4">
      <div className="flex w-full gap-3 justify-between items-center mb-4">
        <div className="flex  gap-3">
          <SimpleSelect options={[
            "All",
            "Technology",
            "Health",
            "Education",
            "Finance",
            "Entertainment",
          ]} selectedValue={filterCategory} onValueChange={(valeu: string) => setFilterCategory(valeu)} />
          <button title="Sort By Quantity in Ascending" onClick={handleAscendingClick} className={` px-4 py-2 rounded text-white ${!sortAsc ? 'bg-gray-300' : 'bg-gray-500'}`}>
            ↑
          </button>
          <button title="Sort by Quantity in descending" onClick={handleDescendingClick} className={` px-4 py-2 rounded text-white ${!sortDsc ? 'bg-gray-300' : 'bg-gray-500'}`}>
            ↓
          </button>
        </div>
        <button
          onClick={openModal}
          className="bg-blue-500 text-white px-4 py-2  rounded"
        >
          Add
        </button>

      </div>
      <div className="flex flex-col w-full gap-5 h-[88vh] ">
        <input type="text"
          placeholder="Search..."
          value={searchValue}
          title="Search by Name or ny Category"
          onChange={(e) => setSearchValue(e.target.value)}
          className="border self-start   p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500"
        />
        <div className="flex-1 overflow-auto w-[100%]  ">
          <InventoryTable
            inventory={filteredData}
            onEdit={handleEditClick}
            onDelete={handleDelete}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        header={currentItem ? 'Edit Item' : 'Add Item'}
      >
        <InventoryForm
          onSave={handleSave}
          initialData={currentItem}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default App;
