import React from "react";

interface SelectProps {
    options: string[]
    selectedValue: string
    onValueChange: (value: string) => void
}

const SimpleSelect = ({ options, selectedValue, onValueChange }: SelectProps) => {
    return (
        <div className="w-full h-[40px]">
            <div className="relative">
                <select
                    required
                    id="simple-select"
                    value={selectedValue}
                    onChange={(e) => onValueChange(e.target.value)}
                    className="block w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:focus:ring-blue-500"
                >
                    <option value="" disabled>
                        Select an option
                    </option>
                    {options.map((option, index) => (
                        <option
                            key={index}
                            value={option}
                            className={
                                selectedValue === option
                                    ? "bg-blue-100 text-blue-800"
                                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                            }
                        >
                            {option}
                        </option>
                    ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400 dark:text-gray-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SimpleSelect;
