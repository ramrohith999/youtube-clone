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
            px-4 py-2 rounded-xl whitespace-nowrap
            cursor-pointer
            hover:translate-0.5
            hover:shadow-xl
            transition
            duration-300

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