"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

function AnimatedDropdown({
  id,
  label,
  options,
  activeDropdown,
  setActiveDropdown,
  onSelect,
}: {
  id: string;
  label: string;
  options: string[];
  activeDropdown: string | null;
  setActiveDropdown: (id: string | null) => void;
  onSelect: (id: string, value: string) => void;
}) {
  const open = activeDropdown === id;
  const [selected, setSelected] = useState(label);

  return (
    <div className="relative">
      <button
        onClick={() => setActiveDropdown(open ? null : id)}
        className="flex items-center justify-between w-full border px-3 py-2 text-sm text-gray-700 rounded-md bg-white shadow-sm hover:bg-gray-50 transition"
      >
        <span>{selected}</span>
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            className="absolute mt-1 w-full bg-white border rounded-md shadow-md z-10 overflow-hidden"
          >
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  setSelected(option);
                  onSelect(id, option);
                  setActiveDropdown(null);
                }}
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSection({
  onFilterChange,
}: {
  onFilterChange: (filters: Record<string, string>) => void;
}) {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleSelect = (id: string, value: string) => {
    const newFilters = { ...filters, [id]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8 font-bold">
      <AnimatedDropdown
        id="cat"
        label="Categories"
        options={["Sarees", "Lehengas", "Indo Western", "Salwar Kameez"]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="col"
        label="Colour"
        options={["Red", "Wine", "Peach", "Cream", "Dark"]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="dis"
        label="Discount"
        options={[
          "0% and above",
          "10% and above",
          "20% and above",
          "30% and above",
          "40% and above",
        ]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="fab"
        label="Fabric"
        options={["Silk", "Cotton", "Linen", "Georgette", "Chiffon"]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="pat"
        label="Pattern"
        options={["Embroidered", "Floral", "Geometric", "Abstract"]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="occ"
        label="Occasion"
        options={[
          "Festival wear",
          "Party wear",
          "Casual wear",
          "Formal wear",
          "Ethnic wear",
        ]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="siz"
        label="Size"
        options={["XS", "S", "M", "L", "XL", "XXL"]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
      <AnimatedDropdown
        id="pri"
        label="Price"
        options={["0-500", "500-1000", "1000-1500", "1500-2000", "2000+"]}
        activeDropdown={activeDropdown}
        setActiveDropdown={setActiveDropdown}
        onSelect={handleSelect}
      />
    </div>
  );
}
