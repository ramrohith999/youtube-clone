import { categories } from "../utils/constants";

const FilterBar = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div
      className="
        flex
        gap-3
        overflow-x-auto
        mb-6
        pb-2
        scrollbar-hide
      "
    >
      {categories.map((category) => (
        <button
          key={category}
          onClick={() =>
            setSelectedCategory(category)
          }
          className={`
            px-4
            py-2
            rounded-xl
            whitespace-nowrap
            cursor-pointer
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:shadow-md

            ${
              selectedCategory === category
                ? `
                  bg-blue-500
                  text-white
                  shadow-md
                `
                : `
                  bg-gray-200
                  dark:bg-gray-800
                  dark:text-white
                  hover:bg-gray-300
                  dark:hover:bg-gray-700
                `
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