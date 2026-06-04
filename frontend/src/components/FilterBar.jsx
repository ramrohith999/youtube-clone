import { categories } from "../utils/constants";

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex gap-3 overflow-x-auto mb-6">

      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`
            px-4 py-2 rounded-lg whitespace-nowrap
            cursor-pointer

            ${
              selectedCategory === category
                ? "bg-black text-white"
                : "bg-gray-200"
            }
          `}
        >
          {category}
        </button>
      ))}

    </div>
  );
};

export default FilterBar;